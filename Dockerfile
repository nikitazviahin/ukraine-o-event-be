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

# Pass those argumnt through command line
ARG MONGO_URI 
ARG JWT_SECRET
ENV PORT=8080
ENV MONGO_URI=${MONGO_URI}
ENV JWT_SECRET=${JWT_SECRET}

USER node



# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./

RUN npm ci --production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8080

CMD [ "node", "dist/main.js" ]