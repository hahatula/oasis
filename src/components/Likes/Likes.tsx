import { LikesProps } from './types';
import './Likes.css';
import { useEffect, useState, memo } from 'react';
import { dislikePost, likePost } from '../../utils/api';
import { useSelector } from 'react-redux';
import { getUser } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import { addLike, removeLike } from '../../redux/postSlice';

const Likes: React.FC<LikesProps> = memo(({ id, likes }) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const [isLiked, setIsLiked] = useState(
    likes.some((like) => like._id === user?._id)
  );
  const [likeCount, setLikeCount] = useState(likes.length);

  const toggleLike = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();

    if (user) {
      try {
        if (isLiked) {
          await dislikePost(localStorage.jwt, id);
          dispatch(removeLike({ _id: id, user }));
        } else {
          await likePost(localStorage.jwt, id);
          dispatch(addLike({ _id: id, user }));
        }

        setIsLiked(!isLiked);
      } catch (error) {
        console.error('Error while toggling like:', error);
      }
    }
  };

  useEffect(() => {
    setIsLiked(likes.some((like) => like._id === user?._id));
    setLikeCount(likes.length);
  }, [likes, user]);

  return (
    <button className={`likes ${
      isLiked && 'likes_checked'
    }`} onClick={toggleLike}>
      <div
        className={`likes__icon ${
          isLiked && 'likes__icon_checked'
        }`}
        // onClick={toggleLike}
      ></div>
      {likeCount}
    </button>
  );
});

export default Likes;
