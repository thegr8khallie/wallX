export const Registration = (props) => {
  return (
    <div className="registration-container">
      <form className="new-account-form">
        <div className="seedphrase-container">
          <h2 className="seedphrase-head">Seed Phrase</h2>
          <div className="seedphrase">
            {props.phrase.map((i, j) => (
              <span key={`word${j + 1}`}> {`${j + 1}. ${i}`} </span>
            ))}
          </div>
        </div>
        <p>Do not share your Seed Phrase to anyone to avoid loss of funds!</p>
        <input type="checkbox" id="backup-confirm" />
        <label htmlFor="backup-confirm" className="backup-confirm-label">
          I have backed up my Seed Phrase in the correct order
        </label>
        <br />
        <button className="new-account-continue">Continue</button>
        <ul className="phrase-confirm">
          <li className="phrase-word-confirm">
            <label htmlFor="word10">Word 10: </label>
            <input type="text" id="word10" />
          </li>
        </ul>
        <label htmlFor="account-name">Account Name:</label>
        <br />
        <input type="text" className="account-name" />
        <br />
        <input type="submit" value="Submit" className="new-account-submit" />
      </form>
    </div>
  );
};
