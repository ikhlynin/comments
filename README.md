# Comments

A test comment system with **threaded replies**, **file uploads**, and **Google reCAPTCHA**, built with **React**, **NestJS**, and **PostgreSQL**.

---

## Features

- Add and reply to comments (threaded discussions)  
- Upload files (images and text)  
- Google reCAPTCHA protection  
- Paginated comments  

---

## Tech Stack

- **Frontend:** React, TypeScript, react-hook-form, Axios, react-google-recaptcha  
- **Backend:** NestJS, Prisma, Multer  
- **Database:** PostgreSQL  
- **Containerization:** Docker and Docker Compose  

---

## Demo

Live project: [https://frontend-production-0da9.up.railway.app/](https://frontend-production-0da9.up.railway.app/)

---

## Getting Started

### Using Docker

```bash
git clone https://github.com/ikhlynin/comments.git
cd comments
docker-compose up --build
```

Frontend: `http://localhost:3000`  
Backend: `http://localhost:5000`

### Without Docker

**Backend setup:**

```bash
cd backend
npm install
```

Configure environment variables (`.env`):

```env
DATABASE_URL=postgresql://user:password@localhost:5432/commentsdb
RECAPTCHA_SECRET_KEY=your_secret_key
PORT=5000
```

Run backend:

```bash
npm run start:dev
```

**Frontend setup:**

```bash
cd ../frontend
npm install
```

Configure frontend `.env`:

```env
REACT_APP_RECAPTCHA_SITE_KEY=your_site_key
```

Run frontend:

```bash
npm start
```

---

## Folder Structure

```
backend/       # NestJS backend with Prisma and Multer
frontend/      # React frontend with forms and CAPTCHA
docker/        # Dockerfiles and docker-compose configuration
```

---

## License