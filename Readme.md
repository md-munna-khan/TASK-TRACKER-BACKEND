# RACO-AI PROJECT

A role based project marketplace where Buyers create projects, Problem Solvers execute tasks, and Admins manage users and visibility.
This system models a real world workflow with strict role enforcement, clean APIs, and clear state transitions.

## System Overview

This platform enables structured collaboration between three roles:

## Roles

### Admin

- Manages users and roles
- Monitors all projects

### Buyer

- Creates and publishes projects
- Reviews solver requests
- Assigns solvers
- Reviews and accepts/rejects task submissions

### Problem Solver

- Creates a professional profile
- Browses open projects
- Requests to work on projects
- Creates tasks and submits completed work

## Core Workflow

- User registers → default role SOLVER
- Admin assigns BUYER role
- Buyer creates and publishes a project
- Problem Solvers request to work
- Buyer assigns one solver
- Solver creates tasks (sub-modules)
- Solver submits ZIP files per task
- Buyer reviews → accepts or rejects submissions
- Accepted tasks are marked COMPLETED
- No role shortcuts. No skipped states.

## State Transitions
### Project States
DRAFT → OPEN → ASSIGNED → IN_PROGRESS → COMPLETED

### Task States
PENDING → IN_PROGRESS → SUBMITTED → COMPLETED / REJECTED

## Tech Stack
### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB + Mongoose
- JWT Authentication
- Multer (ZIP file uploads)
- Custom QueryBuilder (search, filter, sort, pagination)


### Frontend
- Next.js
- TypeScript
- Tailwind CSS
- Framer Motion 

## Architecture Decisions
1. Role-Based Access Control (RBAC)
2. Roles enforced at middleware level
3. No frontend role hacks
4. Every route protected by auth + role guards

### Modular Backend Structure

```
src/
├── app/
│   ├── modules/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── projects/
│   │   ├── requests/
│   │   ├── tasks/
│   │   ├── submissions/
│   │   └── solverProfile/
│   ├── middlewares/
│   ├── utils/
│   ├── builder/QueryBuilder.ts
│   └── routes.ts

```
## ALL ROUTES 

### AUTH ROUTES

| Method | Route                 | Description               |
| ------ | --------------------- | ------------------------- |
| POST   | `/auth/register`      | Register (default SOLVER) |
| POST   | `/auth/login`         | Login                     |
| GET    | `/auth/me`            | Current user              |
| POST   | `/auth/refresh-token` | Refresh token             |
| POST   | `/auth/logout`        | Logout                    |



### ADMIN ROUTES 

| Method | Route                    | Description     |
| ------ | ------------------------ | --------------- |
| GET    | `/auth/users`            | All users       |
| GET    | `/auth/users/:id`        | Single user     |
| PATCH  | `/auth/users/:id/role`   | Assign role     |
| PATCH  | `/auth/users/:id/status` | Block / unblock |
| GET    | `/admin/projects`        | All projects    |
| GET    | `/admin/projects/:id`    | Project details |
| GET    | `/admin/tasks`           | All tasks       |




### BUYER ROUTES

| Method | Route                         | Description     |
| ------ | ----------------------------- | --------------- |
| POST   | `/buyer/projects`             | Create project  |
| GET    | `/buyer/projects`             | Own projects    |
| GET    | `/buyer/projects/:id`         | Project details |
| PATCH  | `/buyer/projects/:id/publish` | Publish         |
| PATCH  | `/buyer/projects/:id/assign`  | Assign solver   |



### SOLVER ROUTES

| Method | Route                          | Description    |
| ------ | ------------------------------ | -------------- |
| GET    | `/buyer/projects/:id/requests` | View requests  |
| PATCH  | `/buyer/requests/:id/accept`   | Accept request |
| PATCH  | `/buyer/requests/:id/reject`   | Reject request |


### SUBMISSION ROUTES

| Method | Route                           | Description       |
| ------ | ------------------------------- | ----------------- |
| GET    | `/buyer/tasks/:id/submission`   | View submission   |
| PATCH  | `/buyer/submissions/:id/accept` | Accept submission |
| PATCH  | `/buyer/submissions/:id/reject` | Reject submission |




### SOLVER ROUTES 
#### PROFILE
| Method | Route             | Description    |
| ------ | ----------------- | -------------- |
| POST   | `/solver/profile` | Create profile |
| GET    | `/solver/profile` | Get profile    |
| PATCH  | `/solver/profile` | Update profile |

#### PROJECTS 
| Method | Route                       | Description          |
| ------ | --------------------------- | -------------------- |
| GET    | `/projects/open`            | Browse open projects |
| POST   | `/projects/:id/request`     | Request to work      |
| GET    | `/solver/projects/assigned` | Assigned project     |

#### TASKS
| Method | Route                          | Description         |
| ------ | ------------------------------ | ------------------- |
| POST   | `/solver/projects/:id/tasks`   | Create task         |
| PATCH  | `/solver/tasks/:id/status`     | Update task status  |
| POST   | `/solver/tasks/:id/submit`     | Submit ZIP          |
| GET    | `/solver/tasks/:id/submission` | View own submission |

### SHARED ROUTES 
| Method | Route                 | Description     |
| ------ | --------------------- | --------------- |
| GET    | `/projects/:id`       | Project details |
| GET    | `/projects/:id/tasks` | Project tasks   |
| GET    | `/tasks/:id`          | Task details    |


