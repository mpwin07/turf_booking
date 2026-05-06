# ACE Multisports Arena

Full-stack turf portfolio, booking, and admin dashboard project.

## Stack

- React + Vite + Tailwind CSS frontend
- Node.js + Express backend
- PostgreSQL + Prisma data model
- Razorpay-ready payment verification structure

## Run Locally

```bash
npm.cmd run install:all
npm.cmd run dev
```

Frontend: `http://localhost:5173`

Backend: `http://localhost:4000/api/health`

## Key Booking Rule

Slot overlap prevention uses:

```js
newStart < existingEnd && newEnd > existingStart
```

The server checks both confirmed bookings and blocked timings before accepting a slot.
