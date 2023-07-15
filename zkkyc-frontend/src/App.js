import LandingPage from "./pages/LandingPage";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
    DecryptPermission,
    WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import {useMemo} from "react";

require('@demox-labs/aleo-wallet-adapter-reactui/dist/styles.css');

export default function App() {
    const wallets = useMemo(
        () => [
            new LeoWalletAdapter({
                appName: "zkCheck",
            }),
        ],
        []
    );

    return (
        <WalletProvider
            wallets={wallets}
            decryptPermission={DecryptPermission.UponRequest}
            network={WalletAdapterNetwork.Testnet}
            autoConnect
        >
            <WalletModalProvider>
                <LandingPage/>
            </WalletModalProvider>
        </WalletProvider>
    );
};
