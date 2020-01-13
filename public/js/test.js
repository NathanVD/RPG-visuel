// let logText = document.getElementById("text");
// let log = document.getElementById("log");
// let compteur = 0;

function un(string) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(string);
            string += "1";
            resolve(string);
        }, 1000);
    });
}

function deux(string) {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(string);
            string += "2";
            resolve(string);
        }, 1000);
    });
}

function trois(string)  {
    return new Promise(resolve => {
        setTimeout(() => {
            console.log(string);
            string += "3";
            resolve(string);
        }, 1000);
    });
}

async function execution(string) {
    let a = await un(string);
    console.log("test "+ a);
    let b = await deux(a);
    console.log("test "+ b);
    let c = await trois(b);
    console.log("test "+ c);
}

execution("0")
// function resolveAfter2Seconds(x) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//           resolve(x);
//         }, 2000);
//       });
//   }
  
// async function f1() {
//     var x = await resolveAfter2Seconds(10);
//     console.log(x); // 10
// }

// f1();