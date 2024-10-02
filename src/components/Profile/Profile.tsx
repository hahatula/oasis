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
import { useSelector, useDispatch } from 'react-redux';
import { getUser, getModal } from '../../redux/selectors';
import avatarPlaceholder from '../../assets/avatar-placeholder.jpg';
import ModalChangeAvatar from '../Modals/ModalChangeAvatar/ModalChangeAvatar';
import ModalChangeProfile from '../Modals/ModalChangeProfile/ModalChangeProfile';
import { openModal, closeModal } from '../../redux/modalSlice';

function Profile() {
  const dispatch = useDispatch();
  const currentUser = users.find((user) => user.id === CURRENT_USER_TEMP); //TODO: shouldn't be hardcoded in the future
  const user = useSelector(getUser);
  const modalIsActive = useSelector(getModal);

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
  // console.log(findHostTime());

  const changeAvatar = () => {
    dispatch(openModal('change-avatar'));
  };

  const handleModalClose = () => {
    console.log('close modal');
    dispatch(closeModal());
  };

  const handleEditClick = () => {
    console.log("Let's edit user");
    dispatch(openModal('change-profile'));
  };

  const handleLogOut = () => {
    console.log("Log out");
    // TODO: log out
  };

  return (
    <>
      <section className="profile">
        <article className="profile__host">
          <PageTitle titleText={user.name} />
          <div className="profile__host-img">
            <img
              className="profile__host-img"
              src={user.avatar ? user.avatar : avatarPlaceholder}
              alt={user.name}
            />
            <button
              className="profile__host-img-edit"
              onClick={changeAvatar}
            ></button>
          </div>
          <article className="profile__host-info">
            <div className="profile__host-info-item">
              <label className="profile__host-info-label">
                Oasis host time:
              </label>
              <p>{findHostTime()}</p>
            </div>
            <div className="profile__host-info-item">
              <label className="profile__host-info-label">
                Number of hosted residents:
              </label>
              <p>{user.posts?.length}</p>
            </div>
            <div className="profile__host-info-item">
              <label className="profile__host-info-label">Bio:</label>
              <p>{user.bio ? user.bio : 'The host of this oasis'}</p>
            </div>
            <div className="profile__btn-container">
              <button className="profile__button" onClick={handleLogOut}>
                Log Out
              </button>
              <button className="profile__button" onClick={handleEditClick}>
                Edit profile
              </button>
            </div>
          </article>
        </article>
        <section className="profile__residents">
          <Residents hostId={currentUser.id} />
        </section>
      </section>
      {modalIsActive === 'change-avatar' && (
        <ModalChangeAvatar
          formName="change-avatar"
          onClose={handleModalClose}
        />
      )}
      {modalIsActive === 'change-profile' && (
        <ModalChangeProfile
          formName="change-profile"
          onClose={handleModalClose}
        />
      )}
    </>
  );
}

export default Profile;
