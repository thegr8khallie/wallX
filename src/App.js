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
    <div className="App">
      {/* <Welcome getLocalStorage={consoleHandler} /> */}
      {/* <AddAccount getLocalStorage={consoleHandler} /> */}
      {/* <Registration phrase={seedPhrase} getLocalStorage={consoleHandler} /> */}
      {/* <ImportAccounts phrase={seedPhrase} /> */}
      {/* <WatchAccount /> */}
      {/* <Wallet /> */}
    </div>
  );
}

export default App;
