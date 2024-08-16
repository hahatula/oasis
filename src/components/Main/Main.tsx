import './Main.css';
import { useState } from 'react';
import { PageTitle } from '../Titles/PageTitle';
import Posts from '../Posts/Posts';
import ModalPost from '../ModalPost/ModalPost';

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

const onClose = (): void => {
  console.log('close modal post');
};

function Main() {
  const [selectedPost, setSelectedPost] = useState({});

  return (
    <>
      <article className="main">
        <PageTitle titleText={getTitleText()} />
        <Posts />
      </article>
      <ModalPost
        id={selectedPost.id || 5}
        text={selectedPost.text || "text placeholder"}
        photoUrl={selectedPost.photoUrl || "https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png"}
        authors={selectedPost.authors || {
          host: {
            name: 'Sunset Chaser',
            avatarUrl:
              'https://images.pexels.com/photos/1800456/pexels-photo-1800456.jpeg?auto=compress&cs=tinysrgb&w=200',
          },
          resident: {
            name: 'Eve',
            avatarUrl:
              'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=200',
              species: 'Peace Lily'
          },
        }}
        createdAt={selectedPost.createdAt || "now"}
        likes={selectedPost.likes || 0}
        onClose={onClose}
      />
    </>
  );
}

export default Main;
