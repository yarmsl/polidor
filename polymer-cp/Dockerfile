FROM node:16-alpine AS uibuilder
WORKDIR /cp
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install --production --frozen-lockfile
ADD . .
RUN yarn build