import { getWalletClient, switchChain } from "@wagmi/core"
import { ethers, isError } from "ethers"
import { isNumber } from "lodash"

import { CHAIN_ID, TX_STATUS } from "@/constants"
import { defaultConfig } from "@/contexts/RainbowProvider"
import { DepositBatchMode } from "@/stores/batchBridgeStore"
import useTxStore from "@/stores/txStore"

export const switchNetwork = async (chainId: number) => {
  const walletClient = await getWalletClient(defaultConfig)
  try {
    await switchChain(defaultConfig, {
      chainId,
    })
  } catch (error) {
    // 4902 or -32603 mean chain doesn't exist
    if (~error.message.indexOf("wallet_addEthereumChain") || error.code === 4902 || error.code === -32603) {
      // const { chains } = getNetwork()
      const chains = defaultConfig.chains
      await walletClient?.addChain({
        chain: chains.find(item => item.id === chainId)!,
      })
    }
  }
}

export const checkApproved = (needApproval, mode: DepositBatchMode) => {
  const flag = mode === DepositBatchMode.Economy ? 1 : 2
  return (isNumber(needApproval) && !(needApproval & flag)) || needApproval === false
}

export const isUserRejected = error => {
  return isError(error, "ACTION_REJECTED")
}

const getFrontTransactions = () => {
  try {
    return useTxStore.getState().frontTransactions
  } catch (error) {
    console.error("Error fetching frontTransactions:", error)
    return {}
  }
}

const fetchTransactionStatus = async (transactionHash, provider) => {
  try {
    return await provider.getTransactionReceipt(transactionHash)
  } catch (error) {
    console.error(`Error fetching transaction status for ${transactionHash}:`, error)
    return null
  }
}

const removePendingTransaction = transactionHash => {
  const storedPendingTxs = JSON.parse(localStorage.getItem("pendingTransactions") || "{}")

  if (!storedPendingTxs[transactionHash]) return storedPendingTxs // No change needed

  delete storedPendingTxs[transactionHash]

  // Only update localStorage if there are still pending transactions
  if (Object.keys(storedPendingTxs).length > 0) {
    localStorage.setItem("pendingTransactions", JSON.stringify(storedPendingTxs))
  } else {
    // Remove the key completely if empty
    localStorage.removeItem("pendingTransactions")
  }

  // Return updated transactions for further checks
  return storedPendingTxs
}

export const pollAllTransactionStatuses = (walletCurrentAddress, networksAndSigners, updateTransaction) => {
  const interval = setInterval(async () => {
    let storedPendingTxs = JSON.parse(localStorage.getItem("pendingTransactions") || "{}")

    // Stop polling if no pending transactions
    if (Object.keys(storedPendingTxs).length === 0) {
      clearInterval(interval)
      return
    }

    const frontTransactions = getFrontTransactions()
    const txList = frontTransactions[walletCurrentAddress] ?? []

    for (const transactionHash of Object.keys(storedPendingTxs)) {
      const tx = txList.find(txItem => txItem.hash === transactionHash)
      // Skip if transaction not found
      if (!tx) continue

      const provider = networksAndSigners[tx.isL1 ? CHAIN_ID.L1 : CHAIN_ID.L2].provider
      const receipt = await fetchTransactionStatus(transactionHash, provider)

      if (receipt?.status === 1) {
        // Remove from localStorage and update transaction status
        storedPendingTxs = removePendingTransaction(transactionHash)

        updateTransaction(walletCurrentAddress, tx.hash, {
          fromBlockNumber: receipt.blockNumber,
          txStatus: TX_STATUS.Sent,
        })
      }
    }

    // Stop polling if no more pending transactions
    if (Object.keys(storedPendingTxs).length === 0) {
      clearInterval(interval)
    }
    // Poll every 5 seconds
  }, 5000)

  return interval
}
