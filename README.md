# LPS Book Management

A book-management application built for the LPS .NET Developer Skill Test.

## Assignment

[**Open the original LPS .NET Developer Skill Test (PDF)**](docs/SOAL-TEST-DEVELOPER-2026.pdf)

The assignment PDF is included in this repository under `docs/`.

## Tech Stack

- **Backend:** ASP.NET Core Web API (.NET)
- **Frontend:** React, TypeScript, Vite
- **Database:** PostgreSQL
- **ORM:** Entity Framework Core
- **API documentation:** Swagger / OpenAPI
- **Database and local infrastructure:** Docker Compose

## Features

### Book type management

- Create, list, update, and delete book types.
- Use book types as the source for the book form's book-type dropdown.

### Book management

- Create, list, update, and delete books.
- Store title, author, book type, release date, and page count.
- Search books.
- Export book data.
- Record book-data changes in a history table (no separate history page required).

### Engineering and supporting work

- Dependency injection for repositories and services.
- Repository pattern for data access.
- Entity Framework Core with PostgreSQL.
- A console exercise project for Question 4 (character counts) and Question 5 (number sequence).
- A custom scaffolder is included in the `generate/` directory.

## Prerequisites

Install the following before running the project:

- .NET SDK compatible with the solution
- Node.js and npm
- Docker Desktop (or Docker Engine with the Compose plugin)

## Run the database

From the repository root:

```bash
docker compose up -d postgres
```

## Run the backend

Open a terminal at the repository root:

```bash
dotnet run --project src/LpsBookManagement.Api
```

The API's launch settings specify these local URLs:

- **Swagger UI (HTTPS):** <https://localhost:7122/swagger>
- **Swagger UI (HTTP):** <http://localhost:5200/swagger>

Use the HTTPS URL first. If the local development certificate is not trusted, trust the .NET development certificate or use the HTTP URL.

The API uses the `Default` connection string in `src/LpsBookManagement.Api/appsettings.json`. Start PostgreSQL before launching the API.

## Run the frontend

In another terminal:

```bash
cd client/web
npm install
npm run dev
```

Vite normally serves the frontend at <http://localhost:5173>. Keep the backend running as well.


## Run Question 3

From the repository root:

```bash
dotnet run --project tools/Lps.Scaffolder -- "Host=localhost;Port=5432;Database=lps-book-management;Username=postgres;Password=lps123" "./"
```
We can change the Connection host and the output folder

## Run Question 4 and Question 5

From the repository root:

```bash
dotnet run --project tools/Lps.Exercises
```

The current console entry point runs both exercises.

### Question 4 — Count characters

The program counts each non-space character in `hello world` and prints the character counts in first-seen order. For example:

```text
h-1
e-1
l-3
o-2
w-1
r-1
d-1
```

### Question 5 — Number sequence

The program currently calls `Question5.Generate(20)`, so it prints the sequence from 1 to 20 using these rules:

- Print `IDIC` for multiples of 5, except 5 itself.
- Print `LPS` for multiples of 6, except 6 itself.
- Print the number otherwise.

To try a different value of `N`, change the argument passed to `Question5.Generate(...)` in `tools/Lps.Exercises/Program.cs`, then rerun the command.
