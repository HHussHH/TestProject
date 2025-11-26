import { PositionControl } from "./components/PositionControl/PositionControl"
import { TabBar } from "./components/TabBar/TabBar"
import { TradeTopPanel } from "./components/TradeTopPanel/TradeTopPanel"

function App() {

  return (
    <div>
      <TradeTopPanel/>
      <TabBar>
        <PositionControl/>
      </TabBar>
    </div>
  )
}

export default App
