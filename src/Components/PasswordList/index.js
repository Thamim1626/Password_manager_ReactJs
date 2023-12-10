const PasswordList = props => {
  const {eachItem, delFunc, isVisibleCheck} = props
  const {id, urls, username, password} = eachItem
  const deleteFunction = () => {
    delFunc(id)
  }
  const hashedImage = (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="star"
      className="hashed-image"
    />
  )
  const hashedPassword = <p className="password-password">{password}</p>

  return (
    <li className="password-item">
      <h1 className="password-profile">{username[0].toUpperCase()}</h1>
      <div className="password-detail">
        <p className="password-website">{urls}</p>
        <p className="password-name">{username}</p>
        {isVisibleCheck ? hashedImage : hashedPassword}
      </div>
      <button type="button" className="del-button" onClick={deleteFunction}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="del-icon"
        />
      </button>
    </li>
  )
}

export default PasswordList
