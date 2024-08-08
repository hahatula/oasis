import './Titles.css';

type PageTitleProps = {
    titleText: string;
  }

export const PageTitle = ({ titleText }: PageTitleProps) => {
    return <h1 className="title title__page">{titleText}</h1>
}