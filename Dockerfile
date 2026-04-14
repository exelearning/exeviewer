FROM nginx:alpine

COPY index.html manifest.json sw.js /usr/share/nginx/html/
COPY css/   /usr/share/nginx/html/css/
COPY js/    /usr/share/nginx/html/js/
COPY lang/  /usr/share/nginx/html/lang/
COPY img/   /usr/share/nginx/html/img/
COPY vendor/ /usr/share/nginx/html/vendor/

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY docker/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]
