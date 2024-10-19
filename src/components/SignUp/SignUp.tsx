import { useState, useEffect } from 'react';
import './SignUp.css';
import { authorize, register } from '../../utils/auth';
import { setToken } from '../../utils/token';
import { getUserInfo } from '../../utils/api';
import { useNavigate, Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { setUser } from '../../redux/userSlice';
import Form from '../Form/Form';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

type FormData = {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  bio?: string;
};

function SingUp() {
  const { values, handleChange, errors, isValid } =
    useFormAndValidation<FormData>({
      name: '',
      email: '',
      password: '',
      avatar: '',
      bio: '',
    });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    handleSignUp(values);
  };

  const handleSignUp = (formData: FormData) => {
    const { name, email, password } = formData;
    if (!email || !password || !name) {
      return;
    }
    makeRequest(formData)
      .then(() => navigate('/'))
      .catch((error) => {
        console.error(error);
        setFormError(error.message || 'An unexpected error occurred.');
      })
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
      setFormError('');
      authorize(formData.email, formData.password).then((data) => {
        if (data.token) {
          setToken(data.token);
          getUserInfo(data.token).then((user) => {
            dispatch(setUser(user));
          });
        }
      });
    });
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="sign-up">
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
          value={values.name || ''}
          onChange={handleChange}
          className="form__input"
          required
        />
        {errors.name && <span className="form__error">{errors.name}</span>}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email*"
          value={values.email || ''}
          onChange={handleChange}
          className="form__input"
          required
        />
        {errors.email && <span className="form__error">{errors.email}</span>}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password*"
          value={values.password || ''}
          onChange={handleChange}
          className="form__input"
          required
        />
        {errors.password && <span className="form__error">{errors.password}</span>}
        <input
          type="text"
          id="avatar"
          name="avatar"
          placeholder="Avatar Url"
          value={values.avatar || ''}
          onChange={handleChange}
          className="form__input"
        />
        {errors.avatar && <span className="form__error">{errors.avatar}</span>}
        <input
          type="text"
          id="bio"
          name="bio"
          placeholder="About you"
          value={values.bio || ''}
          onChange={handleChange}
          className="form__input"
        />
        {errors.bio && <span className="form__error">{errors.bio}</span>}
        {formError && <span className="form__error">{formError}</span>}
        <div className="form__btn-container">
          <button
            className="form__button"
            type="submit"
            disabled={!isValid}
          >
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
