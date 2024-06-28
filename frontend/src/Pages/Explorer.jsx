import React, { useEffect, useState } from 'react'
import { listBlocks } from '../services/blockchain';
import { IconBox, IconDna, IconSquareChevronsRight, IconTopologyStarRing3 } from '@tabler/icons-react';
import { formatTimestamp, shortenKey } from '../services/misc';

export const Explorer = () => {

  const [blockchain, setBlockchain] = useState(false);
  const [showBlock, setShowBlock] = useState(null);

  const formatLatest = (data) => {

    return (data.map((tx, txIndex) => (
      <React.Fragment key={txIndex}>
        <>
          <div className="blockchain-value">Transaction {txIndex + 1}:</div>
        </>
        <div className="blockchain-value">Sender: {shortenKey(tx.inputMap.address)}</div>
        
        <>
          {Object.entries(tx.outputMap).map(([address, value], index) => {
            const senderAddress = tx.inputMap.address
            if (address !== senderAddress) { 
              return (
              <div className="blockchain-value" key={index}>
                <div>Recipient: {shortenKey(address)}, Amount: {value}</div>
              </div>)}}
            )
          }
        </>
        <br/>
      </React.Fragment>
      )
    ));
  }

  useEffect(() => {

    const showBlockchain = async () => {
      const chain = await listBlocks();
      setBlockchain(true);
      console.log(chain.data);
      if(chain){
        const block = chain.data.map((block, index) => (
          <section key={block.hash}>
          {index !== 0 ? ( 
          <div className="block pulsating-box">
            <h3> <IconBox/> Block data:</h3>
            <div className="blockchain-single">Time: {formatTimestamp(block.timestamp)}</div>
            <div className="blockchain-single">Hash: {block.hash}</div>
            <div className="blockchain-single">lastHash: {block.lastHash}</div>
            <div className="blockchain-single">Nonce: {block.nonce}</div>
            <div className="blockchain-single">Difficulty: {block.difficulty}</div>
            <h3> <IconSquareChevronsRight/>Transactions included in this block:</h3>
            <div className="blockchain-multi">{formatLatest(block.data)}</div>
          </div>
          ) : (
          <div className="block pulsating-box">
            <div className="blockchain-single">Time: {formatTimestamp(block.timestamp)}</div>
            <div className="blockchain-single">Hash: {block.hash}</div>
            <div className="blockchain-single">lastHash: {block.lastHash}</div>
            <div className="blockchain-single">Nonce: {block.nonce}</div>
            <div className="blockchain-single">Difficulty: {block.difficulty}</div>
          </div>
          )}
        <div className="connector-wrapper">
          {index !== 0 ? ( 
          <div className="connector">
            <div><IconDna/></div>
          </div>
          ) : (
          <div className="connector">
            <div><IconTopologyStarRing3/></div>
          </div>
          )}

        </div>
        </section>
        ));
        setShowBlock(block)
      }
    }
    showBlockchain();
  }, [])



  return (
    <main className="explorer-wrapper">
      <h2>Blockchain overview</h2>
      <section className="show-blocks">
        {blockchain && <>{showBlock}</>}
      </section>
    </main>
  )
}
