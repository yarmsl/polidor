FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
EXPOSE 80 443

CMD ["/bin/sh", "-c", "while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \'daemon off;\'"]