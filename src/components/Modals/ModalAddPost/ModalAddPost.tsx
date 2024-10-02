import { Modal } from '../../Modal/Modal';
import { users } from '../../../utils/tempDB';
import { useState } from 'react';
import { openModal } from '../../../redux/modalSlice';
import { useDispatch } from 'react-redux';
import Form from '../../Form/Form';
import { formatImgUrl } from '../../../utils/helpers';

type AddPostFormProps = {
  formName: string;
  userId: number;
  onClose: () => void;
  onNext: (
    resident: { id: number; name: string; avatarUrl: string; species: string },
    photoUrl: string
  ) => void;
};

function ModalAddPost({ formName, onClose, userId, onNext }: AddPostFormProps) {
  const dispatch = useDispatch();
  const [selectedResident, setSelectedResident] = useState({
    id: 0,
    name: 'Choose your resident',
    avatarUrl: '',
    species: '',
  });
  const [photoUrl, setPhotoUrl] = useState('');
  const [optionsVisibility, setOptionsVisibility] = useState(false);
  const [urlError, setUrlError] = useState('');

  const toggleOptionsVisibility = () =>
    setOptionsVisibility(!optionsVisibility);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const cleanUrl = formatImgUrl(photoUrl, setUrlError);

      if (!cleanUrl) {
        console.error('Invalid URL, skipping plant suggestion.');
        return;
      }

    onNext(selectedResident, cleanUrl);
  };

  return (
    <>
      <Modal name={formName} onClose={onClose}>
        <Form
          formName={formName}
          title="New post"
          onSubmit={handleSubmit}
          action="submit"
          method="post"
        >
          <div className="form__select-wrapper">
            <select
              className="form__select"
              name="resident"
              id="resident"
              required
              onClick={toggleOptionsVisibility}
            >
              <option
                className="form__select-default-option"
                value={selectedResident.id}
              >
                {selectedResident.name}
              </option>
            </select>
            <div
              className={`form__select-options_${
                optionsVisibility ? 'shown' : 'hidden'
              }`}
            >
              {
                /* map all the residents of the current user */
                users[userId - 1].residents?.map((resident, index) => (
                  <div
                    className="form__select-option"
                    key={index}
                    onClick={() => {
                      setSelectedResident(resident);
                      toggleOptionsVisibility();
                    }}
                  >
                    <img
                      className="form__select-option-img"
                      src={resident.avatarUrl}
                      alt={resident.name}
                    />
                    {resident.name}
                  </div>
                ))
              }
              <div
                className="form__select-option"
                onClick={() => {
                  dispatch(openModal('add-resident'));
                }}
              >
                Create new resident
              </div>
            </div>
          </div>
          {selectedResident.id !== 0 && (
            <>
              <input
                name="photo"
                id="photo"
                type="url"
                required
                className="form__input"
                placeholder="Add photo url"
                value={photoUrl}
                onChange={(e) => {
                  setUrlError('');
                  setPhotoUrl(e.target.value);
                }}
              ></input>
              {urlError && <p className="form__error">{urlError}</p>}
            </>
          )}
          {selectedResident.id !== 0 && (
            <button type="submit" className="form__button">
              Next
            </button>
          )}
        </Form>
      </Modal>
    </>
  );
}

export default ModalAddPost;
