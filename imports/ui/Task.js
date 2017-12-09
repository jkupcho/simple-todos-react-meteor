import React from 'react';

import { Tasks } from '../api/tasks';

export default ({task, toggleChecked, deleteTask}) => {
  const taskClassName = task.checked ? 'checked' : null;
  return (
    <li className={taskClassName}>
      <button className="delete" onClick={deleteTask}>
        &times;
      </button>
      <input
        type="checkbox"
        readOnly
        checked={!!task.checked}
        onClick={toggleChecked}
      />
      <span className="text">{task.text}</span>
    </li>
  );
}