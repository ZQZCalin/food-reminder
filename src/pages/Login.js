import { useContext, useState } from "react";
import css from "../styles/Login.module.css";
import { AuthContext } from "../contexts/AuthContext";


function Login() {

  // context
  const { login } = useContext(AuthContext);

  // form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className={css.login}>
      <div>
        <h3>登录</h3>
        <div>
          邮箱：
          <input value={email} onChange={e => { setEmail(e.target.value) }} />
        </div>
        <div>
          密码：
          <input type="password" value={password} onChange={e => { setPassword(e.target.value) }} />
        </div>
        <button onClick={() => { login(email, password) }}>
          确定
        </button>
      </div>
    </div>
  );
}

export default Login;