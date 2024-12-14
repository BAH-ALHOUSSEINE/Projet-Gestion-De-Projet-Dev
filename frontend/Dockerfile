FROM node:18-alpine AS build-stage

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

RUN apt-get update && apt-get install -y \
  wget \
  curl \
  unzip \
  && wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
  && dpkg -i google-chrome-stable_current_amd64.deb \
  && apt-get install -f

# Définir la variable d'environnement pour Chrome
ENV CHROME_BIN=/usr/bin/google-chrome-stable

# Copier tout le code source Angular
COPY . .

# Compiler l'application Angular pour production
RUN npm run build -- --configuration=production

# Configuration du serveur web Nginx pour servir les fichiers statiques
FROM nginx:alpine AS production-stage

# Exposer le port 80 (par défaut pour Nginx)
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]
