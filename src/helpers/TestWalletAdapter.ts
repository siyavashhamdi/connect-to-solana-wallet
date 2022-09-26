import type {
  SendTransactionOptions,
  WalletName,
} from "@solana/wallet-adapter-base";
import {
  BaseWalletAdapter,
  WalletReadyState,
} from "@solana/wallet-adapter-base";
import type {
  Connection,
  Transaction,
  TransactionSignature,
} from "@solana/web3.js";
import { PublicKey, Keypair } from "@solana/web3.js";

export type TestWalletAdapterInput =
  | { useRandomPublicKey: true }
  | { useRandomPublicKey: false; publicKey: string };

export class TestWalletAdapter extends BaseWalletAdapter {
  private _publicKey: PublicKey;

  readonly supportedTransactionVersions = null;

  url = "https://github.com/solana-labs/wallet-adapter#usage";
  name = "" as WalletName;
  icon = "";

  constructor(input: TestWalletAdapterInput) {
    super();

    let walletName: string;

    if (input.useRandomPublicKey) {
      this._publicKey = new PublicKey(Keypair.generate().publicKey);

      walletName = "Random";

      this.icon =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5gkaDBwfXBgueQAABGZJREFUSMfdlV1sFFUUgL97Z3Zmt9vt9r/blrIURGt/UIjB2kBETTCEBEI0MbyIRhFrog8mxhg08YXExBd5MQZ9UiTGRF4UlCgmVBGIIZY2Wgi1aIFKty10u7ud3fm514ctLVUsVeOLJznJZHLO+eb8DvxfRPwd46dfepNTfecJ2xae56KUR8gMEwQBvV/s+3eQbbte55fh3zBDJq7rM361wq4sz6y3LNUW+MYnCHVJExAKhdBKcfqzt+f5GwsF3/T4K5TUt5LJOmiluTJaZtuW/8DSxsk996xJ7W5rubo1kw1Nftuz8qQVma4xDOkGAcGyjk4unz21MGTzk7spSbQynS+gNQTKtA1DP5hsSu9Zs2p894b1I6vvWJm2nbzJ5KRd1bR0YkuyKftioSDsHw69dTzZ/jUXfzr553KtevgZtBBUWS7ttRo3EBy9FAtHDfd+01A762ryGxsbcjHbDjBNRWN9jqmMRaLOobbaAeDgp81ff3Rg1abVay+6QRDQN9MnA6B09WPEoyVIaSQUPHslq7aN5tgYM/1uU+qXTanv9j1hX5sI43sCy1B4rkHgSUoNH8vXnO6vZjprFuxIPqJlaEgpnU1HkgSpAUyAZKKS+6rG+DEdf27H7T+/1lE5idLFDKUA0PNmRWuKqgQV6QJRx6dZ55B1uqXfqnjj/fO3xdoqU68aVpLefoqQyxOTvPv5o+KhrYeau+pStFakUXpx060pApeUTCOFJmZ5fDzYtGzfgUdExdojGmYgSmlgDI1GaUGgxS0hApBCIwAh5t4Vn7WCau24HrOQoviL3hsB5HyT/olyHN+YdRJCcylXguMbYTqOmM01cX9gPmTxyy+E5uhIA31mF0sTYdDM9lDXQEsht27CybRbhuzln0K0hhV1ks7OBLFoiKsZn4YqC0MKpASlR6t6+qdqr5dczrkafxyjBTKB3hGb4YmAD74ao3vvEAPDDhoIFFim8AwpXKM4mjdmIhcTf1amCpKCp1laa9OajFBWYhS/UcPy+vB4dXloNGLJOYghJdCtQ/K4J8WikgEgV9BsuCtOV1sZpiHI5jVSQN+F6UTqmlsfseXALKSxOs74e8vYP7jiRH00v0Nrccu0OiomOPzNOb4/bTOvzhrOpeQphDF4vcsmwOi1DPKpXzm8vbO9s2ZElsVc9AJ7orSgqy7FnfEePDVnJ4BRJ8w7Iy3Hzm4/M2zuu3euEQXPR4i9IuVYVXl/wes/L2BV2CURzc9qQzSPbWouTEWWGzufFzHtz0HskAm8oAXCV1pgCI1chIqZ/onrKjSBEoBQsEuHLXOuXK3JBKrqCbJBuOfDweVbToxmIjN7s+AUaKC1Ij2ecsLRsbwdlcBQptTJBeFj6zbvJFK5hC+/m4EESjEZlCKlsf/g0JI+pXVczBxacUPAm8mK8vyVcceKZTyjDA0I0mUloTOOsrACNZspAGs2dyOlxPW8mYPJPIO/gjTH84w7IbKuCWiEFNiWhbrJv/4/ld8BUurjr6Nvgl8AAAAldEVYdGRhdGU6Y3JlYXRlADIwMjItMDktMjZUMTI6Mjg6MzArMDA6MDBDRWFnAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDIyLTA5LTI2VDEyOjI4OjMwKzAwOjAwMhjZ2wAAAABJRU5ErkJggg==";
    } else {
      this._publicKey = new PublicKey(input.publicKey);

      walletName = "Predefined";

      this.icon =
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAABmJLR0QA/wD/AP+gvaeTAAAAB3RJTUUH5gkaDBwJqMybKAAABB9JREFUSMftlVtoHGUUx3/nm5ndbLK5dBNpk02XQluNhoraxqBEDFgFH6qU9iEqWrUPIvjgmxRa8b3QF0FEbCv1QSkqRsEbSE21aCw2EoTWXoxJs2lso02ym012Z+c7PuzubDeJYN97Zg7z8V3O/1z+cz64JTchApDJZOju7iaVSnHu3Dny+Xy4QVVR1XAsIqWD5W9lLZFI0N/fz/z8PIODgzUgLsCOHTuwkRg2EmtxGlu2xhtpEBFQJLCBDYqBBtYqqEpJMMaIIFIMijawVoNIw9SGjZtGL164YG90JgRJpVIkHnjcPX/s4BvP1M++1B5Ro7URKyyboWJFFYWfszMzRw+/u2fy8uVvp6fSJJNJRkdHaW1tLYFMTEwwfnYsXr+Y7etoKtY1OSWLwv8TA7RJPllcXHxt67aeTQ1rWgfXrG2f7u/vD9cpFArk8r7UGaXZha+uwngO4g5Sb2qUmIH65epA3EG3R/9+dNfiyNt/Dn/3ettDTzpdXV3VdKkq15as9tTBQBKaPNjSiNzZxPIsCSvzBgItHpzNqu7tLMrQ9UzP9ye+abw/4cyGINZarFpUUd/C7nXlutkV5rQGbpVFVyBiRFRVKsxzK3QsPaWzX8/ApnrYHK8xG47yFkZmYdoHa8EBhucgvQifePBXHmmNSMiwEMQYESnPn55FYwbZHF/p7VIAh640cPGOx2hc18mG1Ho816MdaAfSuRxLH3yI98+kaDxVBTHGYIwCgipsb0PWx1aph6DD12FsyxM0GCVz6jPa7jnAsy/sDTfNz89z8odTDA0N0dnZWWWX4zi4joOUMsa2ZuiIrspWmfEh3raW3IUReubG+fWnUzW+BEEQdoaadHmeR8QzlZ+Z99PovU3IfS0rudQdh09HfyT58E7OpCd4auA5sgs51FpEhLlMliAIxPPcWpBoNEqsLpBKR7pWgIUAXUZZQaGrEZ6fGWbwxFXclnY+PniAj9Qy50NeoYkil34fp2PDRowxVRDXdYm4paxbhac7oNkrGb0BKIzpkdvgQX+MrD8W0vaLq3A+B3uSMKl1jDp30e44VRDf9yn4QbkLgWfKxfovUYi5JS1XVhJ10FxE18Yg6ggFW+3eJowkGi3MFmXxWgGOTSK/zEGgULDgW8S3iK+rqEXUgq9QVGQ6D7MFzeSKNu/7fjWS3t5ePt+/P9PcdfvhVy9NJqaz+foT19H3pqrlkPIrq3VNEZlcQuaKIiezztyUt+ad/OjJhY6BgSrIwsICL778CofeevNo1929X2YKU3VnCkUlG4AqOA54ruA4gkhpDhBjcIwR13OlscGlPuLKmESyf/x2+squnbupRBL6tW/fPhKJBMePHyedThMEQch5x3FwXRdjTM1lVL68cF031EgkQl9fH9lsliNHjnBLblr+BZnSxdKlqokgAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA5LTI2VDEyOjI4OjAyKzAwOjAwWlV3rQAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wOS0yNlQxMjoyODowMiswMDowMCsIzxEAAAAASUVORK5CYII=";
    }

    const walletAddressSummary = `${this._publicKey
      .toString()
      .substring(0, 4)}…${this._publicKey
      .toString()
      .substring(
        this._publicKey.toString().length - 4,
        this._publicKey.toString().length,
      )}`;

    this.name =
      `${walletName} (${walletAddressSummary})` as WalletName<"Test Wallet">;

    console.warn(
      "Your application is presently configured to use the `TestAdapter`. " +
        "Find and remove it, then replace it with a list of adapters for " +
        "wallets you would like your application to support. See " +
        "https://github.com/solana-labs/wallet-adapter#usage for an example.",
    );
  }

  get connecting() {
    return false;
  }

  get publicKey() {
    return this._publicKey;
  }

  get readyState() {
    return WalletReadyState.Installed;
  }

  async connect(): Promise<void> {
    this.emit("connect", this._publicKey);
  }

  async disconnect(): Promise<void> {
    this.emit("disconnect");
  }

  async sendTransaction(
    _transaction: Transaction,
    _connection: Connection,
    _options: SendTransactionOptions = {},
  ): Promise<TransactionSignature> {
    console.debug(
      "TestAdapter: `sendTransaction()` was called. " +
        "Transaction was not actually sent to the network. " +
        "Returning `itsTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest` as the signature.",
    );
    return "itsTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTestTest";
  }
}
