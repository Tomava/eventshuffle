FROM node:22.11.0-alpine

WORKDIR /app

COPY package*.json ./
COPY src/ ./src
COPY tsconfig.json ./
COPY jest.config.ts ./

RUN chown -R node:node /app

USER node

RUN npm install

RUN npm run build

# TODO: Separate build step

CMD ["npm", "run", "fresh-start"]