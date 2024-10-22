import './Residents.css';
import { useMemo } from 'react';
import { SectionTitle } from '../Titles/PageTitle';
import Resident from '../Resident/Resident';
import { useAppSelector } from '../../redux/hooks';
import { getUser } from '../../redux/selectors';
import { ResidentData } from '../../types/resident';

function Residents() {
  const user = useAppSelector(getUser);

  const residentsToShow = useMemo(() => {
    if (user) {
      return [...user.residents].reverse();
    }
  }, [user]);

  return (
    <>
      <SectionTitle titleText="Residents" />
      <ul className="residents-grid">
        {residentsToShow?.length ? (
          residentsToShow.map((resident: ResidentData) => (
            <Resident
              key={resident._id}
              id={resident._id}
              name={resident.name}
              avatarUrl={resident.avatar}
              posts={resident.posts}
              species={resident.species}
              bio={resident.bio}
              bday={resident.bday}
            />
          ))
        ) : (
          <p>No residents yet</p>
        )}
      </ul>
    </>
  );
}

export default Residents;
