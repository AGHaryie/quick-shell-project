import React from 'react';

function DisplayOptions({ onGroupingChange, onSortChange }) {
  return (
    <div className="display-options">
      <div>
        <label>Group By: </label>
        <select onChange={(e) => onGroupingChange(e.target.value)}>
          <option value="status">Status</option>
          <option value="assignedUser">User</option>
          <option value="priority">Priority</option>
        </select>
      </div>

      <div>
        <label>Sort By: </label>
        <select onChange={(e) => onSortChange(e.target.value)}>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
    </div>
  );
}

export default DisplayOptions;
