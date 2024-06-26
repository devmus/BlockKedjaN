import PubNub from 'pubnub';
import dontenv from 'dotenv';

dontenv.config({ path: './config/config.env' });

const CHANNELS = {
  DEMO: 'DEMO',
  BLOCKCHAIN: 'BLOCKCHAIN',
  TRANSACTION: 'TRANSACTION',
};

const credentials = {
  publishKey: process.env.PUB_KEY,
  subscribeKey: process.env.SUB_KEY,
  secretKey: process.env.SECRET_KEY,
  userId: 'cloud-admin',
};

export default class PubNubServer {
  constructor({ blockchain, transactionPool, wallet }) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;

    this.pubnub = new PubNub(credentials);
    this.pubnub.subscribe({ channels: Object.values(CHANNELS) });
    this.pubnub.addListener(this.listener());
  }

  broadcast() {
    this.publish({
      channel: CHANNELS.BLOCKCHAIN,
      message: JSON.stringify(this.blockchain.chain),
    });
  }

  broadcastTransaction(transaction) {
    this.publish({
      channel: CHANNELS.TRANSACTION,
      message: JSON.stringify(transaction),
    });
  }

  listener() {
    return {
      message: (msgObject) => {
        const { channel, message } = msgObject;
        const msg = JSON.parse(message);

        switch (channel) {
          case CHANNELS.BLOCKCHAIN:
            this.blockchain.replaceChain(msg, () => {
              this.transactionPool.clearBlockTransactions({ chain: msg });
            });
            break;
          case CHANNELS.TRANSACTION:
            if (
              !this.transactionPool.transactionExist({
                address: this.wallet.publicKey,
              })
            )
              this.transactionPool.addTransaction(msg);
            break;
          default:
            return;
        }
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}
