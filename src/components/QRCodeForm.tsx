'use client'

type Props = {
    value: string
    onChange: (text: string) => void
    onGenerate: (text: string) => void
}

export default function QRCodeForm({ value, onChange, onGenerate }: Props) {
    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                onGenerate(value)
            }}
            className="space-y-4"
        >
            <label className="form-control w-full">
                <span className="label-text font-medium">QR Code Content</span>
                <input
                    type="text"
                    placeholder="Enter a URL or any text"
                    className="input input-bordered w-full"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            </label>

            <button type="submit" className="btn btn-primary w-full">
                Generate QR Code
            </button>
        </form>
    )
}
