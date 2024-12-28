#!/bin/sh

# Apply Prisma migrations
npx prisma migrate deploy

# Seed the database
npm run seed

# Start the application
npm run start:dev