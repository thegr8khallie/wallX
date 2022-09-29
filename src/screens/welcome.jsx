import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/imgs/icon.png";

export const Welcome = (props) => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    if (!password) {
      alert("Please Enter your password");
    } else if (password !== confirmPassword) {
      alert("Passwords dont match");
      setPassword("");
      setConfirmPassword("");
    } else {
      localStorage.setItem(
        "user",
        JSON.stringify({ password: password, accounts: [] })
      );
      setPassword("");
      setConfirmPassword("");
      navigate("/add-account");
    }
  };
  return (
    <div className="welcome-container">
      <div className="welcome-wrap">
        <div className="welcome-banner">
          <div className="wallet-logo" onClick={props.getLocalStorage}>
            <img src={logo} alt="wallet Logo" />
          </div>
          <div className="welcome-text">
            <h1 className="welcome-msg">Welcome to WallX</h1>
            <p className="put-pword">Create password to protect your wallet</p>
          </div>
        </div>
        <div className="form-container">
          <form action="" className="form-control" onSubmit={submitHandler}>
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="Type your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <label htmlFor="password-confirm">Confirm Password</label>
            <br />
            <input
              type="password"
              id="password-confirm"
              placeholder="Type your password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />

            <button className="continue">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};
