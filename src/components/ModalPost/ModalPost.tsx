import './ModalPost.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors';
import { Modal } from '../Modal/Modal';
import { ModalPostProps } from '../../types/post';
import Author from '../Author/Author';
import Likes from '../Likes/Likes';


// TODO: correct button styling and class naming
// TODO: correct date format in post__date

function ModalPost({
  id,
  text,
  photoUrl,
  authors,
  likes,
  createdAt,
  onClose,
}: ModalPostProps) {
 // const dispatch = useDispatch();
  const currentUser = useSelector(getUser);
  console.log(currentUser);
  console.log(authors.host.id);

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
              {authors.host.id === currentUser && <button className="toolbar__button">Edit post</button>}
            </span>
          </div>
        </div>
      </article>
    </Modal>
  );
}

export default ModalPost;
