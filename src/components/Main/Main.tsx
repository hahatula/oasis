import './Main.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { PageTitle } from '../Titles/PageTitle';
import Posts from '../Posts/Posts';
import ModalPost from '../ModalPost/ModalPost';
import { PostData } from '../../types/post';
import { getModal } from '../../redux/selectors';
import { openModal, closeModal } from '../../redux/actions';

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
        console.log(selectedPost),
        console.log('Rendering ModalPost'),
        <ModalPost
        id={selectedPost.id || 5}
        text={selectedPost.text || 'text placeholder'}
        photoUrl={
          selectedPost.photoUrl ||
          'https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png'
        }
        authors={
          selectedPost.authors || {
            host: {
              name: 'Sunset Chaser',
              avatarUrl:
                'https://images.pexels.com/photos/1800456/pexels-photo-1800456.jpeg?auto=compress&cs=tinysrgb&w=200',
            },
            resident: {
              name: 'Eve',
              avatarUrl:
                'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=200',
              species: 'Peace Lily',
            },
          }
        }
        createdAt={selectedPost.createdAt || 'now'}
        likes={selectedPost.likes || 0}
        onClose={handleActiveModalClose}
      />)}
    </>
  );
}

export default Main;
