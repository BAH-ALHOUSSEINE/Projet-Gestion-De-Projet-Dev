# Utiliser Node.js 18 basé sur Alpine
FROM node:18-alpine

# Ajouter glibc pour la compatibilité avec Google Chrome
RUN apk add --no-cache \
  wget \
  curl \
  ca-certificates \
  fontconfig \
  freetype \
  libx11 \
  libxcomposite \
  libxdamage \
  libxrandr \
  mesa-gl \
  harfbuzz \
  ttf-freefont \
  && wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
  && wget -q https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-2.35-r0.apk \
  && apk add --no-cache --allow-untrusted --force-overwrite glibc-2.35-r0.apk \
  && rm glibc-2.35-r0.apk

# Télécharger et installer Google Chrome
RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
  && apk add --no-cache dpkg \
  && dpkg -i google-chrome-stable_current_amd64.deb || apk add --no-cache --allow-untrusted \
  && rm -f google-chrome-stable_current_amd64.deb

# Variables d'environnement pour Chrome Headless
ENV CHROME_BIN=/usr/bin/google-chrome \
    CHROME_PATH=/usr/lib/google-chrome/

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers du projet
COPY ./frontend/ ./

# Installer les dépendances du projet
RUN npm install

# Exposer le port pour les tests
EXPOSE 9876

# Commande pour exécuter les tests
CMD ["npm", "run", "test"]
