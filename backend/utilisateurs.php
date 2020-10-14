<?php 
// définition des en-têtes HTTP de la réponse pour supporter le Cross-Origin
    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin:*');

    // inclusion des dépendances necessaires
    include("db.php");

    // construction de notre requête paramétrée 
    $req = "SELECT * FROM UTILISATEURS";
    
    // Connexion à la BDD et envoie de la requête 

    $connexion = new PDO($url, $user, $pass);
    $connexion -> setAttribute(PDO::ATTR_ERMODE,PDO::ATTR_ERRMODE_EXCEPTION);

    try{
        $statment = $connexion->prepare($req);
        $statment->execute([]);
        $resultats = $statment->fetchAll(PDO::FETCH_ASSOC);

    }catch(Exception $exception) {
        echo $exception->getMessages();
    }

    //renvoi de la réponse 

    echo json_encode($resultats);