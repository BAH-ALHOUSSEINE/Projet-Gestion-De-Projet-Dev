# Utilisez une image de base Node
FROM node:23-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Installer nodemon globalement (si nécessaire)
RUN npm install -g nodemon

# Copier tout le reste du projet dans le conteneur
COPY . .

# Copier le fichier .env dans le conteneur
COPY .env .env

# Exposer le port configuré dans le fichier .env
EXPOSE 3000

# Lancer l'application avec nodemon
CMD ["nodemon", "server.js"]
