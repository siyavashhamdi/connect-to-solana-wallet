import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

import { WalletContext } from './WalletContext';

export const ConnectWallet = (props: any) => {
  const WalletInfo = () => {
    const { connected, publicKey } = useWallet();

    if (connected && props.setPublicKey) {
      props.setPublicKey(publicKey?.toString());
    }

    return null;
  };

  return (
    <WalletContext>
      <div>
        <WalletMultiButton></WalletMultiButton>
        <WalletInfo />
      </div>
    </WalletContext>
  );
};
