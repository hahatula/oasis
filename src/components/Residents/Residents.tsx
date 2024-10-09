import './Residents.css';
import { useMemo } from 'react'; 
import { SectionTitle } from '../Titles/PageTitle';
import Resident from '../Resident/Resident';
import { useSelector } from 'react-redux';
import { getResidentsList } from '../../redux/selectors';

function Residents() {
  // TODO: Find out if component renders two times and why
  const residents = useSelector(getResidentsList);

  const residentsToShow = useMemo(() => {
    return [...residents].reverse();
  }, [residents]);
  // console.table(residents);

  return (
    <>
      <SectionTitle titleText="Residents" />
      <ul className="residents-grid">
        {residents &&
          residentsToShow.map((resident, index) => (
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
