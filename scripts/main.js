const form = document.getElementById('saisie-message');
let utilisateur = {
    "pseudo": "Dallas@ole.me"
};
let utilisateurs = ['Bobbi', 'Bibbo'];
let messages = [];

function ecouteSubmitMessage() {
    form.addEventListener('submit', (ev) => {
        // Evite que la page se recharge
        ev.preventDefault();
        const noeudChampMessage = document.getElementById('champ-message-en-cours'); 
        const messageAEnvoyer = noeudChampMessage.value;
        const noeudMessages = document.querySelector('#conversation-courante .messages');

        messages.push({
            contenu: messageAEnvoyer,
            auteur: utilisateur.pseudo,
            date: Date.now()
        })
        // On vide le champ de saisie pour le prochain message
        noeudChampMessage.value = '';
        // Scrolle tout en bas de la fenêtre de conversation
        noeudMessages.scrollTop = noeudMessages.scrollHeight;
    })
}

function start() {
    document.getElementById('champ-message-en-cours').focus();
    
    // Ecoute d'événements/interactions
    document.querySelector('#conversation-courante .messages').scrollTop = document.querySelector('#conversation-courante .messages').scrollHeight;
    ecouteSubmitMessage();

    // Affichage
    afficheListeUtilisateurs(utilisateurs);
    setInterval(() => { afficheListeUtilisateurs(utilisateurs) }, 5000);
}

function afficheListeUtilisateurs(listeUtilisateurs) {
    document.getElementById('users').innerHTML = '';
    for(let utilisateur of listeUtilisateurs) {
        let noeudUstilisateur = document.createElement('li');
        noeudUstilisateur.classList.add('user');
        noeudUstilisateur.innerText = utilisateur;
        noeudUstilisateur.addEventListener('click', () => { ouvrirConversation(utilisateur); });
        document.getElementById('users').appendChild(noeudUstilisateur);
    }
}

function afficheListeMessages(listeMessages) {
    document.querySelector('#conversation-courante > .messages').innerHTML = '';
    for(let message of listeMessages) {
        let noeudMessage = document.createElement('p');
        noeudMessage.classList.add('message');
        message.auteur === utilisateur.pseudo? noeudMessage.classList.add('mon'): null;
        noeudMessage.innerHTML = message.contenu + '<br>';
        const dateMessage = new Date(message.date)
        noeudMessage.innerHTML += dateMessage.toLocaleDateString() + ' | ' + message.auteur;
        document.querySelector('#conversation-courante > .messages').appendChild(noeudMessage);
    }
}

function getUtilisateurs() {
    //on veut vider le tableau des utilisateurs
    utilisateurs.splice(0, utilisateurs.length);

    //recuperer sur le serveur la list des utilisateurs
    // Parcourir la liste des utilisateurs et :

        // pour chaque utilisateur on l'ajoute dans la page html
        fetch('http://localhost:9001/utilisateurs.php?')
}
function getMessages(nomConversation) {
    messages.splice(0, messages.length);
    // On doit ici spécifier une URL qui retournera les informations demandées
    fetch('http://localhost:9001/messages.php?conversation=' + nomConversation)
        .then(response => response.json())
        .then(comments => {
            // On peut manipuler notre objet "comments" 
            // (voire le renommer pour qu'il colle aux informations que l'on a récupéré) 
            for (let i=0; i < comments.length; i++) {
                commentaireCourrant = {
                    "contenu": comments[i].body,
                    "auteur": comments[i].email,
                    "date": null
                }
                messages.push(commentaireCourrant);
            }
        })
}

function ouvrirConversation(nomDeLaConversation) {
    // Afficher le nom de la conversation dans la barre de titre de la conversation
    document.querySelector('#conversation-courante .titre').innerHTML = nomDeLaConversation;

    // Récupérer/afficher les messages de ladite conversation
    // TODO: récupérer la vraie liste des messages et pas un appel générique
    getMessages(nomDeLaConversation.toLowerCase());
    afficheListeMessages(messages);
    setInterval(() => afficheListeMessages(messages), 3000);

}

start();
