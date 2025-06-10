'use client'

import Image from 'next/image'

type Props = {
    qrCodeData: string
}

export default function QRCodeDisplay({ qrCodeData }: Props) {
    return (
        <div className="flex flex-col items-center gap-4 mt-6">
            <div className="p-4 rounded-lg shadow-lg bg-base-200">
                <Image
                    src={qrCodeData}
                    alt="Generated QR Code"
                    width={192}
                    height={192}
                    unoptimized
                    className="rounded"
                />
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
