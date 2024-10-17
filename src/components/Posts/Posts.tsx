import './Posts.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Post } from '../Post/Post';
import { PostData } from '../../types/post';
import { getPosts } from '../../redux/selectors';

export const Posts = ({
  handlePostClick,
}: {
  handlePostClick: (post: PostData) => void;
}) => {
  const posts = useSelector(getPosts);

  const postsToShow = useMemo(() => {
    if (posts) {
      return [...posts].reverse();
    }
  }, [posts]);

  return (
    <>
      {postsToShow?.length ? (
        <ul className="posts-grid">
          {postsToShow.map((post) => (
            <Post
              key={post._id}
              _id={post._id}
              text={post.text}
              photoUrl={post.photoUrl}
              authors={post.authors}
              likes={post.likes}
              createdAt={post.createdAt}
              handlePostClick={handlePostClick}
            />
          ))}
        </ul>
      ) : (
        <p>No posts yet</p>
      )}
    </>
  );
};
