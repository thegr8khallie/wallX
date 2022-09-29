export const AddAccount = (props) => {
  const selectAccountTypeHandler = (accountType) => {
    const savedAccounts = JSON.parse(localStorage.getItem("user")).accounts
      .length;
    localStorage.setItem(
      "newUser",
      JSON.stringify({ id: savedAccounts + 1, accountType: accountType })
    );
  };
  return (
    <div className="add-account">
      <div className="add-account-wrapper">
        <div className="add-account-head" onClick={props.getLocalStorage}>
          <h1>Add Account</h1>
        </div>
        <ul className="account-types">
          <li
            className="account-type"
            onClick={() => selectAccountTypeHandler("New Account")}
          >
            <h2 className="account-type-head">New Account</h2>
            <p className="account-type-desc">Create a new account</p>
          </li>
          <li
            className="account-type"
            onClick={() => selectAccountTypeHandler("Imported Account")}
          >
            <h2 className="account-type-head">Import account</h2>
            <p className="account-type-desc">
              Import account by providing the seed phrase
            </p>
          </li>
          <li
            className="account-type"
            onClick={() => selectAccountTypeHandler("Watch Account")}
          >
            <h2 className="account-type-head">Watch Account</h2>
            <p className="account-type-desc">
              Inspect the balance and transactions on a public address
            </p>
          </li>
          <li className="account-type" onClick={selectAccountTypeHandler}>
            <h2 className="account-type-head">Cold Wallet Interface</h2>
            <p className="account-type-desc">
              Access your hardware wallet accounts on Ledger, trezor etc.
              <span className="soon"> Coming soon!</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
