FROM nginx:alpine

# 1. Copiar los archivos del portafolio
COPY index.html styles.css scripts.js /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

# 2. Forzar la desactivación de server_tokens en el archivo de configuración principal
# Usamos sed para insertarlo justo después de la línea 'http {'
RUN sed -i '/http {/a \    server_tokens off;' /etc/nginx/nginx.conf

EXPOSE 3000
