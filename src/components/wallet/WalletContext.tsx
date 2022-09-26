import { useMemo } from "react";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";

import { TestWalletAdapter } from "../../helpers/TestWalletAdapter";

import "@solana/wallet-adapter-react-ui/styles.css";

function WalletContext(props: any) {
  const network = WalletAdapterNetwork.Mainnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new TestWalletAdapter({
        useRandomPublicKey: false,
        publicKey: "6Yw8u44XnYNoYHqone6FXo5j1jFgJ8JioXU8k6E7wCsP",
      }),
      new TestWalletAdapter({ useRandomPublicKey: true }),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{props.children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default WalletContext;
