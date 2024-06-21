import React, { useState } from 'react'
import { createBlock } from '../services/blockchain'

export const Mine = () => {

  const [newBlock, setNewBlock] = useState(null)

  const handleClick = async () => {
    const data = {amount: 1, recipient: "Saylor"}

    const storedLoginInfo = localStorage.getItem('loginInfo');

    if(!storedLoginInfo) {
      alert("You need to be logged in to mine")
      return;
    }

    try {
      const response = await createBlock(data, storedLoginInfo)
      if(response.statusCode === 201){
        setNewBlock(response.data)
      } else {
        alert(`${response.error}`)
        return;
      }
    } catch (error) {
      console.log("!error", error);
    }
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("sv-SE");
  };

  return (
    <main className="mine-wrapper">
      <section className="mine-button">
        <div className="mine-button-container">
          <button className="custom-btn btn-12" onClick={handleClick}><span>Mine!</span><span>Create block</span></button>
        </div>
      </section>

      <section className="pending-transactions">
      1. Visa pending transactions...
      </section>

      <section className="latest-block-wrapper">
        {newBlock && ( 
          <>
          <h2>Latest block</h2>
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
  )
}
