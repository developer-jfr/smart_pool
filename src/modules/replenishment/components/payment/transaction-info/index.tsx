import React from "react";
import { Connection } from "@solana/web3.js";

const txid = 'hJ9XRm4vLfRqZbrcZAtCmCozKx3DzaFmadUvfrwq1Z9cAC7FhLsqUX1UQqCUvLS2bJZfXqNcJGgDuKdrsTh8Pqs';
const endpoint = 'https://hidden-red-fog.solana-devnet.discover.quiknode.pro/9457a60eb563d88e10390034f45840bf49c91c2f/';
const connection = new Connection(endpoint);

const TransactionInfo =  () => {
    let info =  connection.getTransaction(txid).then(res => console.log(res));
  return (
    <div>TransactionInfo</div>
  )
}

export default TransactionInfo