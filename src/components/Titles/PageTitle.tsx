import './Titles.css';

type TitleProps = {
    titleText: string;
  }

export const PageTitle = ({ titleText }: TitleProps) => {
    return <h1 className="title title__page">{titleText}</h1>
}

export const SectionTitle = ({ titleText }: TitleProps) => {
  return <h2 className="title title__section">{titleText}</h2>
}