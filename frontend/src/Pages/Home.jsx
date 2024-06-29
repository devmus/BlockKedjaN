import { IconCheckbox } from '@tabler/icons-react'
import React from 'react'
import { API_URL } from '../services/config'

export const Home = () => {

  return (
    <main className="home-wrapper">
      <section className="description-wrapper">
        <h2>Description</h2>
        <div className="description pulsating-box">
        Flowchain is my last project, for the first year, of the Blockchain Development course. It is a 2 year program at Medieinstituet in Stockholm. In the coding journal below I have detailed the steps taken from start to finish of this fullstack project.
        <br/><br/> To play around with this blockchain, you first need to  create an account. After that make a few transactions, mine a couple of blocks and explore the blocks of the blockchain.
        <br/><br/>
        </div>
      </section>
      <h2>Coding journal</h2>
      <section className="roadmap-wrapper">
      <div className="roadmap">
        <div className="box">
          <h3>2024-06-10</h3>
          <ul>
            <li><IconCheckbox /><span> Setup github repo.</span></li>
            <li><IconCheckbox /><span> Prepare backend MEV folder and file structure with Node.js.</span></li>
            <li><IconCheckbox /><span> Prepare frontend folder and file structure with React.js.</span></li>
            <li><IconCheckbox /><span> Prepare design file structure with SASS.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-11</h3>
          <ul>
            <li><IconCheckbox /><span> Choose color theme. </span></li>
            <li><IconCheckbox /><span> Create React Pages.</span></li>
            <li><IconCheckbox /><span> Setup React router and navigation.</span></li>
            <li><IconCheckbox /><span> Setup Pubnub to be able to test run the blockchain with multiple nodes.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-12</h3>
          <ul>
            <li><IconCheckbox /><span> Create Login and Userinfo React components.</span></li>
            <li><IconCheckbox /><span> Prepare user database with MongoDB.</span></li>
            <li><IconCheckbox /><span> Create a mongoose Schema for users.</span></li>
            <li><IconCheckbox /><span> Create backend API functionality to: add user, login, get user, update user-details and change user password.</span></li>
            <li><IconCheckbox /><span> Create a middleware to handle errors centralized in the backend.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-13</h3>
          <ul>
            <li><IconCheckbox /><span> Create Login and Userinfo React components.</span></li>
            <li><IconCheckbox /><span> Prepare user database with MongoDB.</span></li>
            <li><IconCheckbox /><span> Create a mongoose Schema for users.</span></li>
            <li><IconCheckbox /><span> Create backend API functionality to: add user, login, get user, update user-details and change user password.</span></li>
            <li><IconCheckbox /><span> Send JWT-token to logged in user to allow entry to protected functions.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-14</h3>
          <ul>
            <li><IconCheckbox /><span> Create a block model and blockchain model for the backend with TDD (Test Driven Development).</span></li>
            <li><IconCheckbox /><span> Create a genesis block for the blockchain.</span></li>
            <li><IconCheckbox /><span> Create backend functionality for the blockchain to create new blocks.</span></li>
            <li><IconCheckbox /><span> Create backend API functionality to: add blocks and list blocks.</span></li>
            <li><IconCheckbox /><span> Create frontend functionality to mine blocks and display the latest created blocks.</span></li>
            <li><IconCheckbox /><span> Sync the nodes after a block has been mined.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-17</h3>
          <ul>
            <li><IconCheckbox /><span> Protect "Mine" functionality in the frontend and in the backend from being used without being logged in.</span></li>
            <li><IconCheckbox /><span> Create frontend functionality to list and display all blocks on the Explorer Page.</span></li>
            <li><IconCheckbox /><span> Create a mongoose block schema to save mined blocks in MongoDB.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-18</h3>
          <ul>
            <li><IconCheckbox /><span> Create a wallet model for the backend with TDD.</span></li>
            <li><IconCheckbox /><span> Create functionality to add a publicKey to new users that sign up.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-19</h3>
          <ul>
            <li><IconCheckbox /><span> Create a transaction model for the backend with TDD.</span></li>
            <li><IconCheckbox /><span> Create backend API functionality to: add transactions.</span></li>
            <li><IconCheckbox /><span> Create frontend functionality to send a transaction and display a transaction receipt on the Transact Page.</span></li>
            <li><IconCheckbox /><span> Protect "Send" functionality in the frontend and in the backend from being used without being logged in.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-20</h3>
          <ul>
            <li><IconCheckbox /><span> Create a transaction-pool model for the backend with TDD.</span></li>
            <li><IconCheckbox /><span> Create backend functionality for the transaction-pool to gather all pending.</span></li>
            <li><IconCheckbox /><span> Create backend API functionality to: list the transaction-pool.</span></li>
            <li><IconCheckbox /><span> Create frontend functionality to display the transaction-pool on the Mine Page.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-21</h3>
          <ul>
            <li><IconCheckbox /> <span>Improve the transaction-pool model to update a transaction if recpient is already in the transaction-pool and handle sender balance with multiple transactions.</span></li>
            <li><IconCheckbox /> <span>Update the frontend to dynamically display all the recipients in the transaction-pool on the Mine Page.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-24</h3>
          <ul>
            <li><IconCheckbox /> <span>Create a miner model that moves transactions in the pool (pending transactions) into a block when it is mined. (TDD)</span></li>
            <li><IconCheckbox /> <span>Create a reward transaction for the node that has mined the block.</span></li>
            <li><IconCheckbox /> <span>Empty the transactionpool and sync all nodes after a block has been mined.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-25</h3>
          <ul>
            <li><IconCheckbox /> <span>Create a frontend popup component to display errors and more.</span></li>
            <li><IconCheckbox /> <span>Improve error handling for the frontend.</span></li>
            <li><IconCheckbox /> <span>Align HTML elements and their design properties to get a coherent browsing experience of the site.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-26</h3>
          <ul>
            <li><IconCheckbox /> <span>Create a function to read the balance of a wallet address.</span></li>
            <li><IconCheckbox /> <span>Create a function to validate and verify transactions and balances. (TDD)</span></li>
            <li><IconCheckbox /> <span>Create an API endpoint to list the wallet balances.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-27</h3>
          <ul>
            <li><IconCheckbox /> <span>Update all elements that display information from transactions and blocks to include updated functions.</span></li>
            <li><IconCheckbox /> <span>Add design to elements that display transactions and blocks to highlight and divide information.</span></li>
          </ul>
        </div>
        <div className="box">
          <h3>2024-06-28</h3>
          <ul>
            <li><IconCheckbox /> <span>Setup backend security protection against; NoSQL injections, sniffing, cross site scripting, DDOS, HPP.</span></li>
            <li><IconCheckbox /> <span>Add design to elements that display transactions and blocks to highlight and divide information.</span></li>
            <li><IconCheckbox /> <span>Create documentation for API endpoints.</span></li>
          </ul>
        </div>
    </div>
    </section>
    </main>
  )
}
