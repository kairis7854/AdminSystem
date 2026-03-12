import React from 'react'
import "./login.scss"

export default function Login() {










  return (
    <div className="login">
      <form className="loginCard">
        <h2 className="loginCard__title">後臺管理系統</h2>

        <label className="loginCard__user">
          <span >帳號</span>
          <input className="loginCard__userInput" type="text" name="username" required  autoComplete="off"/>
        </label>

        <label className="loginCard__password">
          <span >密碼</span>
          <input className='loginCard__passwordInput' type="password" name="passwordInput" required  autoComplete="off" />
        </label>

        <button type="submit" className="loginCard__button">登入</button>
      </form>
    </div>
  )
}
