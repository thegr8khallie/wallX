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
  const [password, setPassword] = useState({
    password: "",
    isSubmitting: false,
    isPasswordCorrect: false,
  });
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

  useEffect(() => {
    walletState.map((e, f) => {
      axios.get(`${baseUrl}v2/accounts/${e.address}`).then((res) => {
        setWalletState(
          walletState.map((i, j) => {
            return f === j
              ? {
                  ...i,
                  balance: algosdk.microalgosToAlgos(res.data.amount),
                }
              : i;
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
  const copyAddressHandler = () => {
    setRecieveButton({ value: "Address Copied!" });
    const textToBeCopied = walletState
      .map((i) => {
        if (i.isActive) {
          return i.address;
        }
      })
      .find((j) => {
        return j !== undefined && j;
      });
    navigator.clipboard.writeText(textToBeCopied);
    setTimeout(() => {
      setRecieveButton({ value: "Recieve" });
    }, 3000);
  };

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
  // const closePopupHandler = () => {
  //   setPassword({
  //     ...password,
  //     isSubmitting: false,
  //   });
  // };
  // const checkPasswordHandler = (e) => {
  //   e.preventDefault();
  //   const userPassword = JSON.parse(localStorage.getItem("user")).password;
  //   let isPasswordCorrect = password.password === userPassword ? true : false;
  //   if (!isPasswordCorrect) {
  //     console.log(password, userPassword);
  //     alert("Password Incorrect");
  //     return isPasswordCorrect;
  //   } else {
  //     setPassword({
  //       ...password,
  //       isSubmitting: false,
  //       isPasswordCorrect: true,
  //     });
  //     return isPasswordCorrect;
  //   }
  // };
  //Token Send Function
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
        const seedPhrase = walletState
          .map((j) => {
            if (j.isActive) {
              return j.seedPhraseString;
            }
          })
          .find((i) => {
            return i !== undefined && i;
          });
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
                  <button className="recieve-btn" onClick={copyAddressHandler}>
                    {recieveButton.value}
                  </button>
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
          </section>
        ) : null;
      })}
      <footer>Built on Algorand</footer>
      {/* <div
        className="popup-container"
        style={
          password.isSubmitting ? { display: "grid" } : { display: "none" }
        }
      >
        <form className="popup-form" onSubmit={checkPasswordHandler}>
          <input
            type="password"
            value={password.password}
            placeholder="Type in your Password"
            onChange={(e) => {
              setPassword({
                ...password,
                password: e.target.value,
              });
            }}
          />
          <div className="btn-wrapper">
            <div className="cancel" onClick={closePopupHandler}>
              Cancel
            </div>
            <input type="submit" value="Send" />
          </div>
        </form>
      </div> */}
    </div>
  );
};
