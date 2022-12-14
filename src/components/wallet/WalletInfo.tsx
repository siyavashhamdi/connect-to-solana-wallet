import { useWallet } from "@solana/wallet-adapter-react";

import "@solana/wallet-adapter-react-ui/styles.css";
import { SignMessageButton } from "./btn";

function WalletInfo() {
  const { publicKey, connecting, disconnecting, connected } = useWallet();

  return (
    <div>
      <div>
        Is Connecting/Disconnecting:{" "}
        <span>{(connecting || disconnecting).toString()}</span>
      </div>

      <div>
        Is Connected: <span>{connected.toString()}</span>
      </div>

      <div>
        Public Key: <span>{publicKey?.toString() ?? "N/A"}</span>
      </div>

      <hr />

      <div>
        <SignMessageButton />
      </div>
    </div>
  );
}

export default WalletInfo;
