//Coffres au trésor
/*
Pour les coffres, ils apparaissant de façon random après un combat contre un monstre, 
les coffres permettent d’améliorer les statistiques de votre héro.
*/

export class Coffre {
    constructor(type,nom,bonusPV,bonusAttaque,bonusVitesse,img){
        this.type = type;
        this.name = nom;
        this.bonusHP = bonusPV;
        this.bonusAtk = bonusAttaque;
        this.bonusSpeed = bonusVitesse;
        this.sprite = img;
    }
    equip(cible,boite,affichage){
        cible.hpMax += this.bonusHP;
        cible.hp += this.bonusHP;
        cible.atk += this.bonusAtk;
        cible.speed += this.bonusSpeed;
        boite.style.display = "block";
        affichage.innerHTML = `<br><strong>♥ Points de vie +${this.bonusHP} => Nouvelle valeur : ${cible.hpMax}<br>
<br>⟰ Attaque +${this.bonusAtk} => Nouvelle valeur : ${cible.atk}<br>
<br>⤏ Vitesse +${this.bonusSpeed} => Nouvelle valeur : ${cible.speed}</strong><br>&nbsp;`
    }
}