import Home from "./components/Home";
import WalletContext from "./components/wallet/WalletContext";

function App() {
  return (
    <WalletContext>
      <Home />
    </WalletContext>
  );
}

export default App;
