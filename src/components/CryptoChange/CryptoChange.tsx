import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import './CryptoChange.scss';
import { ChangeCryptoGap } from '../ChangeCryptoGap/ChangeCryptoGap';
import type { ChangeCryptoGapValue } from '../ChangeCryptoGap/ChangeCryptoGap';
import HeartIcon from "../../assets/HeartIcon.svg?react";
import SettingIcon from "../../assets/SettingIcon.svg?react";
import { useCryptoData } from '../../hooks/useCryptoData';
import { usePriceCalculations } from '../../hooks/usePriceCalculations';
import { GAP_VARIANTS } from '../../config/config';

export const CryptoChange = () => {
    const [activeRange, setActiveRange] = useState<ChangeCryptoGapValue>('1min');
    const data = useCryptoData(activeRange);
    const { priceChange, formattedPrice } = usePriceCalculations(data);

    return (
        <div className='CryptoChange'>
            <div className='CryptoChange__header'>
              <div className='CryptoChange__column'>
              <span className='CryptoChange__price'>
                    {formattedPrice.intPart}
                    {formattedPrice.decimalPart ? (
                        <span className='CryptoChange__price-decimal'>.{formattedPrice.decimalPart}</span>
                    ) : null}
                </span>
                <span className={`CryptoChange__change CryptoChange__change-${priceChange.classModifier}`}>
                    {priceChange.formatted}
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
                    
                        <XAxis
                            dataKey="time" 
                            tickMargin={4}
                            stroke="rgba(129, 139, 166, 0.2)"
                            tick={{ fill: 'rgba(255, 255, 255, 0.5)', fontSize: 10 }}
                            tickFormatter={(value,idx) => { if(idx === 0) return ''; return value; }}
                            interval={Math.max(1, Math.floor(data.length / 6))}
                        />
                        <YAxis 
                            yAxisId="price"
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
                            yAxisId="price"
                            stroke="rgba(236, 189, 117, 1)" 
                            strokeWidth={2}
                            dot={false}
                            activeDot={{ r: 4, fill: 'rgb(255, 255, 255)' }}
                            isAnimationActive={false}
                        >  
                        </Line>
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