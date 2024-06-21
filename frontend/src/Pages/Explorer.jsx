import React, { useEffect, useState } from 'react'
import { listBlocks } from '../services/blockchain';
import { IconArrowBigUp, IconArrowUp, IconCirclesRelation, IconDna, IconLink, IconTopologyStarRing3 } from '@tabler/icons-react';

export const Explorer = () => {

  const [blockchain, setBlockchain] = useState(false);
  const [showBlock, setShowBlock] = useState(null);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString("sv-SE");
  };

  useEffect(() => {

    const showBlockchain = async () => {
      const chain = await listBlocks();
      setBlockchain(true);

      if(chain){
        const block = chain.data.map((block, index) => (
          <section key={block.hash}>
        <div className="block">
          <div>Time: {formatTimestamp(block.timestamp)}</div>
          <div>Hash: {block.hash}</div>
          <div>lastHash: {block.lastHash}</div>
          <div>Amount: {block.data.amount}</div>
          <div>Recipient: {block.data.recipient}</div>
          <div>Nonce: {block.nonce}</div>
          <div>Difficulty: {block.difficulty}</div>
        </div>
        <div className="connector-wrapper">
          {index !== 0 ? ( 
          <div className="connector">
            <div><IconDna/></div>
          </div>) : (
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
      <h2>Full view of all the blocks on the chain.</h2>
      <section className="show-blocks">
        {blockchain && <>{showBlock}</>}
      </section>
    </main>
  )
}
