FROM node as builder

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci

COPY . .



RUN npm run build

FROM node:slim


ENV NODE_ENV production

ARG MONGO_URI 
ARG PORT
ARG JWT_SECRET
ENV MONGO_URI=${MONGO_URI}
ENV PORT=${PORT}
ENV JWT_SECRET=${JWT_SECRET}

USER node



# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --production

COPY --from=builder /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]