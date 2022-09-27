export const AddAccount = () => {
  return (
    <div className="add-account">
      <div className="add-account-head">Add Account</div>
      <ul className="account-types">
        <li className="account-type">
          <div className="account-logo"></div>
          <h2 className="account-type-head">New Account</h2>
          <p className="account-type-desc">Create a new account</p>
        </li>
        <li className="account-type">
          <div className="account-logo"></div>
          <h2 className="account-type-head">Import account</h2>
          <p className="account-type-desc">
            Import account by providing the seed phrase
          </p>
        </li>
        <li className="account-type">
          <div className="account-logo"></div>
          <h2 className="account-type-head">Watch Account</h2>
          <p className="account-type-desc">
            Inspect the balance and transactions on a public address
          </p>
        </li>
        <li className="account-type">
          <div className="account-logo"></div>
          <h2 className="account-type-head">Cold Wallet Interface</h2>
          <p className="account-type-desc">
            Access your hardware wallet accounts on Ledger, trezor etc.
            <div className="soon">Coming soon!</div>
          </p>
        </li>
      </ul>
    </div>
  );
};
