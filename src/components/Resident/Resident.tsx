import './Resident.css';
import { ResidentProps } from './types';

// TODO: edit resident and add post functionality
const Resident: React.FC<ResidentProps> = ({
  id,
  avatarUrl,
  name,
  posts,
  species,
  bio,
  bday,
}) => {
  const formatedBday = new Date(bday).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return (
    <li className="resident" key={id}>
      <img className="resident__image" src={avatarUrl} alt={name} />
      <div className="resident__info">
        <div>
          <p className="resident__name">{name}</p>
          <p className="resident__species">{species}</p>
        </div>
        <p className="resident__stats">{posts?.length} posts</p>
      </div>
      {bio && <p className="resident__bio">{bio}</p>}
      {bday && <p className="resident__bday">Alive since {formatedBday}</p>}
      <div className="resident__buttons">
        {/* <button className="resident__button">Edit</button> */}
        {/* <button className="resident__button">Add post</button> */}
      </div>
    </li>
  );
};

export default Resident;
