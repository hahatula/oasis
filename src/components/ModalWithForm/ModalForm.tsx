import './ModalForm.css';
import { Modal } from '../Modal/Modal';
import { users } from '../../utils/tempDB';

type ModalFormProps = {
  formName: string;
  userId: number;
  onClose: () => void;
};

function ModalForm({ formName, onClose, userId }: ModalFormProps) {
    console.log({ formName, onClose, userId });
  return (
    <Modal name={formName} onClose={onClose}>
      <h2 className="form-title">New post</h2>
      <form action="submit" method="post" id={formName} className="form">
        <select className="form__select" name="resident" id="resident" required>
          <option value="">Choose your resident</option>
          {
            /* map all the residents of the current user */
            users[userId-1].residents?.map((resident, index) => (
              <option value={resident.id} key={index}>{resident.name}</option>
            ))
          }
          <option value="">Add new resident</option>
        </select>
      </form>
    </Modal>
  );
}

export default ModalForm;
