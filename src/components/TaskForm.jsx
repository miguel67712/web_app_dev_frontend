import { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import './TaskForm.css';

function TaskForm({ editingTask, onTaskSaved, onCancel }) {
  const [title, setTitle] = useState('');
  const [completed, setCompleted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setCompleted(editingTask.completed);
    } else {
      setTitle('');
      setCompleted(false);
    }
    setError(null);
  }, [editingTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (editingTask) {
        // Update existing task
        await taskService.updateTask(editingTask._id, {
          title: title.trim(),
          completed,
        });
      } else {
        // Create new task
        await taskService.createTask({
          title: title.trim(),
          completed,
        });
      }
      setTitle('');
      setCompleted(false);
      onTaskSaved();
    } catch (err) {
      setError(err.message || 'Failed to save task');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="task-form-container">
      <h2>{editingTask ? 'Edit Task' : 'Create New Task'}</h2>
      
      <form onSubmit={handleSubmit} className="task-form">
        {error && <div className="error-message">{error}</div>}
        
        <div className="form-group">
          <label htmlFor="title">Task Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task description..."
            maxLength="100"
            disabled={loading}
            autoFocus
          />
          <span className="char-count">{title.length}/100</span>
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="completed">
            <input
              type="checkbox"
              id="completed"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              disabled={loading}
            />
            Mark as completed
          </label>
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : editingTask ? 'Update Task' : 'Create Task'}
          </button>
          {editingTask && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
