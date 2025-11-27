import type { ChangeCryptoGapValue } from '../components/ChangeCryptoGap/ChangeCryptoGap';
import type { RangeConfig } from '../utils/types';

export const RANGE_CONFIG: Record<ChangeCryptoGapValue, RangeConfig> = {
    '15s': {
        points: 15,
        step: { unit: 'second', amount: 1 },
        volatility: 25,
        labelFormatter: (date) =>
            date.toLocaleTimeString([], {
                minute: '2-digit',
                second: '2-digit',
            }),
    },
    '1min': {
        points: 60,
        step: { unit: 'second', amount: 1 },
        volatility: 20,
        labelFormatter: (date) =>
            date.toLocaleTimeString([], {
                minute: '2-digit',
                second: '2-digit',
            }),
    },
    '1h': {
        points: 60,
        step: { unit: 'minute', amount: 1 },
        volatility: 50,
        labelFormatter: (date) =>
            date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
    },
    '1d': {
        points: 24,
        step: { unit: 'hour', amount: 1 },
        volatility: 80,
        labelFormatter: (date) =>
            date.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
            }),
    },
    '1m': {
        points: 30,
        step: { unit: 'day', amount: 1 },
        volatility: 120,
        labelFormatter: (date) =>
            date.toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
            }),
    },
    '6m': {
        points: 26,
        step: { unit: 'week', amount: 1 },
        volatility: 150,
        labelFormatter: (date) =>
            date.toLocaleDateString([], {
                month: 'short',
                day: 'numeric',
            }),
    },
    '1y': {
        points: 12,
        step: { unit: 'month', amount: 1 },
        volatility: 200,
        labelFormatter: (date) =>
            date.toLocaleDateString([], {
                month: 'short',
                year: '2-digit',
            }),
    },
};

export const UPDATE_INTERVALS: Record<ChangeCryptoGapValue, number> = {
    '15s': 1000,      // 1 секунда
    '1min': 1000,     // 1 секунда
    '1h': 60000,      // 1 минута
    '1d': 3600000,    // 1 час
    '1m': 0,          // не обновлять в реальном времени
    '6m': 0,          // не обновлять в реальном времени
    '1y': 0,          // не обновлять в реальном времени
};

export const GAP_VARIANTS: { label: string; value: ChangeCryptoGapValue }[] = [
    { label: '15s', value: '15s' },
    { label: '1m', value: '1min' },
    { label: '1h', value: '1h' },
    { label: '1d', value: '1d' },
    { label: '1M', value: '1m' },
];

