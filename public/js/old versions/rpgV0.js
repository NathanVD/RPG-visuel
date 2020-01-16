import {Hero,Monstre} from "../modules/persos.js";
import {Coffre} from "../modules/coffres.js";

// VARIABLES {

    let setStage, action, player, init;
    let compteur = 0;
    let exclude = [];
    //1 héro
    let player = new Hero("placeholder",100,100,10,10);
    //6 monstres au total
    let monster1 = new Monstre("Slime",10,2,5);
    let monster2 = new Monstre("Skeleton",30,5,10);
    let monster3 = new Monstre("Vampire",50,10,15);
    let monster4 = new Monstre("Shadow",200,2,9999);
    let monster5 = new Monstre("Little Balrog",80,15,20);
    let monster6 = new Monstre("Dragon whelp",100,20,25);
    //3 coffres permettent d’améliorer les statistiques de votre héro
    let chest1 = new Coffre("Épée de célérité",0,15,5);
    let chest2 = new Coffre("Casque de célérité",10,0,5);
    let chest3 = new Coffre("Armure de célérité",30,0,5);
    //HTML
    let setup = document.getElementById("setup");
    let play = document.getElementById("play");
    let open = document.getElementById("open");
    let ignore = document.getElementById("ignore");
    let action1 = document.getElementById("action1");
    let action2 = document.getElementById("action2");
    let display1 = document.getElementById("display1");
    let display2 = document.getElementById("display2");
    let print1 = document.getElementById("print1");
    let print2 = document.getElementById("print2");
    let treasure = document.getElementById("treasure");

// } VARIABLES

// FONCTIONS

    // Choice renvoie le bouton cliqué (action 1 ou 2)
    function choice() {
        return new Promise(resolve => {
            action1.addEventListener("click", function(){resolve(1);});
            action2.addEventListener("click", function(){resolve(2);});
        });
    }

    // Fight est la fonction à utiliser dans les salles de monstres
    async function fight(monstre) {

        function playerAction() {
            do {
                action = prompt(`Que souhaitez-vous faire ?
                1) Attaque
                2) Sort de soin`)
                if (action == 1 || action == "swordAttack()"){
                    player.swordAttack(monstre);
                }else if(action == 2 || action == "healingSpell()"){
                    player.healingSpell();
                }else{
                    console.log("Veuillez choisir 1 ou 2 pour effectuer une action.");
                }
            } while (action != 1 && action != 2 && action != "swordAttack()" && action != "healingSpell()");
        }
        
        console.log(`Vous rencontrez un ${monstre.name} !
    ${monstre.name} a ${monstre.hp}hp et ${monstre.atk}atk.
    Vous avez ${player.hp}/${player.hpMax} et ${player.atk}atk.
    Vous allez devoir vous battre pour avancer.`)

        if (monstre.speed > player.speed) {
            init = "monstre";
            console.log(monstre.name + " a l'initiative.");
        } else {
            init = "player";
            console.log("Vous avez l'initiative.");
        }
        do {
            if (init == "monstre") {
                monstre.attack(player);
                if (player.hp > 0) {playerAction()}
            } else {
                playerAction();
                if (monstre.hp > 0) {monstre.attack(player);}
            }
        } while (monstre.hp > 0 && player.hp > 0);
        if (player.hp > 0) {
            compteur++
        }
        console.log(compteur + "/6 monstres vaincus !"); 
    }



    // Loot est la fonction à utiliser dans les salles au trésor
    async function loot(trésor) {

        action1.style.display = "inline-block";
        action1.innerHTML = "Ouvrir";
        action2.style.display = "inline-block";
        action2.innerHTML = "Ignorer";
    
        print1.innerHTML = "Vous avez trouvé un coffre ! Ouvrez le pour voir ce qu'il y a dedans !";
        display1.innerHTML = '<img src="./public/img/chest.png" alt="chest">'
    
        while (action != 1 && action != 2){
            action = await choice()
        }
    
        if (action == 1){
            display1.innerHTML = '<img src="./public/img/bladeOfSelves.jpg" alt="épée">'
            print1.innerHTML = "Le coffre contenait un(e)"
            treasure.innerHTML = trésor.name;
            print2.innerHTML = "que vous équipez."
            trésor.equip(player,display2);
        }else if(action == 2){
            print1.innerHTML = "Vous passez votre chemin sans ouvrir le coffre. Une décision courageuse."
        }
    }

    // Setup: prend le nom du joueur, setup/reset le jeu
    window.setup = function setup() {
        //Nom du héro
        player.name = prompt("Entrez votre nom :");

        //Setup/reset
        action = 0;
        print1.innerHTML = "";
        print2.innerHTML = "";
        treasure.innerHTML = "";

        //Affichage du bouton de jeu
        play.style.display = "block";
    }

    //Boucle de jeu
    window.play = function play() {

        //Message d'intro
        console.log(`%cSalut ${player.name}! Tu vas devoir affronter plusieurs monstres durant cette aventure, juge bien tes actions ! 
    Tu peux attaquer le monstre contre qui tu te trouves en utilisant la méthode swordAttack() (ou 1) dans la console. Tu peux aussi te soigner en écrivant healingSpell() (ou 2) dans la console également (celà te soignera de 15Pv à chaque utilisation). 
    Il n'y aura pas que des monstres durant ton aventure, tu trouveras 3 coffres tout au long de ton parcours.
    Amuse toi bien et essaie de survivre !`,"background:black; color:white;")

        while(player.hp > 0 && compteur < 6){
        
            do {
                setStage = parseInt(Math.random()*9);
                for(let i=0;i<exclude.length;i++){
                    if(setStage == exclude[i]){
                        setStage = "Déjà fait"
                    }
                }
            } while (setStage == "Déjà fait");
        
            switch (setStage) {
                case 0: //Slime
                console.log("%c","line-height:40px;background:")
                    fight(monster1);
                    exclude.push(0);
                    break;
                case 1: //Skeleton
                    fight(monster2);
                    exclude.push(1);
                    break;
                case 2: //Vampire
                    fight(monster3);
                    exclude.push(2);
                    break;
                case 3: //Ombre
                    fight(monster4);
                    exclude.push(3);
                    break;
                case 4: //PetitBalrog
                    fight(monster5);
                    exclude.push(4);
                    break;
                case 5: //Dragonnet
                    fight(monster6);
                    exclude.push(5);
                    break;
                case 6: //Épée
                    loot(chest1);
                    exclude.push(6);
                    break;
                case 7: //Casque
                    loot(chest2);
                    exclude.push(7);
                    break;
                case 8: //Armure
                    loot(chest3);
                    exclude.push(8);
                    break;
            }        
        }
        
        if(player.hp <= 0){
            alert("☠ Game Over ! ☠");
            console.log("%c☠ Game Over ! ☠","background:red;");
        }else{
            alert("✭ Victoire ! ✭");
            console.log("%c✭ Victoire ! ✭","background:green;");
        }
    }