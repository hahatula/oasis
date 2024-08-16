import './Posts.css';
import Post from '../Post/Post';
import { posts } from '../../utils/tempDB';
import { PostData } from '../../types/post';

function Posts({ handlePostClick }: { handlePostClick: (post: PostData) => void }) {
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
