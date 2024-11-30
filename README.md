## Requirements

- Docker
- Docker compose

## Production usage

### Setup

Create .env file from template:
```sh
cp .env.template .env
```
**Default values in .env.template are for demoing only and should be changed if running in production!**

Run the project:
```sh
docker compose up --build -d
```

### Tear down

Stop the project:
```sh
docker compose down
```

## Development

### Setup

Run the project in development mode with hot reload:
```sh
docker compose -f docker-compose-dev-yml up --build -d
```

### Tear down

Stop the project:
```sh
docker compose -f docker-compose-dev-yml down
```