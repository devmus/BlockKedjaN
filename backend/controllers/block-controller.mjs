import BlockSchema from '../models/BlockModel.mjs';
import Block from '../models/Block.mjs';
import { blockchain, pubnubServer } from '../server.mjs';

export const addBlock = async (req, res, next) => {
  const data = req.body;

  const block = blockchain.createBlock({ data });

  pubnubServer.broadcast();

  const { hash, lastHash, nonce, difficulty } = block;
  const timestamp = Date.now(block.timestamp);
  const tx = Object.entries(block.data);

  await BlockSchema.create({
    hash,
    lastHash,
    nonce,
    difficulty,
    timestamp,
    tx,
  });

  res.status(201).json({ success: true, statusCode: 201, data: block });
};
