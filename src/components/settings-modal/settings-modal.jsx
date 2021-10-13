import React from 'react';

// import PomoTodosForm from "../pomo-todos/pomo-todos-form"
import PomoTodosList from '../pomo-todos/pomo-todos-list';

import "./settings-modal.styles.scss"

const SettingsModal = ({ workValue, breakValue, handleChange, handleSubmit, settingsFormError, showModal }) => {

  return (
    <div className="modal" id="modal">
      <div className="modal-content">
        {/* <div className="modal-header">Set Custom Timer (in minutes)</div> */}
        <div className="modal-body">
          <form className="settings-form" onSubmit={(event) => handleSubmit(event, workValue, breakValue)} id="settings-form">
            <div className="form-group">
              <label htmlFor="work-value">Work || </label>
              <input autoFocus type="text" name="workValue" className="pomo-input" maxLength="2" onChange={(event) => handleChange(event)} value={workValue} id="work-value" required />
            </div>
            <div className="form-group">
              <label htmlFor="break-value">Break || </label>
              <input type="text" name="breakValue" className="pomo-input" maxLength="2" onChange={(event) => handleChange(event)} value={breakValue} id="break-value" required />
            </div>
            <div className="button-group">
              <input type="submit" className="button modal-button" value="Save" />
              <input type="button" className="button modal-button cancel" onClick={() => showModal(false)} value="Cancel" />
            </div>
          </form>
          {settingsFormError ? <p className="message error-message"><span className="fa fa-exclamation-circle fa-lg fa-fw"></span> Please enter a number between 1 and 60 to set a custom Work Timer and Break Timer.</p> : null}
        </div>
      </div>
      <PomoTodosList />
    </div>
  );
}

export default SettingsModal;
