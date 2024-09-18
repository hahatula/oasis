import './Posts.css';
import { useSelector } from 'react-redux';
import Post from '../Post/Post';
import { PostData } from '../../types/post';
import { getPosts } from '../../redux/selectors';

function Posts({
  handlePostClick,
}: {
  handlePostClick: (post: PostData) => void;
}) {
  const posts = useSelector(getPosts);

  return (
    <ul className="posts-grid">
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          text={post.text}
          photoUrl={post.photoUrl}
          authors={post.authors}
          likes={post.likes}
          createdAt={post.createdAt}
          handlePostClick={handlePostClick}
        />
      ))}
    </ul>
  );
}

export default Posts;
