import './Toolbar.css';
import { useAppDispatch } from '../../redux/hooks';
import { openModal } from '../../redux/modalSlice';
import addPostIcon from '../../assets/add-post.svg';
import addResidentIcon from '../../assets/add-plant.svg';
import graveyardIcon from '../../assets/dead-plant.svg';

function Toolbar() {
  const dispatch = useAppDispatch();

  const handleAddPost = (): void => {
    dispatch(openModal('add-post'));
  };

  const handleAddResident = (): void => {
    dispatch(openModal('add-resident'));
  };

  return (
    <>
      <div className="toolbar">
        <button type="button" className="toolbar__button" disabled>
          <img src={graveyardIcon} />
          <p className="toolbar__button-text">Graveyard</p>
          <label className="toolbar__button-tip">
            Graveyard {'('}commimg soon{')'}
          </label>
        </button>
        {/* <p className="toolbar__button">Latest news</p> */}
        {/* <p className="toolbar__button">Followed news</p> */}
        <button
          type="button"
          className="toolbar__button"
          onClick={handleAddResident}
        >
          <img src={addResidentIcon} />
          <p className="toolbar__button-text">Add resident</p>
          <label className="toolbar__button-tip">Add resident</label>
        </button>
        <button
          type="button"
          className="toolbar__button"
          onClick={handleAddPost}
        >
          <img src={addPostIcon} />
          <p className="toolbar__button-text">Add post</p>
          <label className="toolbar__button-tip">Add post</label>
        </button>
      </div>
    </>
  );
}
export default Toolbar;
