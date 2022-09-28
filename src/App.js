import "./scss/style.scss";
import { Welcome, AddAccount, Wallet, Registration } from "./screens";
import { useState } from "react";
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
  const [seedPhrase, setSeedphrase] = useState(phrase);
  return (
    <div className="App">
      {/* <Welcome /> */}
      {/* <AddAccount /> */}
      {/* <Registration phrase={seedPhrase} /> */}
      <Wallet />
    </div>
  );
}

export default App;
