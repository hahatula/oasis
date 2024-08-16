import React from 'react';
import './Post.css';
import { PostProps } from '../../types/post';
import Author from '../Author/Author';

const Post: React.FC<PostProps> = ({
  id,
  text,
  photoUrl,
  authors,
  likes,
  createdAt,
  handlePostClick,
}) => {
  const openPostPopup: () => void = () => {
    console.log('Post opened');
    handlePostClick({ id, text, photoUrl, authors, likes, createdAt });
  };

  return (
    <li className="post">
      <Author
        hostAvatar={authors.host.avatarUrl}
        hostName={authors.host.name}
        residentAvatar={authors.resident.avatarUrl}
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
          <div className="post__likes">
            <button className="post__like-button"></button>
            {likes}
          </div>
        </div>
        <p className="post__date">Posted {createdAt}</p>
        <p className="post__text">{text}</p>
      </div>
    </li>
  );
};

export default Post;
