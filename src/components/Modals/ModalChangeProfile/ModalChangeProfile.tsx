import { Modal } from '../../Modal/Modal';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Form from '../../Form/Form';
import { useSelector } from 'react-redux';
import { getUser } from '../../../redux/selectors';
import { updateUserProfile } from '../../../utils/api';
import { closeModal } from '../../../redux/modalSlice';
import { setUser } from '../../../redux/userSlice';
// import { formatImgUrl } from '../../../utils/helpers';

type ChangeProfileFormProps = {
  formName: string;
  onClose: () => void;
};

function ModalChangeProfile({ formName, onClose }: ChangeProfileFormProps) {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [data, setData] = useState({
    name: user?.name,
    bio: user?.bio,
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const newBio = data.bio || '';
    data.name &&
      updateUserProfile(localStorage.jwt, data.name, newBio)
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
            value={data.name}
            onChange={handleChange}
          ></input>
          <input
            name="bio"
            id="bio"
            type="text"
            className="form__input"
            placeholder="About me"
            value={data.bio}
            onChange={handleChange}
          ></input>
          <button type="submit" className="form__button">
            {isLoading ? 'Saving...' : 'Save'}
          </button>
        </Form>
      </Modal>
    </>
  );
}

export default ModalChangeProfile;
