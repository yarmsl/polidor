FROM node:16-alpine AS uibuilder
WORKDIR /ui
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install --legacy-peer-deps
ADD . .
RUN yarn build