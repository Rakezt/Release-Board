# Release Checklist

A simple full-stack Release Checklist application built with **Next.js**, **TypeScript**, **MongoDB**, and **Material UI**.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- MongoDB + Mongoose
- Material UI
- React Query
- Axios
- Zod

---

## Features

- View all releases
- Create a new release
- View release details
- Update release checklist
- Update additional information
- Delete a release
- Automatic release status calculation:
  - **Planned** – No steps completed
  - **Ongoing** – At least one step completed
  - **Done** – All steps completed

---

## Installation

```bash
git clone <repository-url>

cd release-board

npm install

npm run dev
```

Application runs on:

```
http://localhost:3000
```

---

## Environment Variables

Create a `.env.local` file.

```env
MONGODB_URI=<your_mongodb_connection_string>
NEXT_PUBLIC_APP_NAME=Release Checklist
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

---

## API Endpoints

| Method | Endpoint            | Description         |
| ------ | ------------------- | ------------------- |
| GET    | `/api/releases`     | Get all releases    |
| POST   | `/api/releases`     | Create a release    |
| GET    | `/api/releases/:id` | Get release details |
| PATCH  | `/api/releases/:id` | Update release      |
| DELETE | `/api/releases/:id` | Delete release      |

---

## Database Schema

### Collection

```
cactro-release
```

### Document Structure

```json
{
  "_id": "ObjectId",
  "name": "Release v1.0.0",
  "releaseDate": "Date",
  "additionalInfo": "Optional notes",
  "steps": {
    "mergedPRs": false,
    "changelogUpdated": false,
    "testsPassing": false,
    "githubReleaseCreated": false,
    "deployedToDemo": false,
    "qaVerified": false,
    "productionDeployment": false
  },
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

---

## Status Logic

- **Planned** → No steps completed
- **Ongoing** → One or more steps completed
- **Done** → All steps completed

---

## Deployment

The application can be deployed to platforms such as:

- Netlify
