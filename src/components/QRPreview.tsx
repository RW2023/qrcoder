'use client'

import { useEffect, useRef } from 'react'
import QRCodeStyling, { Options as QRCodeOptions } from 'qr-code-styling'
import type { ColorConfig } from '@/components/ColorControls'

/**
 * QRPreview
 * Renders a live, update-on-change QR code using qr-code-styling.
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

    /** Build QR code options from the color config */
    const buildOptions = (): QRCodeOptions => {
        const {
            fgColor,
            bgColor,
            eyeColor,
            eyeBorderColor,
            useGradient,
            gradient,
        } = colorConfig

        const dotsOptions: QRCodeOptions['dotsOptions'] = useGradient
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

    /** Create QR code instance once on mount */
    useEffect(() => {
        if (!containerRef.current) return
        qrRef.current = new QRCodeStyling(buildOptions())
        qrRef.current.append(containerRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    /** Update QR code on changes */
    useEffect(() => {
        qrRef.current?.update(buildOptions())
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [colorConfig, data, size])

    /** Trigger download */
    const handleDownload = () => {
        qrRef.current?.download({ name: 'qr-code', extension: 'png' })
    }

    return (
        <div className="w-fit rounded-lg shadow-lg bg-base-200 p-4 flex flex-col items-center gap-4">
            <div ref={containerRef} />
            <button onClick={handleDownload} className="btn btn-primary btn-sm">
                Download PNG
            </button>
        </div>
    )
}
