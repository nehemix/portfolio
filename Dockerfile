FROM nginx:alpine

RUN sed -i '/http {/a \    server_tokens off;' /etc/nginx/nginx.conf

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY index.html styles.css scripts.js /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 80
