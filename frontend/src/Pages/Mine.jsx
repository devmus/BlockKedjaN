import React, { useEffect, useState } from 'react'
import { createBlock } from '../services/blockchain'
import { listTransactions, mine } from '../services/wallet'
import { formatTimestamp, getToken, shortenKey } from '../services/misc';
import { IconPick } from '@tabler/icons-react';
import { Popup } from '../components/Popup';

export const Mine = () => {

  const [newBlock, setNewBlock] = useState(null)
  const [pendingTx, setpendingTx] = useState(null)
  const [displayPopup, setDisplayPopup] = useState("")

  useEffect(() => {
    const showTransactions = async () => {
      
    try {
      const response = await listTransactions();
      if(response.statusCode === 200){
        setpendingTx(Object.values(response.data)[0])
      } else {
        return setDisplayPopup({title: "Error", text: response.error});
      }
    } catch (error) {
      return setDisplayPopup({title: "Error", text: "Server error"});
    }
  }

    showTransactions()
  }, [])

  const handleClick = async () => {

    const token = getToken();
    if (!token || token === "undefined") {
      return setDisplayPopup({title: "Error", text: 'You need to be logged in proceed.'});
    }

    try {
      const response = await mine(token)
      console.log(response);

      if(response.statusCode === 200){
        // setNewBlock(response.data)
        console.log(response.data);
        
      } else {
        alert(`${response.error}`)
        console.log(response.error);
        return;
      }

    } catch (error) {
      return setDisplayPopup({title: "Error", text: "Server error"});
    }
  }

  const formatOutputMap = (data) => {
    if(pendingTx) { 
    const senderAddress = pendingTx.inputMap.address;
    const senderValue = data[senderAddress];
    const formattedData = Object.entries(data)
    const filteredData = formattedData.filter((sender) => sender[0] !== senderAddress)
    
    return (
      <>
        <div>
          <div>Sender: {shortenKey(senderAddress)}, Balance: {senderValue}</div>
        </div>
        {filteredData.map(([key, value], index) => (
        <div key={index}>
          <div>Recipient: {key}, Amount: {value}</div>
        </div>
        ))}
      </>
    )
    }
  }

  return (
    <>
    <main className="mine-wrapper">
      <section className="mine-button">
        <div className="button-control">
          <button onClick={handleClick}><span>Mine</span><IconPick/></button>
        </div>
      </section>

      <section className="pending-transactions">
      {pendingTx &&
          <>
          <h2>Pending transactions</h2>
          <div className="pending">
            <div className="pending-multi">{formatOutputMap(pendingTx.outputMap)}</div>
            <div className="pending-single">Transaction id: {pendingTx.id}</div>
            <div className="pending-single">Timestamp: {formatTimestamp(pendingTx.inputMap.timestamp)}</div>
          </div>
          </>
      }
      </section>

      <section className="latest-block-wrapper">
        {newBlock && ( 
          <>
          <h2>Mined block</h2>
          <div className="latest-block">
            <div>Time: {formatTimestamp(newBlock.timestamp)}</div>
            <div>Hash: {newBlock.hash}</div>
            <div>lastHash: {newBlock.lastHash}</div>
            <div>Amount: {newBlock.data.amount}</div>
            <div>Recipient: {newBlock.data.recipient}</div>
            <div>Nonce: {newBlock.nonce}</div>
            <div>Difficulty: {newBlock.difficulty}</div>
          </div>
          </>
        )}
      </section>
    </main>
      {displayPopup !== "" &&
        <Popup setDisplayPopup={setDisplayPopup} displayPopup={displayPopup}/>
      }
      </>
  )
}
