import logo from "../assets/imgs/icon.png";

export const Welcome = () => {
  return (
    <div className="welcome-container">
      <div className="welcome-wrap">
        <div className="welcome-banner">
          <div className="wallet-logo">
            <img src={logo} alt="wallet Logo" />
          </div>
          <div className="welcome-text">
            <h1 className="welcome-msg">Welcome to WallX</h1>
            <p className="put-pword">Create password to protect your wallet</p>
          </div>
        </div>
        <div className="form-container">
          <form action="" className="form-control">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              id="password"
              placeholder="Type your password"
            />
            <br />
            <label htmlFor="password-confirm">Confirm Password</label>
            <br />
            <input
              type="password"
              id="password-confirm"
              placeholder="Type your password again"
            />
            <br />
            <button className="continue">Continue</button>
          </form>
        </div>
      </div>
    </div>
  );
};
