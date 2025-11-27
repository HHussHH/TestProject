import './TabBar.scss';
import Trade from '../../assets/TradeIcon.svg?react';
import TradeActive from '../../assets/TradeActive.svg?react';
import ProfileActive from '../../assets/ProfileActive.svg?react';
import PositionIconActive from '../../assets/PositionIconActive.svg?react';
import Positions from '../../assets/PositionIcon.svg?react';
import Rewards from '../../assets/EggIcon.svg?react';
import Profile from '../../assets/profile.svg?react';
import { useState } from 'react';
export const TabBar = ({children}: {children: React.ReactNode}) => {
    const [activeTab, setActiveTab] = useState('Trade');
    const TABS = [
        {
            icon: <Trade className='TabBar__icon' />,
            activeIcon: <TradeActive className='TabBar__icon-active' />,
            name: 'Trade',
            notification: 0,
            path: '/trade',
        },
        {
            icon: <Positions className='TabBar__icon' />,
            activeIcon: <PositionIconActive className='TabBar__icon-active' />,
            name: 'Positions',
            notification: 0,
            path: '/positions',
        },
        {
            icon: <Rewards className='TabBar__icon' />,
            activeIcon: <Rewards className='TabBar__icon-active' />,
            name: 'Rewards',
            notification: 345290,
            path: '/rewards',
        },
        {
            icon: <Profile className='TabBar__icon' />,
            activeIcon: <ProfileActive className='TabBar__icon-active' />,
            name: 'Profile',
            notification: 0,
            path: '/profile',
        },
    ]
    const notificationParse = (number: number) => Intl.NumberFormat('en-US', {
        notation: 'compact',
        maximumFractionDigits: 2,
    }).format(number).replace('.', ',');
    return (
        <div className='TabBar'>
            {children}
            <ul className='TabBar__list'>
                {TABS.map((tab) => (
                    <li className='TabBar__item' key={tab.name} onClick={() => setActiveTab(tab.name)}>
                        <div className={`TabBar__trade-wrapper ${tab.name === activeTab ? 'TabBar__trade-wrapper-active' : ''}`}>
                            {tab.name === activeTab ? tab.activeIcon : tab.icon}
                        </div>
                        {tab.notification > 0 && <span className='TabBar__notification'>{notificationParse(tab.notification)}</span>}
                        <button className={`TabBar__button ${tab.name === activeTab ? 'TabBar__button-active' : ''}`}>{tab.name}</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}