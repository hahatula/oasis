import React from 'react';
import './Post.css';

type PostProps = {
  id: number;
  text: string;
  photoUrl: string;
  authors: {
    host: {
      name: string;
      avatarUrl: string;
    };
    resident: {
      name: string;
      avatarUrl: string;
    };
  };
  likes?: number;
  createdAt: string;
  //TODO: use type Date?
};

const Post: React.FC<PostProps> = ({
  text,
  photoUrl,
  authors,
  likes,
  createdAt,
}) => {
  return (
    <li className="post">
      <div className="post__author author">
        <div className="author__avatars">
          <img
            className="author__avatar"
            src={authors.host.avatarUrl}
            alt={authors.host.name}
          />
          <img
            className="author__avatar"
            src={authors.resident.avatarUrl}
            alt={authors.resident.name}
          />
        </div>
        <div className="author__info">
          <div className="author__info-wrapper">
            <h2 className="author__resident-name">{authors.resident.name}</h2>
            <p className="author__date-posted">{createdAt}</p>
          </div>
          <p className="author__host-name">Hosted by {authors.host.name}</p>
        </div>
      </div>
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
        <p className="post__text">{text}</p>
      </div>
    </li>
  );
};

export default Post;
