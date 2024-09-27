import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getModal, getUser } from '../../redux/selectors';
import { PostData } from '../../types/post';
import { openModal, closeModal } from '../../redux/modalSlice';
import ModalAddPost from './ModalAddPost/ModalAddPost';
import ModalAddResident from './ModalAddResident/ModalAddResident';
import ModalPost from './ModalPost/ModalPost';
import { CURRENT_USER_TEMP } from '../../utils/constants';
import { users } from '../../utils/tempDB';

export const Modals = ({ post }: { post: PostData | null }) => {
  const dispatch = useDispatch();
  const modalIsActive = useSelector(getModal);
  const user = useSelector(getUser);
  const [selectedPost, setSelectedPost] = useState<PostData | null>(post);
  const [newPostData, setNewPostData] = useState<{
    resident: {
      id: number;
      name: string;
      avatarUrl: string;
      species: string;
    };
    photoUrl: string;
  } | null>(null);

  const handleActiveModalClose = (): void => {
    dispatch(closeModal());
    selectedPost && setSelectedPost(null);
    setNewPostData(null);
  };

  const handleNextFromAddPost = (
    resident: {
      id: number;
      name: string;
      avatarUrl: string;
      species: string;
    },
    photoUrl: string
  ) => {
    setNewPostData({ resident, photoUrl });
    dispatch(openModal('add-post-next'));
  };

  return (
    <>
      {modalIsActive === 'view-post' && post && (
        <ModalPost
          id={post.id}
          text={post.text}
          photoUrl={post.photoUrl}
          authors={post.authors}
          createdAt={post.createdAt}
          likes={post.likes}
          onClose={handleActiveModalClose}
        />
      )}
      {modalIsActive === 'add-post' && (
        <ModalAddPost
          formName="add-post"
          onClose={handleActiveModalClose}
          userId={CURRENT_USER_TEMP}
          onNext={handleNextFromAddPost}
        />
      )}
      {modalIsActive === 'add-post-next' && newPostData && (
        <ModalPost
          id={10000000} // TODO: remove временный id для нового поста
          text={''} 
          photoUrl={newPostData.photoUrl}
          authors={{
            host: {
              id: user,
              name: users[CURRENT_USER_TEMP - 1].name,
              avatarUrl: users[CURRENT_USER_TEMP - 1].avatarUrl,
            },
            resident: newPostData.resident,
          }}
          createdAt={new Date().toISOString()}
          likes={0}
          onClose={handleActiveModalClose}
        />
      )}
      {modalIsActive === 'add-resident' && (
        <ModalAddResident
          formName="add-resident"
          onClose={handleActiveModalClose}
        />
      )}
      {/* {modalIsActive === 'sign-in' && (
        <ModalSingIn formName="sign-in" onClose={handleActiveModalClose} />
      )} */}
    </>
  );
};
