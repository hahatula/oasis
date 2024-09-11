import './ModalPost.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getModal } from '../../redux/selectors';
import { Modal } from '../Modal/Modal';
import { ModalPostProps } from '../../types/post';
import Author from '../Author/Author';
import Likes from '../Likes/Likes';
import { addPost, updatePost } from '../../redux/postSlice';

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
  const dispatch = useDispatch();
  const currentUser = useSelector(getUser);
  const modalIsActive = useSelector(getModal);
  const [postModalMode, setPostModalMode] = useState(
    modalIsActive === 'add-post-next' ? 'edit' : 'view'
  );
  const [postText, setPostText] = useState(text);

  const handleEditClick = () => {
    console.log('edit');
    setPostModalMode('edit');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleSaveClick = () => {
    const create = () => {
      const newPost = {
        id: Date.now(), // temp ID
        text: postText,
        photoUrl: photoUrl,
        authors: authors,
        createdAt: new Date().toISOString(),
        likes: 0,
      };
      dispatch(addPost(newPost))
    };
    const update = () => {
      dispatch(updatePost({ id, newText: postText }));
      console.log('save post');
    };
    modalIsActive === 'add-post-next' ? create() : update();
    setPostModalMode('view');
    onClose();
  };

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
            <Likes id={id} likes={likes} />
          </div>
          {postModalMode === 'view' && (
            <div className="modal-post__content-wrapper">
              <p className="post__text modal-post__text">{postText}</p>
              <span className="modal-post__options">
                <p className="post__date">Posted {createdAt}</p>
                {authors.host.id === currentUser && (
                  <button className="toolbar__button" onClick={handleEditClick}>
                    Edit post
                  </button>
                )}
              </span>
            </div>
          )}
          {postModalMode === 'edit' && (
            <div className="modal-post__content-wrapper">
              <textarea
                name="text"
                id="text"
                className="modal-post__textarea"
                placeholder="What does your plant want to share?"
                value={postText}
                onChange={handleTextChange}
              />
              <span className="modal-post__options">
                <p className="post__date">Posted {createdAt}</p>
                {authors.host.id === currentUser && (
                  <button className="toolbar__button" onClick={handleSaveClick}>
                    Save
                  </button>
                )}
              </span>
            </div>
          )}
        </div>
      </article>
    </Modal>
  );
}

export default ModalPost;
