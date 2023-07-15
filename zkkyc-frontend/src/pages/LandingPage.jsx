import {useState} from "react";
import {generatePerson} from "../blogic/generator/generate";
import {toAleoArray} from "../blogic/api/execute";
import ToyIDDocument from "./components/id";
import Table from "./components/table";
import RoundLoader from "./components/RoundLoader";
import {Transaction, WalletAdapterNetwork} from "@demox-labs/aleo-wallet-adapter-base";
import {useWallet} from "@demox-labs/aleo-wallet-adapter-react";
import {PROGRAM_FUN, PROGRAM_ID} from "../config";
import Footer from "./components/footer";
import Navbar from "./components/navbar";
import MainContent from "./components/content";
import Flow from "./components/bg";


export default function LandingPage() {

    let [isLoading, setIsLoading] = useState(false)
    let [isFinish, setIsFinish] = useState(false)
    let [passKyc, setPassKyc] = useState(null)
    let [info, setInfo] = useState(generatePerson(true))

    const [isOpen, setIsOpen] = useState(false);

    let [curRecord, setCurRecord] = useState(null)

    const openPopup = () => {
        console.log("Open KYC")
        setIsOpen(true);
    };

    const closePopup = () => {
        setIsOpen(false);
        setPassKyc(null);
        setIsFinish(false);
    };

    function generateInfo(passKyc) {
        setInfo(generatePerson(passKyc))
    }

    const {wallet, publicKey, requestRecords, requestTransaction, transactionStatus} = useWallet();

    function submitKYC() {
        if (!publicKey) {
            console.log("wallet isn't connected")
            return
        }
        if (info === null) {
            console.log("Generate person first")
            return
        }
        setIsLoading(true)
        if (curRecord === null) {
            const program = "credits.aleo";
            if (requestRecords) {
                requestRecords(program).then(records => {
                    for (let record of records) {
                        if (BigInt(record.data.microcredits.replace('u64.private', '')) > 5000000n) {
                            console.log("Record with credits", BigInt(record.data.microcredits.replace('u64.private', '')))
                            setCurRecord(record)
                            sendTx()
                            break
                        }
                    }
                }).catch(e => {
                    console.log(e)
                    setIsLoading(false)
                })
            } else {
                console.log("No request records")
                setIsLoading(false)
            }

        }

    }

    function sendTx() {
        const aleoTransaction = Transaction.createTransaction(
            publicKey,
            WalletAdapterNetwork.Testnet,
            PROGRAM_ID,
            PROGRAM_FUN,
            toAleoArray(info.features),
            10_000
        );
        requestTransaction(aleoTransaction).then(async txId => {
            // let stop = false
            // console.log(txId)
            // while (!stop) {
            //     transactionStatus(txId).then(r => {
            //         console.log(r)
            //         getTransactionsForProgram().then((rr) =>{
            //             console.log(rr)
            //         })
            //         // if (r !== "Queued" && r !== "Generating Transaction") {
            //         //     stop = true
            //         // }
            //     }).catch(err => {
            //         console.log("Get Tx error:", err)
            //         stop = true
            //     })
            //     await new Promise(r => setTimeout(r, 7000));
            // }
            setPassKyc(true)
            setIsLoading(false)
            setIsFinish(true)
        }).catch((e) => {
            console.log("Execute Tx error:", e)
            setIsLoading(false)
            setIsFinish(true)
        })
    }

    return (
        <div className="bg-gradient-to-b from-main-or to-main-orlll min-h-screen">
            <Navbar/>
            {isOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    <>
                        {isLoading || isFinish ? (
                            <div
                                className="bg-white justify-center flex rounded shadow p-6 z-20 w-64 h-32 relative">
                                {isLoading ? (
                                    <RoundLoader/>
                                ) : (
                                    <>
                                        <button
                                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                            onClick={closePopup}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                                 viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                      d="M6 18L18 6M6 6l12 12"/>
                                            </svg>
                                        </button>
                                        {passKyc ? (
                                            <span className={"text-4xl text-green-400 mt-5"}>
                                                 Tx submitted!
                                            </span>
                                        ) : (
                                            <span className={"text-5xl text-red-400 mt-5"}>
                                                Fail!
                                            </span>
                                        )}
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white rounded shadow p-6 z-20 w-2/3 h-3/4 relative">
                                <button
                                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                                    onClick={closePopup}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                                <div className="flex items-center justify-center h-3/5">
                                    <ToyIDDocument
                                        firstName={info.person.firstName}
                                        lastName={info.person.lastName}
                                        country={info.person.country}
                                    />
                                </div>
                                <div className="flex items-center justify-center">
                                    <Table data={info.features} emojiData={info.estimate}/>
                                </div>
                                <div className="flex justify-center mt-5 gap-10">
                                    <button
                                        className="px-4 py-2 text-black font-bold rounded-lg border-2 border-green-400 hover:text-green-400"
                                        onClick={() => generateInfo(true)}
                                    >
                                        Generate normal ID
                                    </button>
                                    <button
                                        className="px-4 py-2 text-black font-bold rounded-lg border-2 border-red-400 hover:text-red-400"
                                        onClick={() => generateInfo(false)}
                                    >
                                        Generate fake ID
                                    </button>
                                </div>
                                <div className="flex justify-center mt-6">
                                    <button
                                        className="px-4 py-2 text-black font-bold rounded-lg border-2 border-black hover:text-gray-400"
                                        onClick={submitKYC}
                                    >
                                        Submit
                                    </button>
                                </div>
                            </div>
                        )}</>
                </div>
            )}
            <MainContent openPopup={openPopup}/>
            <Footer/>
        </div>
    )
}