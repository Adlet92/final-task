import React from "react";
import './FilterModal.css';

interface ModalProps {
  onClose: () => void;
}

const FilterModal: React.FC<ModalProps> = ({ onClose }) => {
  return (
    <>
    <div className="filter-modal-container">
      <div className="filter-modal-body">
        <div className="filter-label">
          Filters
        </div>
        <div className="gene">
          <div className="labels">
            Gene Name
          </div>
            <input
              className="gene-input"
              placeholder="Enter Gene name" />
        </div>
        <div>
          <div>
            <div className="labels">Organism</div>
                <div className="custom-select">
                <select className="select-class">
                <option value="" disabled selected hidden>
                  Select an option
                </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
          </div>
        </div>
        <div>
          <div className="labels">
            Sequence length
          </div>
          <div className="input-container">
              <input
                className="from-to-input"
                placeholder="From"/>
            <div className="divider"></div>
              <input
                className="from-to-input"
                placeholder="To"/>
          </div>
        </div>
        <div>
          <div>
            <div className="labels">
              Annotation score
            </div>
            <div className="custom-select">
                <select className="select-class">
                <option value="" disabled selected hidden>
                  Select an option
                </option>
                  <option value="option1">Option 1</option>
                  <option value="option2">Option 2</option>
                  <option value="option3">Option 3</option>
                </select>
              </div>
          </div>
        </div>
        <div>
          <div>
            <div className="labels">Protein with</div>
              <div className="custom-select">
                  <select className="select-class">
                  <option value="" disabled selected hidden>
                    Select
                  </option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
          </div>
        </div>
        <div className="button-container">
          <button className="buttons cancel">Cancel</button>
          <button className="buttons apply">Apply Filters</button>
        </div>
      </div>
    </div>
  </>
  );
};

export default FilterModal;
