import { useLikes } from './useLikes';
import { LikesProps } from './types';
import './Likes.css';

const Likes: React.FC<LikesProps> = ({ id, likes }) => {
  const { likesCount, isLiked, toggleLike } = useLikes(id, likes);

  return (
    <div className="likes">
      <button
        className={`likes__like-button ${
          isLiked && 'likes__like-button_checked'
        }`}
        onClick={toggleLike}
      ></button>
      {likesCount}
    </div>
  );
};

export default Likes;
