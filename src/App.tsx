import { useState } from "react";

import { ConnectWallet } from "./components/wallet/ConnectWallet";

function App() {
  const [publicKey, setPublicKey] = useState("");

  return (
    <div>
      <ConnectWallet setPublicKey={setPublicKey} />
      <p>Public key: {publicKey}</p>
    </div>
  );
}

export default App;
