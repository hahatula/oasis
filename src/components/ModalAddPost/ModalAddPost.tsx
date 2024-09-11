import './ModalAddPost.css';
import { Modal } from '../Modal/Modal';
import { users } from '../../utils/tempDB';
import { useState } from 'react';

// TODO: button styles from toolbar are used. Not ok

type AddPostFormProps = {
  formName: string;
  userId: number;
  onClose: () => void;
  onNext: (resident: { id: number; name: string; avatarUrl: string; species: string }, photoUrl: string) => void;
};

function ModalAddPost({ formName, onClose, userId, onNext }: AddPostFormProps) {
  const [selectedResident, setSelectedResident] = useState({
    id: 0,
    name: 'Choose your resident',
    avatarUrl: '',
    species: '',
  });
  const [photoUrl, setPhotoUrl] = useState('');
  const [optionsVisibility, setOptionsVisibility] = useState(false);

  const toggleOptionsVisibility = () =>
    setOptionsVisibility(!optionsVisibility);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onNext(selectedResident, photoUrl);
  };

  return (
    <>
      <Modal name={formName} onClose={onClose}>
        <h2 className="form__title">New post</h2>
        <form
          onSubmit={handleSubmit}
          action="submit"
          method="post"
          id={formName}
          className="form"
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
              <div className="form__select-option">Create new resident</div>
            </div>
          </div>
          {selectedResident.id !== 0 && (
            <input
              name="photo"
              id="photo"
              type="url"
              required
              className="form__input"
              placeholder="Add photo url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            ></input>
          )}
          {selectedResident.id !== 0 && (
            <button type="submit" className="toolbar__button form__button">
              Next
            </button>
          )}
        </form>
      </Modal>
    </>
  );
}

export default ModalAddPost;
