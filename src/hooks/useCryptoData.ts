import { useState, useEffect, useRef } from 'react';
import type { ChangeCryptoGapValue } from '../components/ChangeCryptoGap/ChangeCryptoGap';
import type { CryptoPoint } from '../utils/types';
import { RANGE_CONFIG, UPDATE_INTERVALS } from '../config/config';
import { generateMockData } from '../utils/dataGenerator';

export const useCryptoData = (activeRange: ChangeCryptoGapValue) => {
    const [data, setData] = useState<CryptoPoint[]>(() => generateMockData('1min'));
    const lastPriceRef = useRef<number>(45000);
    
    // Инициализация данных при смене диапазона
    useEffect(() => {
        const newData = generateMockData(activeRange);
        setData(newData);
        if (newData.length > 0) {
            lastPriceRef.current = newData[newData.length - 1].price;
        }
    }, [activeRange]);

    // Обновление данных в реальном времени
    useEffect(() => {
        const updateInterval = UPDATE_INTERVALS[activeRange];
        
        if (updateInterval === 0) {
            return; // Не обновляем для долгосрочных диапазонов
        }

        const intervalId = setInterval(() => {
            setData((prevData) => {
                const { volatility, labelFormatter, points } = RANGE_CONFIG[activeRange];
                const now = new Date();
                
                // Генерируем новую цену на основе предыдущей
                const change = (Math.random() - 0.5) * volatility;
                const newPrice = Math.max(1000, lastPriceRef.current + change);
                lastPriceRef.current = newPrice;

                // Создаём новую точку
                const newPoint: CryptoPoint = {
                    time: labelFormatter(now),
                    price: Number(newPrice.toFixed(2)),
                    timestamp: now.getTime(),
                };

                // Добавляем новую точку и удаляем старую, если превышен лимит
                const updatedData = [...prevData, newPoint];
                if (updatedData.length > points) {
                    updatedData.shift(); // Удаляем самую старую точку
                }

                return updatedData;
            });
        }, updateInterval);

        return () => clearInterval(intervalId);
    }, [activeRange]);

    return data;
};

