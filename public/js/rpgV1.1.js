import {Hero,Monstre} from "./modules/persos.js";
import {Coffre} from "./modules/coffres.js";

// VARIABLES {

    let room,action,init;
    //1 héro
    let player = new Hero("Pavel",100,100,10,10,'<img src="./public/img/joueur/Felix_lBlade_Front.gif" alt="hero"  class="w-100">');
    //monstre
    let monster1 = new Monstre("monstre","Slime",10,3,3,'<img src="./public/img/monstres/Ooze.gif" alt="slime" class="w-50"></img>');
    let monster2 = new Monstre("monstre","Gnome",15,5,5,'<img src="./public/img/monstres/Gnome.gif" alt="gnome" class="w-50"></img>');
    let monster3 = new Monstre("monstre","Goblin",25,8,12,'<img src="./public/img/monstres/Goblin.gif" alt="goblin" class="w-75"></img>');
    let monster4 = new Monstre("monstre","Skeleton",30,5,15,'<img src="./public/img/monstres/Skeleton.gif" alt="skeleton" class="w-100"></img>');
    let monster5 = new Monstre("monstre","Zombie",25,20,1,'<img src="./public/img/monstres/Zombie.gif" alt="zombie" class="w-100"></img>');
    let monster6 = new Monstre("monstre","Gargoyle",40,15,20,'<img src="./public/img/monstres/Clay_Gargoyle.gif" alt="gargoyle" class="w-100"></img>');
    let monster7 = new Monstre("coffre","Mimic",40,15,20,'<img src="./public/img/monstres/Mimic.gif" alt="mimic" class="w-100"></img>');
    //boss
    let boss1 = new Monstre("boss","Manticore",80,20,25,'<img src="./public/img/monstres/boss/Manticore.gif" alt="mimic" class="w-100"></img>');
    //3 coffres permettent d’améliorer les statistiques de votre héro
    let chest1 = new Coffre("coffre","Épée de célérité",0,15,5,'<img src="./public/img/items/sword.png" alt="épée">');
    let chest2 = new Coffre("coffre","Bottes de célérité",10,0,5,'<img src="./public/img/items/bottes.png" alt="bottes">');
    let chest3 = new Coffre("coffre","Armure de célérité",30,0,5,'<img src="./public/img/items/armure.png" alt="armure">');
    //Le donjooooooon !
    let dungeon = [monster1,monster2,monster3,monster4,monster5,monster6,monster7,chest1,chest2,chest3];
    let compteur = 0;
    //HTML
    let start = document.getElementById("start");
    let reset = document.getElementById("reset");
    let chestActions = document.getElementById("actionsA");
    let open = document.getElementById("action1");
    let ignore = document.getElementById("action2");
    let heroActions = document.getElementById("actionsB");
    let attack = document.getElementById("action3");
    let heal = document.getElementById("action4");
    let item = document.getElementById("displayItem");
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

//Fonctions MONSTRES

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
                    display1.style.filter= "saturate(100%)";
                    logText.innerHTML += `<br>Combat terminé.`
                    log.scrollTop = log.scrollHeight;
                    resolve()
            }, 1000);
        }, 1000);
    });
}

