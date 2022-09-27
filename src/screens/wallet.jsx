export const Wallet = () => {
  return (
    <div className="wallet-container">
      <nav className="nav">
        <div className="hamburger">Ham</div>
        <div className="nav-logo">WallX</div>
        <div className="nav-net">Testnet</div>
      </nav>
      <aside className="side-bar">
        <div className="added-accounts"></div>
        <div className="add-more"></div>
      </aside>
      <section className="main-section">
        <article className="info-sect">
          <h1>My Wallet</h1>
          <div className="algo-price">algo: $(current algo price)</div>
        </article>
        <article className="algo-owned-container">
          <div className="algo-owned-info">
            <div className="algo-icon"></div>
            <div className="account-info">
              <p>Name</p>
              <p>
                Address <button>copy-icon</button>
              </p>
              <button>
                <a href="http://" target="_blank" rel="noopener noreferrer">
                  Algoexplorer
                </a>
              </button>
              <button>Generates account QR</button>
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
        <article className="assets-owned-container">
          <ul className="assets-owned">
            <li className="asset-owned">
              <div>Icon</div>
              <h3>Asset name</h3>
              <h3>Asset bal</h3>
              <h3>asset worth in USD</h3>
            </li>
          </ul>
        </article>
      </section>
      <footer>Built on Algorand</footer>
    </div>
  );
};
