import './Toolbar.css';
import { useDispatch } from 'react-redux';
import { openModal } from '../../redux/modalSlice';

function Toolbar() {
  const dispatch = useDispatch();

  const handleAddPost = (): void => {
    console.log('clicked add');
    dispatch(openModal('add-post'));
  };
  return (
    <>
      <div className="toolbar">
        <p className="toolbar__button">Graveyard</p>
        <p className="toolbar__button">Latest news</p>
        <p className="toolbar__button">Followed news</p>
        <p className="toolbar__button" onClick={handleAddPost}>
          Add post
        </p>
      </div>
    </>
  );
}
export default Toolbar;
