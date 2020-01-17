//Items à looter
/*
Ces items ont une chance de drop après un combat contre un monstre.
*/

export class Item {
    constructor(type,nom,img){
        this.type = type;
        this.name = nom;
        this.sprite = img;
    }
    drop(cible,affichage,log){
        let droprate = Math.random();
        if (droprate < 0.33) { // Une chance sur 3 de drop l'item
            cible.inventory.push(this);
            affichage.innerHTML = `<img src=${this.sprite} alt="potion">`;
            log.innerHTML += `<br>Vous trouvez un(e) <span class="name">${this.name}</span>`;
        }
    }
    use(cible,affichage,log){
        if (cible.inventory.indexOf(this) != -1) {
            switch (this.name) {
                case "Potion":
                    if (cible.hp + 30 > cible.hpMax) {
                        cible.hp = cible.hpMax;
                    } else {
                        cible.hp += 30;
                    }
                    setTimeout(() => {
                        log.innerHTML += " Vous récupérez 30hp.";
                    }, 600);
                    break;
                case "Élixir de force":
                    cible.atk += 5;
                    setTimeout(() => {
                        log.innerHTML += " Vous gagnez 5 atk.";
                    }, 600);
                    break;
            }
            cible.inventory.splice(cible.inventory.indexOf(this),1);
            log.innerHTML += `<br>Vous utilisez un(e) <span class="name">${this.name}</span> !`
            affichage.innerHTML = '<img src="./public/img/joueur/Felix_lBlade_CastFront2.gif" alt="hero heal"  class="w-100"></img>';
            setTimeout(() => {
                let display = document.createElement("div");
                let parent = affichage.parentElement;
                parent.insertBefore(display,parent.firstChild);
                display.innerHTML = `<img src=${this.sprite} alt="objet">`;
                display.classList.add("item");
                setTimeout(() => {
                    affichage.style.filter = "hue-rotate(90deg)"
                    setTimeout(() => {
                        affichage.style.filter = "hue-rotate(0deg)"
                        display.remove();
                        affichage.innerHTML = '<img src="./public/img/joueur/Felix_lBlade_Front.gif" alt="hero"  class="w-100"></img>';
                    }, 225);
                }, 150);
            }, 225);
        } else {
            log.innerHTML += "<br>Vous n'avez pas cet objet dans votre inventaire.";
        }
    }
}