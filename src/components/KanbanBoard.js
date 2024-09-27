import React, { useState, useEffect } from 'react';
import { fetchTickets, fetchUsers } from '../services/api';
import { groupBy } from '../utils/utils';
import Card from './Card';
import Header from './Header';
import urgentPriorityGrey from '../assets/icons/SVG - Urgent Priority colour.svg';
import lowPriority from '../assets/icons/Img - Low Priority.svg';
import mediumPriority from '../assets/icons/Img - Medium Priority.svg';
import highPriority from '../assets/icons/Img - High Priority.svg';
import noPriority from '../assets/icons/No-priority.svg';
import plusIcon from '../assets/icons/add.svg'; // Importing plus icon
import dotsIcon from '../assets/icons/3 dot menu.svg'; // Importing dots icon
import inProgressStatus from '../assets/icons/in-progress.svg';
import pendingStatus from '../assets/icons/To-do.svg';
import backlogStatus from '../assets/icons/Backlog.svg';
import completedStatus from '../assets/icons/Done.svg';
import cancelledStatus from '../assets/icons/Cancelled.svg';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [grouping, setGrouping] = useState('userId');  // Default grouping by userId
  const [orderBy, setOrderBy] = useState('priority');  // Default sorting by priority

  useEffect(() => {
    // Fetch tickets and users
    const getData = async () => {
      try {
        const ticketsData = await fetchTickets();
        const usersData = await fetchUsers();
        setTasks(ticketsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const groupedTasks = groupBy(tasks, grouping);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Cancelled':
        return cancelledStatus;
      case 'In progress':
        return inProgressStatus;
      case 'Todo':
        return pendingStatus;
      case 'Backlog':
        return backlogStatus;
      default:
        return completedStatus;  // Default icon for unknown statuses
    }
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case 'Cancelled':
        return 'Cancelled';
      case 'In progress':
        return 'In Progress';
      case 'Todo':
        return 'Pending';
      case 'Backlog':
        return 'Backlog';
      default:
        return 'Completed';
    }
  };
  
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

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4:
        return 'Urgent';
      case 3:
        return 'High';
      case 2:
        return 'Medium';
      case 1:
        return 'Low';
      default:
        return 'No Priority';
    }
  };

  const getInitials = (name) => {
    const nameParts = name.split(' ');
    return nameParts.length > 1
      ? nameParts[0][0] + nameParts[1][0]
      : nameParts[0][0];
  };

  return (
    <div className="kanban-container">
      <Header setGrouping={setGrouping} setOrderBy={setOrderBy} />

      <div className="kanban-board">
        {Object.keys(groupedTasks).map((groupKey) => (
          <div key={groupKey} className="kanban-column">
            <div className="kanban-column-header">
              <div className="header-content">
                <div className="header-left">
                  {grouping === 'userId' ? (
                    (() => {
                      const assignedUser = users.find(user => user.id.toString() === groupKey);
                      return assignedUser ? (
                        <>
                          {assignedUser.image ? (
                            <img
                              className="user-avatar"
                              src={`./assets/images/${assignedUser.image}`}
                              alt={assignedUser.name}
                              style={{ width: '40px', borderRadius: '50%', marginRight: '10px' }}
                            />
                          ) : (
                            <div className="initials-avatar" style={{ marginRight: '10px' }}>
                              {getInitials(assignedUser.name)}
                            </div>
                          )}
                          <span>{assignedUser.name}</span>
                          <span style={{ color: 'gray' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{groupedTasks[groupKey].length}</span>
                        </>
                      ) : (
                        <div>Unassigned {groupedTasks[groupKey].length}</div>
                      );
                    })()
                  ) : grouping === 'status' ? (
                    <>
                      <img
                        src={getStatusIcon(groupKey)}
                        alt={`${getStatusLabel(groupKey)} Status Icon`}
                        className="status-icon"
                        style={{ width: '40px', marginRight: '10px' }}
                      />
                      <span>{getStatusLabel(groupKey)}</span>
                      <span style={{ color: 'gray' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{groupedTasks[groupKey].length}</span>
                    </>
                  ) : (
                    <>
                      <img
                        src={getPriorityIcon(Number(groupKey))}
                        alt={`${getPriorityLabel(Number(groupKey))} Priority Icon`}
                        className="priority-icon"
                        style={{ width: '40px', marginRight: '10px' }}
                      />
                      <span>{getPriorityLabel(Number(groupKey))}</span>
                      <span style={{ color: 'gray' }}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{groupedTasks[groupKey].length}</span>
                    </>
                  )}
                </div>

                {/* Right side with plus and dots icons */}
                <div className="header-right">
                  <img
                    src={plusIcon}
                    alt="Add Task"
                    style={{ width: '20px', height: '20px', marginLeft: '10px', cursor: 'pointer' }}
                    onClick={() => console.log('Add Task clicked')}
                  />
                  <img
                    src={dotsIcon}
                    alt="Options"
                    style={{ width: '20px', height: '20px', marginLeft: '10px', cursor: 'pointer' }}
                    onClick={() => console.log('Options clicked')}
                  />
                </div>
              </div>
            </div>

            {groupedTasks[groupKey]
              .sort((a, b) => {
                if (orderBy === 'priority') return b.priority - a.priority;
                if (orderBy === 'title') return a.title.localeCompare(b.title);
                return 0;
              })
              .map((task) => (
                <Card key={task.id} task={task} users={users} />
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;
