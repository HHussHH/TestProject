import "./ChangeCryptoGap.scss";

export type ChangeCryptoGapValue = "15s" | "1min" | "1h" | "1d" | "1m" | "6m" | "1y";

interface IChangeCryptoGapProps {
    variants: {
        label: string;
        value: ChangeCryptoGapValue;
    }[];
    value: ChangeCryptoGapValue;
    onChange: (value: ChangeCryptoGapValue) => void;
}

export const ChangeCryptoGap = ({ variants, value, onChange }: IChangeCryptoGapProps) => {
    return (
        <div className='ChangeCryptoGap'>
            <ul className='ChangeCryptoGap__list'>
                {variants.map((variant) => (
                    <li
                        className={`ChangeCryptoGap__item ${
                            value === variant.value ? "ChangeCryptoGap__item-active" : ""
                        }`}
                        key={variant.value}
                        onClick={() => onChange(variant.value)}
                    >
                        <span className='ChangeCryptoGap__label'>{variant.label.toUpperCase()}</span>
                    </li>
                ))}
            </ul>
            <ul className='ChangeCryptoGap__indicator'>
                {variants.map((variant) => (
                    <li
                        className={`ChangeCryptoGap__indicator__item ${
                            value === variant.value ? "ChangeCryptoGap__indicator__item-active" : ""
                        }`}
                        key={variant.value}
                    >
                    </li>
                ))}
            </ul>
        </div>
    );
};