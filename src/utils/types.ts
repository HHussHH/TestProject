export type CryptoPoint = {
    time: string;
    price: number;
    timestamp: number;
};

export type StepUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month';

export type StepConfig = {
    unit: StepUnit;
    amount: number;
};

export type RangeConfig = {
    points: number;
    step: StepConfig;
    volatility: number;
    labelFormatter: (date: Date) => string;
};

export type PriceChange = {
    rawPercent: number;
    formatted: string;
    classModifier: 'up' | 'down';
};

export type FormattedPrice = {
    intPart: string;
    decimalPart: string | null;
};

