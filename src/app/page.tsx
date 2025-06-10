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
    <main className="max-w-6xl mx-auto p-4 sm:p-8 grid gap-8 lg:grid-cols-2">
      {/* Left Panel */}
      <section className="card bg-base-100 shadow-md p-6 space-y-6">
        <h1 className="text-2xl sm:text-3xl font-bold">🎨 QR Code Designer</h1>

        <label className="form-control w-full">
          <span className="label-text font-medium">QR Code Content</span>
          <input
            type="text"
            className="input input-bordered w-full"
            value={data}
            onChange={(e) => setData(e.target.value)}
            placeholder="Enter a URL or message"
          />
        </label>

        <ColorControls colorConfig={colorConfig} onChange={setColorConfig} />
      </section>

      {/* Right Panel */}
      <section className="card bg-base-100 shadow-md p-6 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">🔍 Live QR Preview</h2>
        <QRPreview data={data} colorConfig={colorConfig} size={300} />
        <p className="text-sm text-base-content/70 mt-4 text-center">Customize your QR code and preview updates in real-time</p>
      </section>
    </main>
  )
}
