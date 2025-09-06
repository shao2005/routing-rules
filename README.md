# Routing Rules Backend Service

This project implements a flexible routing rules engine backend using NestJS, Prisma ORM, and PostgreSQL. It allows managing routing rules that assign team members to contacts based on configurable conditions in the contact or company data.

---

## Features

- Create, update, and retrieve routing rules with nested logical conditions.
- Evaluate incoming contact information against routing rules to get the assigned member.
- Persist rules configuration in PostgreSQL for durability.
- Type-safe Prisma integration with NestJS.
- REST API with JSON input/output.

---

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL (running instance)
- npm package manager
- Postman (for API testing)

---

### Setup and Run Locally

1. Clone the repository:

```
git clone https://github.com/shao2005/routing-rules.git
cd routing-rules
```

2. Install dependencies:

```
npm install
```

3. Configure the database connection:

Create a `.env` file to set your PostgreSQL connection string:

```
DATABASE_URL="postgresql://user:password@localhost:5432/routing_rules_db"
```

4. Run Prisma migrations to create the database schema:

```
npx prisma migrate dev --name init
```

5. Generate Prisma client (if not done by migrate):

```
npx prisma generate
```

6. Start the NestJS service:

```
npm run start
```

The server will start on http://localhost:3000 by default.

---

## API Endpoints

### Create Routing Rule

- **POST /routing-rules**
- Body: JSON representing routing rule with nested rules & statements.
- Returns created rule with IDs.

### Update Routing Rule

- **PUT /routing-rules/:id**
- Path param: `id` of the routing rule.
- Body: JSON with updated routing rule data.
- Returns updated rule with IDs.

### Get Routing Rule by ID

- **GET /routing-rules/:id**
- Path param: `id` of the routing rule.
- Returns the routing rule with nested rules and statements.

### Evaluate Contact Info

- **POST /routing-rules/:id/evaluate**
- Path param: `id` of the routing rule.
- Body: JSON with contact information fields.
- Returns the assigned member id based on evaluation.

---

## Using Postman Collection

A Postman collection is provided to help testing the API.

### Import Collection

1. Download `Routing_rules_postman_collection.json` file from this repository.
2. Open Postman.
3. Click "Import".
4. Upload the JSON file.
5. Click "Import".
6. The collection "Routing Rules API" appears in your Postman workspace.

### Test Workflow

1. Use **Create Routing Rule** to create a new rule.
2. Use returned ID in **Update Routing Rule** and **Evaluate Contact Info** requests by replacing the `:id` path parameter.
3. Send requests to test API functions.

---

## Notes

- Ensure your PostgreSQL instance is running before migration.
- The server listens on port 3000 by default; change this via `PORT` environment variable.
- Input validation is applied using `class-validator`.
- The evaluation logic supports strings, numbers, and dates with operators `=`, `>`, and `<`.

---

## Scripts

- `npm run start` — start production server.
- `npm run start:dev` — start dev server with hot reload.
- `npx prisma migrate dev` — run migrations.
- `npx prisma generate` — generate Prisma client.

---
