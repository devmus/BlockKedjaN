import PubNub from 'pubnub';
import dontenv from 'dotenv';

dontenv.config({ path: './config/config.env' });

const CHANNELS = {
  DEMO: 'DEMO',
  BLOCKCHAIN: 'BLOCKCHAIN',
};

const credentials = {
  publishKey: process.env.PUB_KEY,
  subscribeKey: process.env.SUB_KEY,
  secretKey: process.env.SECRET_KEY,
  userId: 'cloud-admin',
};

export default class PubNubServer {
  constructor({ blockchain }) {
    this.blockchain = blockchain;

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

  listener() {
    return {
      message: (msgObject) => {
        const { channel, message } = msgObject;
        const msg = JSON.parse(message);
        console.log(msg);
        console.log(
          `Meddelandet mottagits på kanal: ${channel}, meddelande: ${message}`
        );

        if (channel === CHANNELS.BLOCKCHAIN) {
          this.blockchain.replace(msg);
        }
      },
    };
  }

  publish({ channel, message }) {
    this.pubnub.publish({ channel, message });
  }
}
