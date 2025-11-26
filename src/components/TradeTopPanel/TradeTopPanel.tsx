import { ConnectWallet } from '../ConnectWallet/ConnectWallet';
import { TokenSelect } from '../TokenSelect/TokenSelect';
import './TradeTopPanel.scss';

export const TradeTopPanel = () => {
    return (
        <div className='TradeTopPanel'>
            <TokenSelect/>
            <ConnectWallet/>
        </div>
    )
}