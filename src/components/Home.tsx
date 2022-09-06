import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import WalletInfo from "./wallet/WalletInfo";

import "@solana/wallet-adapter-react-ui/styles.css";

function Home() {
  return (
    <>
      <WalletMultiButton />
      <WalletInfo />
    </>
  );
}

export default Home;
