import './Profile.css';
import { PageTitle, SectionTitle } from '../Titles/PageTitle';
import { users } from '../../utils/tempDB';
import {
  differenceInYears,
  differenceInMonths,
  differenceInDays,
  subMonths,
  subYears,
} from 'date-fns';

function Profile() {
  const currentUser = users[0];
  const registrationDate = new Date(currentUser.registeredAt);
  const currentDate = new Date();

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
        <PageTitle titleText={currentUser.name} />
        <img
          className="profile__host-img"
          src={currentUser.avatarUrl}
          alt={currentUser.name}
        />
        <article className="profile__host-info">
          <div className="profile__host-info-item">
            <label>Oasis host time:</label>
            <p>{findHostTime()}</p>
          </div>
          <div className="profile__host-info-item">
            <label>Number of hosted residents:</label>
            <p>{currentUser.posts.length}</p>
          </div>
          <div className="profile__host-info-item">
            <label>Bio:</label>
            <p>{currentUser.bio}</p>
          </div>
        </article>
      </article>
      <section className="profile__residents">
        <SectionTitle titleText="Residents" />
      </section>
    </section>
  );
}

export default Profile;
