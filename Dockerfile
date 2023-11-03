# Use the official Node.js image as base
FROM node:19-slim

RUN npm cache clean --force

# Atualize o npm para a versão 9.8.1
RUN npm install -g npm@9.8.1

# Set the working directory
WORKDIR /home/node/api
