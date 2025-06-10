"use client"

import { useState } from "react"
import ColorControls, { ColorConfig } from "@/components/ColorControls"
import QRPreview from "@/components/QRPreview"

export default function HomePage() {
  const [colorConfig, setColorConfig] = useState<ColorConfig>({
    useGradient: false,
    fgColor: "#000000",
    bgColor: "#ffffff",
    gradient: {
      type: "linear",
      startColor: "#000000",
      endColor: "#ff0000",
    },
    eyeColor: "#000000",
    eyeBorderColor: "#ffffff",
  })

  const [data, setData] = useState("https://example.com")

  return (
    <main className="grid lg:grid-cols-2 gap-10 p-8">
      {/* Left: Controls */}
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">QR Code Generator</h1>

        <label className="form-control">
          <span className="label-text font-semibold">QR Code Data</span>
          <input
            type="text"
            className="input input-bordered"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </label>

        <ColorControls colorConfig={colorConfig} onChange={setColorConfig} />
      </div>

      {/* Right: Live QR Preview */}
      <div className="flex flex-col items-center justify-center">
        <QRPreview data={data} colorConfig={colorConfig} size={300} />
        <p className="text-sm text-gray-500 mt-4">Live preview updates in real-time</p>
      </div>
    </main>
  )
}
