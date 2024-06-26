import { createHash, ellipticHash } from '../utilities/crypto-lib.mjs';
import { INITIAL_BALANCE } from '../utilities/settings.mjs';
import Transaction from './Transaction.mjs';

export default class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ellipticHash.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    return this.keyPair.sign(createHash(data));
  }

  createTransaction({ recipient, amount }) {
    if (amount > this.balance) throw new Error('Not enough funds');

    return new Transaction({ sender: this, recipient, amount });
  }
}
