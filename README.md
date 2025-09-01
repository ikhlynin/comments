# Comments

A test comment system with **threaded replies**, **file uploads**, and **Google reCAPTCHA**, built with **React**, **NestJS**, and **PostgreSQL**.

---

## Tech Stack

- **Frontend:** React, TypeScript, react-hook-form, Axios, react-google-recaptcha
- **Backend:** NestJS, Prisma, Multer
- **Database:** PostgreSQL
- **Containerization:** Docker and Docker Compose

---

## Getting Started

### Using Docker

1. Clone the repository:

```bash
git clone https://github.com/ikhlynin/comments.git
cd comments
```

2. Create your `.env` files.

**Backend `.env` (`backend/.env`):**

```env
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASS=postgres
DATABASE_NAME=comments_db
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/comments_db?schema=public
BACKEND_PORT=5000
FRONTEND_URL=http://localhost:3000
CAPTCHA_TTL=300
```

**Frontend `.env` (`frontend/.env`):**

```env
REACT_APP_API_URL=http://localhost:5000
```

3. Run Docker Compose:

```bash
docker-compose up --build
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:5000`
