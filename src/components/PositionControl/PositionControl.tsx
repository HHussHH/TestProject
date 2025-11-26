import './PositionControl.scss';
import SelectArrow from '../../assets/SelectArrow.svg?react';
export const PositionControl = () => {
    return (
        <div className='PositionControl'>
            <div className='PositionControl__panel'>
                <span className='PositionControl__title'>
                Position details
                </span>
               <div className='PositionControl__details-wrapper'>
               <div className='PositionControl__details'>
                    <span className='PositionControl__detail'>Margin $10</span>
                    <span className='PositionControl__detail'>Leverage 10x</span>
                </div>
                <SelectArrow className='PositionControl__select-arrow' />
               </div>
            </div>
            <div className='PositionControl__actions'>
                <button className='PositionControl__btn'>Long</button>
                <button className='PositionControl__btn'>Short</button>
            </div>
        </div>
    )
}