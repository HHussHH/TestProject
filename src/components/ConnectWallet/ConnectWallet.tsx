import { useState } from 'react';
import './ConnectWallet.scss';
import WalletIcon from "../../assets/Wallet.svg?react";
import CoinIcon from "../../assets/usdc.svg?react";
import SelectArrow from '../../assets/SelectArrow.svg?react';

export const ConnectWallet = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const mockWallerAddress = '0xAbC1234567890abcdef';
    const balance = 15000.00;

    const formatBalance = (amount: number): string => {
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(amount);
    };

    const handleConnect = () => {
        setIsConnected(true);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };


    return (
        <>
            <button className={`ConnectWallet ${isConnected ? 'ConnectWallet--connected' : ''}`} onClick={handleConnect}>
                {isConnected ? (
                    <div className='ConnectWallet__content'>
                        <div className='ConnectWallet__balance-wrapper'>
                        <CoinIcon className='ConnectWallet__coin-icon' />
                        <span className='ConnectWallet__balance'>{formatBalance(balance)}</span>
                        <SelectArrow className='ConnectWallet__arrow' />
                        </div>
                        <div className='ConnectWallet__wallet-wrapper'>
                            <WalletIcon className='ConnectWallet__wallet-icon' />
                        </div>
                    </div>
                ) : (
                    <label className='ConnectWallet__label'>Connect Wallet</label>
                )}
            </button>
            
            {showModal && (
                <div className='ConnectWallet__modal-overlay' onClick={handleCloseModal}>
                    <div className='ConnectWallet__modal' onClick={(e) => e.stopPropagation()}>
                        <div className='ConnectWallet__modal-header'>
                            <h3>Wallet Connected</h3>
                            <button className='ConnectWallet__modal-close' onClick={handleCloseModal}>×</button>
                        </div>
                        <div className='ConnectWallet__modal-content'>
                            <div className='ConnectWallet__modal-info'>
                                <p><strong>Address:</strong> {mockWallerAddress}</p>
                                <p><strong>Status:</strong> Connected</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}