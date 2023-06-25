import React, { useState, useEffect } from 'react';
import { listTasks, deleteTasks } from '../Services/TaskService';
import { useNavigate } from 'react-router-dom';
import '../ListTaskComponents.css';

const ListTaskCompoments = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAllTasks();
  }, []);

  const getAllTasks = () => {
    listTasks()
      .then((response) => {
        setTasks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeTasks = (taskId) => {
    deleteTasks(taskId)
      .then((response) => {
        getAllTasks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function addNewTask() {
    navigate('/add-task');
  }

  const updateTasks = (task_id) => {
    navigate(`/edit-task/${task_id}`);
  };

  return (
    <div className='container'>
      <h2 className='text-center'>Experience List</h2>
      <button className='btn btn-primary mb-2' onClick={addNewTask}>
        Add your Interview Experience
      </button>
      <div className='card-container'>
        {tasks.map((task) => (
          <div className='card' key={task.id}>
            <div className='card-body'>
              <h5 className='card-title'>{task.title}</h5>
              <p className='card-text'>{task.description}</p>
              <p className='card-text'>Interview Experience: {task.status}</p>
              <p className='card-text'>Job Offered: {task.assignee}</p>
              <div className='btn-group'>
                <button
                  className='btn btn-info'
                  onClick={() => updateTasks(task.task_id)}
                >
                  Update
                </button>
                <button
                  className='btn btn-danger'
                  onClick={() => removeTasks(task.task_id)}
                  style={{ marginLeft: '10px' }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListTaskCompoments;
