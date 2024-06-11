import { createHash } from '../utilities/crypto-lib.mjs';
import Block from './Block.mjs';

export default class Blockchain {
  constructor() {
    this.chain = [Block.createGenesis()];

    this.memberNodes = [];
  }

  createBlock({ data }) {
    const block = Block.mineBlock(this.chain.at(-1), data);
    this.chain.push(block);
    return block;
  }

  replaceChain(chain) {
    if (chain.length <= this.chain.length) return;

    if (!Blockchain.isValid(chain)) return;

    this.chain = chain;
  }

  static isValid(chain) {
    if (JSON.stringify(chain.at(0)) !== JSON.stringify(Block.createGenesis())) {
      return false;
    }

    for (let i = 1; i < chain.length; i++) {
      const { timestamp, hash, lastHash, data, nonce, difficulty } =
        chain.at(i);

      const prevHash = chain[i - 1].hash;

      if (lastHash !== prevHash) {
        return false;
      }

      const stringToHash = timestamp
        .toString()
        .concat(lastHash, JSON.stringify(data), nonce, difficulty);

      const validHash = createHash(stringToHash);

      if (hash !== validHash) {
        return false;
      }
    }

    return true;
  }
}
