FROM node:16-alpine AS uibuilder
WORKDIR /ui
ADD package.json package.json
ADD yarn.lock yarn.lock
RUN yarn install
ADD . .
RUN docker volume rm polymer_uibuild
RUN yarn build