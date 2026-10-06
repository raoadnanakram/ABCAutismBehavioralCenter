# ABC Autism & Behavioral Center

MERN project.

```
/            -> Node/Express API (GoDaddy runs `npm install` + `npm start` from here)
backend/     -> server.js, models, middleware, createAdmin.js
frontend/    -> React + Vite website (deployed to GitHub Pages: cd frontend && npm run deploy)
```

## GoDaddy (Node backend) - Environment Variables
MONGO_URI, JWT_SECRET, EMAIL_USER, EMAIL_PASS, OWNER_EMAIL, ADMIN_PHONE, ADMIN_PASSWORD
(see backend/.env.example). Do NOT set PORT - GoDaddy provides it.
Check it works: open `https://<your-backend-url>/api/health`.

## Frontend
Put the backend URL in `frontend/.env.production` (VITE_API_URL), then `cd frontend && npm install && npm run deploy`.
