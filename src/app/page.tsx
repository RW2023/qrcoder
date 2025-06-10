'use client';

import { useState } from 'react';
import QRCode from 'qrcode';

export default function HomePage() {
  const [text, setText] = useState('');
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const generateQRCode = async () => {
    if (!text) return;
    try {
      const data = await QRCode.toDataURL(text);
      setQrCodeData(data);
    } catch (err) {
      console.error('Failed to generate QR code', err);
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeData) return;
    const link = document.createElement('a');
    link.href = qrCodeData;
    link.download = 'qrcode.png';
    link.click();
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 space-y-6 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-2">
        <h1 className="text-3xl font-bold">QR Code Generator</h1>
        <p className="text-sm opacity-80">Paste a URL or text below to generate a QR code instantly.</p>
      </div>

      <div className="w-full max-w-md card bg-base-100 shadow-xl p-6 space-y-4">
        <input
          type="text"
          placeholder="Enter a URL or any text"
          className="input input-bordered w-full"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="btn btn-primary w-full" onClick={generateQRCode}>
          Generate QR Code
        </button>

        {qrCodeData && (
          <div className="flex flex-col items-center space-y-2">
            <img src={qrCodeData} alt="Generated QR Code" className="w-48 h-48" />
            <button className="btn btn-outline btn-sm" onClick={downloadQRCode}>
              Download PNG
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
