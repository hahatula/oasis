import './ModalForm.css';
import { Modal } from '../Modal/Modal';
import { users } from '../../utils/tempDB';
import { useState } from 'react';

type ModalFormProps = {
  formName: string;
  userId: number;
  onClose: () => void;
};

function ModalForm({ formName, onClose, userId }: ModalFormProps) {
  console.log({ formName, onClose, userId });
  const [selectedResident, setSelectedResident] = useState({
    id: 0,
    name: 'Choose your resident',
  });
  const [optionsVisibility, setOptionsVisibility] = useState('hidden');

  const toggleOptionsVisibility = () =>
    optionsVisibility === 'shown'
      ? setOptionsVisibility('hidden')
      : setOptionsVisibility('shown');

  //   const handleOptionClick = (resident) => {
  //     setSelectedResident(resident);
  //     toggleOptionsVisibility();
  //   };

  return (
    <Modal name={formName} onClose={onClose}>
      <h2 className="form-title">New post</h2>
      <form action="submit" method="post" id={formName} className="form">
        <div className="form__select-wrapper">
          <select
            className="form__select"
            name="resident"
            id="resident"
            required
            onClick={toggleOptionsVisibility}
          >
            <option
              className="form__select-default-option"
              value={selectedResident.id}
            >
              {selectedResident.name}
            </option>
          </select>
          <div className={`form__select-options_${optionsVisibility}`}>
            {
              /* map all the residents of the current user */
              users[userId - 1].residents?.map((resident, index) => (
                <div
                  className="form__select-option"
                  key={index}
                  onClick={() => {
                    setSelectedResident(resident);
                    toggleOptionsVisibility();
                  }}
                >
                  <img
                    className="form__select-option-img"
                    src={resident.avatarUrl}
                    alt={resident.name}
                  />
                  {resident.name}
                </div>
              ))
            }
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default ModalForm;
