import { Modal } from '../../Modal/Modal';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Author from '../../Author/Author';
import { getPlantTip } from '../../../utils/plantNetApi';
import { PLANTNET_API_KEY } from '../../../utils/constants';
import Form from '../../Form/Form';
import { formatImgUrl } from '../../../utils/helpers';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { getUser } from '../../../redux/selectors';
import { createResident, getUserInfo } from '../../../utils/api';
import { setUser } from '../../../redux/userSlice';
import { useImageUrl } from '../../../hooks/useImageUrl';
import { useFormAndValidation } from '../../../hooks/useFormAndValidation';
import { AddResidentFormProps, PlantTipResponse, UserInput } from './types';

function ModalAddResident({ formName, onClose }: AddResidentFormProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const [step, setStep] = useState(1);
  const [photoUrl, setPhotoUrl] = useState('');
  const [species, setSpecies] = useState('');
  const [name, setName] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [urlError, setUrlError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { values, handleChange } = useFormAndValidation<UserInput>({
    species: '',
    name: '',
    bday: null as Date | null,
    bio: '',
  });

  const today = new Date().toISOString().split('T')[0];
  const avatarUrl = useImageUrl(photoUrl);

  const getSuggestion = async (photoUrl: string) => {
    setIsLoading(true);
    try {
      const data = (await getPlantTip(
        photoUrl,
        PLANTNET_API_KEY
      )) as PlantTipResponse;
      setIsLoading(false);
      return data.results[0]?.species?.commonNames[0] || '';
    } catch (error) {
      setIsLoading(false);
      return '';
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (step === 1) {
      const cleanUrl = formatImgUrl(photoUrl, setUrlError);

      if (!cleanUrl) {
        console.error('Invalid URL, skipping plant suggestion.');
        return;
      }

      const plantNetSuggestion = await getSuggestion(cleanUrl);
      setSuggestion(plantNetSuggestion);

      if (!plantNetSuggestion || plantNetSuggestion === '') {
        console.error('No suggestion from API, moving to next step.');
        setStep(3);
        return;
      }
    }
    if (step === 3) {
      setSpecies(values.species ? values.species : suggestion);
      setName(values.name);
    }
    if (step === 4) {
      const newResident = {
        name: name,
        avatar: photoUrl,
        species: species,
        bio: values.bio,
        bday: values.bday,
      };

      try {
        await createResident(localStorage.jwt, newResident);
        const updatedUser = await getUserInfo(localStorage.jwt);
        dispatch(setUser(updatedUser));
        navigate('/profile');
      } catch (err) {
        console.error('Failed to create new resident or update list:', err);
      }
    }
    setStep(step + 1);
  };

  if (step === 5) {
    setTimeout(() => onClose(), 1800);
  }

  return (
    <Modal name={formName} onClose={onClose}>
      <Form
        formName={formName}
        title="New resident"
        onSubmit={handleSubmit}
        action="submit"
        method="post"
      >
        {step === 1 && (
          <>
            <input
              name="photo"
              id="photo"
              type="url"
              required
              className="form__input"
              placeholder="Add photo url for your resident's avatar"
              value={photoUrl}
              onChange={(e) => {
                setUrlError('');
                setPhotoUrl(e.target.value);
              }}
            ></input>
            {urlError && <p className="form__error">{urlError}</p>}
            <button type="submit" className="toolbar__button form__button">
              {isLoading ? 'Scanning...' : 'Next'}
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <img className="form__resident-img" src={avatarUrl}></img>
            {species && <p>{species}</p>}
            <p>Oh! Is it a {suggestion}?</p>
            <div className="form__btn-container">
              <button
                type="button"
                className="toolbar__button form__button"
                onClick={() => {
                  setSpecies(suggestion);
                  setStep(step + 1);
                }}
              >
                Yes, you are right!
              </button>
              <button type="submit" className="toolbar__button form__button">
                No, it's another plant
              </button>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <img className="form__resident-img" src={avatarUrl}></img>
            <button
              type="button"
              className="form__edit form__edit_image"
              onClick={() => {
                setPhotoUrl('');
                setSpecies('');
                setStep(1);
              }}
            >
              Change photo
            </button>
            {species && <p>{species}</p>}
            {!species && (
              <input
                name="species"
                id="species"
                type="text"
                required
                className="form__input"
                placeholder="What kind is your plant?"
                onChange={handleChange}
              ></input>
            )}
            <input
              name="name"
              id="name"
              type="text"
              required
              className="form__input"
              placeholder="What's your plant's pet name?"
              onChange={handleChange}
            ></input>
            <button type="submit" className="toolbar__button form__button">
              Next
            </button>
          </>
        )}
        {step === 4 && user && (
          <>
            <div className="form__author-header">
              <Author
                hostAvatar={user.avatar}
                hostName={user.name}
                residentAvatar={photoUrl}
                residentName={name}
                residentSpecies={species}
                placement="new-resident"
              />
              <button
                type="button"
                className="form__edit"
                onClick={() => {
                  setSpecies('');
                  setStep(3);
                }}
              >
                Edit
              </button>
            </div>
            <p>
              Make your oasis shine! Adding more details lets others get
              to&nbsp;know you better and makes your gardening experience
              even&nbsp;brighter!
            </p>
            <input
              name="bday"
              id="bday"
              type="date"
              max={today}
              className="form__input"
              placeholder="Date of birth"
              onChange={handleChange}
            />
            <input
              name="bio"
              id="bio"
              type="text"
              className="form__input"
              placeholder="A few words about the plant's story"
              onChange={handleChange}
            />
            <button type="submit" className="form__button">
              Create new resident
            </button>
          </>
        )}
        {step === 5 && (
          <p>
            Congrats, a new resident has successfully moved into your oasis!
          </p>
        )}
      </Form>
    </Modal>
  );
}

export default ModalAddResident;
