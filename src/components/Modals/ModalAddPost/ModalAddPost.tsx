import { Modal } from '../../Modal/Modal';
import { useState } from 'react';
import { openModal } from '../../../redux/modalSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import Form from '../../Form/Form';
import { formatImgUrl } from '../../../utils/helpers';
import { getUser, getModal } from '../../../redux/selectors';
import { ResidentData } from '../../../types/resident';
import { useImageUrl } from '../../../hooks/useImageUrl';

type AddPostFormProps = {
  formName: string;
  onClose: () => void;
  onNext: (
    resident: { _id: string; name: string; avatar: string; species: string },
    photoUrl: string
  ) => void;
  chosenResident?: ResidentData;
};

function ModalAddPost({
  formName,
  onClose,
  onNext,

}: AddPostFormProps) {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const modal = useAppSelector(getModal)
  const residents = user?.residents;
  const [selectedResident, setSelectedResident] = useState(
    modal?.chosenResident || {
      _id: '',
      name: 'Choose your resident',
      avatar: '',
      species: '',
    }
  );
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
                value={selectedResident._id}
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
                residents?.map((resident: ResidentData) => (
                  <div
                    className="form__select-option"
                    key={resident._id}
                    onClick={() => {
                      setSelectedResident(resident);
                      toggleOptionsVisibility();
                    }}
                  >
                    <img
                      className="form__select-option-img"
                      src={useImageUrl(resident.avatar)}
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
          {selectedResident._id && (
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
          {selectedResident._id && (
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
