import { useState } from "react";
import { useNavigate } from "react-router-dom";
import algosdk from "algosdk";

export const ImportAccounts = (props) => {
  const navigate = useNavigate();
  const [seedFields, setSeedFields] = useState(new Array(25).fill(""));
  const [accountName, setAccountName] = useState("");
  const importSubmitHandler = (e) => {
    e.preventDefault();

    let mnemonic = seedFields.join(" ");
    let account = algosdk.mnemonicToSecretKey(mnemonic);
    let newUserMod = JSON.parse(localStorage.getItem("newUser"));
    localStorage.setItem(
      "newUser",
      JSON.stringify({
        ...newUserMod,
        seedPhrase: [...seedFields],
        accountName: accountName ? accountName : "Unnamed Account",
        isActive: newUserMod.id === 1 ? true : false,
        address: account.addr,
        balance: 0,
        seedPhraseBackedUp: true,
        seedPhraseConfirmed: true,
      })
    );
    let finalUserMod = JSON.parse(localStorage.getItem("newUser"));
    let mainUserStorage = JSON.parse(localStorage.getItem("user"));
    let mainUserAccounts = JSON.parse(localStorage.getItem("user")).accounts;
    localStorage.setItem(
      "user",
      JSON.stringify({
        ...mainUserStorage,
        accounts: [...mainUserAccounts, finalUserMod],
      })
    );
    navigate("/wallet");
  };
  return (
    <div className="import-form-container">
      <div className="import-form-head">
        <h1>Import Account</h1>
      </div>
      <form className="import-form" onSubmit={importSubmitHandler}>
        <div className="input-control">
          {/* A way to create a certain amount of HTML elements in react */}
          {[...Array(25)].map((e, i) => {
            return (
              <input
                type="text"
                key={i}
                id="field1"
                placeholder={`seed ${i + 1}`}
                value={seedFields[i]}
                onChange={(e) =>
                  setSeedFields(
                    seedFields.map((val, index) =>
                      index === i ? (val = e.target.value) : val
                    )
                  )
                }
              />
            );
          })}
        </div>
        <input
          type="text"
          id="import-account-name"
          placeholder="Add an Account Name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <input type="submit" value="Import Account" />
      </form>
    </div>
  );
};
