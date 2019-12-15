FROM mysql:5.7.25
LABEL maintainer="marcosechague@gmail.com"

ENV MYSQL_ROOT_PASSWORD=toor
ENV MYSQL_DATABASE=demobd
ENV MYSQL_ROOT_HOST=%

COPY ./scripts/ /docker-entrypoint-initdb.d/
#ENTRYPOINT [ "executable" ]
CMD ["--default-authentication-plugin=mysql_native_password"]
