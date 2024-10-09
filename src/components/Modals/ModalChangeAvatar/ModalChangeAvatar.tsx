import { Modal } from '../../Modal/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from '../../Form/Form';
// import { useSelector } from 'react-redux';
// import { getUser } from '../../../redux/selectors';
import { updateAvatar } from '../../../utils/api';
import { closeModal } from '../../../redux/modalSlice';
import { setUser } from '../../../redux/userSlice';
import { formatImgUrl } from '../../../utils/helpers';

type ChangeAvatarFormProps = {
  formName: string;
  onClose: () => void;
};

function ModalChangeAvatar({ formName, onClose }: ChangeAvatarFormProps) {
  const dispatch = useDispatch();
//   const user = useSelector(getUser);
//   const avatar = user?.avatar;
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [urlError, setUrlError] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const cleanUrl = formatImgUrl(avatarUrl, setUrlError);

    if (!cleanUrl) {
      console.error('Invalid URL, skipping plant suggestion.');
      return;
    }

    setIsLoading(true);
    updateAvatar(localStorage.jwt, cleanUrl)
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
          title="Change avatar"
          onSubmit={handleSubmit}
          action="submit"
          method="post"
        >
          <input
            name="photo"
            id="photo"
            type="url"
            required
            className="form__input"
            placeholder="Add photo url"
            value={avatarUrl}
            onChange={(e) => {
              setUrlError('');
              setAvatarUrl(e.target.value);
            }}
          ></input>
          {urlError && <p className="form__error">{urlError}</p>}
          <button type="submit" className="form__button">
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </Form>
      </Modal>
    </>
  );
}

export default ModalChangeAvatar;
