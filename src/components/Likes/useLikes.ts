import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeToggled, setInitialLikes } from '../../redux/likesSlice';

export const useLikes = (id: number, initialLikes: number) => {
  const dispatch = useDispatch();

  // Get from Redux
  const likesState = useSelector(
    (state: {
      likes: { entities: { id: number; liked: boolean; count: number }[] };
    }) => state.likes.entities.find((entity) => entity.id === id)
  );

    // Dispatch the initial likes when the component mounts
    useEffect(() => {
        if (!likesState) {
          dispatch(setInitialLikes({ id, count: initialLikes }));
        }
      }, [dispatch, id, initialLikes, likesState]);

  const likesCount = likesState ? likesState.count : initialLikes;
  const isLiked = likesState ? likesState.liked : false;

  const toggleLike = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    dispatch(likeToggled({ id }));
  };

  return { likesCount, isLiked, toggleLike };
};
