import { useMemo } from 'react';
import type { CryptoPoint } from '../utils/types';
import type { PriceChange, FormattedPrice } from '../utils/types';
import { formatPrice, calculatePriceChange } from '../utils/utils';

export const usePriceCalculations = (data: CryptoPoint[]) => {
    const currentPrice = data[data.length - 1]?.price || 0;
    const previousPrice = data.length > 1 ? data[data.length - 2].price : null;

    const priceChange = useMemo<PriceChange>(
        () => calculatePriceChange(currentPrice, previousPrice),
        [currentPrice, previousPrice]
    );

    const formattedPrice = useMemo<FormattedPrice>(
        () => formatPrice(currentPrice),
        [currentPrice]
    );

    return {
        currentPrice,
        previousPrice,
        priceChange,
        formattedPrice,
    };
};

