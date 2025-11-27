import { useEffect } from "react";
import { CryptoChange } from "./components/CryptoChange/CryptoChange"
import { PositionControl } from "./components/PositionControl/PositionControl"
import { TabBar } from "./components/TabBar/TabBar"
import { TradeTopPanel } from "./components/TradeTopPanel/TradeTopPanel"

function App() {
  useEffect(() => {
    if (typeof window.Telegram !== "undefined") {
      window.Telegram?.WebApp.expand();
      window.Telegram?.WebApp.disableVerticalSwipes();
      window.Telegram?.WebApp.lockOrientation();
      window.Telegram?.WebApp.setHeaderColor("#0D0D0D");
      window.Telegram?.WebApp.setBackgroundColor("#0D0D0D");
      window.Telegram?.WebApp.setBottomBarColor("#0D0D0D");
    }
  }, []);
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
