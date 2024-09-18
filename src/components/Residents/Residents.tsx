import './Residents.css';
// import Post from '../Post/Post';
import { residents } from '../../utils/tempDB';
// import { PostData } from '../../types/post';
import { SectionTitle } from '../Titles/PageTitle';
import Resident from '../Resident/Resident';

function Residents({ hostId }: { hostId: number }) {
  return (
    <>
      <SectionTitle titleText="Residents" />
      <ul className="residents-grid">
        {residents
          .filter((resident) => resident.hostId === hostId)
          .map((resident, index) => (
            <Resident
              key={index}
              id={resident.id}
              name={resident.name}
              avatarUrl={resident.avatarUrl}
              posts={resident.posts}
              species={resident.species}
              bio={resident.bio}
            />
          ))}
      </ul>
    </>
  );
}

export default Residents;
