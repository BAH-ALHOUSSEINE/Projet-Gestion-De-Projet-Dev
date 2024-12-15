# Projet-Gestion-De-Projet-Dev

**Partie développement de notre logiciel de gestion de projet.**

## Pré-requis pour le déploiement de l'application
Gestionnaire de paquets npm 
Service MongoDB

# Côté Backend 
    - Node.js (v18 minimum)
    - Express.js
    - MongoDB 
    - Jest

# Côté Frontend 
    - @angular/cli


### Lancer l'application
## Automatiquement
1. ``` chmod -x ./run.sh ```
2. ``` ./run.sh  ```

## Manuellement
# Dans Backend/
    1. ```systemctl start mongod``` (linux)
    2. ```node server.js```

    application lancé sur localhost:3000

# Dans frontend/
    ``` ng serve ```

    application lancé sur localhost:4200


## Déploiement Docker
# Compose 
Depuis la racine du projet : 
    - ``` docker-compose up --build ```


# Construire les images 
# Backend 
Depuis Backend/ 
    - docker build -t backend .
Depuis la racine du projet : 
    - sudo docker run --name backend -v $(pwd)/Backend:/app/Backend --network gdp -p 3000:3000 -d backend

# frontend
Depuis frontend/
    - docker build -t frontend .
 Depuis la racine du projet : 
    - docker run --name frontend -p 4200:80



# Executer les tests 
# Backend 
Dans le repertoire Backend/
    - npm install jest supertest --save-dev 
    - npm test

# Frontend 
Dans le répertoire frontend/
    - npm test