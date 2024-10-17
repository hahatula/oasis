import './Main.css';
import { PageTitle } from '../Titles/PageTitle';
import { Posts } from '../Posts/Posts';
import { PostData } from '../../types/post';
import { setInitialPosts } from '../../redux/postSlice';
import { useDispatch } from 'react-redux';
import { getPosts } from '../../utils/api';

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

function Main({
  handlePostClick,
}: {
  handlePostClick: (post: PostData) => void;
}) {
  const dispatch = useDispatch();
  getPosts(localStorage.jwt).then((data) => dispatch(setInitialPosts(data)));

  return (
    <article className="main">
      <PageTitle titleText={getTitleText()} />
      <Posts handlePostClick={handlePostClick} />
    </article>
  );
}

export default Main;
