'use client';

type Props = {
    value: string;
    onChange: (text: string) => void;
    onGenerate: (text: string) => void;
};

export default function QRCodeForm({ value, onChange, onGenerate }: Props) {
    return (
        <>
            <input
                type="text"
                placeholder="Enter a URL or any text"
                className="input input-bordered w-full"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <button className="btn btn-primary w-full" onClick={() => onGenerate(value)}>
                Generate QR Code
            </button>
        </>
    );
}
