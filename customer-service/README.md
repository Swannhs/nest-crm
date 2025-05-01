<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ yarn install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

# Customer Service

This service manages customer profiles, organizational accounts, and customer segments, supporting both B2C and B2B scenarios. It uses PostgreSQL for data storage and provides a RESTful API for interacting with customer data.

## Features

- Customer management (create, read, update, delete)
- Account management for B2B scenarios
- Customer segmentation for marketing and analytics
- Address management for customers and accounts
- Custom fields for flexible customer data

## Database Design

The service uses a PostgreSQL database with the following tables:

- `customers`: Stores individual customer profiles
- `accounts`: Stores organizational accounts for B2B scenarios
- `segments`: Stores customer segments for marketing and analytics
- `customer_segments`: Junction table for many-to-many relationships between customers and segments
- `addresses`: Stores customer and account addresses
- `custom_fields`: Stores custom key-value pairs for customers

## API Endpoints

### Customers

- `POST /api/customers`: Create a new customer
- `GET /api/customers`: Get all customers
- `GET /api/customers/:id`: Get a customer by ID
- `PATCH /api/customers/:id`: Update a customer
- `DELETE /api/customers/:id`: Delete a customer

### Accounts

- `POST /api/accounts`: Create a new account
- `GET /api/accounts`: Get all accounts
- `GET /api/accounts/:id`: Get an account by ID
- `PATCH /api/accounts/:id`: Update an account
- `DELETE /api/accounts/:id`: Delete an account

### Segments

- `POST /api/segments`: Create a new segment
- `GET /api/segments`: Get all segments
- `GET /api/segments/:id`: Get a segment by ID
- `PATCH /api/segments/:id`: Update a segment
- `DELETE /api/segments/:id`: Delete a segment
- `POST /api/segments/:id/customers`: Add customers to a segment
- `DELETE /api/segments/:id/customers`: Remove customers from a segment

### Addresses

- `POST /api/addresses`: Create a new address
- `GET /api/addresses`: Get all addresses
- `GET /api/addresses?entityType=X&entityId=Y`: Get addresses by entity type and ID
- `GET /api/addresses/:id`: Get an address by ID
- `PATCH /api/addresses/:id`: Update an address
- `DELETE /api/addresses/:id`: Delete an address
- `DELETE /api/addresses?entityType=X&entityId=Y`: Delete addresses by entity type and ID

### Custom Fields

- `POST /api/custom-fields`: Create a new custom field
- `GET /api/custom-fields`: Get all custom fields
- `GET /api/custom-fields?customerId=X`: Get custom fields by customer ID
- `GET /api/custom-fields?customerId=X&key=Y`: Get a custom field by customer ID and key
- `GET /api/custom-fields/:id`: Get a custom field by ID
- `PATCH /api/custom-fields/:id`: Update a custom field
- `DELETE /api/custom-fields/:id`: Delete a custom field
- `DELETE /api/custom-fields?customerId=X`: Delete custom fields by customer ID

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- PostgreSQL (v12 or later)

### Installation

1. Clone the repository
2. Install dependencies: `yarn install`
3. Create a PostgreSQL database: `createdb crm_customers`
4. Configure environment variables in `.env` file
5. Start the application: `yarn start:dev`

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=crm_customers
DB_LOGGING=true

# Application Configuration
PORT=3000
NODE_ENV=development
```

## Development

### Running the Application

```bash
# development
yarn start:dev

# production mode
yarn start:prod
```

### Testing

```bash
# unit tests
yarn test

# e2e tests
yarn test:e2e

# test coverage
yarn test:cov
```
