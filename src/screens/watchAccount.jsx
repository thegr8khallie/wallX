import { useState } from "react";

export const WatchAccount = () => {
  const [address, setAddress] = useState("");
  const [accountName, setAccountName] = useState("");
  const watchAccountSubmitHandler = (e) => {
    e.preventDefault();
    let newUserMod = JSON.parse(localStorage.getItem("newUser"));
    localStorage.setItem(
      "newUser",
      JSON.stringify({
        ...newUserMod,
        accountName: accountName ? accountName : "Unnamed Account",
        address: address,
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
  };
  return (
    <div className="watch-account-container">
      <div className="watch-account-head">
        <h1>Watch Account</h1>
        <p>
          Accounts imported Using this method cannot be transacted with. They
          can only be watched
        </p>
      </div>
      <form className="watch-account-form" onSubmit={watchAccountSubmitHandler}>
        <label htmlFor="address-to-watch">Address</label>
        <input
          type="text"
          id="address-to-watch"
          placeholder="Please type in the address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        <label htmlFor="watch-account-name">Account Name</label>
        <input
          type="text"
          id="watch-account-name"
          placeholder="Add an Account Name"
          value={accountName}
          onChange={(e) => setAccountName(e.target.value)}
        />
        <input type="submit" value="Watch Account" />
      </form>
    </div>
  );
};
