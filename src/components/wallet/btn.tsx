import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import { FC, useCallback, useState } from "react";
import { sign } from "tweetnacl";

export const SignMessageButton: FC = () => {
  const { publicKey, signMessage } = useWallet();

  const [message, setMessage] = useState("");
  const [signature, setSignature] = useState<string>();

  const onClick = useCallback(async () => {
    try {
      // `publicKey` will be null if the wallet isn't connected
      if (!publicKey) {
        throw new Error("Wallet not connected!");
      }

      // `signMessage` will be undefined if the wallet doesn't support it
      if (!signMessage) {
        throw new Error("Wallet does not support message signing!");
      }

      const encodedMessage = new TextEncoder().encode(message);

      // Sign the bytes using the wallet
      const signature = await signMessage(encodedMessage);

      setSignature(bs58.encode(signature));

      // Verify that the bytes were signed using the private key that matches the known public key
      if (
        !sign.detached.verify(encodedMessage, signature, publicKey.toBytes())
      ) {
        throw new Error("Invalid signature!");
      }
    } catch (error: any) {
      alert(`Signing failed: ${error?.message}`);
    }
  }, [publicKey, message, signMessage]);

  console.log({ signature });

  return signMessage ? (
    <div>
      <textarea
        style={{ width: "800px" }}
        value={message}
        onChange={(ev) => setMessage(ev.target.value)}
      />
      <br />
      <button onClick={onClick} disabled={!publicKey}>
        Sign Message
      </button>
      <div>
        Signature: <span>{signature ?? "N/A"}</span>
      </div>
    </div>
  ) : null;
};
