import './Profile.css';
import { useEffect, useMemo } from 'react';
import { PageTitle } from '../Titles/PageTitle';
import Residents from '../Residents/Residents';
import { getResidents } from '../../utils/api';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, getModal, getResidentsList } from '../../redux/selectors';
import avatarPlaceholder from '../../assets/avatar-placeholder.jpg';
import ModalChangeAvatar from '../Modals/ModalChangeAvatar/ModalChangeAvatar';
import ModalChangeProfile from '../Modals/ModalChangeProfile/ModalChangeProfile';
import { openModal, closeModal } from '../../redux/modalSlice';
import { formatTime } from '../../utils/helpers';
import { getUserInfo } from '../../utils/api';
import { setUser } from '../../redux/userSlice';
import { setResidents } from '../../redux/residentsSlice';

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const memedUser = useMemo(() => user, [user]);
  const modalIsActive = useSelector(getModal);
  const residents = useSelector(getResidentsList);
  // console.log(residents);
  useEffect(() => {
    if (!user) {
      getUserInfo(localStorage.jwt)
        .then((user) => {
          dispatch(setUser(user));
          console.log('Fetched user info');
        })
        .catch((err) => {
          console.error('Failed to fetch user info:', err);
        });
      console.log(user);
    }
  }, [dispatch, user]);

  // useEffect(() => {
  //   //TODO: find out why getResidents fires two times
  //   if (memedUser && residents.length === 0) {
  //     getResidents(localStorage.jwt, memedUser.residents)
  //       .then((residents) =>
  //         dispatch(setResidents({ userId: memedUser._id, residents }))
  //       )
  //       .catch((err) => {
  //         console.error('Failed to fetch residents:', err);
  //       });
  //     console.log('request residents');
  //   }
  // }, [dispatch, memedUser, residents.length]);

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
          <Residents />
          {/* {user.residents.length > 0 && <Residents />} */}
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
