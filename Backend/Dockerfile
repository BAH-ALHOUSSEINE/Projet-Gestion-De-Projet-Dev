FROM node:23-alpine

WORKDIR /app

# Copier les fichiers nécessaires pour installer les dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du projet dans le conteneur
COPY . .

# Copier le fichier .env dans le conteneur
COPY .env .env

# Exposer le port configuré dans le fichier .env
EXPOSE 3000

# Lancer l'application
CMD ["npm", "run", "dev"]
