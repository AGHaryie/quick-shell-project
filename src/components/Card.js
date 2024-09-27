import React from 'react';
import './Card.css';
import defaultAvatar from '../assets/icons/SVG - Urgent Priority grey.svg'; // Default avatar
import urgentPriorityGrey from '../assets/icons/SVG - Urgent Priority grey.svg';
import lowPriority from '../assets/icons/Img - Low Priority.svg';
import mediumPriority from '../assets/icons/Img - Medium Priority.svg';
import highPriority from '../assets/icons/Img - High Priority.svg';
import noPriority from '../assets/icons/No-priority.svg';
import backlogIcon from '../assets/icons/Backlog.svg';
import inProgressIcon from '../assets/icons/in-progress.svg';
import todoIcon from '../assets/icons/To-do.svg';
import doneIcon from '../assets/icons/Done.svg';

// Helper function to get initials from user name
const getInitials = (name) => {
  const nameParts = name.split(' ');
  return nameParts.length > 1
    ? nameParts[0][0] + nameParts[1][0]
    : nameParts[0][0];
};

const Card = ({ task, users }) => {
  const assignedUser = users.find(user => user.id === task.userId);

  // Function to get the appropriate priority icon based on task priority
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 4:
        return urgentPriorityGrey;
      case 3:
        return highPriority;
      case 2:
        return mediumPriority;
      case 1:
        return lowPriority;
      default:
        return noPriority;
    }
  };

  // Function to get the appropriate status icon based on task status
  const getStatusIcon = (status) => {
    switch (status) {
      case 'Backlog':
        return backlogIcon;
      case 'In progress':
        return inProgressIcon;
      case 'Todo':
        return todoIcon;
      case 'Done':
        return doneIcon;
      default:
        return noPriority; // Default icon
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{task.id}</span>
        {/* Render user avatar or initials */}
        <div className="user-avatar-container">
          {assignedUser ? (
            assignedUser.image ? (
              <img
                className="user-avatar"
                src={`./assets/images/${assignedUser.image}`}
                alt={assignedUser.name}
              />
            ) : (
              <div className="initials-avatar">
                {getInitials(assignedUser.name)}
              </div>
            )
          ) : (
            <img className="user-avatar" src={defaultAvatar} alt="Default Avatar" />
          )}
          {/* Gray status circle */}
          <span className="status-indicator"></span>
        </div>
      </div>

      <div className="card-body">
        <div className="title-container">
          {/* Status Icon placed to the left of Title */}
          <img src={getStatusIcon(task.status)} alt="Status Icon" className="status-icon" />
          <h3 className="card-title">{task.title}</h3>
        </div>
        <div className="card-info">
          <div className="icon-container">
            <img src={getPriorityIcon(task.priority)} alt="Priority Icon" className="priority-icon" />
          </div>
          {/* New container for tag */}
          <div className="tag-container">
            <span className="tag">{task.tag[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
