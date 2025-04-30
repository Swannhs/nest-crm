# Nest CRM

A microservices-based CRM system built with NestJS.

## Services

The application consists of three microservices:

1. **Customer Service** - Manages customer data
2. **Auth Service** - Handles authentication and authorization
3. **Contact Service** - Manages contact information

## Docker Setup

This project includes Docker configuration for local development and deployment. Each service has its own:
- Docker directory with separate configurations for local development and production deployment
- PostgreSQL database for data storage

### Quick Start

To start all services with Docker for local development:

```bash
docker-compose up
```

## Service Ports

| Service | Port |
|---------|------|
| Customer Service | 3000 |
| Auth Service | 3001 |
| Contact Service | 3002 |

## Development

Each service can be developed independently. To start a service in development mode:

```bash
cd [service-directory]
npm install
npm run start:dev
```

### Docker Development Setup

Each service has its own Docker setup in the `docker/local` directory. To build and run a specific service:

```bash
cd [service-directory]
docker build -t [service-name]:dev -f docker/local/Dockerfile .
docker run -p [port]:[port] [service-name]:dev
```

### Production Deployment

For production deployment, each service has a Dockerfile in the `docker/deployment` directory:

```bash
cd [service-directory]
docker build -t [service-name]:prod -f docker/deployment/Dockerfile .
docker run -p [port]:[port] [service-name]:prod
```

## Database

Each service has its own PostgreSQL database:

| Service | Database Name | Port (Host) |
|---------|---------------|-------------|
| Customer Service | customer_db | 5432 |
| Auth Service | auth_db | 5433 |
| Contact Service | contact_db | 5434 |

## Environment Variables

Each service uses the following environment variables for database connection:

- `DATABASE_HOST` - Database hostname
- `DATABASE_PORT` - Database port
- `DATABASE_USER` - Database username
- `DATABASE_PASSWORD` - Database password
- `DATABASE_NAME` - Database name

You can override these variables in a `docker-compose.override.yml` file for local development.