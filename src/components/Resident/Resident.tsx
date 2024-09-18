import './Resident.css';
import { ResidentProps } from './types';

const Resident: React.FC<ResidentProps> = ({
  id,
  avatarUrl,
  name,
  posts,
  species,
  bio,
}) => {
  return (
    <li className="resident" key={id}>
      <img className="resident__image" src={avatarUrl} alt={name} />
      <div className="resident__info">
        <div>
          <p className="resident__name">{name}</p>
          <p className="resident__species">{species}</p>
        </div>
        <p className="resident__stats">{posts.length} posts</p>
      </div>
      <p className="resident__bio">{bio}</p>
      {/* <div className="resident__buttons">
        <button className="toolbar__button">Do something</button>
      </div> */}
    </li>
  );
};

export default Resident;
