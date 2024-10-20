import { Modal } from '../../Modal/Modal';
import { useState } from 'react';
import { useAppDispatch } from '../../../redux/hooks';
import Form from '../../Form/Form';
import { updateAvatar } from '../../../utils/api';
import { closeModal } from '../../../redux/modalSlice';
import { setUser } from '../../../redux/userSlice';
import { useFormAndValidation } from '../../../hooks/useFormAndValidation';

type ChangeAvatarFormProps = {
  formName: string;
  onClose: () => void;
};

function ModalChangeAvatar({ formName, onClose }: ChangeAvatarFormProps) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation<{ avatar: string }>({ avatar: '' });
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setIsLoading(true);
    updateAvatar(localStorage.jwt, values.avatar)
      .then((updatedUser) => {
        dispatch(setUser(updatedUser));
        resetForm();
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
    <Modal name={formName} onClose={onClose}>
      <Form
        formName={formName}
        title="Change avatar"
        onSubmit={handleSubmit}
        action="submit"
        method="post"
      >
        <input
          name="avatar"
          id="avatar"
          type="url"
          required
          className="form__input"
          placeholder="Add photo url"
          value={values.avatar}
          onChange={handleChange}
        ></input>
        {errors.avatar && <p className="form__error">{errors.avatar}</p>}
        <button type="submit" className="form__button" disabled={!isValid}>
          {isLoading ? 'Saving...' : 'Save'}
        </button>
      </Form>
    </Modal>
  );
}

export default ModalChangeAvatar;
