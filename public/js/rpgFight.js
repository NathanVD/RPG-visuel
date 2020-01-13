import {Hero,Monstre} from "./modules/persos.js";

// VARIABLES {

    let action,init;
    //1 héro
    let player = new Hero("Pavel",10,100,10,10,'<img src="./public/img/Felix_lBlade_Front.gif" alt="hero"  class="w-100">');
    //monstre
    let monster = new Monstre("Skeleton",30,5,10,'<img src="./public/img/Skeleton.gif" alt="skeleton"  class="w-100"></img>');
    //HTML
    // let chestActions = document.getElementById("actionsA");
    // let open = document.getElementById("action1");
    // let ignore = document.getElementById("action2");
    let heroActions = document.getElementById("actionsB");
    let attack = document.getElementById("action3");
    let heal = document.getElementById("action4");
    let monsterBg = document.getElementById("bg1");
    let display1 = document.getElementById("display1");
    let statsBox1 = document.getElementById("statsBox1");
    let monsterStats = document.getElementById("monsterStats");
    let heroBg = document.getElementById("bg2");
    let display2 = document.getElementById("display2");
    let statsBox2 = document.getElementById("statsBox2");
    let heroStats = document.getElementById("heroStats");
    let logText = document.getElementById("text");
    let log = document.getElementById("log");

// } VARIABLES

function choice(action1,action2) {
    return new Promise(resolve => {
        action1.addEventListener("click", function(){resolve(1);});
        action2.addEventListener("click", function(){resolve(2);});
    });
}

async function fight(monstre) {
    while (monstre.hp > 0 && player.hp > 0){
        console.log("test");
        while (action != 1 && action != 2){
            action = await choice(attack,heal);
        }
        attack.setAttribute("disabled","disabled");
        heal.setAttribute("disabled","disabled");
        if (init == "monstre") {
            monstre.attack(player,display1,display2,logText);
            if (player.hp > 0) {
                if (action == 1){
                    player.swordAttack(monstre,display2,display1,logText);
                    log.scrollTop = log.scrollHeight;
                }else if(action == 2){
                    player.healingSpell(display2,logText);
                    log.scrollTop = log.scrollHeight;
                }
            }
        } else {
            if (action == 1){
                player.swordAttack(monstre,display2,display1,logText);
                setTimeout(() => {
                    log.scrollTop = log.scrollHeight;
                    setTimeout(() => {
                        log.scrollTop = log.scrollHeight;
                        monsterStats.innerHTML = `${monstre.name} <br> <span class="red">♥</span> ${monstre.hp} &nbsp; | &nbsp; <span class="gold">⚔</span> ${monstre.atk}`;
                    }, 501);
                }, 501);
            }else if(action == 2){
                player.healingSpell(display2,logText);
                setTimeout(() => {
                    log.scrollTop = log.scrollHeight;
                    setTimeout(() => {
                        log.scrollTop = log.scrollHeight;
                    }, 501);
                }, 501);
            }
            setTimeout(() => {
                if (monstre.hp > 0) {
                    monstre.attack(player,display1,display2,logText);
                    log.scrollTop = log.scrollHeight;
                    setTimeout(() => {
                        log.scrollTop = log.scrollHeight;
                        heroStats.innerHTML = `${player.name} <br> <span class="red">♥</span> ${player.hp} / ${player.hpMax} &nbsp; | &nbsp; <span class="gold">⚔</span> ${player.atk}`;
                    }, 1001);
                }
            }, 1500);
        }
        action = 0;
        setTimeout(() => {
            attack.removeAttribute("disabled");
            heal.removeAttribute("disabled");
        }, 3010);
        console.log(player.hp);
    } 
    if(monstre.hp <= 0){
        display1.style.filter= "saturate(50%)";
        setTimeout(() => {
            statsBox1.style.display = "none";
            logText.innerHTML += `<br>Vous avez vaincu ${monstre.name} !`
            log.scrollTop = log.scrollHeight;
            display1.style.filter= "saturate(0)";
            setTimeout(() => {
                    display1.innerHTML = "";
            }, 2000);
        }, 1500);
    } else if(player.hp <= 0) {
        display2.innerHTML = '<img src="./public/img/Felix_lBlade_DownedBack.gif" alt="hero"  class="w-100">';
        setTimeout(() => {
            statsBox2.style.display = "none";
            logText.innerHTML += `<br>Vous avez été défait par ${monstre.name} !`
            log.scrollTop = log.scrollHeight;
            setTimeout(() => {
                logText.innerHTML += `<br>Game Over !`
                log.scrollTop = log.scrollHeight;
                //display2.innerHTML = "";
            }, 2000);
        }, 1500);
    }
}

function ennemy(monstre) {
    logText.innerHTML += `<br>Vous rencontrez un <span class="name">${monstre.name}</span> !`
    display1.innerHTML = monstre.sprite;
    monsterStats.innerHTML = `${monstre.name} <br> <span class="red">♥</span> ${monstre.hp} &nbsp; | &nbsp; <span class="gold">⚔</span> ${monstre.atk}`;
    display2.innerHTML = player.sprite;
    heroStats.innerHTML = `${player.name} <br> <span class="red">♥</span> ${player.hp} / ${player.hpMax} &nbsp; | &nbsp; <span class="gold">⚔</span> ${player.atk}`;
    setTimeout(() => {
        logText.innerHTML += "<br>Vous allez devoir vous battre pour avancer.";
        statsBox1.style.display = "block";
        statsBox2.style.display = "block";
        heroActions.style.visibility = "visible";
        log.scrollTop = log.scrollHeight;
        setTimeout(() => {
            if (monstre.speed > player.speed) {
                init = "monstre";
                logText.innerHTML += `<br>${monstre.name} a l'initiative.`;
            } else {
                init = "player";
                logText.innerHTML += "<br>Vous avez l'initiative.";
            }
            log.scrollTop = log.scrollHeight;
        }, 500);
    }, 500);
}

window.setup = function setup() {
    window.location.reload(false)
}

window.play = function play() {
    document.getElementById("play").style.display = "none";
    setTimeout(() => {
        monsterBg.style.background = "url(/public/img/anemos1.png)";
        monsterBg.style.backgroundSize = "cover";
        display1.innerHTML = '<img src="/public/img/fight.png" alt="fight" class="w-100" style="margin-bottom: 100px">';
        heroBg.style.background = "url(/public/img/anemos2.png)";
        heroBg.style.backgroundSize = "cover";
        display2.innerHTML = '<img src="/public/img/fight.png" alt="fight" class="w-100" style="margin-bottom: 100px">';
        setTimeout(() => {
            ennemy(monster);
            fight(monster);
        }, 1000);
    }, 500);
}