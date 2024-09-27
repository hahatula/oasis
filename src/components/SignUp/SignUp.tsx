import { useState, useEffect } from 'react';
import "./SignUp.css";
import { authorize, register } from '../../utils/auth';
import { setToken } from '../../utils/token';
import { getUserInfo } from '../../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setUser } from '../../redux/userSlice';
import Form from '../Form/Form';

type FormData = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
};

// const defaultAvatarPath = '../../assets/avatar-placeholder.jpg';

function SingUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    avatar: '',
    bio: '',
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
    handleSignUp(data);
  };

  const handleSignUp = (formData: FormData) => {
    const { name, email, password } = formData;
    if (!email || !password || !name) {
      return;
    }
    makeRequest(formData)
      .then(() => navigate('/')) //login
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const makeRequest = (formData: FormData) => {
    return register(
      formData.name,
      formData.email,
      formData.password,
      formData.avatar,
      formData.bio
    ).then(() => {
      authorize(formData.email, formData.password).then((data) => {
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
    });
  };

  useEffect(() => {
    if (user) {
      console.log('User is logged in, navigating to home');
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className='sign-up'>
      <Form
        formName="sign-up"
        title="Sign Up"
        onSubmit={handleSubmit}
        action="submit"
        method="post"
      >
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name*"
          value={data.name}
          onChange={handleChange}
          className="form__input"
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email*"
          value={data.email}
          onChange={handleChange}
          className="form__input"
          required
        />

        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password*"
          value={data.password}
          onChange={handleChange}
          className="form__input"
          required
        />
        <input
          type="text"
          id="avatar"
          name="avatar"
          placeholder="Avatar Url"
          value={data.avatar}
          onChange={handleChange}
          className="form__input"
        />
        <input
          type="text"
          id="bio"
          name="bio"
          placeholder="About you"
          value={data.bio}
          onChange={handleChange}
          className="form__input"
        />
        <div className="form__btn-container">
          <button className="toolbar__button form__button" type="submit">
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
          <Link className="form__button_alt-option" to="/signin">
            or Log In
          </Link>
        </div>
      </Form>
    </div>
  );
}

export default SingUp;
