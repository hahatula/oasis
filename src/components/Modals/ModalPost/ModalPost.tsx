import './ModalPost.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getModal } from '../../../redux/selectors';
import { Modal } from '../../Modal/Modal';
import { ModalPostProps, newPostData } from '../../../types/post';
import Author from '../../Author/Author';
import Likes from '../../Likes/Likes';
import { addPost, updatePost } from '../../../redux/postSlice';
import { formatTime } from '../../../utils/helpers';
import { createPost, getUserInfo } from '../../../utils/api';
import { setUser } from '../../../redux/userSlice';

function ModalPost({
  _id,
  text,
  photoUrl,
  authors,
  likes,
  createdAt,
  onClose,
}: ModalPostProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const modalIsActive = useSelector(getModal);
  const [postModalMode, setPostModalMode] = useState(
    modalIsActive === 'add-post-next' ? 'edit' : 'view'
  );
  const [postText, setPostText] = useState(text);

  const postingTime = formatTime(new Date(createdAt));

  const handleEditClick = () => {
    console.log('edit');
    setPostModalMode('edit');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleDeleteClick = () => {
    console.log('delete it');
  };

  const handleSaveClick = () => {
    const newPost = {
      text: postText,
      photoUrl: photoUrl,
      residentId: authors.resident._id,
    };

    const updatedPost = {};

    modalIsActive === 'add-post-next' ? saveNewPost(newPost) : saveUpdatedPost(updatedPost);
    setPostModalMode('view');
    onClose();
    // savePost(newPost);
  };

  const saveNewPost = async (post: newPostData) => {
    try {
      const createdPost = await createPost(localStorage.jwt, post);
      const updatedUser = await getUserInfo(localStorage.jwt);
      dispatch(setUser(updatedUser));
      console.log(createdPost);
      console.log(updatedUser);
      console.log(user);
      dispatch(addPost(createdPost));
      navigate('/');
    } catch (err) {
      console.error('Failed to create new post or update list:', err);
    }
  };

  const saveUpdatedPost = async (post: newPostData) => {
    try {
      const updatedPost = await updatePost(localStorage.jwt, post);
      // const updatedUser = await getUserInfo(localStorage.jwt);
      // dispatch(setUser(updatedUser));
      console.log(updatedPost);
      // console.log(updatedUser);
      console.log(user);
      dispatch(addPost(updatedPost));
      navigate('/');
    } catch (err) {
      console.error('Failed to update post or update list:', err);
    }
  };

  // const oldhandleSaveClick = () => {
  //   const create = () => {
  //     const newPost = {
  //       id: Date.now(), // temp ID
  //       text: postText,
  //       photoUrl: photoUrl,
  //       authors: authors,
  //       createdAt: new Date().toISOString(),
  //       likes: 0,
  //     };
  //     dispatch(addPost(newPost));
  //     navigate('/');
  //   };
  //   const update = () => {
  //     dispatch(updatePost({ id, newText: postText }));
  //     console.log('save post');
  //   };
  //   modalIsActive === 'add-post-next' ? create() : update();
  //   setPostModalMode('view');
  //   onClose();
  // };

  return (
    <Modal name="post" onClose={onClose}>
      <article className="post modal-post">
        <Author
          hostAvatar={authors.host.avatarUrl}
          hostName={authors.host.name}
          residentAvatar={authors.resident.avatar}
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
            <Likes id={_id} likes={likes} />
          </div>
          {postModalMode === 'view' && (
            <div className="modal-post__content-wrapper">
              <p className="post__text modal-post__text">{postText}</p>
              <span className="modal-post__options">
                <p className="post__date">
                  Posted{' '}
                  {postingTime.trim() === '0 days'
                    ? 'today'
                    : `${postingTime} ago`}
                </p>
                {authors.host._id === user?._id && (
                  <button className="post__button" onClick={handleEditClick}>
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
              {authors.host._id === user?._id && (
                <span className="modal-post__options">
                  <button className="post__button" onClick={handleDeleteClick}>
                    Delete
                  </button>
                  <button className="post__button" onClick={handleSaveClick}>
                    Save
                  </button>
                </span>
              )}
            </div>
          )}
        </div>
      </article>
    </Modal>
  );
}

export default ModalPost;
