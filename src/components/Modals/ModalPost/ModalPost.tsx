import './ModalPost.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, getModal, getPosts } from '../../../redux/selectors';
import { Modal } from '../../Modal/Modal';
import { newPostData, updatedPostData } from '../../../types/post';
import Author from '../../Author/Author';
import Likes from '../../Likes/Likes';
import { addPost, editPost, removePost } from '../../../redux/postSlice';
import { formatTime } from '../../../utils/helpers';
import {
  createPost,
  deletePosts,
  getUserInfo,
  updatePost,
} from '../../../utils/api';
import { setUser } from '../../../redux/userSlice';

export type ModalPostProps = {
  postId: string;
  onClose: () => void;
  newPost?: {
    text: string;
    photoUrl: string;
    authors: {
      host: {
        _id: string;
        name: string;
        avatar: string;
      };
      resident: {
        _id: string;
        name: string;
        avatar: string;
        species: string;
      };
    };
    createdAt: string;
    likes: [];
  };
};

function ModalPost({ postId, onClose, newPost }: ModalPostProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const posts = useSelector(getPosts);
  const modal = useSelector(getModal);
  const [postText, setPostText] = useState('');
  const [postModalMode, setPostModalMode] = useState(
    modal.modalIsActive === 'add-post-next' ? 'edit' : 'view'
  );

  const post = newPost || posts.find((post) => post._id === postId);

  useEffect(() => {
    if (post) {
      setPostText(post.text);
    }
  }, [post]);

  if (!post) {
    return <p>Post not found</p>;
  }

  const { photoUrl, authors, likes, createdAt } = post;

  const postingTime = formatTime(new Date(createdAt));
  const isToday =
    createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10);

  const handleEditClick = () => {
    setPostModalMode('edit');
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostText(e.target.value);
  };

  const handleDeleteClick = () => {
    deletePosts(localStorage.jwt, postId);
    dispatch(removePost({ _id: postId }));
    onClose();
  };

  const handleSaveClick = () => {
    const newPost = {
      text: postText,
      photoUrl: photoUrl,
      residentId: authors.resident._id,
    };

    const updatedPost = {
      id: postId,
      text: postText,
    };

    modal.modalIsActive === 'add-post-next'
      ? saveNewPost(newPost)
      : saveUpdatedPost(updatedPost);
    setPostModalMode('view');
    onClose();
  };

  const saveNewPost = async (post: newPostData) => {
    try {
      const createdPost = await createPost(localStorage.jwt, post);
      const updatedUser = await getUserInfo(localStorage.jwt);
      dispatch(setUser(updatedUser));
      dispatch(addPost(createdPost));
      navigate('/');
    } catch (err) {
      console.error('Failed to create new post or update list:', err);
    }
  };

  const saveUpdatedPost = async (post: updatedPostData) => {
    try {
      const updatedPost = await updatePost(
        localStorage.jwt,
        post.id,
        post.text
      );
      dispatch(editPost(updatedPost));
      navigate('/');
    } catch (err) {
      console.error('Failed to update post or update list:', err);
    }
  };

  return (
    <Modal name="post" onClose={onClose}>
      <article className="post modal-post">
        <Author
          hostAvatar={authors.host.avatar}
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
            <Likes id={postId} likes={likes} />
          </div>
          {postModalMode === 'view' && (
            <div className="modal-post__content-wrapper">
              <p className="post__text modal-post__text">{postText}</p>
              <span className="modal-post__options">
                <p className="post__date">
                  Posted{' '}
                  {postingTime.trim() === '0 days' && isToday
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
