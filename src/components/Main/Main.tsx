import './Main.css';
import { PageTitle } from '../Titles/PageTitle';
import Posts from '../Posts/Posts';
import { Modal } from '../Modal/Modal';
import { ModalPostProps } from '../../types/post';

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
  return (
    <>
      <article className="main">
        <PageTitle titleText={getTitleText()} />
        <Posts />
      </article>
      <ModalPost
        id={5}
        text="texttttt"
        photoUrl="ddd"
        authors={{
          host: {
            name: 'Sunset Chaser',
            avatarUrl:
              'https://images.pexels.com/photos/1800456/pexels-photo-1800456.jpeg?auto=compress&cs=tinysrgb&w=200',
          },
          resident: {
            name: 'Eve',
            avatarUrl:
              'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=200',
          },
        }}
        createdAt="dddfdsf"
        onClose={onClose}
      />
    </>
  );
}

function ModalPost({
  text,
  photoUrl,
  authors,
  likes,
  createdAt,
  onClose,
}: ModalPostProps) {
  return (
    <Modal name="post" onClose={onClose}>
      <article className="modal-post">
        popup {text} {photoUrl}, {authors.resident.name}, {likes}, {createdAt},{' '}
      </article>
    </Modal>
  );
}

export default Main;
