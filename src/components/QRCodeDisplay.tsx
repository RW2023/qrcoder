'use client'

import Image from 'next/image'

type Props = {
    qrCodeData: string
}

export default function QRCodeDisplay({ qrCodeData }: Props) {
    return (
        <div className="flex flex-col items-center gap-4 mt-6">
            <div className="p-4 rounded-lg shadow-lg bg-base-200 w-full max-w-xs sm:max-w-sm md:max-w-md">
                <div className="relative aspect-square w-full">
                    <Image
                        src={qrCodeData}
                        alt="Generated QR Code"
                        fill
                        sizes="(max-width: 768px) 80vw, 192px"
                        unoptimized
                        className="rounded object-contain"
                    />
                </div>
            </div>
            <button
                className="btn btn-outline btn-sm"
                onClick={() => {
                    const link = document.createElement('a')
                    link.href = qrCodeData
                    link.download = 'qrcode.png'
                    link.click()
                }}
            >
                Download PNG
            </button>
        </div>
    )
}
