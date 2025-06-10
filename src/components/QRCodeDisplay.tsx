'use client';

import Image from 'next/image';

type Props = {
    qrCodeData: string;
};

export default function QRCodeDisplay({ qrCodeData }: Props) {
    const downloadQRCode = () => {
        const link = document.createElement('a');
        link.href = qrCodeData;
        link.download = 'qrcode.png';
        link.click();
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            <Image
                src={qrCodeData}
                alt="Generated QR Code"
                width={192}
                height={192}
                unoptimized
                className="rounded"
            />
            <button className="btn btn-outline btn-sm" onClick={downloadQRCode}>
                Download PNG
            </button>
        </div>
    );
}
