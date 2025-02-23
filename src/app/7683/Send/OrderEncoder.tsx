import { AbiCoder, keccak256 } from "ethers"
import { useState } from "react"

import { Link as LinkIcon } from "@mui/icons-material"
import { Button, Card, CardContent, CardHeader, IconButton, Input, Typography } from "@mui/material"

const ORDER_DATA_TYPE_HASH = "0x08d75650babf4de09c9273d48ef647876057ed91d4323f8a2e3ebc2cd8a63b5e"

const fillerAddress = "0xEe7e4bf5ad67D8d9D0611a664a67d9cc9D716345"

export default function OrderEncoder() {
  const [form, setForm] = useState({
    sender: "0xa3e5e908868E2D881E70c304C18636A2f43E933f",
    recipient: "0xa3e5e908868E2D881E70c304C18636A2f43E933f",
    inputToken: "0x30E9b6B0d161cBd5Ff8cf904Ff4FA43Ce66AC346",
    outputToken: "0x337bE36E710f7af68E1fD3DDd48070Cecc5Bb136",
    amountIn: "1000000000000000000",
    amountOut: "1000000000000000000",
    senderNonce: Math.floor(Math.random() * 100000),
    originDomain: "11155111", // Sepolia
    destinationDomain: "3151908", // t1 devnet
    destinationSettler: "0x16222661ff15e823b90f63024Eb891C7d30dc21b",
    fillDeadline: Math.floor(Date.now() / 1000 + 886400).toString(),
    data: "0x",
  })
  const [encodedData, setEncodedData] = useState("")

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const padAddress = address => {
    return address.startsWith("0x") ? address.slice(2).padStart(64, "0") : address.padStart(64, "0")
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
        "0x" + padAddress(form.sender), // sender (padded)
        "0x" + padAddress(form.recipient), // recipient (padded)
        "0x" + padAddress(form.inputToken), // inputToken (padded)
        "0x" + padAddress(form.outputToken), // outputToken (padded)
        form.amountIn,
        form.amountOut,
        form.senderNonce,
        form.originDomain,
        form.destinationDomain,
        "0x" + padAddress(form.destinationSettler), // destinationSettler (padded)
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
    navigator.clipboard.writeText("0x" + padAddress(fillerAddress))
  }

  return (
    <div className="p-6 space-y-4">
      <Card>
        <CardContent className="p-4 space-y-2">
          {Object.keys(form).map(key => (
            <div key={key}>
              <label className="block text-sm font-medium">{key}</label>
              <Input name={key} value={form[key]} onChange={handleChange} className="w-full" />
            </div>
          ))}
          <Button onClick={encodeOrder} className="w-full mt-2">
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
                  href="https://sepolia.etherscan.io/address/0xcE90091836B14D1Ebc50d860E5e080Ea1465627b#writeProxyContract#F5"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton>
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
                  href="https://explorer.devnet.t1protocol.com/address/0x16222661ff15e823b90f63024Eb891C7d30dc21b?tab=read_write_proxy&source_address=0x1D0dBA3F23Bf0b2653a23363245528635dDe0eaA#0x82e2c43f"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton>
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
              <div className="break-all text-sm font-mono">{"0x" + padAddress(fillerAddress)}</div>
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
                  href="https://explorer.devnet.t1protocol.com/address/0x16222661ff15e823b90f63024Eb891C7d30dc21b?tab=read_write_proxy&source_address=0x1D0dBA3F23Bf0b2653a23363245528635dDe0eaA#0xe7f921a2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton>
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
                <a
                  href="https://explorer.devnet.t1protocol.com/address/0xa3e5e908868E2D881E70c304C18636A2f43E933f?tab=token_transfers"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton>
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
                <a
                  href="https://sepolia.etherscan.io/address/0xEe7e4bf5ad67D8d9D0611a664a67d9cc9D716345#tokentxns"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton>
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
                <a href="https://sepolia.etherscan.io/address/0x30622442e5421c49a8f89e871bf37d55f8755b0e" target="_blank" rel="noopener noreferrer">
                  <IconButton>
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
