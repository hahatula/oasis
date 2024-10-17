import './Resident.css';
import { ResidentProps } from './types';
import { useDispatch } from 'react-redux';
import { openModal, setChosenResident } from '../../redux/modalSlice';

// TODO: edit resident and declare death
const Resident: React.FC<ResidentProps> = ({
  id,
  avatarUrl,
  name,
  posts,
  species,
  bio,
  bday,
}) => {
  const dispatch = useDispatch();

  const formatedBday = new Date(bday).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleAddPost = () => {
    console.log('add post for resident')
    dispatch(setChosenResident({ _id: id, name, avatar: avatarUrl, species }));
    dispatch(openModal('add-post'));
  }

  return (
    <li className="resident" key={id}>
      <img className="resident__image" src={avatarUrl} alt={name} />
      <div className="resident__info">
        <div>
          <p className="resident__name">{name}</p>
          <p className="resident__species">{species}</p>
        </div>
        <p className="resident__stats">{posts?.length} post{posts?.length === 1 ? '' : 's'}</p>
      </div>
      {bio && <p className="resident__bio">{bio}</p>}
      {bday && <p className="resident__bday">Alive since {formatedBday}</p>}
      <div className="resident__buttons">
        {/* <button className="resident__button">Edit</button> */}
        <button className="resident__button" onClick={handleAddPost}>Add post</button>
      </div>
    </li>
  );
};

export default Resident;
