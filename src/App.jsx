import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [editingTask, setEditingTask] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleTaskSaved = () => {
    setEditingTask(null);
    setRefreshTrigger(prev => prev + 1);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  return (
    <div className="app" >
      <header className="app-header" style={{marginTop:"20px"}}>
        <div className="header-content">
          <h1>Task Manager</h1>
        </div>
      </header>

      <main className="app-main" style={{border:"1px solid black"}}>
        <div className="container" >
          <TaskForm
            editingTask={editingTask}
            onTaskSaved={handleTaskSaved}
            onCancel={handleCancelEdit}
          />
          <TaskList
            refreshTrigger={refreshTrigger}
            onEditTask={handleEditTask}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
