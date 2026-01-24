import { useEffect, useState } from 'react';
import { taskService } from '../services/taskService';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ refreshTrigger, onEditTask }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskService.getAllTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await taskService.deleteTask(id);
        setTasks(tasks.filter(task => task._id !== id));
      } catch (err) {
        setError('Failed to delete task');
      }
    }
  };

  const handleToggleComplete = async (task) => {
    try {
      const updatedTask = await taskService.updateTask(task._id, {
        ...task,
        completed: !task.completed,
      });
      setTasks(tasks.map(t => (t._id === task._id ? updatedTask : t)));
    } catch (err) {
      setError('Failed to update task');
    }
  };

  if (loading) return <div className="loading">Loading tasks...</div>;

  return (
    <div className="task-list-container">
      {error && <div className="error-message">{error}</div>}
      
      {tasks.length === 0 ? (
        <div className="no-tasks">No tasks yet. Create one to get started!</div>
      ) : (
        <ul className="task-list">
          {tasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onDelete={handleDelete}
              onToggleComplete={handleToggleComplete}
              onEdit={onEditTask}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
