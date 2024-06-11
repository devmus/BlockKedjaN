import { describe, it, beforeEach, expect } from 'vitest';
import Blockchain from '../models/Blockchain.mjs';
import Block from '../models/Block.mjs';

describe('Blockchain', () => {
  let blockchain_1, blockchain_2, originalChain;

  beforeEach(() => {
    blockchain_1 = new Blockchain();
    blockchain_2 = new Blockchain();
    originalChain = [...blockchain_1.chain];
  });

  describe('Properties', () => {
    it('should have a property named chain', () => {
      expect(blockchain_1).toHaveProperty('chain');
    });

    it('should contain an Array', () => {
      expect(blockchain_1.chain instanceof Array).toBeTruthy;
    });

    it('should start with the genesis block', () => {
      expect(blockchain_1.chain.at(0)).toEqual(Block.createGenesis());
    });
  });

  describe('Methods', () => {
    describe('createBlock() function', () => {
      it('should add a new block to the chain', () => {
        const data = 'Transaction B';
        blockchain_1.createBlock({ data });

        expect(blockchain_1.chain.at(-1).data).toEqual(data);
      });
    });

    describe('validateChain() function', () => {
      describe('The genesis block is missing or not the first block in the chain', () => {
        it('should return false', () => {
          blockchain_1.chain[0] = 'CORRUPT';
          expect(Blockchain.isValid(blockchain_1.chain)).toBeFalsy;
        });
      });

      describe('When the chain starts with the genesis block and consists of multiple block', () => {
        beforeEach(() => {
          blockchain_1.createBlock({ data: 'Transaction C' });
          blockchain_1.createBlock({ data: 'Transaction D' });
          blockchain_1.createBlock({ data: 'Transaction E' });
          blockchain_1.createBlock({ data: 'Transaction F' });
          blockchain_1.createBlock({ data: 'Transaction G' });
        });
        describe('and the lastHash has changed', () => {
          it('should return false', () => {
            blockchain_1.chain[1].lastHash = 'CORRUPT';

            expect(Blockchain.isValid(blockchain_1.chain)).toBeFalsy;
          });
        });

        describe('and the chain contains a block with invalid information/data', () => {
          it('should return false', () => {
            blockchain_1.chain.at(1).data = 'CORRUPT';
            expect(Blockchain.isValid(blockchain_1.chain)).toBeFalsy;
          });
        });
      });
    });

    describe('replaceChain() function', () => {
      describe('when the new chain is smaller or the same size', () => {
        it('should not replace the chain', () => {
          blockchain_1.replaceChain(blockchain_2.chain);
          expect(blockchain_1.chain).toEqual(originalChain);
        });
      });

      describe('when the new chain is larger', () => {
        beforeEach(() => {
          blockchain_2.createBlock({ data: 'Transaction 1' });
          blockchain_2.createBlock({ data: 'Transaction 2' });
          blockchain_2.createBlock({ data: 'Transaction 3' });
          blockchain_2.createBlock({ data: 'Transaction 4' });
          blockchain_2.createBlock({ data: 'Transaction 5' });
          blockchain_2.createBlock({ data: 'Transaction 6' });
          blockchain_2.createBlock({ data: 'Transaction 7' });
        });

        describe('but is invalid', () => {
          it('should not replace the chain', () => {
            blockchain_2.chain[2].hash = 'CORRUPT';
            blockchain_1.replaceChain(blockchain_2.chain);
            expect(blockchain_1.chain).toEqual(originalChain);
          });
        });

        describe('and when it is valid', () => {
          beforeEach(() => {
            blockchain_1.replaceChain(blockchain_2.chain);
          });

          it('should replace the chain', () => {
            expect(blockchain_1.chain).toEqual(blockchain_2.chain);
          });
        });
      });
    });
  });
});
