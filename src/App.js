import "./scss/style.scss";
import {
  Welcome,
  AddAccount,
  Registration,
  ImportAccounts,
  WatchAccount,
  Wallet,
} from "./screens";
import { Routes, Route } from "react-router-dom";

function App() {
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
      <Route path="/register-new-account" element={<Registration />} />
      <Route path="/import-account" element={<ImportAccounts />} />
      <Route path="/watch-account" element={<WatchAccount />} />
      <Route path="/wallet" element={<Wallet />} />
    </Routes>
  );
}

export default App;
