//Coffres au trésor
/*
Pour les coffres, ils apparaissant de façon random après un combat contre un monstre, 
les coffres permettent d’améliorer les statistiques de votre héro.
*/

export class Coffre {
    constructor(nom,bonusPV,bonusAttaque,bonusVitesse,img){
        this.name = nom;
        this.bonusHP = bonusPV;
        this.bonusAtk = bonusAttaque;
        this.bonusSpeed = bonusVitesse;
        this.sprite = img;
    }
    equip(cible,affichage){
        cible.hpMax += this.bonusHP;
        cible.hp += this.bonusHP;
        cible.atk += this.bonusAtk;
        cible.speed += this.bonusSpeed;
        affichage.style.color = "gold";
        affichage.style.backgroundColor = "brown";
        affichage.style.fontSize = "20px";
        affichage.style.justifyContent = "center";
        affichage.innerHTML = `<p>♥ Points de vie +${this.bonusHP} => Nouvelle valeur : ${cible.hpMax}</p><br>
        <p>⟰ Attaque +${this.bonusAtk} => Nouvelle valeur : ${cible.atk}</p><br>
        <p>⤏ Vitesse +${this.bonusSpeed} => Nouvelle valeur : ${cible.speed}</p>`
    }
}