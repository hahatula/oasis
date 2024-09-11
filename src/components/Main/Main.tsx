import './Main.css';
import { CURRENT_USER_TEMP } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { PageTitle } from '../Titles/PageTitle';
import Posts from '../Posts/Posts';
import ModalPost from '../ModalPost/ModalPost';
import ModalAddPost from '../ModalAddPost/ModalAddPost';
import ModalAddResident from '../ModalAddResident/ModalAddResident';
import { PostData } from '../../types/post';
import { getModal } from '../../redux/selectors';
import { openModal, closeModal } from '../../redux/modalSlice';
import { users } from '../../utils/tempDB';

const TitleTexts: string[] = [
  'Oasis Latest News',
  "Oasis news you're following",
  'Oasis Graveyard',
  'My Oasis Residents',
  'My Subscriptions',
  'Timeline',
  'Residents',
];

const getTitleText = (): string => {
  //TODO: write real logic
  return TitleTexts[0];
};

function Main() {
  const dispatch = useDispatch();
  const modalIsActive = useSelector(getModal);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(null);
  const [newPostData, setNewPostData] = useState<{
    resident: {
      id: number;
      name: string;
      avatarUrl: string;
      species: string;
    };
    photoUrl: string;
  } | null>(null);

  const handleActiveModalClose = (): void => {
    console.log('close modal post');
    dispatch(closeModal());
    setSelectedPost(null);
    setNewPostData(null);
  };

  const handlePostClick = (post: PostData): void => {
    setSelectedPost(post);
    dispatch(openModal('view-post'));
  };

  const handleNextFromAddPost = (
    resident: {
      id: number;
      name: string;
      avatarUrl: string;
      species: string;
    },
    photoUrl: string
  ) => {
    setNewPostData({ resident, photoUrl });
    dispatch(openModal('add-post-next'));
  };

  return (
    <>
      <article className="main">
        <PageTitle titleText={getTitleText()} />
        <Posts handlePostClick={handlePostClick} />
      </article>
      {modalIsActive === 'view-post' && selectedPost && (
        <ModalPost
          id={selectedPost.id}
          text={selectedPost.text}
          photoUrl={selectedPost.photoUrl}
          authors={selectedPost.authors}
          createdAt={selectedPost.createdAt}
          likes={selectedPost.likes}
          onClose={handleActiveModalClose}
        />
      )}
      {modalIsActive === 'add-post' && (
        <ModalAddPost
          formName="add-post"
          onClose={handleActiveModalClose}
          userId={CURRENT_USER_TEMP}
          onNext={handleNextFromAddPost}
        />
      )}
      {modalIsActive === 'add-post-next' && newPostData && (
        <ModalPost
          id={10000000} // временный id для нового поста
          text={''} // Пустое поле для текста
          photoUrl={newPostData.photoUrl}
          authors={{
            host: {
              id: CURRENT_USER_TEMP,
              name: users[CURRENT_USER_TEMP - 1].name,
              avatarUrl: users[CURRENT_USER_TEMP - 1].avatarUrl,
            },
            resident: newPostData.resident,
          }}
          createdAt={new Date().toISOString()}
          likes={0}
          onClose={handleActiveModalClose}
        />
      )}
      {modalIsActive === 'add-resident' && (
        <ModalAddResident
          formName="add-resident"
          onClose={handleActiveModalClose}
          onNext={handleNextFromAddPost}
        />
      )}
    </>
  );
}

export default Main;
