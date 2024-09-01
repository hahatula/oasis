import './Main.css';
import { CURRENT_USER_TEMP } from '../../utils/constants';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { PageTitle } from '../Titles/PageTitle';
import Posts from '../Posts/Posts';
import ModalPost from '../ModalPost/ModalPost';
import ModalAddPost from '../ModalAddPost/ModalAddPost';
import { PostData } from '../../types/post';
import { getModal } from '../../redux/selectors';
import { openModal, closeModal } from '../../redux/modalSlice';

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

  const handleActiveModalClose = (): void => {
    console.log('close modal post');
    dispatch(closeModal());
  };

  const handlePostClick = (post: PostData): void => {
    setSelectedPost(post);
    dispatch(openModal('view-post'));
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
        <ModalAddPost formName="add-post" onClose={handleActiveModalClose} userId={CURRENT_USER_TEMP} />
      )}
    </>
  );
}

export default Main;
