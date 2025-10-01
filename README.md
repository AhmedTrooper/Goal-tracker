# Goal Tracker

A full-stack web application for managing personal goals with CRUD operations, automatic deadline tracking, and performance analytics. Built with Node.js/Express backend and Vue.js frontend.

## Table of Contents
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Backend Architecture](#backend-architecture)
- [Frontend Features](#frontend-features)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
- [Setup Instructions](#setup-instructions)
- [Feature Implementation Details](#feature-implementation-details)

## Project Overview

This is a personal goal tracking application that allows users to create, manage, and track their goals with the following capabilities:
- Create new goals with descriptions and deadlines
- View all goals in a responsive card layout
- Mark goals as finished or discarded
- Automatic deadline monitoring with auto-discard functionality
- Performance analytics with chart visualizations
- Detailed goal view with complete CRUD operations

**Project Structure**: Full-stack separation with backend API in root directory and frontend Vue app in `front_goal_tracker/` folder.

## Tech Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **Morgan** for request logging
- **Multer** for file uploads (configured but not actively used)

### Frontend
- **Vue.js 3** with Composition and Options API
- **Vue Router** for navigation
- **Axios** for HTTP requests
- **Chart.js** with vue-chartjs for performance visualization
- **Tailwind CSS** for styling
- **Vite** for build tooling

## Backend Architecture

### Server Configuration (`index.js`)
The main server file demonstrates a straightforward Express setup:

```javascript
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Database connection
mongoose.connect(process.env.MONGODB_URL).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server started on port ${process.env.PORT}`);
    });
});
```

### Controller Pattern Implementation
The project follows a clear separation of concerns with dedicated controllers for each operation:

**Goal Creation** (`controller/goal_create_controller_post.js`):
```javascript
async function goal_create_controller_post(req, res) {
    try {
        const newGoal = {
            goal_name: req.body.goal_name,
            goal_description: req.body.goal_description,
            goal_end_date: req.body.goal_end_date,
        }
        
        await goals.create(newGoal);
        const created_goal = await goals.findOne({goal_name: req.body.goal_name});
        res.status(200).send(created_goal);
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}
```

**Goal Status Management** (Finish/Discard patterns):
```javascript
// Finish goal controller
async function goal_finish_controller_patch(req, res) {
    try {
        const goal_to_finish_id = req.params.goal_id;
        await goals.findByIdAndUpdate(goal_to_finish_id, {
            is_finished: true
        });
        res.status(200).send({message: "Goal Finished successfully"});
    } catch (error) {
        res.status(500).send({error: error.message});
    }
}
```

## Database Schema

### Goal Model (`models/goal_model.js`)
```javascript
const goalSchema = mongoose.Schema({
   goal_name: {
       type: String,
       required: true,
       unique: true
   },
   goal_description: {
       type: String,
       required: true
   },
   goal_end_date: {
       type: Date,
       required: true
   },
   is_finished: {
       type: Boolean,
       required: true,
       default: false
   },
   is_discarded: {
       type: Boolean,
       required: true,
       default: false
   },
   resourcesLink: {
       type: String,
   }
}, {
    timestamps: true
});
```

**Design Decisions**:
- Used `unique: true` for goal names to prevent duplicates
- Boolean flags for goal states instead of enum for simplicity
- Timestamps automatically track creation and update times
- Optional `resourcesLink` field for future feature expansion

## API Endpoints

| Method | Endpoint | Controller | Purpose |
|--------|----------|------------|---------|
| GET | `/api/` | `goal_list_controller_get` | Fetch all goals |
| GET | `/api/goal/details/:goal_id` | `goal_details_controller_get` | Get specific goal details |
| POST | `/create_goal` | `goal_create_controller_post` | Create new goal |
| DELETE | `/delete_goal/:goal_id` | `goal_delete_controller_post` | Permanently delete goal |
| PATCH | `/finish_goal/:goal_id` | `goal_finish_controller_patch` | Mark goal as finished |
| PATCH | `/discard_goal/:goal_id` | `goal_discard_controller_post` | Mark goal as discarded |

### Route Organization
Routes are organized using Express Router with clear separation:
- API routes in `/api/` folder for data fetching
- Action routes in `/routes/` folder for modifications

## Frontend Features

### 1. Goal Dashboard (`components/home/goal_container.vue`)

**Core Functionality**:
- Displays goals in responsive grid layout (1/2/3 columns based on screen size)
- Real-time deadline calculation and auto-discard logic
- Visual status indicators (green for finished, red for discarded)

**Key Implementation**:
```javascript
// Automatic deadline monitoring
{
    (Math.floor((new Date(goal.goal_end_date) - new Date(goal.createdAt))/(1000*60*60))) > 24 ?
        "DL : " + (Math.floor((new Date(goal.goal_end_date) - new Date(goal.createdAt))/(1000*60*60*24))+1) 
        : discardGoalAutomatically(goal._id)
}
```

### 2. Goal Creation Form (`components/form/CreateGoalForm.vue`)

**Features**:
- Form validation with real-time feedback
- Custom date picker with visual calendar icon
- Responsive design with conditional styling

**Validation Logic**:
```javascript
validateForm() {
    (this.goal_name === "" || this.goal_description === "" || this.goal_end_date === "") 
        ? this.isEmpty = true : this.isEmpty = false;
    (this.goal_name === "" || this.goal_description === "" || this.goal_end_date === "") 
        ? this.isOk = false : this.isOk = true;
}
```

### 3. Goal Details View (`components/details/GoalDetailsComponent.vue`)

**CRUD Operations**:
- Full goal information display
- Action buttons for finish/discard/delete operations
- Confirmation dialogs for destructive actions
- Route parameter handling for goal ID

### 4. Performance Analytics (`components/Performance/PerformanceComponents.vue`)

**Chart Implementation** using Chart.js:
```javascript
computed: {
    chartData() {
        return {
            labels: ['Totals', 'Finished', 'Discarded', 'Not Finished'],
            datasets: [{
                label: 'Performance',
                backgroundColor: ['#789345', '#41B883', 'red', '#00D8FF'],
                data: [this.allGoals.length, this.finishedGoals, this.discardedGoals, this.notFinishedGoals]
            }]
        }
    }
}
```

### 5. Navigation (`components/global/NavbarComponent.vue`)

Simple 3-icon navigation using Vue Router:
- Home (goal list)
- Create Goal
- Performance Analytics

## Setup Instructions

### Backend Setup
```bash
# Install dependencies
npm install

# Create .env file with:
# MONGODB_URL=your_mongodb_connection_string
# PORT=3000

# Run server
node index.js
```

### Frontend Setup
```bash
cd front_goal_tracker
npm install
npm run dev
```

## Feature Implementation Details

### 1. **Goal State Management**
**Implementation**: Used boolean flags (`is_finished`, `is_discarded`) instead of enumeration
**Reasoning**: Simpler conditional logic in frontend, easier database queries
**Code Location**: All controllers use this pattern for state updates

### 2. **Automatic Deadline Tracking**
**Implementation**: Client-side calculation with automatic discard trigger
**Location**: `goal_container.vue` component
**Logic**: Compares current date with goal creation and end dates

### 3. **Responsive Design**
**Implementation**: Tailwind CSS grid system with breakpoint classes
**Pattern**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
**Applied**: Throughout goal cards and form layouts

### 4. **Error Handling**
**Backend**: Try-catch blocks with 500 status responses
**Frontend**: Console logging and user feedback (could be improved)

### 5. **Data Flow**
- Vue components make HTTP requests using Axios
- Express routes delegate to controller functions
- Controllers interact with Mongoose models
- Response data updates Vue component state

## Development Notes

**Authentication System**: Planned but not implemented (empty files in `/authentication/`)

**File Upload**: Multer configured but not actively used

**Future Improvements**:
- Better error handling and user notifications
- Authentication and user management
- Goal categories and tags
- Mobile app version
- Resource link functionality

**Code Quality**: The codebase demonstrates solid understanding of:
- MVC pattern separation
- RESTful API design
- Vue.js component architecture
- MongoDB schema design
- Responsive web design principles

---

*This project represents practical full-stack development skills with modern web technologies, demonstrating clean code organization and user-focused feature implementation.*