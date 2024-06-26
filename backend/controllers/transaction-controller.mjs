import {
  pubnubServer,
  transactionPool,
  wallet,
  blockchain,
} from '../server.mjs';
import Miner from '../models/Miner.mjs';

export const addTransaction = (req, res, next) => {
  const { amount, recipient } = req.body;

  let transaction = transactionPool.transactionExist({
    address: wallet.publicKey,
  });

  if (transaction) {
    transaction.update({ sender: wallet, recipient, amount });
  } else {
    transaction = wallet.createTransaction({ recipient, amount });
  }

  transactionPool.addTransaction(transaction);
  pubnubServer.broadcastTransaction(transaction);

  res.status(201).json({ sucess: true, statusCode: 201, data: transaction });
};

export const getTransactionPool = (req, res, next) => {
  res.status(200).json({
    sucess: true,
    statusCode: 200,
    data: transactionPool.transactionMap,
  });
};

export const mineTransactions = (req, res, next) => {
  const miner = new Miner({
    blockchain,
    transactionPool,
    wallet,
    pubsub: pubnubServer,
  });

  console.log('A', miner);

  miner.mineTransaction();

  res.status(200).json({ success: true, statusCode: 200, data: 'Funkar' });
};
