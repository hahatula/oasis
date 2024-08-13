import './Main.css';
import { PageTitle } from '../Titles/PageTitle';
import Posts from '../Posts/Posts';

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
      <Posts/>
    </article>
  );
}

export default Main;
