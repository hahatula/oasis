import './Profile.css';
import { useState, useEffect } from 'react';
import { PageTitle } from '../Titles/PageTitle';
import Residents from '../Residents/Residents';
import { getResidents } from '../../utils/api';
import { ResidentData } from '../../types/resident';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, getModal } from '../../redux/selectors';
import avatarPlaceholder from '../../assets/avatar-placeholder.jpg';
import ModalChangeAvatar from '../Modals/ModalChangeAvatar/ModalChangeAvatar';
import ModalChangeProfile from '../Modals/ModalChangeProfile/ModalChangeProfile';
import { openModal, closeModal } from '../../redux/modalSlice';
import { formatTime } from '../../utils/helpers';
import { getUserInfo } from '../../utils/api';
import { setUser } from '../../redux/userSlice';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const modalIsActive = useSelector(getModal);
  const [myResidents, setMyResidents] = useState<ResidentData[]>([]);

  useEffect(() => {
    getUserInfo(localStorage.jwt)
      .then((user) => {
        dispatch(setUser(user));
        console.log('view profile page and fetch me');
      })
      .then(() => {
        if (user) {
          getResidents(localStorage.jwt, user.residents)
            .then((residents) => setMyResidents(residents))
            .catch((err) => {
              console.error('Failed to fetch residents:', err);
            });
          console.log('request residents');
        }
      });
  }, [setUser]);

  if (!user) {
    return <p>User not found.</p>; // TODO: Decide how to handle the case where the user is not found better
  }

  const currentDate = new Date();
  const registrationDate = user ? new Date(user.registeredAt) : currentDate;
  const hostingTime = formatTime(registrationDate);

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
    console.log('Log out');
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
              <p>{hostingTime}</p>
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
          <Residents residents={myResidents} />
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
