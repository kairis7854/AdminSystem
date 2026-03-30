import { useState, useEffect } from 'react'
import "./login.scss"
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../store/modules/userStore.jsx';

export default function Login() {
  const [user, setUser] = useState('')
  const [passWord, setPassword] = useState('')
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);

  useEffect(() => {
    //有後端時，使用 HttpOnly Cookie 存儲 Token，防止 XSS 攻擊
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    }
  }, [])

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email: user, password: passWord })).then((result) => {
      if (!result.error) {
        navigate('/dashboard')
      };
    });
  };

  return (
    <div className="login">
      <form className="loginCard">
        <h2 className="loginCard__title">後臺管理系統</h2>

        <label className="loginCard__label">
          <span >帳號</span>
          <input
            className="loginCard__input"
            type="text"
            name="user"
            required
            autoComplete="off"
            onChange={(e) => { setUser(e.target.value) }}
          />
        </label>

        <label className="loginCard__label">
          <span >密碼</span>
          <input
            className='loginCard__input'
            type="password"
            name="passwordInput"
            required
            autoComplete="off"
            onChange={(e) => { setPassword(e.target.value) }}
          />
        </label>
        <div className='loginCard__err'>
          {error && <p className=''>*帳號或密碼錯誤</p>}
        </div>
        <button onClick={onLogin} type="submit" className="loginCard__button">登入</button>
      </form>
    </div>
  )
}
