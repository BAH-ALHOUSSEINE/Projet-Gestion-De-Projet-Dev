#!/bin/bash

# Fonction pour vérifier si MongoDB est en cours d'exécution
is_mongodb_running() {
    if pgrep -x "mongod" > /dev/null; then
        return 0  # MongoDB est en cours d'exécution
    else
        return 1  # MongoDB n'est pas en cours d'exécution
    fi
}

# Démarrer MongoDB si ce n'est pas déjà fait
if is_mongodb_running; then
    echo "MongoDB est déjà en cours d'exécution."
else
    echo "MongoDB n'est pas en cours d'exécution. Démarrage de MongoDB..."
    if command -v systemctl > /dev/null; then
        sudo systemctl start mongod
    elif command -v service > /dev/null; then
        sudo service mongod start
    else
        echo "Impossible de trouver un gestionnaire de services pour démarrer MongoDB."
        exit 1
    fi
    if is_mongodb_running; then
        echo "MongoDB a été démarré avec succès."
    else
        echo "Échec du démarrage de MongoDB."
        exit 1
    fi
fi

# Lancer le backend
echo "Démarrage du backend..."
(
    cd Backend || exit
    if [ ! -f "server.js" ]; then
        echo "Erreur : server.js introuvable dans le répertoire Backend."
        exit 1
    fi
    node server.js &
    BACKEND_PID=$!
    echo "Backend démarré avec PID $BACKEND_PID."
)

# Lancer le frontend
echo "Démarrage du frontend..."
(
    cd frontend || exit
    if [ ! -f "angular.json" ]; then
        echo "Erreur : fichier angular.json introuvable dans le répertoire frontend."
        exit 1
    fi
    ng serve --open &
    FRONTEND_PID=$!
    echo "Frontend démarré avec PID $FRONTEND_PID."
)

# Gestion des signaux pour arrêter proprement les processus
trap "echo 'Arrêt du projet...'; kill $BACKEND_PID $FRONTEND_PID; exit" SIGINT SIGTERM

# Attendre que les processus soient terminés
wait $BACKEND_PID $FRONTEND_PID
