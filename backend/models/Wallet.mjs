import { createHash, ellipticHash } from '../utilities/crypto-lib.mjs';
import { INITIAL_BALANCE } from '../utilities/settings.mjs';

export default class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ellipticHash.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    return this.keyPair.sign(createHash(data));
  }
}
