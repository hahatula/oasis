import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { likeToggled, setInitialLikes } from '../../redux/likesSlice';
import { getLikes } from '../../redux/selectors';
import { RootState } from '../../redux/store';

export const useLikes = (id: string, initialLikes: number) => {
  const dispatch = useDispatch();
  const likesState = useSelector((state: RootState) => getLikes(state, id));

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
