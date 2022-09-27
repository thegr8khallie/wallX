export const Registration = () => {
  return (
    <div className="registration-container">
      <form className="new-account-form">
        <div className="seedphrase-container">
          <h2 className="seedphrase-head">Seed Phrase</h2>
          <ol className="seedphrase"></ol>
        </div>
        <p>Do not share your Seed Phrase to anyone to avoid loss of funds!</p>
        <input type="checkbox" id="backup-confirm" />
        <label htmlFor="backup-confirm">
          I have backed up my Seed Phrase in the correct order
        </label>
        <br />
        <button className="continue">Continue</button>
        <ul className="phrase-confirm">
          <li className="phrase-word-confirm">
            <label htmlFor="word10">Word 10: </label>
            <input type="text" id="word10" />
          </li>
        </ul>
        <label htmlFor="account-name">Account Name</label>
        <br />
        <input type="text" className="account-name" />
        <br />
        <input type="submit" value="Submit" className="new-account-submit" />
      </form>
      <div className="popup-password">
        <form className="password-form">
          <label htmlFor="password">Enter Password to confirm</label>
          <br />
          <input type="password" id="password" />
          <br />
          <input type="submit" value="Accept" className="password-submit" />
        </form>
      </div>
    </div>
  );
};
