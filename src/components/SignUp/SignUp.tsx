import { useState } from 'react';
import { Modal } from '../Modal/Modal';
import '../Modals/ModalAddPost/ModalAddPost.css';
import { authorize, register } from '../../utils/auth';
import { setToken } from '../../utils/token';
import { getUserInfo } from '../../utils/api';
import { useNavigate, Link } from 'react-router-dom';

type ModalSingUpProps = {
  formName: string;
};

type FormData = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
};

const defaultAvatarPath = '../../assets/avatar-placeholder.jpg';

function SingUp({ formName }: ModalSingUpProps) {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
    return register(formData.name, formData.email, formData.password, formData.avatar, formData.bio).then(() => {
        authorize(formData.email, formData.password).then((data) => {
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
      </form>
    </Modal>
  );
}

export default SingUp;
