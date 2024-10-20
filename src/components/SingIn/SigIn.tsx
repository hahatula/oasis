import './SignIn.css';
import { useState, useEffect } from 'react';
import { authorize } from '../../utils/auth';
import { setToken } from '../../utils/token';
import { getUserInfo } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setUser } from '../../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { getUser } from '../../redux/selectors';
import Form from '../Form/Form';
import { useFormAndValidation } from '../../hooks/useFormAndValidation';

type FormData = {
  email: string;
  password: string;
};

function SingIn() {
  const { values, handleChange, errors, isValid } =
    useFormAndValidation<FormData>({
      email: '',
      password: '',
    });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    handleLogin(values);
  };

  const handleLogin = (formData: FormData) => {
    const { email, password } = formData;
    if (!email || !password) {
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
    return authorize(formData.email, formData.password).then((data) => {
      if (data.token) {
        setToken(data.token);
        getUserInfo(data.token).then((user) => {
          dispatch(setUser(user));
        });
      }
    });
  };

  useEffect(() => {
    if (user) {
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
          placeholder="Password"
          value={values.password || ''}
          onChange={handleChange}
          className="form__input"
          required
        />
        {errors.password && (
          <span className="form__error">{errors.password}</span>
        )}
        {formError && <span className="form__error">{formError}</span>}
        <div className="form__btn-container">
          <button className="form__button" type="submit" disabled={!isValid}>
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
