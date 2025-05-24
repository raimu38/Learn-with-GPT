FROM python:3.12-slim

RUN apt update && apt install -y \
    ffmpeg libsm6 libxext6 libgl1-mesa-glx curl git \
    && pip install --no-cache-dir \
    numpy matplotlib opencv-python jupyterlab ipykernel

WORKDIR /work
