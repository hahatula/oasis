import './Main.css';
import { PageTitle } from '../Titles/PageTitle';

const TitleTexts: string[] = [
  'Oasis Latest News',
  "Oasis news you're following",
  'Oasis Graveyard',
  'My Oasis Residents',
  'My Subscriptions',
  'Timeline',
  'Residents'
];

const getTitleText = ():string => {
  //TODO: write real logic
  return TitleTexts[0];
}

function Main() {
  return (
    <article className="main">
      <PageTitle titleText={getTitleText()} />
      <ul className="posts-grid">
        <li className="post">post</li>
        <li className="post">post</li>
        <li className="post">post</li>
        <li className="post">post</li>
      </ul>
    </article>
  );
}

export default Main;
