"use client"

export type GradientType = "linear" | "radial"

export type ColorConfig = {
    useGradient: boolean
    fgColor: string
    bgColor: string
    gradient: {
        type: GradientType
        startColor: string
        endColor: string
    }
    eyeColor: string
    eyeBorderColor: string
}

export default function ColorControls({
    colorConfig,
    onChange,
}: {
    colorConfig: ColorConfig
    onChange: (config: ColorConfig) => void
}) {
    function update<K extends keyof ColorConfig>(key: K, value: ColorConfig[K]) {
        onChange({ ...colorConfig, [key]: value })
    }

    function updateGradient(key: keyof ColorConfig["gradient"], value: string) {
        onChange({
            ...colorConfig,
            gradient: { ...colorConfig.gradient, [key]: value },
        })
    }

    return (
        <div className="space-y-6">
            <div className="form-control">
                <label className="label font-bold">Foreground Color</label>
                <input
                    title="Foreground Color"
                    type="color"
                    value={colorConfig.fgColor}
                    onChange={(e) => update("fgColor", e.target.value)}
                    className="input input-bordered p-1 h-10 w-24"
                />
            </div>

            <div className="form-control">
                <label className="label font-bold">Background Color</label>
                <input
                title="Background Color"
                    type="color"
                    value={colorConfig.bgColor}
                    onChange={(e) => update("bgColor", e.target.value)}
                    className="input input-bordered p-1 h-10 w-24"
                />
            </div>

            <div className="form-control">
                <label className="cursor-pointer label">
                    <span className="label-text font-bold">Use Gradient?</span>
                    <input
                        type="checkbox"
                        className="toggle"
                        checked={colorConfig.useGradient}
                        onChange={(e) => update("useGradient", e.target.checked)}
                    />
                </label>
            </div>

            {colorConfig.useGradient && (
                <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label font-bold">Start Color</label>
                        <input
                            type="color"
                            value={colorConfig.gradient.startColor}
                            onChange={(e) => updateGradient("startColor", e.target.value)}
                            className="input input-bordered p-1 h-10 w-24"
                            title="Start Color"
                        />
                    </div>
                    <div className="form-control">
                        <label className="label font-bold">End Color</label>
                        <input
                            type="color"
                            value={colorConfig.gradient.endColor}
                            onChange={(e) => updateGradient("endColor", e.target.value)}
                            className="input input-bordered p-1 h-10 w-24"
                            title="End Color"
                        />
                    </div>
                    <div className="form-control col-span-2">
                        <label className="label font-bold">Gradient Type</label>
                        <select
                        title="Gradient Type"
                            className="select select-bordered w-full"
                            value={colorConfig.gradient.type}
                            onChange={(e) =>
                                updateGradient("type", e.target.value as GradientType)
                            }
                        >
                            <option value="linear">Linear</option>
                            <option value="radial">Radial</option>
                        </select>
                    </div>
                </div>
            )}

            <div className="divider">Eyes</div>

            <div className="form-control">
                <label className="label font-bold">Eye Fill Color</label>
                <input
                title="Eye Fill Color"
                    type="color"
                    value={colorConfig.eyeColor}
                    onChange={(e) => update("eyeColor", e.target.value)}
                    className="input input-bordered p-1 h-10 w-24"
                />
            </div>

            <div className="form-control">
                <label className="label font-bold">Eye Border Color</label>
                <input
                title="Eye Border Color"
                    type="color"
                    value={colorConfig.eyeBorderColor}
                    onChange={(e) => update("eyeBorderColor", e.target.value)}
                    className="input input-bordered p-1 h-10 w-24"
                />
            </div>
        </div>
    )
}
