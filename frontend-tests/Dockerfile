# Utiliser Node.js 18 basé sur Alpine
FROM node:18-alpine

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

# Copier les fichiers du projet
COPY frontend/ ./

# Installer les dépendances du projet
RUN npm install

# Exposer le port pour les tests
EXPOSE 9876

# Commande pour exécuter les tests
CMD ["npm", "run", "test-headless",]
