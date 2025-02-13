import MainnetSvg from "@/assets/svgs/bridge/network-mainnet.svg"
import ETHSvg from "@/assets/svgs/bridge/network-mainnet.svg?url"
import T1Svg from "@/assets/svgs/bridge/network-t1.svg"
import USDTSvg from "@/assets/svgs/bridge/usdt.svg?url"
import { isMainnet, isSepolia } from "@/utils"

import { CHAIN_ID, ETH_SYMBOL, EXPLORER_URL, L1_NAME, L2_NAME, RPC_URL, USDT_SYMBOL, WETH_SYMBOL } from "./common"

export const NETWORKS: Network[] = [
  {
    name: L1_NAME,
    slug: "layer1",
    icon: MainnetSvg,
    rpcUrl: RPC_URL.L1,
    explorer: EXPLORER_URL.L1,
    chainId: CHAIN_ID.L1,
    nativeTokenSymbol: ETH_SYMBOL,
    isL1: true,
  },
  {
    name: L2_NAME,
    slug: "layer2",
    icon: T1Svg,
    rpcUrl: RPC_URL.L2,
    explorer: EXPLORER_URL.L2,
    chainId: CHAIN_ID.L2,
    nativeTokenSymbol: ETH_SYMBOL,
    isL1: false,
  },
]

export const NATIVE_TOKEN_LIST: Token[] = [
  {
    chainId: CHAIN_ID.L1,
    name: "Ether",
    symbol: ETH_SYMBOL,
    decimals: BigInt(18),
    native: true,
    logoURI: ETHSvg.src,
  },
  {
    chainId: CHAIN_ID.L1,
    name: "Wrapped Ether",
    symbol: WETH_SYMBOL,
    decimals: BigInt(18),
    native: false,
    logoURI: ETHSvg.src,
    address: isSepolia ? "0x7b79995e5f793A07Bc00c21412e50Ecae098E7f9" : isMainnet ? "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2" : "",
  },
  {
    chainId: CHAIN_ID.L1,
    name: "USD Tether",
    symbol: USDT_SYMBOL,
    decimals: BigInt(6),
    native: false,
    logoURI: USDTSvg.src,
    address: isSepolia ? "0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0" : isMainnet ? "0xdac17f958d2ee523a2206206994597c13d831ec7" : "",
  },
  {
    chainId: CHAIN_ID.L2,
    name: "Ether",
    symbol: ETH_SYMBOL,
    decimals: BigInt(18),
    native: true,
    logoURI: ETHSvg.src,
  },
  {
    chainId: CHAIN_ID.L2,
    name: "Wrapped Ether",
    symbol: WETH_SYMBOL,
    decimals: BigInt(18),
    native: false,
    logoURI: ETHSvg.src,
    address: process.env.NEXT_PUBLIC_L2_ERC20_WETH_ADDR,
  },
  {
    chainId: CHAIN_ID.L2,
    name: "USD Tether",
    symbol: USDT_SYMBOL,
    decimals: BigInt(6),
    native: false,
    logoURI: USDTSvg.src,
    address: process.env.NEXT_PUBLIC_L2_ERC20_USDT_ADDR,
  },
]
