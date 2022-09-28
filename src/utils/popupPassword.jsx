const PopupPassword = () => {
  return (
    <div className="popup-password">
      <form className="password-form">
        <label htmlFor="password">Enter Password to confirm</label>
        <br />
        <input type="password" id="password" />
        <br />
        <input type="submit" value="Accept" className="password-submit" />
      </form>
    </div>
  );
};

export default PopupPassword;
