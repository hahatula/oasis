import './Posts.css';
import Post from '../Post/Post';
import { posts } from '../../utils/tempDB';

function Posts() {
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
        />
      ))}
    </ul>
  );
}

export default Posts;
