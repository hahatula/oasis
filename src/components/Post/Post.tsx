import './Post.css';
import { memo } from 'react';
import { PostProps } from '../../types/post';
import Author from '../Author/Author';
import Likes from '../Likes/Likes';
import { formatTime } from '../../utils/helpers';

export const Post: React.FC<PostProps> = memo(({
  _id,
  text,
  photoUrl,
  authors,
  likes,
  createdAt,
  handlePostClick,
}) => {
  const openPostPopup: () => void = () => {
    console.log('Post opened');
    handlePostClick({ _id, text, photoUrl, authors, likes, createdAt });
  };

  const postingTime = formatTime(new Date(createdAt));
  const isToday =
    createdAt.slice(0, 10) === new Date().toISOString().slice(0, 10);

  return (
    <li className="post">
      <Author
        hostAvatar={authors.host.avatar}
        hostName={authors.host.name}
        residentAvatar={authors.resident.avatar}
        residentName={authors.resident.name}
        residentSpecies={authors.resident.species}
        placement="post"
      />
      <div onClick={openPostPopup} className="post__body">
        <div className="post__image-wrapper">
          <img
            className="post__image"
            src={photoUrl}
            alt={`${authors.resident.name}'s post`}
          />
          <Likes id={_id} likes={likes} />
        </div>
        <p className="post__date">
          Posted{' '}
          {postingTime.trim() === '0 days' && isToday
            ? 'today'
            : `${postingTime} ago`}
        </p>
        <p className="post__text">{text}</p>
      </div>
    </li>
  );
});
