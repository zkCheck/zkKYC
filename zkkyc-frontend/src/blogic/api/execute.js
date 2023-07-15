import {DEFAULT_EXEC_FEE, DEFAULT_PASSWORD, EXEC_NODE_URL, PROGRAM_FUN, PROGRAM_ID} from "../../config";
import axios from "axios";

export function toAleoArray(inputParams) {
    let aleoParams = []
    for (let [i, param] of Object.entries(inputParams)) {
        aleoParams.push(param.toString() + "u32")
    }
    return aleoParams

}

export async function executeTx(inputParams) {
    return (await axios.post(EXEC_NODE_URL + '/execute', {
        "program_id": PROGRAM_ID,
        "program_function": PROGRAM_FUN,
        "inputs": toAleoArray(inputParams),
        "password": DEFAULT_PASSWORD,
        "fee": DEFAULT_EXEC_FEE
    }, {
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Referrer-Policy": "no-referrer"
        }
    })).data
}

// const getClient = (apiUrl) => {
//     const client = new JSONRPCClient((jsonRPCRequest) =>
//         fetch(apiUrl, {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json'
//             },
//             body: JSON.stringify({ ...jsonRPCRequest })
//         }).then((response) => {
//             if (response.status === 200) {
//                 // Use client.receive when you received a JSON-RPC response.
//                 return response.json().then((jsonRPCResponse) => client.receive(jsonRPCResponse));
//             } else if (jsonRPCRequest.id !== undefined) {
//                 return Promise.reject(new Error(response.statusText));
//             }
//         })
//     );
//     return client;
// };

// async function getTransactionsForProgram() {
//     try {
//         let response = await (await fetch("https://vm.aleo.org/api/testnet3/latest/block")).json()
//         let height = response.header.metadata.height
//         console.log(height)
//         const client = getClient("https://testnet3.aleorpc.com");
//         let records = await client.request('records/all', {
//             "end": height,
//             "page": 0,
//             "recordsPerRequest": 100,
//             "start": height - 2
//         });
//         for (let res of records){
//             console.log(res)
//             if (res.program_id === PROGRAM_ID && res.function_name === PROGRAM_FUN){
//                 console.log("YO")
//                 let resp = await (await fetch("https://vm.aleo.org/api/testnet3/transaction/" + res.transaction_id)).json()
//                 return resp
//             }
//         }
//         return null
//     } catch(e){
//         console.log(e.toString())
//         return null
//     }
// }