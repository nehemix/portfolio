FROM nginx:alpine

# Copiar los archivos del portafolio al servidor web
COPY index.html styles.css scripts.js /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# Desactivar la firma de la versión de Nginx
RUN sed -i 's/#static/server_tokens off;/' /etc/nginx/nginx.conf || echo "server_tokens off;" >> /etc/nginx/conf.d/default.conf

EXPOSE 80
