import './SignIn.css';
import { useState, useEffect } from 'react';
import { authorize } from '../../utils/auth';
import { setToken } from '../../utils/token';
import { getUserInfo } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setUser } from '../../redux/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors';
import Form from '../Form/Form';

type FormData = {
  email: string;
  password: string;
};

function SingIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  console.log(user);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    handleLogin(data);
  };

  const handleLogin = (formData: FormData) => {
    const { email, password } = formData;
    if (!email || !password) {
      return;
    }
    makeRequest(formData)
      .then(() => navigate('/'))
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const makeRequest = (formData: FormData) => {
    return authorize(formData.email, formData.password).then((data) => {
      if (data.token) {
        console.log('try to authorize');
        setToken(data.token);
        getUserInfo(data.token).then((user) => {
          console.log(user);
          dispatch(setUser(user));
          console.log('user logged in');
        });
      }
    });
  };

  useEffect(() => {
    if (user) {
      console.log('User is logged in, navigating to home');
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="sign-in">
      <Form
        formName="sign-in"
        title="Log In"
        onSubmit={handleSubmit}
        action="submit"
        method="post"
      >
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="form__input"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="form__input"
          required
        />
        <div className="form__btn-container">
          <button className="form__button" type="submit">
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
          <Link className="form__button_alt-option" to="/signup">
            or Sign Up
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default SingIn;
