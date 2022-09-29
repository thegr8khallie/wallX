import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/imgs/icon.png";

export const Wallet = () => {
  localStorage.removeItem("newUser");
  const userObject = JSON.parse(localStorage.getItem("user"));

  const availableAccounts = JSON.parse(localStorage.getItem("user")).accounts;

  const [walletState, setWalletState] = useState(availableAccounts);

  const setActiveHandler = (id) => {
    setWalletState(
      walletState.map((e, f) => {
        return f === id
          ? { ...e, isActive: false ? true : true }
          : { ...e, isActive: true ? false : false };
      })
    );
  };
  localStorage.setItem(
    "user",
    JSON.stringify({
      ...userObject,
      accounts: [...walletState],
    })
  );
  return (
    <div className="wallet-container">
      <nav className="nav">
        <div className="nav-logo">
          <img src={logo} alt="wallX icon" />
        </div>
        <div className="nav-net">Powered by Sandbox</div>
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
          <section className="main-section">
            <article className="info-sect">
              <h1>My Wallet</h1>
              <div className="algo-price">1 algo: $(current algo price)</div>
            </article>
            <article className="algo-owned-container">
              <div className="algo-owned-info">
                <div className="account-info">
                  <div>
                    <h3>{a.accountName}</h3>
                    <p>aksadsdsasjadnkjjka</p>
                  </div>
                </div>
                <div className="algo-owned">
                  <h2>Balance</h2>
                  <div>
                    <span>Algo amount</span> algoIcon
                  </div>
                  <div>
                    <span>USD equivalent</span> USD
                  </div>
                </div>
                <div className="transact">
                  <button>Send</button>
                  <button>Recieve</button>
                </div>
              </div>
            </article>
            <div className="spacing"></div>
            <article className="assets-owned-container">
              <ul className="assets-owned">
                <li className="asset-owned">
                  <div>Icon</div>
                  <div>
                    <h3>Asset name</h3>
                    <h3>Asset value in USD</h3>
                  </div>
                  <div>
                    <h3>Asset bal</h3>
                    <h3>asset worth in USD</h3>
                  </div>
                </li>
              </ul>
            </article>
          </section>
        ) : null;
      })}
      <footer>Built on Algorand</footer>
    </div>
  );
};
