import React, { useState } from 'react';
import './Header.css';
import DisplayIcon from '../assets/icons/Display.svg';
import DownIcon from '../assets/icons/down.svg';

const Header = ({ setGrouping, setOrderBy }) => {
  const [grouping, setGroupingState] = useState('status');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleGroupingChange = (value) => {
    setGroupingState(value);
    setGrouping(value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="header">
      <button className="display-btn" onClick={toggleDropdown}>
        <img src={DisplayIcon} alt="Display Icon" className="filter-icon" /> 
            Display 
        <img src={DownIcon} alt="Dropdown Icon" className="dropdown-icon" />
        </button>
      {dropdownOpen && (
        <div className="dropdown">
          <div className="dropdown-section">
            <label htmlFor="grouping">Grouping</label>
            <select
              onChange={(e) => handleGroupingChange(e.target.value)}
              id="grouping"
              className="dropdown-select"
            >
              <option value="status">Status</option>
              <option value="userId">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>
          <div className="dropdown-section">
            <label htmlFor="ordering">Ordering</label>
            <select
              onChange={(e) => setOrderBy(e.target.value)}
              id="ordering"
              className="dropdown-select"
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
              {/* Add conditional options based on the grouping selection */}
              {grouping === 'userId' && (
                <>
                  <option value="userName">User Name</option>
                </>
              )}
              {grouping === 'status' && (
                <>
                </>
              )}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
