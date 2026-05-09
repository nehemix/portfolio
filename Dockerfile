FROM nginx:alpine

# Copiar los archivos del portafolio al servidor web
COPY index.html styles.css scripts.js /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

EXPOSE 443