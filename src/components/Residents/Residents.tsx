import './Residents.css';
import { SectionTitle } from '../Titles/PageTitle';
import Resident from '../Resident/Resident';
import { ResidentData } from '../../types/resident';

interface ResidentsProps {
  residents: ResidentData[];
}

function Residents({residents}: ResidentsProps) {

  return (
    <>
      <SectionTitle titleText="Residents" />
      <ul className="residents-grid">
        {residents &&
          residents.map((resident, index) => (
            <Resident
              key={index}
              id={index}
              name={resident.name}
              avatarUrl={resident.avatar}
              posts={resident.posts}
              species={resident.species}
              bio={resident.bio}
              bday={resident.bday}
            />
          ))}
      </ul>
    </>
  );
}

export default Residents;
