import './styles/App.css';
import twitterLogo from './assets/twitter-logo.svg';
import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
// Used in Section 3
// import myEpicNft from './utils/MyEpicNFT.json';
// Used in Section 4
import myEpicNft from './utils/MyEpicNFTFinal.json'

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TWITTER_HANDLE_AUTHOR = 'alfredobaron';
const TWITTER_LINK_AUTHOR = `https://twitter.com/${TWITTER_HANDLE_AUTHOR}`;
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/squarenft-dzl1pawk1f';
const TOTAL_MINT_COUNT = 50;


// Used in Section 3
//const CONTRACT_ADDRESS = "0x95f06C9859aF38Ce341DeF083428d50eb1bB6aA3";
// Used in Section 4
const CONTRACT_ADDRESS = "0x4f42B52D45595f26747B1DCDBe6f0182Db7cF53A";

// App
const App = () => {
  /*
  * Just a state variable we use to store our user's public wallet. Don't forget to import useState.
  */
  const [currentAccount, setCurrentAccount] = useState("");

  const [mintNFT, setMintNFT] = useState("");
  //const [buttonText, setbuttontxt] = useState["Mint NFT"];
  
  /*
  * Gotta make sure this is async.
  */
  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
    } else {
        console.log("We have the ethereum object", ethereum);
    }

    /*
    * Check if we're authorized to access the user's wallet
    */
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    /*
    * User can have multiple authorized accounts, we grab the first one if its there!
    */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener()
    } else {
      console.log("No authorized account found");
    }
  }

  /*
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }
      /*
      * Fancy method to request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      /*
      * Boom! This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener()
    } catch (error) {
      console.log(error);
    }
  }
  
  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          alert(`Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`)
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }
  

  const askContractToMintNft = async () => {
  
    try {
      const { ethereum } = window;
  
      if (ethereum) {
        setMintNFT(true);
        //setMintNFTtxt("Minning...");
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);
  
        console.log("Going to pop wallet now to pay gas...")
        // Used in Section 3
        //let nftTxn = await connectedContract.makeAnEpicNFTS2();
        // Used in Section 4
        let nftTxn = await connectedContract.makeAnEpicNFTFinal();

        console.log("Mining...please wait.")
        await nftTxn.wait();
        
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

        setMintNFT(false);
        //setMintNFTtxt("Mint NFT");
  
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const openCollection = () => {
    window.open(OPENSEA_LINK,"_blank");
  }

  // Render Methods
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="cta-button connect-wallet-button">
      Connect to Wallet
    </button>
  );

  const renderMintUI = () => (
    <button disabled={mintNFT} onClick={askContractToMintNft} className="cta-button connect-wallet-button">Mint NFT
    </button>
  )

  /*
  * This runs our function when the page loads.
  */
  useEffect(() => {
      checkIfWalletIsConnected();
  })

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">My NFT Collection</p>
          <p className="sub-text">
            Each unique. Each beautiful. Discover your NFT today.
          </p>
          {currentAccount === "" ? renderNotConnectedContainer() : renderMintUI()}
          <button onClick={openCollection} className="cta-button opensea-button">Open Collection in OpenSea
          </button>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built based on course by @${TWITTER_HANDLE}`}</a>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <a
            className="footer-text"
            href={TWITTER_LINK_AUTHOR}
            target="_blank"
            rel="noreferrer"
          >{` created by @${TWITTER_HANDLE_AUTHOR}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
