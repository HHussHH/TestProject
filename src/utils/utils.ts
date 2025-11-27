import type { StepConfig } from './types';
import type { FormattedPrice, PriceChange } from './types';

export const addStep = (date: Date, step: StepConfig, direction = 1): Date => {
    const result = new Date(date.getTime());
    const amount = step.amount * direction;

    switch (step.unit) {
        case 'second':
            result.setSeconds(result.getSeconds() + amount);
            break;
        case 'minute':
            result.setMinutes(result.getMinutes() + amount);
            break;
        case 'hour':
            result.setHours(result.getHours() + amount);
            break;
        case 'day':
            result.setDate(result.getDate() + amount);
            break;
        case 'week':
            result.setDate(result.getDate() + amount * 7);
            break;
        case 'month':
            result.setMonth(result.getMonth() + amount);
            break;
        default:
            break;
    }

    return result;
};

export const formatPrice = (price: number): FormattedPrice => {
    const formatted = price.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const [intPart, decimalPart] = formatted.split('.');
    return {
        intPart,
        decimalPart: decimalPart || null,
    };
};

export const calculatePriceChange = (currentPrice: number, previousPrice: number | null): PriceChange => {
    const rawPercent = previousPrice && previousPrice !== 0 
        ? ((currentPrice - previousPrice) / previousPrice) * 100 
        : 0;
    
    const formatted = `${rawPercent >= 0 ? '+' : ''}${rawPercent.toFixed(2)}%`;
    const classModifier = rawPercent >= 0 ? 'up' : 'down';
    
    return {
        rawPercent,
        formatted,
        classModifier,
    };
};

