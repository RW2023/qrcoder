'use client';

import { useState } from 'react';
import QRCode from 'qrcode';
import QRCodeForm from '@/components/QRCodeForm';
import QRCodeDisplay from '@/components/QRCodeDisplay';

export default function HomePage() {
  const [text, setText] = useState('');
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);

  const generateQRCode = async (input: string) => {
    if (!input) return;
    try {
      const url = input.startsWith('http://') || input.startsWith('https://')
        ? input
        : `https://${input}`;
      const data = await QRCode.toDataURL(url);
      setQrCodeData(data);
    } catch (err) {
      console.error('QR generation failed:', err);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-12 space-y-6 bg-background text-foreground">
      <div className="max-w-md w-full text-center space-y-2">
        <h1 className="text-3xl font-bold">QR Code Generator</h1>
        <p className="text-sm opacity-80">Paste a URL or text below to generate a QR code instantly.</p>
      </div>

      <div className="w-full max-w-md card bg-base-100 shadow-xl p-6 space-y-4">
        <QRCodeForm
          value={text}
          onChange={setText}
          onGenerate={generateQRCode}
        />
        {qrCodeData && <QRCodeDisplay qrCodeData={qrCodeData} />}
      </div>
    </main>
  );
}
