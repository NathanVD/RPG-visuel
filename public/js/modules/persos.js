//Classe de personnages

export class Personnage {
    constructor(nom,pv,attaque,vitesse,img){
        this.name = nom;
        this.hp = pv;
        this.atk = attaque;
        this.speed = vitesse;
        this.sprite = img;
    }
}

/* 1) Le Héro
Votre héro aura :
-un nom (celui qui est rentré au début du jeu)
-un nombre de Point de vie
-un nombre de Point de vie Maximum
-un nombre de dégâts 
-une vitesse.
*/

export class Hero extends Personnage {
    constructor(nom,pv,pvMax,attaque,vitesse,inventaire,img){
        super(nom,pv,attaque,vitesse,img);
        this.hpMax = pvMax;
        this.inventory = inventaire;
    }
    //La méthode swordAttack() fera des dégâts au monstre du stage en fonction des dégâts du héro.
    swordAttack(cible,affichage,affichageCible,log){
        if (cible.hp - this.atk >= 0) {
            cible.hp -= this.atk;
        } else {
            cible.hp = 0;
        }
        log.innerHTML += `<br>Vous attaquez ${cible.name}.`
        affichage.innerHTML = '<img src="./public/img/joueur/Felix_lBlade_Attack1.gif" alt="hero attack1"  class="w-100"></img>';
        setTimeout(() => {
            affichage.innerHTML = '<img src="./public/img/joueur/Felix_lBlade_Attack2.gif" alt="hero attack2"  class="w-100"></img>';
            affichageCible.style.filter= "saturate(1000%)";
            setTimeout(() => {
                affichageCible.style.filter= "saturate(100%)";
                affichage.innerHTML = '<img src="./public/img/joueur/Felix_lBlade_Front.gif" alt="hero"  class="w-100"></img>';
                log.innerHTML += ` Il perd ${this.atk}hp.`;
            }, 300);
        }, 300);
    }
    healingSpell(affichage,log){
        if (this.hp + 15 > this.hpMax) {
            this.hp = this.hpMax;
        } else {
            this.hp += 15;
        }
        log.innerHTML += "<br>Vous utilisez un sort de soin !"
        affichage.innerHTML = '<img src="./public/img/joueur/Felix_lBlade_CastFront2.gif" alt="hero heal"  class="w-100"></img>';
        setTimeout(() => {
            affichage.style.filter = "hue-rotate(70deg)"
            setTimeout(() => {
                affichage.style.filter = "hue-rotate(0deg)"
                setTimeout(() => {
                    affichage.innerHTML = '<img src="./public/img/joueur/Felix_lBlade_Front.gif" alt="hero"  class="w-100"></img>';
                    log.innerHTML += " Vous récupérez 15hp.";
                }, 225);
            }, 150);
        }, 225);
    }
}

/*2) Les monstres
Chaque monstre a :
-un nom
-un nombre de Point de vie
-un nombre de dégâts 
-une vitesse
*/

export class Monstre extends Personnage {
    constructor(type,nom,pv,attaque,vitesse,img){
        super(nom,pv,attaque,vitesse,img);
        this.type = type;
    }
    attack(player,affichage,affichagePlayer,log){
        if (player.hp - this.atk >= 0) {
            player.hp -= this.atk;
        } else {
            player.hp = 0;
        }
        log.innerHTML += `<br>${this.name} vous attaque.`;
        affichage.style.filter= "invert(75%)";
        setTimeout(() => {
            affichage.style.marginLeft= "150px";
            affichagePlayer.style.filter= "saturate(1000%)";
            setTimeout(() => {
                affichage.style.marginLeft= "0";
                setTimeout(() => {
                    affichagePlayer.style.filter= "saturate(100%)";
                    affichage.style.filter= "invert(0%)";
                    setTimeout(() => {
                        log.innerHTML += ` Vous perdez ${this.atk}hp.`;
                    }, 300);
                }, 100);
            }, 100);
        }, 100);
    }
}