import './Profile.css';
import { CURRENT_USER_TEMP } from '../../utils/constants';
import { PageTitle } from '../Titles/PageTitle';
import { users } from '../../utils/tempDB';
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  subMonths,
  subYears,
} from 'date-fns';
import Residents from '../Residents/Residents';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors';
import avatarPlaceholder from '../../assets/avatar-placeholder.jpg'

function Profile() {
  const currentUser = users.find((user) => user.id === CURRENT_USER_TEMP); //TODO: shouldn't be hardcoded in the future
  const user = useSelector(getUser);

  if (!user) {
    return <p>User not found.</p>; // TODO: Decide how to handle the case where the user is not found better
  }

  const currentDate = new Date();
  const registrationDate = user ? new Date(user.registeredAt) : currentDate;

  const findHostTime = () => {
    const years = differenceInYears(currentDate, registrationDate);
    const dateAfterYears = subYears(currentDate, years);
    const months = differenceInMonths(dateAfterYears, registrationDate);
    const dateAfterMonths = subMonths(dateAfterYears, months);
    const days = differenceInDays(dateAfterMonths, registrationDate);

    const showYears = years > 0 ? true : false;
    const showMonths = months > 0 ? true : false;
    const showDays = !showYears
      ? true
      : !showMonths
      ? days > 0
        ? true
        : false
      : false;

    const resultYears = !showYears
      ? ''
      : years === 1
      ? `${years} year`
      : `${years} years`;
    const resultMonths = !showMonths
      ? ''
      : months === 1
      ? `${months} month`
      : `${months} months`;
    const resultDays = !showDays
      ? ''
      : days === 1
      ? `${days} day`
      : `${days} days`;

    return `${resultYears} ${resultMonths} ${resultDays}`;
  };

  console.log(findHostTime());
  return (
    <section className="profile">
      <article className="profile__host">
        <PageTitle titleText={user.name} />
        <img
          className="profile__host-img"
          src={user.avatar ? user.avatar : avatarPlaceholder}
          alt={user.name}
        />
        <article className="profile__host-info">
          <div className="profile__host-info-item">
            <label className="profile__host-info-label">Oasis host time:</label>
            <p>{findHostTime()}</p>
          </div>
          <div className="profile__host-info-item">
            <label className="profile__host-info-label">
              Number of hosted residents:
            </label>
            <p>{user.posts.length}</p>
          </div>
          <div className="profile__host-info-item">
            <label className="profile__host-info-label">Bio:</label>
            <p>{user.bio}</p>
          </div>
        </article>
      </article>
      <section className="profile__residents">
        <Residents hostId={currentUser.id} />
      </section>
    </section>
  );
}

export default Profile;
