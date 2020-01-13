import {Hero,Monstre} from "./modules/persos.js";

// VARIABLES {

    let action,init;
    //1 héro
    let player = new Hero("Pavel",10,100,10,10,'<img src="./public/img/Felix_lBlade_Front.gif" alt="hero"  class="w-100">');
    //monstre
    let monster = new Monstre("Skeleton",30,5,10,'<img src="./public/img/Skeleton.gif" alt="skeleton"  class="w-100"></img>');
    //HTML
    let start = document.getElementById("start");
    let reset = document.getElementById("reset");
    // let chestActions = document.getElementById("actionsA");
    // let open = document.getElementById("action1");
    // let ignore = document.getElementById("action2");
    let heroActions = document.getElementById("actionsB");
    let attack = document.getElementById("action3");
    let heal = document.getElementById("action4");
    let bgLeft = document.getElementById("bg1");
    let display1 = document.getElementById("display1");
    let statsBox1 = document.getElementById("statsBox1");
    let monsterStats = document.getElementById("monsterStats");
    let bgRight = document.getElementById("bg2");
    let display2 = document.getElementById("display2");
    let statsBox2 = document.getElementById("statsBox2");
    let heroStats = document.getElementById("heroStats");
    let logText = document.getElementById("text");
    let log = document.getElementById("log");

// } VARIABLES

// FUNCTIONS {

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

let swordAttack = async (monstre) => {
    return new Promise( resolve => {
        player.swordAttack(monstre,display2,display1,logText);
        log.scrollTop = log.scrollHeight;
        setTimeout(() => {
            monsterStats.innerHTML = `${monstre.name} <br> <span class="red">♥</span> ${monstre.hp} &nbsp; | &nbsp; <span class="gold">⚔</span> ${monstre.atk}`;
            setTimeout(() => {
                log.scrollTop = log.scrollHeight;
                setTimeout(() => {
                    resolve();
                }, 500);
            }, 501);
        }, 501);
    });
}

let healSpell = async () => {
    return new Promise( resolve => {
        player.healingSpell(display2,logText);
        log.scrollTop = log.scrollHeight;
        setTimeout(() => {
            heroStats.innerHTML = `${player.name} <br> <span class="red">♥</span> ${player.hp} / ${player.hpMax} &nbsp; | &nbsp; <span class="gold">⚔</span> ${player.atk}`;
            setTimeout(() => {
                log.scrollTop = log.scrollHeight;
                setTimeout(() => {
                    resolve();
                }, 500);
            }, 501);
        }, 501);
    });
}

let monsterAttack = async (monstre) => {
    return new Promise( resolve => {
        monstre.attack(player,display1,display2,logText);
        log.scrollTop = log.scrollHeight;
        setTimeout(() => {
            heroStats.innerHTML = `${player.name} <br> <span class="red">♥</span> ${player.hp} / ${player.hpMax} &nbsp; | &nbsp; <span class="gold">⚔</span> ${player.atk}`;
            setTimeout(() => {
                log.scrollTop = log.scrollHeight;
                setTimeout(() => {
                    resolve();
                }, 500);
            }, 501);
        }, 501);
    });
}

let monsterDeath = async (monstre) => {
    return new Promise( resolve => {
        display1.style.filter= "saturate(50%)";
        setTimeout(() => {
            statsBox1.style.display = "none";
            display1.style.filter= "saturate(0)";
            logText.innerHTML += `<br>Vous avez vaincu ${monstre.name} !`
            log.scrollTop = log.scrollHeight;
            setTimeout(() => {
                    display1.innerHTML = "";
                    logText.innerHTML += `<br>Combat terminé.`
                    log.scrollTop = log.scrollHeight;
                    resolve()
            }, 1000);
        }, 1000);
    });
}

let playerDeath = async (monstre) => {
    return new Promise( resolve => {
        display2.innerHTML = '<img src="./public/img/Felix_lBlade_HitBack.gif" alt="hero"  class="w-100">';
        setTimeout(() => {
            display2.innerHTML = '<img src="./public/img/Felix_lBlade_DownedBack.gif" alt="hero"  class="w-100">';
            setTimeout(() => {
                statsBox2.style.display = "none";
                display2.innerHTML = '<img src="./public/img/Felix_lBlade_DownedBack.gif" alt="hero"  class="w-100">';
                logText.innerHTML += `<br>Vous avez été défait par ${monstre.name} !`
                log.scrollTop = log.scrollHeight;
                setTimeout(() => {
                    logText.innerHTML += `<br>Game Over !`
                    log.scrollTop = log.scrollHeight;
                    resolve()
                }, 1000);
            }, 500);
        }, 500);
    });
}

let fight = async (monstre,init) => {

    while (monstre.hp > 0 && player.hp > 0){

        //Monstre agit en premier
        if (init == "monstre") {
            //Action Monstre
            await monsterAttack(monstre);
            //Action Joueur
            if (player.hp > 0) {
                //Choix action
                action = await choice(attack,heal);
                if (action == 1){
                    await swordAttack(monstre);
                }else if(action == 2){
                    await healSpell(monstre);
                }
            }

        //Joueur agit en premier
        } else {
            //Action Joueur
            action = await choice(attack,heal);
            if (action == 1){
                await swordAttack(monstre);
            }else if(action == 2){
                await healSpell(monstre);
            }
            //Action Monstre
            if (monstre.hp > 0) {
                await monsterAttack(monstre);
            }
        }
        action = 0;
    } 
    //Anim morts
    if(monstre.hp <= 0){
        await monsterDeath(monstre);
    } else if(player.hp <= 0) {
        await playerDeath(monstre);
    }
}

let ennemy = async (monstre) => {
    return new Promise(resolve => {
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
                resolve(init)
            }, 500);
        }, 500);
    })
}

let play = () => {
    start.style.display = "none";
    setTimeout(() => {
        bgLeft.style.background = "url(/public/img/anemos1.png)";
        bgLeft.style.backgroundSize = "cover";
        display1.innerHTML = '<img src="/public/img/fight.png" alt="fight" class="w-100" style="margin-bottom: 100px">';
        bgRight.style.background = "url(/public/img/anemos2.png)";
        bgRight.style.backgroundSize = "cover";
        display2.innerHTML = '<img src="/public/img/fight.png" alt="fight" class="w-100" style="margin-bottom: 100px">';
        setTimeout( async () => {
            init = await ennemy(monster);
            fight(monster,init);
        }, 1000);
    }, 500);
}

let reload = () => {
    window.location.reload(false)
}

// BOUTONS START/RESET
start.addEventListener("click",play);
reset.addEventListener("click",reload);