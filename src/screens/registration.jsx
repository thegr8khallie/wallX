import { useState } from "react";
import { useNavigate } from "react-router-dom";
//import algosdk from "algosdk";

export const Registration = () => {
  const navigate = useNavigate();
  const [backupSeed, setBackupSeed] = useState(false);
  const [seedField1, setSeedField1] = useState("");
  const [seedField2, setSeedField2] = useState("");
  const [seedField3, setSeedField3] = useState("");
  const [seedField4, setSeedField4] = useState("");
  const [accountName, setAccountName] = useState("");

  const seed = JSON.parse(localStorage.getItem("newUser")).seedPhrase;
  const continue1Handler = () => {
    if (backupSeed === false) {
      alert("Please backup your seed and check the checkbox to continue");
    } else {
      let newUserMod = JSON.parse(localStorage.getItem("newUser"));
      localStorage.setItem(
        "newUser",
        JSON.stringify({
          ...newUserMod,
          seedPhraseBackedUp: true,
          seedPhraseConfirmed: false,
        })
      );
      setBackupSeed(false);
    }
  };

  const continue2Handler = () => {
    if (!seedField1 || !seedField2 || !seedField3 || !seedField4) {
      alert("Please fill all fields");
    } else if (
      seedField1 !== seed[17] ||
      seedField2 !== seed[13] ||
      seedField3 !== seed[21] ||
      seedField4 !== seed[4]
    ) {
      alert("Incorrect seed Provided, check seedphrase and try again");
    } else {
      let newUserMod = JSON.parse(localStorage.getItem("newUser"));
      localStorage.setItem(
        "newUser",
        JSON.stringify({
          ...newUserMod,
          seedPhraseConfirmed: true,
        })
      );
      window.location.reload();
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    let newUserMod = JSON.parse(localStorage.getItem("newUser"));
    localStorage.setItem(
      "newUser",
      JSON.stringify({
        ...newUserMod,
        accountName: accountName ? accountName : "Unnamed Account",
        isActive: newUserMod.id === 1 ? true : false,
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
    setSeedField1("");
    setSeedField2("");
    setSeedField3("");
    setSeedField4("");
    setAccountName("");
    navigate("/wallet");
  };

  return (
    <div className="registration-container">
      <form className="new-account-form" onSubmit={formSubmitHandler}>
        <div
          style={
            JSON.parse(localStorage.getItem("newUser")).seedPhraseBackedUp
              ? { display: "none" }
              : { display: "block" }
          }
        >
          <div className="seedphrase-container">
            <h2 className="seedphrase-head">Seed Phrase</h2>
            <div className="seedphrase">
              {seed.map((i, j) => (
                <span key={`word${j + 1}`}> {`${j + 1}. ${i}`} </span>
              ))}
            </div>
          </div>
          <p>Do not share your Seed Phrase to anyone to avoid loss of funds!</p>
          <input
            type="checkbox"
            id="backup-confirm"
            value={backupSeed}
            checked={backupSeed}
            onChange={(e) => setBackupSeed(e.currentTarget.checked)}
          />
          <label htmlFor="backup-confirm" className="backup-confirm-label">
            I have backed up my Seed Phrase in the correct order
          </label>
          <br />
          <div className="new-account-continue" onClick={continue1Handler}>
            Continue
          </div>
        </div>

        <ul
          className="phrase-confirm"
          style={
            JSON.parse(localStorage.getItem("newUser")).seedPhraseConfirmed
              ? { display: "none" }
              : JSON.parse(localStorage.getItem("newUser")).seedPhraseBackedUp
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <li className="phrase-word-confirm">
            <label htmlFor="word10">Word 18: </label>
            <input
              type="text"
              id="4"
              value={seedField1}
              onChange={(e) => {
                setSeedField1(e.target.value);
              }}
            />
          </li>
          <li className="phrase-word-confirm">
            <label htmlFor="word10">Word 14: </label>
            <input
              type="text"
              id="12"
              value={seedField2}
              onChange={(e) => setSeedField2(e.target.value)}
            />
          </li>
          <li className="phrase-word-confirm">
            <label htmlFor="word10">Word 22: </label>
            <input
              type="text"
              id="7"
              value={seedField3}
              onChange={(e) => setSeedField3(e.target.value)}
            />
          </li>
          <li className="phrase-word-confirm">
            <label htmlFor="word10">Word 5: </label>
            <input
              type="text"
              id="10"
              value={seedField4}
              onChange={(e) => setSeedField4(e.target.value)}
            />
          </li>
          <div onClick={continue2Handler} className="new-account-continue">
            Continue
          </div>
        </ul>
        <div
          className="set-account-name"
          style={
            JSON.parse(localStorage.getItem("newUser")).seedPhraseConfirmed
              ? { display: "block" }
              : { display: "none" }
          }
        >
          <label htmlFor="account-name">Account Name:</label>
          <br />
          <input
            type="text"
            className="account-name"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
          />
          <br />
          <input type="submit" value="Submit" className="new-account-submit" />
        </div>
      </form>
    </div>
  );
};
