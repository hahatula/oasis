import './Toolbar.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modalSlice';

function Toolbar() {
  const dispatch = useDispatch();

  const handleAddPost = (): void => {
    console.log('clicked add post');
    dispatch(openModal('add-post'));
  };

  const handleAddResident = (): void => {
    console.log('clicked add resident');
    dispatch(openModal('add-resident'));
  };

  return (
    <>
      <div className="toolbar">
        <button type='button' className="toolbar__button" disabled>Graveyard</button>
        {/* <p className="toolbar__button">Latest news</p> */}
        {/* <p className="toolbar__button">Followed news</p> */}
        <button type='button' className="toolbar__button" onClick={handleAddResident}>
          Add resident
        </button>
        <button type='button' className="toolbar__button" onClick={handleAddPost}>
          Add post
        </button>
      </div>
    </>
  );
}
export default Toolbar;
