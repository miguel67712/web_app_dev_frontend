import './TaskItem.css';

function TaskItem({ task, onDelete, onToggleComplete, onEdit }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-content">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task)}
          className="task-checkbox"
        />
        <div className="task-info">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-date">Created: {formatDate(task.createdAt)}</p>
        </div>
      </div>
      <div className="task-actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(task)}
          title="Edit task"
        >
          Edit
        </button>
        <button
          className="btn btn-delete"
          onClick={() => onDelete(task._id)}
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
