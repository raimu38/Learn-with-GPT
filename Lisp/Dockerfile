FROM ubuntu:22.04

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y \
    sbcl \
    rlwrap \
    curl \
    git \
    && apt-get clean

WORKDIR /usr/src/app

CMD ["sbcl"]