let playerDeath = async (monstre) => {
    return new Promise( resolve => {
        display2.innerHTML = '<img src="./public/img/joueur/Felix_lBlade_HitBack.gif" alt="hero"  class="w-100">';
        setTimeout(() => {
            display2.innerHTML = '<img src="./public/img/joueur/Felix_lBlade_DownedBack.gif" alt="hero"  class="w-100">';
            setTimeout(() => {
                statsBox2.style.display = "none";
                display2.innerHTML = '<img src="./public/img/joueur/Felix_lBlade_DownedBack.gif" alt="hero"  class="w-100">';
                logText.innerHTML += `<br>Vous avez été défait par ${monstre.name} !`
                log.scrollTop = log.scrollHeight;
                resolve()
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

let initiative = async (monstre) => {
    return new Promise(resolve => {
        if (monstre.name == "Mimic") {
            logText.innerHTML += `<br>Le coffre était en fait une <span class="name">${monstre.name}</span> !`
        } else {
            logText.innerHTML += `<br>Vous rencontrez un <span class="name">${monstre.name}</span> !`
        }
        log.scrollTop = log.scrollHeight;
        display1.innerHTML = monstre.sprite;
        monsterStats.innerHTML = `${monstre.name} <br> <span class="red">♥</span> ${monstre.hp} &nbsp; | &nbsp; <span class="gold">⚔</span> ${monstre.atk}`;
        display2.innerHTML = player.sprite;
        heroStats.innerHTML = `${player.name} <br> <span class="red">♥</span> ${player.hp} / ${player.hpMax} &nbsp; | &nbsp; <span class="gold">⚔</span> ${player.atk}`;
        setTimeout(() => {
            logText.innerHTML += "<br>Vous allez devoir vous battre pour avancer.";
            log.scrollTop = log.scrollHeight;
            statsBox1.style.display = "block";
            statsBox2.style.display = "block";
            heroActions.style.visibility = "visible";
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

let ennemy = async (room) => {
    return new Promise(resolve => {
        setTimeout(() => {
            bgLeft.style.background = "url(/public/img/backgrounds/anemos1.png)";
            bgLeft.style.backgroundSize = "cover";
            display1.innerHTML = '<img src="/public/img/fight.png" alt="fight" class="w-100" style="margin-bottom: 100px">';
            bgRight.style.background = "url(/public/img/backgrounds/anemos2.png)";
            bgRight.style.backgroundSize = "cover";
            display2.innerHTML = '<img src="/public/img/fight.png" alt="fight" class="w-100" style="margin-bottom: 100px">';
            setTimeout( async () => {
                init = await initiative(room);
                await fight(room,init);
                statsBox1.style.display = "none";
                statsBox2.style.display = "none";
                heroActions.style.visibility = "hidden";
                setTimeout(() => {
                    display1.innerHTML = "";
                    display2.innerHTML = "";   
                    bgLeft.style.background = "darkblue";
                    bgRight.style.background = "darkblue";
                    resolve()
                }, 500);
            }, 1000);
        }, 500);
    });
}

//Fonctions COFFRES

let openMimic = () => {
    return new Promise(resolve => {
        setTimeout(() => {
            chestActions.style.visibility = "hidden";
            display1.style.filter = "invert(100%)";
            setTimeout(() => {
                display1.style.filter = "invert(0%)";
                setTimeout(() => {
                    display1.style.filter = "invert(100%)";
                    setTimeout( () => {
                        display1.style.filter = "invert(0%)";
                        setTimeout(async () => {
                            setTimeout(() => {
                                display1.style.filter = "invert(0%)";
                            }, 500);
                            display1.style.filter = "invert(100%)";
                            await ennemy(room)
                            resolve()
                        }, 500);
                    }, 100);
                }, 100);
            }, 100);
        }, 300);
    });
}

let openChest = (trésor) => {
    return new Promise(resolve => {
        display1.innerHTML = '<img src="./public/img/items/openChest.png" alt="open chest" style="width:100px">';
        item.innerHTML = trésor.sprite;
        logText.innerHTML += `<br>Le coffre contenait un(e) <span class="name">${trésor.name}</span> que vous équipez.`
        log.scrollTop = log.scrollHeight;
        trésor.equip(player,statsBox2,heroStats);
        setTimeout(() => {
            action1.removeAttribute("disabled");
            action1.innerHTML = "Continuer";
            action2.style.display = "none";
            action1.addEventListener("click", ()=>resolve() )
        }, 500);
    });
}
  
let loot = (trésor) => {
    return new Promise(async resolve => {
        logText.innerHTML += "<br>Vous avez trouvé un coffre ! Ouvrez le pour voir ce qu'il y a dedans !";
        log.scrollTop = log.scrollHeight;
        action = await choice(open,ignore);
        if (action == 1){
            if (trésor.name == "Mimic") {
                await openMimic();
            } else {
                bgRight.style.justifyContent = "center";
                await openChest(trésor);
                bgRight.style.justifyContent = "flex-end";
                chestActions.style.visibility = "hidden";
                action1.innerHTML = "Ouvrir";
                action2.style.display = "inline-block";
            }
        } else if(action == 2){
            logText.innerHTML += "<br>Vous passez votre chemin sans ouvrir le coffre. Une décision courageuse."
            log.scrollTop = log.scrollHeight;
        }
        bgLeft.style.background = "darkblue";
        bgRight.style.background = "darkblue";
        display1.innerHTML = '';
        item.innerHTML = "";
        resolve()
    });
}

let chests = async () => {
    return new Promise(resolve => {
        setTimeout(() => {
            bgLeft.style.background = "url(/public/img/backgrounds/anemos3.png)";
            bgLeft.style.backgroundSize = "cover";
            setTimeout(() => {
                display1.innerHTML = '<img src="./public/img/items/chest.png" alt="chest" style="width:100px">';
                setTimeout(async () => {
                    chestActions.style.visibility = "visible";
                    await loot(room);
                    statsBox2.style.display = "none";
                    chestActions.style.visibility = "hidden";
                    resolve()
                }, 500);
            }, 500);
        }, 500);
    });
}

//Fonctions GÉNÉRALES

let choice = (action1,action2) => {
    return new Promise(resolve => {
        action1.removeAttribute("disabled");
        action2.removeAttribute("disabled");
        action1.addEventListener("click", () => {
            action1.setAttribute("disabled","disabled");
            action2.setAttribute("disabled","disabled");
            resolve(1);
        });
        action2.addEventListener("click", () => {
            action1.setAttribute("disabled","disabled");
            action2.setAttribute("disabled","disabled");
            resolve(2);
        });
    });
}

let select = (donjon) => {
    let selector = donjon.splice(parseInt(Math.random()*donjon.length),1);
    console.log(selector);
    return selector[0]
}

let play = async () => {
    start.style.display = "none";
    while (dungeon.length > 0 && player.hp > 0) {
        room = select(dungeon);
        if (room.type == "monstre") {
            await ennemy(room)
        } else if (room.type == "coffre"){
            await chests()
        } else {
            logText.innerHTML += "<br>Heu ...";
            log.scrollTop = log.scrollHeight;
        }
        if (dungeon.length > 0 && player.hp > 0) {
            compteur++
            logText.innerHTML += "<br><strong>Salle suivante !</strong>";
            log.scrollTop = log.scrollHeight;
        }
    }
    if (player.hp > 0) { await ennemy(boss1); }
    if (player.hp > 0) {
        bgLeft.style.background = "url(/public/img/wall1.jpg)";
        bgLeft.style.backgroundSize = "cover";
        bgRight.style.background = "url(/public/img/wall2.jpg)";
        bgRight.style.backgroundSize = "cover";
        logText.innerHTML += "<br><strong>Donjon terminé !</strong>";
        log.scrollTop = log.scrollHeight;
    } else {
        logText.innerHTML += "<br><strong>Game Over !</strong>";
        logText.innerHTML += `<br><strong>Salles parcourues : ${compteur}</strong>`;
        log.scrollTop = log.scrollHeight;
    }
}

let reload = () => {
    window.location.reload(false)
}

// BOUTONS START/RESET
start.addEventListener("click",play);
reset.addEventListener("click",reload);