# Task Manager Frontend - React + Vite

A modern, responsive React frontend for the Task Management API built with Vite.

## Features

- **Create Tasks** - Add new tasks with a simple form
- **View All Tasks** - See all your tasks in a list
- **Edit Tasks** - Modify existing tasks
- **Complete Tasks** - Mark tasks as done
- **Delete Tasks** - Remove tasks you no longer need
- **Responsive Design** - Works on desktop and mobile devices
- **Real-time Updates** - Changes sync instantly with the backend

## Setup

### Prerequisites
- Node.js (v14+)
- npm or yarn
- Backend server running on `http://localhost:5000`

### Installation

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure the API URL:**
   The `.env` file is already created with:
   ```
   VITE_API_URL=http://localhost:5000/api
   ```
   Update this if your backend is hosted elsewhere.

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   The app will run on `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── TaskForm.jsx       # Form to create/edit tasks
│   ├── TaskForm.css
│   ├── TaskList.jsx       # Component to display all tasks
│   ├── TaskList.css
│   ├── TaskItem.jsx       # Individual task component
│   └── TaskItem.css
├── services/
│   └── taskService.js     # API calls to backend
├── App.jsx                # Main app component
├── App.css
├── main.jsx               # React entry point
└── index.css
.env                       # Environment variables
```

## How It Works

### Components

1. **TaskForm** - Handles creating new tasks and editing existing ones
   - Shows a form at the top of the page
   - Validates task title before submission
   - Displays error messages if something goes wrong

2. **TaskList** - Displays all tasks from the backend
   - Fetches tasks on page load
   - Updates automatically after creating/editing/deleting tasks
   - Shows a loading state while fetching

3. **TaskItem** - Individual task in the list
   - Shows task title and creation date
   - Checkbox to mark task as complete
   - Edit and Delete buttons

### Services

**taskService.js** - Handles all API communication with the backend:
- `getAllTasks()` - GET all tasks
- `getTaskById(id)` - GET a specific task
- `createTask(data)` - POST a new task
- `updateTask(id, data)` - PUT to update a task
- `deleteTask(id)` - DELETE a task

## Building for Production

To create a production build:

```bash
npm run build
```

This generates optimized files in the `dist/` folder.

To preview the production build locally:

```bash
npm run preview
```

## Environment Variables

The `.env` file contains:

```
VITE_API_URL=http://localhost:5000/api
```

When deploying:
- For development: Leave as `http://localhost:5000/api`
- For production: Update to your production backend URL (e.g., `https://api.yourdomain.com/api`)

## Troubleshooting

### "Cannot connect to backend"
- Ensure the backend server is running on `http://localhost:5000`
- Check the `.env` file for the correct `VITE_API_URL`
- Check browser console (F12) for error messages

### "Tasks not loading"
- Check that the backend API is responding: `http://localhost:5000/api/tasks`
- Verify CORS is enabled on the backend (Express should handle this)

### "Changes not saving"
- Check the browser network tab to see API responses
- Look for error messages in the backend console
- Ensure all required fields are filled in the form

## Running Both Frontend and Backend

**Terminal 1 - Backend:**
```bash
cd backend
npm start
# Server running on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# App running on http://localhost:5173
```

Then open `http://localhost:5173` in your browser.

## Technologies Used

- **React** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling
- **Fetch API** - HTTP requests to backend

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Notes

- The app uses Vite's environment variables with the `VITE_` prefix
- All API errors are caught and displayed to the user
- The form clears after successful submission
- Tasks are automatically sorted by creation date (newest first)
