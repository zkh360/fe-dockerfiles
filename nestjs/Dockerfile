FROM node:16.13.1-alpine as builder

USER node
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build \
  && npm prune --production


FROM node:16.13.1-alpine AS runner
WORKDIR /app
ENV NODE_ENV production

USER node

COPY --from=builder --chown=node:node /app/package*.json ./
COPY --from=builder --chown=node:node /app/node_modules/ ./node_modules/
COPY --from=builder --chown=node:node /app/dist/ ./dist/

CMD ["node", "dist/server.js"]
