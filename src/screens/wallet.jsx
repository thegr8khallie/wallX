import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import algosdk from "algosdk";
import logo from "../assets/imgs/icon.png";

export const Wallet = () => {
  localStorage.removeItem("newUser");
  const userObject = JSON.parse(localStorage.getItem("user"));
  const availableAccounts = JSON.parse(localStorage.getItem("user")).accounts;
  const [walletState, setWalletState] = useState(availableAccounts);
  const [sendButton, setSendButton] = useState({
    value: "Send",
    isFormOpen: false,
  });
  const [recieveButton, setRecieveButton] = useState({
    value: "Recieve",
  });
  const [addressField, setAddressField] = useState("");
  const [tokenField, setTokenField] = useState("");
  const baseUrl = "https://node.testnet.algoexplorerapi.io/";
  const setActiveHandler = (id) => {
    setWalletState(
      walletState.map((e, f) => {
        return f === id
          ? { ...e, isActive: false ? true : true }
          : { ...e, isActive: true ? false : false };
      })
    );
  };
  //Update Wallet Balances
  useEffect(() => {
    walletState.map((e) => {
      axios.get(`${baseUrl}v2/accounts/${e.address}`).then((res) => {
        setWalletState(
          walletState.map((i) => {
            return (
              i.isActive && {
                ...e,
                balance: algosdk.microalgosToAlgos(res.data.amount),
              }
            );
          })
        );
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...userObject,
            accounts: [...walletState],
          })
        );
      });
    });
  }, []);
  //Copy Address
  useEffect(() => {
    document.body.addEventListener("click", (e) => {
      if (e.target.classList.contains("recieve-btn")) {
        setRecieveButton({ value: "Address Copied!" });
        const textToBeCopied = walletState.map((e) => {
          return e.isActive && e.address;
        });
        navigator.clipboard.writeText(textToBeCopied);
        setTimeout(() => {
          setRecieveButton({ value: "Recieve" });
        }, 3000);
      }
    });
  }, []);

  localStorage.setItem(
    "user",
    JSON.stringify({
      ...userObject,
      accounts: [...walletState],
    })
  );
  const revealFormHandler = () => {
    setSendButton({
      value: !sendButton.isFormOpen ? "Close Form" : "Send",
      isFormOpen: !sendButton.isFormOpen,
    });
  };
  const sendTokensHandler = (e) => {
    e.preventDefault();
    if (tokenField === "" || addressField === "") {
      alert("Please Fill the required fields and Try Again");
    } else {
      const transaction = async () => {
        //Client Parameters
        const algodToken =
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
        const algodServer = "https://node.testnet.algoexplorerapi.io";
        const algodPort = 443;
        //Init client
        const client = new algosdk.Algodv2(algodToken, algodServer, algodPort);
        //Get accounts
        const seedPhrase = walletState[0].seedPhraseString;
        let account = algosdk.mnemonicToSecretKey(seedPhrase);
        //Get suggested params
        const params = await client.getTransactionParams().do();
        //Get transaction params
        let sender = account.addr;
        let reciever = addressField;
        let amount = algosdk.algosToMicroalgos(tokenField);
        //Generate transaction object
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
          from: sender,
          to: reciever,
          amount: amount,
          suggestedParams: params,
        });
        //Sign transaction
        let signedTxn = txn.signTxn(account.sk);
        //Send Transaction
        const txnSent = await client.sendRawTransaction(signedTxn).do();
        console.log(txnSent);
      };
      transaction();
      setAddressField("");
      setTokenField("");
      setSendButton({
        value: "Send",
        isFormOpen: false,
      });
    }
  };
  return (
    <div className="wallet-container">
      <nav className="nav">
        <div className="nav-logo">
          <img src={logo} alt="wallX icon" />
        </div>
        <div className="nav-net">Powered by AlgoD</div>
      </nav>
      <aside className="side-bar">
        <div className="added-accounts">
          {walletState.map((i, j) => {
            return (
              <div
                className={`wallets-saved ${
                  walletState[j].isActive ? "active-wallet" : ""
                }`}
                key={j}
                onClick={() => setActiveHandler(j)}
              >
                <h1>{i.accountName.charAt(0).toUpperCase()}</h1>
              </div>
            );
          })}
        </div>
        <button className="add-more">
          <Link to="/add-account">Add</Link>
        </button>
      </aside>
      {walletState.map((a, b) => {
        return a.isActive ? (
          <section className="main-section" key={b}>
            <article className="info-sect">
              <h1>My Wallet</h1>
              <div className="algo-price">1 algo: $0.353</div>
            </article>
            <article className="algo-owned-container">
              <div className="algo-owned-info">
                <div className="account-info">
                  <div>
                    <h3>{a.accountName}</h3>
                    <p>{a.address}</p>
                  </div>
                </div>
                <div className="algo-owned">
                  <h2>Balance</h2>
                  <div>
                    <span>{a.balance}</span> Algorand
                  </div>
                  <div>
                    <span>{a.balance * 0.353}</span> USD
                  </div>
                </div>
                <div
                  className="transact"
                  style={
                    a.accountType === "Watch Account"
                      ? { display: "none" }
                      : { display: "flex" }
                  }
                >
                  <button onClick={revealFormHandler}>
                    {sendButton.value}
                  </button>
                  <button className="recieve-btn">{recieveButton.value}</button>
                </div>
              </div>
              <form
                className="send-algo"
                style={
                  sendButton.isFormOpen
                    ? { display: "block" }
                    : { display: "none" }
                }
                onSubmit={sendTokensHandler}
              >
                <input
                  type="text"
                  id="address-field"
                  placeholder="Enter address here"
                  value={addressField}
                  onChange={(e) => setAddressField(e.target.value)}
                />
                <input
                  type="text"
                  id="amount-field"
                  placeholder="Algos to send"
                  value={tokenField}
                  onChange={(e) => setTokenField(e.target.value)}
                />
                <input type="submit" value="Send" />
              </form>
            </article>
            <div className="spacing"></div>
            <article className="assets-owned-container">
              <ul className="assets-owned">
                <h1>Transactions</h1>
              </ul>
            </article>
          </section>
        ) : null;
      })}
      <footer>Built on Algorand</footer>
    </div>
  );
};
