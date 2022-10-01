import { useNavigate } from "react-router-dom";
import algosdk from "algosdk";

export const AddAccount = () => {
  const navigate = useNavigate();
  const savedAccounts = JSON.parse(localStorage.getItem("user")).accounts
    .length;
  const id = savedAccounts + 1;
  const notNewAccountHandler = (accountType, redirect) => {
    localStorage.setItem(
      "newUser",
      JSON.stringify({ id: id, accountType: accountType })
    );
    navigate(redirect);
  };

  const newAccountHandler = () => {
    const newAccount = algosdk.generateAccount();
    const newAccountAddress = newAccount.addr;
    const secretKey = newAccount.sk;
    const newAccountMnemonic = algosdk.secretKeyToMnemonic(newAccount.sk);
    // const algodToken =
    //   "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
    // const algodServer = "http://localhost";
    // const algodPort = 4001;
    // let algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
    // let balance = algodClient.accountInformation(newAccount.addr).do().amount;
    const newUser = JSON.stringify({
      id: id,
      accountType: "New Account",
      seedPhrase: newAccountMnemonic.split(" "),
      seedPhraseString: newAccountMnemonic,
      address: newAccountAddress,
      seedPhraseBackedUp: false,
      balance: 0,
    });
    localStorage.setItem("newUser", newUser);
    console.log(newAccountMnemonic);
    navigate("/register-new-account");
  };
  return (
    <div className="add-account">
      <div className="add-account-wrapper">
        <div className="add-account-head">
          <h1>Add Account</h1>
        </div>
        <ul className="account-types">
          <li className="account-type" onClick={newAccountHandler}>
            <h2 className="account-type-head">New Account</h2>
            <p className="account-type-desc">Create a new account</p>
          </li>

          <li
            className="account-type"
            onClick={() =>
              notNewAccountHandler("Imported Account", "/import-account")
            }
          >
            <h2 className="account-type-head">Import account</h2>
            <p className="account-type-desc">
              Import account by providing the seed phrase
            </p>
          </li>

          <li
            className="account-type"
            onClick={() =>
              notNewAccountHandler("Watch Account", "/watch-account")
            }
          >
            <h2 className="account-type-head">Watch Account</h2>
            <p className="account-type-desc">
              Inspect the balance and transactions on a public address
            </p>
          </li>
          <li className="account-type">
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
