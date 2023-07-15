import React from 'react';
import logo from "../../resources/1.png";
import {WalletMultiButton} from "@demox-labs/aleo-wallet-adapter-reactui";

const Navbar = () => {
    return (
        <nav className="bg-main-or">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex gap-2">
                        <img className="h-8 w-8" src={logo} alt="Logo"/>
                        <div className={"text-white text-2xl font-bold"}>
                            zkCheck
                        </div>
                    </div>
                    <div className="ml-4 flex items-center md:ml-6">
                        <WalletMultiButton className={"bg-amber-200"}/>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;