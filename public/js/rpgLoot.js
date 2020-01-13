import {Hero} from "./modules/persos.js";
import {Coffre} from "./modules/coffres.js";

// VARIABLES {

    let action;//init;
    //1 héro
    let player = new Hero("Pavel",100,100,10,10,'<img src="./public/img/Felix_lBlade_Front.gif" alt="hero"  class="w-100">');
    //monstres
    // let monster = new Monstre("Skeleton",30,5,10,'<img src="./public/img/Skeleton.gif" alt="skeleton"  class="w-100"></img>');
    //3 coffres permettent d’améliorer les statistiques de votre héro
    let chest1 = new Coffre("Épée de célérité",0,15,5,'<img src="./public/img/sword.png" alt="épée">');
    //HTML
    let start = document.getElementById("start");
    let reset = document.getElementById("reset");
    let chestActions = document.getElementById("actionsA");
    let open = document.getElementById("action1");
    let ignore = document.getElementById("action2");
    // let heroActions = document.getElementById("actionsB");
    // let attack = document.getElementById("action3");
    // let heal = document.getElementById("action4");
    let item = document.getElementById("displayItem");
    let bgLeft = document.getElementById("bg1");
    let display1 = document.getElementById("display1");
    // let statsBox1 = document.getElementById("statsBox1");
    // let monsterStats = document.getElementById("monsterStats");
    let bgRight = document.getElementById("bg2");
    //let display2 = document.getElementById("display2");
    // let statsBox2 = document.getElementById("statsBox2");
    // let heroStats = document.getElementById("heroStats");
    let logText = document.getElementById("text");
    // let log = document.getElementById("log");

// } VARIABLES

let choice = (action1,action2) => {
    return new Promise(resolve => {
        action1.removeAttribute("disabled");
        action2.removeAttribute("disabled");
        action1.addEventListener("click", ()=>{
            action1.setAttribute("disabled","disabled");
            action2.setAttribute("disabled","disabled");
            resolve(1);
        });
        action2.addEventListener("click", ()=>{
            action1.setAttribute("disabled","disabled");
            action2.setAttribute("disabled","disabled");
            resolve(2);
        });
    });
}

let openChest = (trésor) => {
    return new Promise(resolve => {
        display1.innerHTML = '<img src="./public/img/openChest.png" alt="open chest" style="width:100px">';
        item.innerHTML = trésor.sprite
        logText.innerHTML += `<br>Le coffre contenait un(e) <span class="name">${trésor.name}</span> que vous équipez.`
        trésor.equip(player,bgRight);
        setTimeout(() => {
            action1.removeAttribute("disabled");
            action1.innerHTML = "Continuer";
            action2.style.display = "none";
            action1.addEventListener("click", ()=> resolve() )
        }, 500);
    });
}
  
let loot = async (trésor) => {
    logText.innerHTML = "Vous avez trouvé un coffre ! Ouvrez le pour voir ce qu'il y a dedans !";
    action = await choice(open,ignore);
    if (action == 1){
        await openChest(trésor);
    } else if(action == 2){
        logText.innerHTML += "<br>Vous passez votre chemin sans ouvrir le coffre. Une décision courageuse."
    }
    logText.innerHTML += "<br>Vous sortez de la salle."
}

let reload = () => {
    window.location.reload(false)
}

let play = () => {
    start.style.display = "none";
    setTimeout(() => {
        bgLeft.style.background = "url(/public/img/anemos3.png)";
        bgLeft.style.backgroundSize = "cover";
        setTimeout(() => {
            display1.innerHTML = '<img src="./public/img/chest.png" alt="chest" style="width:100px">';
            setTimeout(() => {
                chestActions.style.visibility = "visible";
                loot(chest1);
            }, 500);
        }, 500);
    }, 500);
}

// BOUTONS START/RESET
start.addEventListener("click",play);
reset.addEventListener("click",reload);