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


### Folder Structure

### Limitations
#### Exposed Authentication token
The authentication strategy used in this application is minimal. No expiry dates are given to the jwt, therefore if the token is exposed for a user, intruder can log in to the system.

#### Error Handing In Frontend
Although, form validation, and most commonly occurred validations have been handled in the frontend, validation in edge cases remains undone. Some of the simple validation are not covered due to limitation of time such as Not found page, and redirecting to login page if the auth token is invalid.

#### Code Optimization
Although, throughout the project the principles of SOLID and DRY has been maintained. However, there remains the scope of further optimize the code. This will result in better bundle size in frontend, and better query and db calls optimization in the backend.

#### GraphQL Practices
Given this is my first proper project using graphql and apollo client, the best practices of industry may not have been followed. However, I have tried to use the best practices using in REST api development, and my common sense as a developer for creation of the resolvers.

#### Docker Containerization
Given that docker is not one of my best skills, if the container fails, it is preferred to run the application using the fallback method.