import { AbiCoder, keccak256, parseEther } from "ethers"
import { useEffect, useState } from "react"

import { Link as LinkIcon } from "@mui/icons-material"
import { Button, Card, CardContent, CardHeader, IconButton, Input, Typography } from "@mui/material"

import { CHAIN_ID, EXPLORER_URL, SCROLL_MESSENGER_ADDR } from "@/constants"
import { useRainbowContext } from "@/contexts/RainbowProvider"

const ORDER_DATA_TYPE_HASH = "0x08d75650babf4de09c9273d48ef647876057ed91d4323f8a2e3ebc2cd8a63b5e"

const padAddress = address => {
  return "0x" + (address.startsWith("0x") ? address.slice(2).padStart(64, "0") : address.padStart(64, "0"))
}

export default function OrderEncoder() {
  const { walletCurrentAddress } = useRainbowContext()
  const [form, setForm] = useState({
    sender: walletCurrentAddress || "",
    recipient: walletCurrentAddress || "",
    inputToken: process.env.NEXT_PUBLIC_L1_ERC20_USDT_ADDR || "",
    outputToken: process.env.NEXT_PUBLIC_L2_ERC20_USDT_ADDR || "",
    amountIn: parseEther("1").toString(),
    amountOut: parseEther("1").toString(),
    senderNonce: Math.floor(Math.random() * 100000),
    originDomain: CHAIN_ID.L1,
    destinationDomain: CHAIN_ID.L2,
    destinationSettler: process.env.NEXT_PUBLIC_L2_T1_7683_PROXY_ADDR || "",
    fillDeadline: Math.floor(Date.now() / 1000 + 24 * 60 * 60).toString(),
    data: "0x",
  })
  const [encodedData, setEncodedData] = useState("")
  const [fillerAddress, setFillerAddress] = useState("0xEe7e4bf5ad67D8d9D0611a664a67d9cc9D716345")

  useEffect(() => {
    if (walletCurrentAddress) {
      if (form.sender === "" || form.recipient === "") {
        setForm({ ...form, sender: walletCurrentAddress, recipient: walletCurrentAddress })
      }
    }
  }, [walletCurrentAddress])

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function encodeOrder() {
    const encoder = AbiCoder.defaultAbiCoder()

    // Encode the order data as a struct
    const orderData = encoder.encode(
      [
        "bytes32", // sender
        "bytes32", // recipient
        "bytes32", // inputToken
        "bytes32", // outputToken
        "uint256", // amountIn
        "uint256", // amountOut
        "uint256", // senderNonce
        "uint32", // originDomain
        "uint32", // destinationDomain
        "bytes32", // destinationSettler
        "uint32", // fillDeadline
        "bytes", // data
      ],
      [
        padAddress(form.sender),
        padAddress(form.recipient),
        padAddress(form.inputToken),
        padAddress(form.outputToken),
        form.amountIn,
        form.amountOut,
        form.senderNonce,
        form.originDomain,
        form.destinationDomain,
        padAddress(form.destinationSettler),
        form.fillDeadline,
        form.data,
      ],
    )

    const dynamicOffsetPrefix = "0x0000000000000000000000000000000000000000000000000000000000000020"
    const finalEncodedData = dynamicOffsetPrefix + orderData.slice(2)
    setEncodedData(finalEncodedData)
  }

  function copyOrderDataToClipboard() {
    navigator.clipboard.writeText(encodedData)
  }

  function copyOrderIdToClipboard() {
    navigator.clipboard.writeText(keccak256(encodedData))
  }

  function copyDataTypeToClipboard() {
    navigator.clipboard.writeText(ORDER_DATA_TYPE_HASH)
  }

  function copyFillDeadlineToClipboard() {
    navigator.clipboard.writeText(form.fillDeadline)
  }

  function copyFillerDataToClipboard() {
    navigator.clipboard.writeText(padAddress(fillerAddress))
  }

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardHeader title="Filler" />
        <CardContent className="p-4 space-y-2">
          <div>
            <label className="block text-sm font-medium">Filler Address</label>
            <Input name="Filler Address" value={fillerAddress} onChange={e => setFillerAddress(e.target.value)} className="w-full" />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader title="Order Encoder" />
        <CardContent className="p-4 space-y-2">
          {Object.keys(form).map(key => (
            <div key={key}>
              <label className="block text-sm font-medium">{key}</label>
              <Input name={key} value={form[key]} onChange={handleChange} className="w-full" />
            </div>
          ))}
          <Button onClick={encodeOrder} className="w-full mt-2" disabled={Object.values(form).some(value => !value)}>
            Encode Order
          </Button>
        </CardContent>
      </Card>

      {encodedData && (
        <div className="p-6 space-y-4">
          <Card>
            <CardHeader
              title="Open Intent"
              action={
                <a
                  href={`${EXPLORER_URL.L1}/address/${process.env.NEXT_PUBLIC_L1_T1_7683_PROXY_ADDR}#writeProxyContract#F5`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton sx={{ border: "2px solid #0AECC3" }}>
                    <LinkIcon />
                  </IconButton>
                </a>
              }
            />
            <CardContent className="p-4">
              <Typography>fillDeadline</Typography>
              <div className="break-all text-sm font-mono">{form.fillDeadline}</div>
              <Button onClick={copyFillDeadlineToClipboard} className="mt-2">
                Copy to Clipboard
              </Button>
            </CardContent>
            <CardContent className="p-4">
              <Typography>orderDataType</Typography>
              <div className="break-all text-sm font-mono">{ORDER_DATA_TYPE_HASH}</div>
              <Button onClick={copyDataTypeToClipboard} className="mt-2">
                Copy to Clipboard
              </Button>
            </CardContent>
            <CardContent className="p-4">
              <Typography>orderData</Typography>
              <div className="break-all text-sm font-mono">{encodedData}</div>
              <Button onClick={copyOrderDataToClipboard} className="mt-2">
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              title="Fill Intent"
              action={
                <a
                  href={`${EXPLORER_URL.L2}/address/${process.env.NEXT_PUBLIC_L2_T1_7683_PROXY_ADDR}?tab=read_write_proxy&source_address=${process.env.NEXT_PUBLIC_L2_T1_7683_IMPLEMENTATION_ADDR}#0x82e2c43f`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton sx={{ border: "2px solid #0AECC3" }}>
                    <LinkIcon />
                  </IconButton>
                </a>
              }
            />
            <CardContent className="p-4">
              <Typography>orderID</Typography>
              <div className="break-all text-sm font-mono">{keccak256(encodedData)}</div>
              <Button onClick={copyOrderIdToClipboard} className="mt-2">
                Copy to Clipboard
              </Button>
            </CardContent>
            <CardContent className="p-4">
              <Typography>originData</Typography>
              <div className="break-all text-sm font-mono">{encodedData}</div>
              <Button onClick={copyOrderDataToClipboard} className="mt-2">
                Copy to Clipboard
              </Button>
            </CardContent>
            <CardContent className="p-4">
              <Typography>fillerData</Typography>
              <div className="break-all text-sm font-mono">{padAddress(fillerAddress)}</div>
              <Button onClick={copyFillerDataToClipboard} className="mt-2">
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              title="Settle Intent"
              action={
                <a
                  href={`${EXPLORER_URL.L2}/address/${process.env.NEXT_PUBLIC_L2_T1_7683_PROXY_ADDR}?tab=read_write_proxy&source_address=${process.env.NEXT_PUBLIC_L2_T1_7683_IMPLEMENTATION_ADDR}#0xe7f921a2`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton sx={{ border: "2px solid #0AECC3" }}>
                    <LinkIcon />
                  </IconButton>
                </a>
              }
            />
            <CardContent className="p-4">
              <Typography>orderID</Typography>
              <div className="break-all text-sm font-mono">{keccak256(encodedData)}</div>
              <Button onClick={copyOrderIdToClipboard} className="mt-2">
                Copy to Clipboard
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader
              title="View User Fulfillment"
              action={
                <a href={`${EXPLORER_URL.L2}/address/${form.recipient}?tab=token_transfers`} target="_blank" rel="noopener noreferrer">
                  <IconButton sx={{ border: "2px solid #0AECC3" }}>
                    <LinkIcon />
                  </IconButton>
                </a>
              }
            />
          </Card>
          <Card>
            <CardHeader
              title="View Filler Settlement"
              action={
                <a href={`${EXPLORER_URL.L1}/address/${fillerAddress}#tokentxns`} target="_blank" rel="noopener noreferrer">
                  <IconButton sx={{ border: "2px solid #0AECC3" }}>
                    <LinkIcon />
                  </IconButton>
                </a>
              }
            />
          </Card>
          <Card>
            <CardHeader
              title="View Real-Time Prover"
              action={
                <a href={`${EXPLORER_URL.L1}/address/${SCROLL_MESSENGER_ADDR[CHAIN_ID.L1]}`} target="_blank" rel="noopener noreferrer">
                  <IconButton sx={{ border: "2px solid #0AECC3" }}>
                    <LinkIcon />
                  </IconButton>
                </a>
              }
            />
          </Card>
        </div>
      )}
    </div>
  )
}
