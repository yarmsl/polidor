FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
# COPY --from=uibuilder /ui/dist /usr/share/nginx/html
EXPOSE 80 443

CMD ["/bin/sh", "-c", "while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \'daemon off;\'"]