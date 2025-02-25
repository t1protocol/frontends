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

export const pollAllTransactionStatuses = (walletCurrentAddress, networksAndSigners, updateTransaction) => {
  let pollingActive = true

  const interval = setInterval(async () => {
    if (!pollingActive) {
      clearInterval(interval)
      return
    }

    const storedPendingTxs = JSON.parse(localStorage.getItem("pendingTransactions") || "{}")

    // if no pending transactions
    if (Object.keys(storedPendingTxs).length === 0) {
      clearInterval(interval)
      return
    }

    const { frontTransactions } = useTxStore.getState()

    let txList = frontTransactions[walletCurrentAddress] ?? []

    for (const transactionHash of Object.keys(storedPendingTxs)) {
      const tx = txList.find(txItem => txItem.hash === transactionHash)
      if (!tx) continue // Skip if transaction not found

      const provider = networksAndSigners[tx.isL1 ? CHAIN_ID.L1 : CHAIN_ID.L2].provider

      try {
        const receipt = await provider.getTransactionReceipt(transactionHash)

        if (receipt && receipt.status === 1) {
          // Remove from localStorage
          delete storedPendingTxs[transactionHash]
          localStorage.setItem("pendingTransactions", JSON.stringify(storedPendingTxs))

          // Update transaction status
          updateTransaction(walletCurrentAddress, tx.hash, {
            fromBlockNumber: receipt.blockNumber,
            txStatus: TX_STATUS.Sent,
          })
        }
      } catch (error) {
        console.error(`Error fetching transaction status for ${transactionHash}:`, error)
      }
    }

    // If no more transactions are pending, stop polling
    if (Object.keys(storedPendingTxs).length === 0) {
      clearInterval(interval)
    }
  }, 5000) // Poll every 5 seconds

  return interval
}
