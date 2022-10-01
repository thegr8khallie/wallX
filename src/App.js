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
            <AddAccount />
          ) : (
            <Welcome />
          )
        }
      />
      <Route path="/create-wallet" element={<Welcome />} />
      <Route path="/add-account" element={<AddAccount />} />
      <Route
        path="/register-new-account"
        element={<Registration phrase={seedPhrase} />}
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
