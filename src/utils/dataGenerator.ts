import type { ChangeCryptoGapValue } from '../components/ChangeCryptoGap/ChangeCryptoGap';
import type { CryptoPoint } from './types';
import { RANGE_CONFIG } from '../config/config';
import { addStep } from './utils';

export const generateMockData = (range: ChangeCryptoGapValue): CryptoPoint[] => {
    const { points, step, volatility, labelFormatter } = RANGE_CONFIG[range];
    const data: CryptoPoint[] = [];
    const endTime = new Date();
    const startTime = addStep(endTime, step, -(points - 1));

    let price = 45000;

    for (let i = 0; i < points; i++) {
        const time = addStep(startTime, step, i);
        const change = (Math.random() - 0.5) * volatility;
        price = Math.max(1000, price + change);

        data.push({
            time: labelFormatter(time),
            price: Number(price.toFixed(2)),
            timestamp: time.getTime(),
        });
    }

    return data;
};

