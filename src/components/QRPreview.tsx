"use client"

import { useEffect, useRef } from "react"
import QRCodeStyling, {
    Options as QRCodeOptions,
} from "qr-code-styling"
import type { ColorConfig } from "@/components/ColorControls"

/**
 * QRPreview
 * Renders a live, update‑on‑change QR code using qr-code-styling.
 */
export default function QRPreview({
    data,
    size = 300,
    colorConfig,
}: {
    data: string
    size?: number
    colorConfig: ColorConfig
}) {
    const containerRef = useRef<HTMLDivElement>(null)
    const qrRef = useRef<QRCodeStyling | null>(null)

    /* ---------------- build options from colorConfig --------------- */
    const buildOptions = (): QRCodeOptions => {
        const {
            fgColor,
            bgColor,
            eyeColor,
            eyeBorderColor,
            useGradient,
            gradient,
        } = colorConfig

        const dotsOptions: QRCodeOptions["dotsOptions"] = useGradient
            ? {
                gradient: {
                    type: gradient.type,
                    rotation: 0,
                    colorStops: [
                        { offset: 0, color: gradient.startColor },
                        { offset: 1, color: gradient.endColor },
                    ],
                },
            }
            : { color: fgColor }

        return {
            width: size,
            height: size,
            data,
            dotsOptions,
            backgroundOptions: { color: bgColor },
            cornersSquareOptions: { color: eyeBorderColor },
            cornersDotOptions: { color: eyeColor },
        }
    }

    /* ---------------- create once ---------------- */
    useEffect(() => {
        if (!containerRef.current) return
        qrRef.current = new QRCodeStyling(buildOptions())
        qrRef.current.append(containerRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /* ---------------- update on change ---------------- */
    useEffect(() => {
        qrRef.current?.update(buildOptions())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colorConfig, data, size])

    return (
        <div
            ref={containerRef}
            className="rounded-lg shadow-md bg-base-100 flex items-center justify-center"
        />
    )
}

/* ---------------------------------------------------
 * Helper: call qrRef.current?.download() elsewhere
 * ------------------------------------------------- */
export function downloadQRCode(
    qr: QRCodeStyling | null,
    name = "qr-code",
    ext: "png" | "svg" | "jpeg" = "png"
) {
    qr?.download({ name, extension: ext })
}
