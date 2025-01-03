# Teebay

Teebay is a simple web application that allows users to post products for buy, sell or rent. This application is developed as part of coding challenge for a job interview.

## Features
- User can post a product for sell and rent.
- User can register and login.
- User can update and delete their own products.
- User can buy or rent a product.

## Technologies
### Frontend
- React
- Next.js
- Tailwind CSS and Shade-cn.
- Apollo Client
- Zod and React Hook Form for form validation.

### Backend
- Node.js
- NestJS
- Prisma ORM
- Apollo Server and Graphql
- Class Validator and Class Transformer for Validation.
- Jwt Authentication and bcrypt.

### Utilities
- Docker compose.


## Instructions for running the application
### Database
The database used in this application is Postgres. To run the database, you need to have docker installed in your system. Run the following command to start the database.
```bash
docker-compose up teebay_db
```

### Backend
To run the backend, cd into the backend directory and run the following commands to install required packages.
```bash
cd backend
npm install
```

Add database migration by running the following command.
```bash
npx prisma migrate dev
```

Before running the backend, you need to seed the database with some initial data. Run the following command to seed the database.
```bash
npm run seed
```

After seeding the database, run the following command to start the backend server.
```bash
npm run start:dev
```
The backend server will be running on `http://localhost:5000/graphql`. You can use this url to access the graphql playground to test the queries and mutations.

### Frontend
To run the frontend, cd into the frontend directory and run the following commands.
```bash
cd frontend
npm install
npm run dev
```

Open your browser and go to `http://localhost:3000` to see the application running. By default the application will be redirected to the home page. You have to navigate to the `http://localhost:3000/auth/login` to login to the application.

## Credentials
The application has been seeded with some initial data. You can use the following credentials to login to the application. Note that the password for all the users is same.
- Email: `kazimubin.46@gmail.com`, `john.doe@gmail.com`, `jane.doe@gmail.com`
- Password: `11223344`

## Limitations
#### Exposed Authentication token
The authentication strategy used in this application is minimal. No expiry dates are given to the jwt, therefore if the token is exposed for a user, intruder can log in to the system.

#### Error Handing In Frontend
Although, form validation, and most commonly occurred validations have been handled in the frontend, validation in edge cases remains undone. Some of the simple validation are not covered due to limitation of time such as Not found page, and redirecting to login page if the auth token is invalid.

#### Code Optimization
Although, throughout the project the principles of SOLID and DRY has been maintained. However, there remains the scope of further optimize the code. This will result in better bundle size in frontend, and better query and db calls optimization in the backend.

#### GraphQL Practices
Given this is my first proper project using graphql and apollo client, the best practices of industry may not have been followed. However, I have tried to use the best practices using in REST api development, and my common sense as a developer for creation of the resolvers.

#### Docker Containerization
Given that docker is not one of my best skills, only the database has been containerized. The frontend and backend are still running on the host machine, use the instructions in the respective README.md files to run the application.

#### Security Valnuarabilities
The application has not been tested for security vulnerabilities. The environment variables are exposed in the frontend, and backend for convenience and ease of use.


## Conclusion
This project was a great learning experience for me. Considering this is my first exposure to graphql and apollo client, my learning curve was steep. I have tried to use the best practices and principles of software development that I have learned so far. I have tried to keep the code clean and maintainable. However considering the given time frame, I had to make some trade-offs in optimization.
Moreover, for some feature, I had taken creative freedom to implement them in a way that I thought was best. I am looking forward to your feedback and suggestions for improvement.