import './Posts.css';
import Post from '../Post/Post';

const posts = [
  {
    id: 1,
    text: 'Exploring the beauty of the desert! The silence and vastness are just breathtaking.',
    photoUrl: 'https://images.pexels.com/photos/1048035/pexels-photo-1048035.jpeg?auto=compress&cs=tinysrgb&w=600',
    authors: {
      host: {
        name: 'Desert Guide',
        avatarUrl: 'https://images.pexels.com/photos/762020/pexels-photo-762020.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      resident: {
        name: 'Alice',
        avatarUrl: 'https://images.pexels.com/photos/2395251/pexels-photo-2395251.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    },
    likes: 120,
    createdAt: '2024-08-07T10:30:00Z',
  },
  {
    id: 2,
    text: 'Провека кириллицы! Water is crystal clear, and the palm trees are a perfect shade.',
    photoUrl: 'https://images.pexels.com/photos/1224158/pexels-photo-1224158.jpeg?auto=compress&cs=tinysrgb&w=600',
    authors: {
      host: {
        name: 'Марья Петровна',
        avatarUrl: 'https://images.pexels.com/photos/428364/pexels-photo-428364.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      resident: {
        name: 'Зеленушка',
        avatarUrl: 'https://images.pexels.com/photos/1600130/pexels-photo-1600130.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    },
    likes: 85,
    createdAt: '2024-08-06T14:20:00Z',
  },
  {
    id: 3,
    text: "Night falls, and the desert turns into a canvas of stars. It's a sight to behold.",
    photoUrl: 'https://images.pexels.com/photos/35196/water-plant-green-fine-layers.jpg?auto=compress&cs=tinysrgb&w=600',
    authors: {
      host: {
        name: 'Stargazer',
        avatarUrl: 'https://images.pexels.com/photos/904276/pexels-photo-904276.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      resident: {
        name: 'Charlie',
        avatarUrl: 'https://images.pexels.com/photos/60606/flowers-plant-tender-fine-60606.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    },
    likes: 150,
    createdAt: '2024-08-05T21:15:00Z',
  },
  {
    id: 4,
    text: 'Desert plants are so resilient! Just look at this cactus thriving in harsh conditions.',
    photoUrl: 'https://images.pexels.com/photos/1022922/pexels-photo-1022922.jpeg?auto=compress&cs=tinysrgb&w=600',
    authors: {
      host: {
        name: 'Botanist',
        avatarUrl: 'https://images.pexels.com/photos/428338/pexels-photo-428338.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      resident: {
        name: 'Dana',
        avatarUrl: 'https://images.pexels.com/photos/1445417/pexels-photo-1445417.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    },
    likes: 95,
    createdAt: '2024-08-04T11:05:00Z',
  },
  {
    id: 5,
    text: 'A mesmerizing sunset over the dunes. The colors are out of this world!',
    photoUrl: 'https://images.pexels.com/photos/1151418/pexels-photo-1151418.jpeg?auto=compress&cs=tinysrgb&w=600',
    authors: {
      host: {
        name: 'Sunset Chaser',
        avatarUrl: 'https://images.pexels.com/photos/1800456/pexels-photo-1800456.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
      resident: {
        name: 'Eve',
        avatarUrl: 'https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=200',
      },
    },
    likes: 200,
    createdAt: '2024-08-03T19:45:00Z',
  },
];

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
