import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './CryptoChange.scss';
import { ChangeCryptoGap } from '../ChangeCryptoGap/ChangeCryptoGap';
import type { ChangeCryptoGapValue } from '../ChangeCryptoGap/ChangeCryptoGap';
import HeartIcon from "../../assets/HeartIcon.svg?react";
import SettingIcon from "../../assets/SettingIcon.svg?react";
type CryptoPoint = {
    time: string;
    price: number;
    timestamp: number;
};

type StepUnit = 'second' | 'minute' | 'hour' | 'day' | 'week' | 'month';

type StepConfig = {
    unit: StepUnit;
    amount: number;
};

const RANGE_CONFIG: Record<
    ChangeCryptoGapValue,
    { points: number; step: StepConfig; volatility: number; labelFormatter: (date: Date) => string }
> = {
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

const addStep = (date: Date, step: StepConfig, direction = 1) => {
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

const generateMockData = (range: ChangeCryptoGapValue): CryptoPoint[] => {
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

const GAP_VARIANTS: { label: string; value: ChangeCryptoGapValue }[] = [
    { label: '15s', value: '15s' },
    { label: '1m', value: '1min' },
    { label: '1h', value: '1h' },
    { label: '1d', value: '1d' },
    { label: '1M', value: '1m' },
];

export const CryptoChange = () => {
    const [activeRange, setActiveRange] = useState<ChangeCryptoGapValue>('1min');
    const data = useMemo(() => generateMockData(activeRange), [activeRange]);
    const currentPrice = data[data.length - 1]?.price || 0;
    const previousPrice = data.length > 1 ? data[data.length - 2].price : null;
    const rawPercentChange =
        previousPrice && previousPrice !== 0 ? ((currentPrice - previousPrice) / previousPrice) * 100 : 0;
    const formattedPercentChange = `${rawPercentChange >= 0 ? '+' : ''}${rawPercentChange.toFixed(2)}%`;
    const changeClassModifier = rawPercentChange >= 0 ? 'up' : 'down';
    const formattedPrice = currentPrice.toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });
    const [priceIntPart, priceDecimalPart] = formattedPrice.split('.');

    return (
        <div className='CryptoChange'>
            <div className='CryptoChange__header'>
              <div className='CryptoChange__column'>
              <span className='CryptoChange__price'>
                    {priceIntPart}
                    {priceDecimalPart ? (
                        <span className='CryptoChange__price-decimal'>.{priceDecimalPart}</span>
                    ) : null}
                </span>
                <span className={`CryptoChange__change CryptoChange__change-${changeClassModifier}`}>
                    {formattedPercentChange}
                </span>
              </div>
              <div className='CryptoChange__column'>
                <button className='CryptoChange__button'><HeartIcon/></button>
                <button className='CryptoChange__button'><SettingIcon/></button>
              </div>
            </div>
            <div className='CryptoChange__chart'>
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data} margin={{ top: 12, right: 12, bottom: 10, left: 0 }}>
                        <defs>
                            <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="rgba(236, 189, 117, 0.1)" />
                                <stop offset="100%" stopColor="rgba(236, 189, 117, 0)" />
                            </linearGradient>
                        </defs>
                        <XAxis
                            dataKey="time" 
                            tickMargin={4}
                            stroke="rgba(129, 139, 166, 0.2)"
                            tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 10 }}
                            tickFormatter={(value,idx) => { if(idx === 0) return ''; return value; }}
                            interval={Math.max(1, Math.floor(data.length / 6))}
                        />
                        <YAxis 
                            orientation="right"
                            stroke="rgba(129, 139, 166, 0.2)"
                            strokeWidth={1}
                            fontSize={400}
                            tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 10 }}
                            tickMargin={4}
                            domain={['dataMin - 100', 'dataMax + 100']}
                            tickFormatter={(value) => `${value.toLocaleString()}`}
                        />

                        <Tooltip
                            wrapperStyle={{ zIndex: 100 }}
                             
                                cursor={{ 
                                    display: 'none',
                                
                                }}
                            
                                labelFormatter={() => ''}
                            contentStyle={{ 
                                backgroundColor: 'rgba(151, 252, 166, 1)', 
                                border: 'none',
                                borderRadius: '4px',
                                fontSize:"10px",
                                zIndex:100,
                                fontFamily:"Roboto",
                                fontWeight:"400",
                                padding:"0px 4px 0 8px",
                                color: 'rgb(0, 0, 0,1)'
                            
                            }}
                            formatter={(value: number) => [`${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`]}
                        />
                         
                        <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke="rgba(236, 189, 117, 1)" 
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: 'rgb(255, 255, 255)' }}
                            isAnimationActive={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
                <ul className='CryptoChange-comment'>
                <li className='CryptoChange-comment__item'>
                    <div className='CryptoChange-comment__item-header'>
                    <span className='CryptoChange-comment__username'>Dany</span>
                    <span className='CryptoChange-comment__time'>Today at 12:32</span>
                    </div>
                    <span className='CryptoChange-comment__value'>Opened Long 10X</span>
                </li>
                <li className='CryptoChange-comment__item'>
                    <div className='CryptoChange-comment__item-header'>
                    <span className='CryptoChange-comment__username CryptoChange-comment__username-last'>Gabriel</span>
                    <span className='CryptoChange-comment__time'>Today at 12:45</span>
                    </div>
                    <span className='CryptoChange-comment__value'>Opened Short 100X</span>
                </li>
                </ul>
              
                <ChangeCryptoGap variants={GAP_VARIANTS} value={activeRange} onChange={setActiveRange} />
            </div>
        </div>
    );
};