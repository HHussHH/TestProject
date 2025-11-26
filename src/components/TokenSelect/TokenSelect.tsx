import './TokenSelect.scss';
import Bitcoin from '../../assets/Bitcoin.svg?react';
import SelectArrow from '../../assets/SelectArrow.svg?react';
export const TokenSelect = () => {
    return (
        <div className='TokenSelect'>
            <div className='TokenSelect__content'>
                <Bitcoin  className='TokenSelect__logo' />
                <span className='TokenSelect__token'>BTCDEGEN/USDC</span>
                <span className='TokenSelect__multiplier'>100x</span>
                <SelectArrow className='TokenSelect__arrow' />
            </div>
        </div>
    )
}