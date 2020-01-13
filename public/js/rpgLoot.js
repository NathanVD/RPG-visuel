import {Hero} from "./modules/persos.js";
import {Coffre} from "./modules/coffres.js";

// VARIABLES {

    let action;
    //1 héro
    let player = new Hero("Pavel",100,100,10,10,'<img src="./public/img/Felix_lBlade_Front.gif" alt="hero"  class="w-100">');
    //3 coffres permettent d’améliorer les statistiques de votre héro
    let chest1 = new Coffre("Épée de célérité",0,15,5,'<img src="./public/img/21.png" alt="épée">');
    //HTML
    let chestActions = document.getElementById("actionsA");
    let open = document.getElementById("action1");
    let ignore = document.getElementById("action2");
    // let heroActions = document.getElementById("actionsB");
    // let attack = document.getElementById("action3");
    // let heal = document.getElementById("action4");
    let item = document.getElementById("displayItem");
    let monsterBg = document.getElementById("bg1");
    let display1 = document.getElementById("display1");
    // let statsBox1 = document.getElementById("statsBox1");
    // let monsterStats = document.getElementById("monsterStats");
    let heroBg = document.getElementById("bg2");
    //let display2 = document.getElementById("display2");
    // let statsBox2 = document.getElementById("statsBox2");
    // let heroStats = document.getElementById("heroStats");
    let text = document.getElementById("text");
    // let history = document.getElementById("history");

// } VARIABLES

function choice(action1,action2) {
    return new Promise(resolve => {
        action1.addEventListener("click", function(){resolve(1);});
        action2.addEventListener("click", function(){resolve(2);});
    });
}
  
async function loot(trésor) {

    text.innerHTML = "Vous avez trouvé un coffre ! Ouvrez le pour voir ce qu'il y a dedans !";

    while (action != 1 && action != 2){
        action = await choice(open,ignore);
    }

    if (action == 1){
        display1.innerHTML = '<img src="./public/img/openChest.png" alt="open chest" style="width:100px">';
        item.innerHTML = trésor.sprite
        text.innerHTML += `<br>Le coffre contenait un(e) <span class="name">${trésor.name}</span> que vous équipez.`
        trésor.equip(player,heroBg);
    }else if(action == 2){
        print1.innerHTML = "<br>Vous passez votre chemin sans ouvrir le coffre. Une décision courageuse."
    }
}

window.setup = function setup() {
    window.location.reload(false)
}

window.play = function play() {
    document.getElementById("play").style.display = "none";
    setTimeout(() => {
        monsterBg.style.background = "url(/public/img/anemos3.png)";
        monsterBg.style.backgroundSize = "cover";
        setTimeout(() => {
            display1.innerHTML = '<img src="./public/img/Chest.png" alt="chest" style="width:100px">';
            setTimeout(() => {
                chestActions.style.visibility = "visible";
                loot(chest1);
            }, 500);
        }, 500);
    }, 500);
}