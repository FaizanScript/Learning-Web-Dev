//loops -> reapet karne ko loop kehte hai
//types of loop -> for, while, do-while

//for loop -> use when you know that how many times the loop gonna run

for (let i = 1; i<=100; i++) {
    console.log(i);
}

//while loop -> when you dont know that how many times the loop gonna run

let i = 1;
while(i<=32) {
    console.log(i);
    i++;
}

//do-while -> when the code should run atleast one time even if the loop doesnt gonna run

let i = 12;
do{
    console.log(i);
    i++;
}
 while(i<12)

//break -> break is a statement used to immediately terminate the execution of the current loop or switch block

for (let i = 1; i < 201; i++) {
    console.log(i);
    if (i === 31){
        break;
    }
}

//continue -> continue is a statement used inside loops to skip the current iteration and immediately jump to the next one

for (let i = 1; i <= 100; i++) {
    if(i === 32) {
        continue;
    }
    console.log(i);
}
