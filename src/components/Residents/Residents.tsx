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
          .map((resident) => (
            <Resident id={resident.id} name={resident.name} avatarUrl={resident.avatarUrl} posts={resident.posts} species={resident.species} bio={resident.bio}/>
            // <li key={resident.id}>
            //   <img src={resident.avatarUrl} alt={resident.name} />
            //   {resident.name}
            //   {resident.posts.length}
            //   {resident.species}
            //   {resident.bio}
            // </li>
          ))}
      </ul>
    </>
  );
}

export default Residents;
