import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import PasswordList from '../PasswordList'
import './index.css'

const initialList = JSON.parse(localStorage.getItem('localPassList'))

class PsMangaer extends Component {
  state = {
    urlInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordList: initialList,
    searchInput: '',
    visibleCheck: false,
  }

  onChangeCheck = () => {
    this.setState(prevState => ({visibleCheck: !prevState.visibleCheck}))
  }

  delFunc = id => {
    const {passwordList} = this.state
    const filteredList = passwordList.filter(eachItem => eachItem.id !== id)
    this.setState({passwordList: filteredList})
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitForm = event => {
    event.preventDefault()
    const {urlInput, usernameInput, passwordInput} = this.state
    const singleList = {
      id: uuidV4(),
      urls: urlInput,
      username: usernameInput,
      password: passwordInput,
    }

    if (usernameInput !== '' && urlInput !== '' && passwordInput !== '') {
      this.setState(prevState => ({
        passwordList: [...prevState.passwordList, singleList],
      }))
      this.setState({urlInput: '', usernameInput: '', passwordInput: ''})
    }
    if (urlInput === '') {
      const inputs = document.getElementById('urlInputId')
      inputs.style.border = '4px solid red'
    } else {
      const inputs = document.getElementById('urlInputId')
      inputs.style.border = 'none'
    }

    if (usernameInput === '') {
      const inputs = document.getElementById('usernameInputId')
      inputs.style.border = '4px solid red'
    } else {
      const inputs = document.getElementById('usernameInputId')
      inputs.style.border = 'none'
    }

    if (passwordInput === '') {
      const inputs = document.getElementById('passwordInputId')
      inputs.style.border = '4px solid red'
    } else {
      const inputs = document.getElementById('passwordInputId')
      inputs.style.border = 'none'
    }
  }

  onChangeUrl = event => {
    this.setState({urlInput: event.target.value})
  }

  onChangeName = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  render() {
    const {
      urlInput,
      usernameInput,
      passwordInput,
      passwordList,
      searchInput,
      visibleCheck,
    } = this.state
    localStorage.setItem('localPassList', JSON.stringify(passwordList))
    const filterPasswordList = passwordList.filter(eachItem => {
      const lowerInput = searchInput.toLowerCase()
      const lowerUrl = eachItem.urls.toLowerCase()
      return lowerUrl.includes(lowerInput)
    })

    const notFound = (
      <div className="result">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="password"
          className="not-fount-image"
        />
      </div>
    )
    const found = (
      <ul className="password-list">
        {filterPasswordList.map(eachItem => (
          <PasswordList
            eachItem={eachItem}
            delFunc={this.delFunc}
            key={eachItem.id}
            isVisibleCheck={visibleCheck}
          />
        ))}
      </ul>
    )

    return (
      <div className="container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />

        <div className="top-card">
          <div className="top-img-section">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
              alt="password manager"
              className="top-img"
            />
          </div>
          <form className="form-card">
            <h1 className="form-heading">Add New Password</h1>
            <div className="input-section" id="urlInputId">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-icon"
              />
              <input
                value={urlInput}
                type="text"
                className="input"
                placeholder="Enter Website"
                onChange={this.onChangeUrl}
                onBlur={this.onBlurUrl}
              />
            </div>

            <div className="input-section" id="usernameInputId">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                alt="username"
                className="input-icon"
              />
              <input
                value={usernameInput}
                type="text"
                className="input"
                placeholder="Enter Name"
                onChange={this.onChangeName}
              />
            </div>

            <div className="input-section" id="passwordInputId">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-icon"
              />
              <input
                value={passwordInput}
                type="password"
                className="input"
                placeholder="Enter password"
                onChange={this.onChangePassword}
              />
            </div>
            <button
              type="submit"
              className="submit-button"
              onClick={this.onSubmitForm}
            >
              Add
            </button>
          </form>
        </div>

        <div className="bottom-card">
          <div className="bottom-header">
            <div className="bottom-header-left">
              <p className="bottom-header-left-des">Your Password</p>
              <p type="button" className="bottom-header-left-count">
                {filterPasswordList.length}
              </p>
            </div>
            <div className="bottom-header-right">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearch}
              />
            </div>
          </div>
          <hr />
          <div className="bottom-body">
            <div className="check-card">
              <input
                type="checkbox"
                id="checkbox1"
                className="checkbox"
                onChange={this.onChangeCheck}
              />
              <label htmlFor="checkbox1" className="check-label">
                show password
              </label>
            </div>

            {filterPasswordList.length > 0 ? found : notFound}
          </div>
        </div>
      </div>
    )
  }
}

export default PsMangaer
