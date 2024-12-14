FROM node:18-alpine AS build-stage

# Ajouter Chromium et ses dépendances
RUN apk add --no-cache \
  chromium \
  nss \
  freetype \
  harfbuzz \
  ttf-freefont \
  font-noto \
  mesa-gl

# Variables d'environnement pour Chromium
ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/


# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration nécessaires
COPY package*.json ./

# Installer les dépendances
RUN npm install

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
