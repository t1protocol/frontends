import { isMainnet, isSepolia } from "@/utils"

export const ETH_SYMBOL = process.env.NEXT_PUBLIC_ETH_SYMBOL
export const WETH_SYMBOL = "WETH"
export const USDT_SYMBOL = "USDT"
export const USDC_SYMBOL = "USDC"

export const L1_NAME = `Ethereum ${isSepolia ? "Sepolia" : process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT}`

export const L2_DEVNET_NAME = process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT === "Sepolia" ? process.env.NEXT_PUBLIC_T1_ENVIRONMENT : "Testnet"
export const L2_NAME = `𝚝𝟷 ${isMainnet ? "" : L2_DEVNET_NAME}`
export const L2_CHAIN_NAME = `𝚝𝟷 v${process.env.NEXT_PUBLIC_CHAIN_VERSION}`

export const CHAIN_ID = {
  L1: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID_L1),
  L2: parseInt(process.env.NEXT_PUBLIC_CHAIN_ID_L2),
}

export const RPC_URL = {
  L1: process.env.NEXT_PUBLIC_EXTERNAL_RPC_URI_L1,
  L2: process.env.NEXT_PUBLIC_EXTERNAL_RPC_URI_L2,
}

export const EXPLORER_URL = {
  L1: process.env.NEXT_PUBLIC_EXTERNAL_EXPLORER_URI_L1,
  L2: process.env.NEXT_PUBLIC_EXTERNAL_EXPLORER_URI_L2,
  Dora: process.env.NEXT_PUBLIC_EXTERNAL_EXPLORER_URI_DORA,
}

export const STANDARD_ERC20_GATEWAY_PROXY_ADDR = {
  [CHAIN_ID.L1]: process.env.NEXT_PUBLIC_L1_STANDARD_ERC20_GATEWAY_PROXY_ADDR,
  [CHAIN_ID.L2]: process.env.NEXT_PUBLIC_L2_STANDARD_ERC20_GATEWAY_PROXY_ADDR,
}

export const GATEWAY_ROUTE_PROXY_ADDR = {
  [CHAIN_ID.L1]: process.env.NEXT_PUBLIC_L1_GATEWAY_ROUTER_PROXY_ADDR,
  [CHAIN_ID.L2]: process.env.NEXT_PUBLIC_L2_GATEWAY_ROUTER_PROXY_ADDR,
}

export const WETH_GATEWAY_PROXY_ADDR = {
  [CHAIN_ID.L1]: process.env.NEXT_PUBLIC_L1_WETH_GATEWAY_PROXY_ADDR,
  [CHAIN_ID.L2]: process.env.NEXT_PUBLIC_L2_WETH_GATEWAY_PROXY_ADDR,
}

export const SCROLL_MESSENGER_ADDR = {
  [CHAIN_ID.L1]: process.env.NEXT_PUBLIC_L1_T1_MESSENGER_PROXY_ADDR,
  [CHAIN_ID.L2]: process.env.NEXT_PUBLIC_L2_T1_MESSENGER_PROXY_ADDR,
}

export const USDC_GATEWAY_PROXY_ADDR = {
  [CHAIN_ID.L2]: process.env.NEXT_PUBLIC_L2_USDC_GATEWAY_PROXY_ADDR,
}

export const BATCH_BRIDGE_GATEWAY_PROXY_ADDR = {
  [CHAIN_ID.L1]: process.env.NEXT_PUBLIC_L1_BATCH_BRIDGE_GATEWAY_PROXY_ADDR,
}

export const DOCUMENTATION_URL = {
  Mainnet: "https://docs.t1protocol.com/",
  Sepolia: "https://docs.t1protocol.com/",
  Staging: "https://docs.t1protocol.com/",
}

export const SEPOLIA_URL = {
  FAUCET: "https://cloud.google.com/application/web3/faucet/ethereum/sepolia",
  WRAP_ETH: "https://sepolia.etherscan.io/token/0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9#writeContract#F2",
}

export const MAINNET_URL = {
  WRAP_ETH: "https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#writeContract#F5",
}

export const WRAP_ETH_URL = isSepolia ? SEPOLIA_URL.WRAP_ETH : MAINNET_URL.WRAP_ETH

export const TDEX_URL = "https://t-dex.v010.t1protocol.com/"
export const TDEX_URL_SEPOLIA = "https://t-dex.v010.t1protocol.com/?network=sepolia"

export const BRANCH_NAME = process.env.NEXT_PUBLIC_SCROLL_ENVIRONMENT!.toLocaleLowerCase()
