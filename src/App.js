import "./scss/style.scss";
import {
  Welcome,
  AddAccount,
  Registration,
  ImportAccounts,
  WatchAccount,
  Wallet,
} from "./screens";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
function App() {
  let [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const phrase = [
    "hell",
    "hello",
    "jasper",
    "cameron",
    "soccer",
    "author",
    "quench",
    "delve",
    "find",
    "taunt",
    "apple",
    "ball",
    "miracle",
    "lies",
    "toxic",
    "bitch",
  ];

  const consoleHandler = () => {
    console.log(JSON.parse(localStorage.getItem("newUser")));
    console.log(userInfo);
  };
  const [seedPhrase] = useState(phrase);
  return (
    <Routes>
      <Route
        path="/"
        element={
          localStorage.getItem("user") &&
          JSON.parse(localStorage.getItem("user")).accounts.length > 0 ? (
            <Wallet />
          ) : localStorage.getItem("user") &&
            JSON.parse(localStorage.getItem("user")).accounts.length === 0 ? (
            <AddAccount getLocalStorage={consoleHandler} />
          ) : (
            <Welcome getLocalStorage={consoleHandler} />
          )
        }
      />
      <Route
        path="/create-wallet"
        element={<Welcome getLocalStorage={consoleHandler} />}
      />
      <Route
        path="/add-account"
        element={<AddAccount getLocalStorage={consoleHandler} />}
      />
      <Route
        path="/register-new-account"
        element={
          <Registration phrase={seedPhrase} getLocalStorage={consoleHandler} />
        }
      />
      <Route
        path="/import-account"
        element={<ImportAccounts phrase={seedPhrase} />}
      />
      <Route path="/watch-account" element={<WatchAccount />} />
      <Route path="/wallet" element={<Wallet />} />
    </Routes>
  );
}

export default App;
