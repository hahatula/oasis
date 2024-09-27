import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import '../Modals/ModalAddPost/ModalAddPost.css';
import { authorize } from '../../utils/auth';
import { setToken } from '../../utils/token';
import { getUserInfo } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

type ModalSingInProps = {
  formName: string;
};

type FormData = {
  email: string;
  password: string;
};

function SingIn({ formName }: ModalSingInProps) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    email: '',
    password: '',
  });

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
          setCurrentUser(user);
          setIsLoggedIn(true);
          console.log('return currentUser');
          return currentUser;
        });
      }
    });
  };

  return (
    <Modal name={formName} onClose={() => console.log('change the element')}>
      <h2 className="form__title">Log In</h2>
      <form
        onSubmit={handleSubmit}
        action="submit"
        method="post"
        id={formName}
        className="form"
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
          <button className="toolbar__button form__button" type="submit">
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
          <Link className="form__button_alt-option" to="/signup">
            or Sign Up
          </Link>
        </div>
      </form>
    </Modal>
  );
}

export default SingIn;
