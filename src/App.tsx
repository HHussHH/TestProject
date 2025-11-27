import { CryptoChange } from "./components/CryptoChange/CryptoChange"
import { PositionControl } from "./components/PositionControl/PositionControl"
import { TabBar } from "./components/TabBar/TabBar"
import { TradeTopPanel } from "./components/TradeTopPanel/TradeTopPanel"

function App() {

  return (
    <div>
      <TradeTopPanel/>
      <CryptoChange/>
      <TabBar>
        <PositionControl/>
      </TabBar>
    </div>
  )
}

export default App
