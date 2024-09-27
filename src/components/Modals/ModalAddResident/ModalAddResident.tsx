import { Modal } from '../../Modal/Modal';
import { users, residents } from '../../../utils/tempDB';
import { CURRENT_USER_TEMP } from '../../../utils/constants';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Author from '../../Author/Author';
import { getPlantTip } from '../../../utils/plantNetApi';
import { plantNetApiKey } from '../../../utils/constants';
import Form from '../../Form/Form';

// TODO: add birthday to resident schema
// TODO: loading while waiting for api response

type AddResidentFormProps = {
  formName: string;
  onClose: () => void;
};

type PlantTipResponse = {
  results: Array<{
    species?: {
      commonNames: string[];
    };
  }>;
};

function ModalAddResident({ formName, onClose }: AddResidentFormProps) {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [photoUrl, setPhotoUrl] = useState('');
  const [species, setSpecies] = useState('');
  const [name, setName] = useState('');
  const [bday, setBday] = useState(new Date());
  const [suggestion, setSuggestion] = useState('');
  const [urlError, setUrlError] = useState('');

  const userInput = {
    species: '',
    name: '',
    bday: null as Date | null,
    bio: '',
  };

  const formatUrl = (photoUrl: string) => {
    const extensions = ['.jpeg', '.jpg', '.png', '.webp'];
    const imgExtension = extensions.find((ext) => photoUrl.includes(ext));

    if (!imgExtension) {
      setUrlError('Please enter a valid IMAGE url.');
      console.error('Invalid image URL, no valid image extension found.');
      return '';
    }

    setUrlError('');
    return photoUrl.slice(
      0,
      photoUrl.indexOf(imgExtension) + imgExtension.length
    );
  };

  const getSuggestion = async (photoUrl: string) => {
    try {
      const data = (await getPlantTip(
        photoUrl,
        plantNetApiKey
      )) as PlantTipResponse;
      return data.results[0]?.species?.commonNames[0] || '';
    } catch (error) {
      console.error('Error fetching plant suggestion:', error);
      return '';
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (step === 1) {
      const cleanUrl = formatUrl(photoUrl);

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
      setSpecies(userInput.species ? userInput.species : suggestion);
      setName(userInput.name);
    }
    if (step === 4) {
      if (userInput.bday !== null) setBday(userInput.bday);
      const newResident = {
        id: residents.length,
        name: name,
        avatarUrl: photoUrl,
        species: species,
        hostId: CURRENT_USER_TEMP,
        posts: [],
        bio: userInput.bio,
      };
      residents.push(newResident);
      users[CURRENT_USER_TEMP - 1].residents.push(newResident);
      navigate('/profile');
    }
    setStep(step + 1);
    console.log(bday);
  };

  if (step === 5) {
    setTimeout(() => onClose(), 1800);
  }

  return (
    <>
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
                Next
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <img className="form__resident-img" src={photoUrl}></img>
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
              <img className="form__resident-img" src={photoUrl}></img>
              <button
                type="button"
                className="form__edit form__edit_image"
                onClick={() => {
                  setPhotoUrl('');
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
                  //value={species}
                  onChange={(e) => (userInput.species = e.target.value)}
                ></input>
              )}
              <input
                name="name"
                id="name"
                type="text"
                required
                className="form__input"
                placeholder="What's your plant's pet name?"
                // value={name}
                onChange={(e) => (userInput.name = e.target.value)}
              ></input>
              <button type="submit" className="toolbar__button form__button">
                Next
              </button>
            </>
          )}
          {step === 4 && (
            <>
              <div className="form__author-header">
                <Author
                  hostAvatar={users[CURRENT_USER_TEMP - 1].avatarUrl}
                  hostName={users[CURRENT_USER_TEMP - 1].name}
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
                className="form__input"
                placeholder="Date of birth"
                onChange={(e) =>
                  (userInput.bday = e.target.value
                    ? new Date(e.target.value)
                    : null)
                }
              />
              <input
                name="bio"
                id="bio"
                type="text"
                className="form__input"
                placeholder="A few words about the plant's story"
                onChange={(e) => (userInput.bio = e.target.value)}
              />
              <button type="submit" className="toolbar__button form__button">
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
    </>
  );
}

export default ModalAddResident;
