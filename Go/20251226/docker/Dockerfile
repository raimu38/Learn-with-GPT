FROM golang:1.25.5-bookworm

ENV UID=1000
ENV GID=1000
ENV USERNAME=raimu
ENV GOPATH="/go"
ENV PATH="${GOPATH}/bin:/usr/local/go/bin:${PATH}"

# --- System dependencies (minimal verified set) ---
RUN apt-get update && apt-get install -y --no-install-recommends \
    sudo \
    tree \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# RUN passwd -d root

RUN groupadd -g ${GID} ${USERNAME} && \
    useradd -m -u ${UID} -g ${GID} -s /bin/bash ${USERNAME} && \
    echo "${USERNAME} ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers


RUN mkdir -p /app /go/bin /go/src /go/pkg && \
    chown -R ${USERNAME}:${GID} /app /go

WORKDIR /app

USER ${USERNAME}

CMD ["tail", "-f", "/dev/null"]

