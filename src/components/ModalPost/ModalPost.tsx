import './ModalPost.css';
import { Modal } from '../Modal/Modal';
import { ModalPostProps } from '../../types/post';
import Author from '../Author/Author';


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
        <Author
          hostAvatar={authors.host.avatarUrl}
          hostName={authors.host.name}
          residentAvatar={authors.resident.avatarUrl}
          residentName={authors.resident.name}
          residentSpecies={authors.resident.species}
          placement="modal-post"
        />
        <div className="post__body">
          <div className="post__image-wrapper">
            <img
              className="post__image"
              src={photoUrl}
              alt={`${authors.resident.name}'s post`}
            />
            <div className="post__likes">
              <button className="post__like-button"></button>
              {likes}
            </div>
          </div>
          <p className="post__date">{createdAt}</p>
          <p className="post__text">{text}</p>
        </div>
      </article>
    </Modal>
  );
}

export default ModalPost;
