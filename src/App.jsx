
import './App.css'
import Header from "./components/Header"
import Inventory from "./components/Inventory"
import MenuButtons from "./components/MenuButtons"
import NewsTicker from "./components/NewsTicker"
import Notifications from "./components/Notifications"
import UnlockedItems from "./components/UnlockedItems"

export default function App() {
  return (
    <main>
      <Header />
      <Inventory />
      <MenuButtons />
      <NewsTicker />
      <Notifications />
      <UnlockedItems />
    </main>
  )
}
