import './ModalPost.css';
import { Modal } from '../Modal/Modal';
import { ModalPostProps } from '../../types/post';
import Author from '../Author/Author';
import Likes from '../Likes/Likes';

// TODO: correct button styling and class naming

function ModalPost({
  id,
  text,
  photoUrl,
  authors,
  likes,
  createdAt,
  onClose,
}: ModalPostProps) {

  return (
    <Modal name="post" onClose={onClose}>
      <article className="post modal-post">
        <Author
          hostAvatar={authors.host.avatarUrl}
          hostName={authors.host.name}
          residentAvatar={authors.resident.avatarUrl}
          residentName={authors.resident.name}
          residentSpecies={authors.resident.species}
          placement="modal-post"
        />
        <div className="modal-post__body">
          <div className="post__image-wrapper">
            <img
              className="post__image"
              src={photoUrl}
              alt={`${authors.resident.name}'s post`}
            />
            <Likes id={id} likes={likes}/>
          </div>
          <div className="modal-post__content-wrapper">
            <p className="post__text modal-post__text">{text}</p>
            <span className="modal-post__options">
              <p className="post__date">Posted {createdAt}</p>
              <button className="toolbar__button">Do something</button>
            </span>
          </div>
        </div>
      </article>
    </Modal>
  );
}

export default ModalPost;
