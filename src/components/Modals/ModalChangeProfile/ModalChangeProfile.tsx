import { Modal } from '../../Modal/Modal';
import { useEffect, useState } from 'react';
import Form from '../../Form/Form';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getUser } from '../../../redux/selectors';
import { updateUserProfile } from '../../../utils/api';
import { closeModal } from '../../../redux/modalSlice';
import { setUser } from '../../../redux/userSlice';
import { useFormAndValidation } from '../../../hooks/useFormAndValidation';

type ChangeProfileFormProps = {
  formName: string;
  onClose: () => void;
};

function ModalChangeProfile({ formName, onClose }: ChangeProfileFormProps) {
  const { values, handleChange, errors, isValid, setValues } =
    useFormAndValidation<{ name: string; bio: string }>({ name: '', bio: '' });
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setValues({
        name: user.name || '',
        bio: user.bio || '',
      });
    }
  }, [user, setValues]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    values.name &&
      updateUserProfile(localStorage.jwt, values.name, values.bio || '')
        .then((updatedUser) => {
          dispatch(setUser(updatedUser));
        })
        .then(() => {
          setIsLoading(false);
          dispatch(closeModal());
        })
        .catch(() => {
          setIsLoading(false);
          console.error('Failed to update avatar');
        });
  };

  return (
    <>
      <Modal name={formName} onClose={onClose}>
        <Form
          formName={formName}
          title="Edit profile details"
          onSubmit={handleSubmit}
          action="submit"
          method="post"
        >
          <input
            name="name"
            id="name"
            type="text"
            required
            className="form__input"
            placeholder="Name"
            value={values.name}
            onChange={handleChange}
          ></input>
          {errors.name && <span className="form__error">{errors.name}</span>}
          <input
            name="bio"
            id="bio"
            type="text"
            className="form__input"
            placeholder="About me"
            value={values.bio}
            onChange={handleChange}
          ></input>
          <button type="submit" className="form__button" disabled={!isValid}>
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </Form>
      </Modal>
    </>
  );
}

export default ModalChangeProfile;
