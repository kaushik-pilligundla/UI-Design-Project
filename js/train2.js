const healthySnacks = [
    // healthy, path, description
    [1, '../pictures/healthy/apple.png', 'apple'],
    [1, '../pictures/healthy/banana.png', 'banana'],
    [1, '../pictures/healthy/milk.png', 'milk'],
    [1, '../pictures/healthy/strawberry.png', 'strawberry'],

]

const unhealthySnacks = [
    // unhealthy, path, description
    [0, '../pictures/unhealthy/donut.png', 'donut'],
    [0, '../pictures/unhealthy/french-fries.png', 'French Fries'],
    [0, '../pictures/unhealthy/ice-cream.png', 'Ice Cream'],
    [0, '../pictures/unhealthy/lollipop.png', 'Lollipop'],
]

const snackButtonOnClick = id => {
    if (flag === 1) {
        if ((id === "btn1" && !isFlip) ||
            (id === "btn2" && isFlip)
        ) {
            //alert("Oops! Wrong Option!")
            document.getElementById("bubble").style.visibility = "visible";
            if (!isFlip) {
                document.getElementById("pic1").src = healthySnacks[stage][1];
                document.getElementById("name1").innerHTML = healthySnacks[stage][2];
                document.getElementById("pic2").src = unhealthySnacks[stage][1];
                document.getElementById("name2").innerHTML = unhealthySnacks[stage][2];
            } else {
                document.getElementById("pic1").src = unhealthySnacks[stage][1];
                document.getElementById("name1").innerHTML = unhealthySnacks[stage][2];
                document.getElementById("pic2").src = healthySnacks[stage][1];
                document.getElementById("name2").innerHTML = healthySnacks[stage][2];
            }
            let curTime = new Date();
            timeBetweenWrongAttempts.push((curTime.getTime() - prevTime.getTime())/1000);
            prevTime = curTime;
            numWrongAttempts += 1;
            isFlip = !isFlip;
        } else {
            setInterval(createBubble, 10);
            document.getElementById("bubble").style.visibility = "hidden";
            let timeEnd = new Date();
            console.log("Time elapsed for whole page ", (timeEnd.getTime() - timeBegin.getTime()) / 1000, "seconds");
            console.log("Number of wrong attempts ", numWrongAttempts);
            console.log("Time elapsed between each wrong attempts ", timeBetweenWrongAttempts);

            output = [];
            // duration
            output.push([
                "duration", (timeEnd.getTime() - timeBegin.getTime()) / 1000
            ]);
        
            // numWrongAttempts
            output.push([
                "numWrongAttempts", numWrongAttempts
            ]);
        
            timeBetweenWrongAttempts.unshift("timeBetweenWrongAttempts")
            // timeBetweenButtonClick
            output.push(
                timeBetweenWrongAttempts
            );
        
            /* File Name */
            let filename = "train2_" + Date.now() + ".xlsx";
            /* Sheet Name */
            let sheetNname = "sheet1";
            let workBook = XLSX.utils.book_new();
            let workSheet = XLSX.utils.aoa_to_sheet(output);
            /* Add workSheet to workBook */
            XLSX.utils.book_append_sheet(workBook, workSheet, sheetNname);
            XLSX.writeFile(workBook, filename);

            audio.play();
            audio.onended = function () {
                window.location.href = "../html/train3.html";
            }
        }
    } else {
        if ((id === "btn1" && !isFlip) ||
            (id === "btn2" && isFlip)
        ) {
            setInterval(createBubble, 10);
            document.getElementById("bubble").style.visibility = "hidden";
            let timeEnd = new Date();
            console.log("Time elapsed for whole page ", (timeEnd.getTime() - timeBegin.getTime()) / 1000, "seconds");
            console.log("Number of wrong attempts ", numWrongAttempts);
            console.log("Time elapsed between each wrong attempts ", timeBetweenWrongAttempts);

            output = [];
            // duration
            output.push([
                "duration", (timeEnd.getTime() - timeBegin.getTime()) / 1000
            ]);
        
            // numWrongAttempts
            output.push([
                "numWrongAttempts", numWrongAttempts
            ]);
        
            timeBetweenWrongAttempts.unshift("timeBetweenWrongAttempts")
            // timeBetweenButtonClick
            output.push(
                timeBetweenWrongAttempts
            );
        
            /* File Name */
            let filename = "train2_" + Date.now() + ".xlsx";
            /* Sheet Name */
            let sheetNname = "sheet1";
            let workBook = XLSX.utils.book_new();
            let workSheet = XLSX.utils.aoa_to_sheet(output);
            /* Add workSheet to workBook */
            XLSX.utils.book_append_sheet(workBook, workSheet, sheetNname);
            XLSX.writeFile(workBook, filename);

            audio.play();
            audio.onended = function () {
                window.location.href = "../html/train3.html";
            }
        } else {
            //alert("Oops! Wrong Option!")
            document.getElementById("bubble").style.visibility = "visible";
            if (!isFlip) {
                document.getElementById("pic1").src = unhealthySnacks[stage][1];
                document.getElementById("name1").innerHTML = unhealthySnacks[stage][2];
                document.getElementById("pic2").src = healthySnacks[stage][1];
                document.getElementById("name2").innerHTML = healthySnacks[stage][2];
            } else {
                document.getElementById("pic1").src = healthySnacks[stage][1];
                document.getElementById("name1").innerHTML = healthySnacks[stage][2];
                document.getElementById("pic2").src = unhealthySnacks[stage][1];
                document.getElementById("name2").innerHTML = unhealthySnacks[stage][2];
            }
            let curTime = new Date();
            timeBetweenWrongAttempts.push((curTime.getTime() - prevTime.getTime())/1000);
            prevTime = curTime;
            numWrongAttempts += 1;
            isFlip = !isFlip;
        }
    }
}

const createBubble = () => {
    const section = document.querySelector('section')
    const createElement = document.createElement('span')
    let size = Math.random() * 60;

    createElement.style.width = 20 + size + 'px';
    createElement.style.height = 20 + size + 'px';
    createElement.style.left = Math.random() * innerWidth + 'px';
    const r = Math.random() * 255;
    const g = Math.random() * 255;
    const b = Math.random() * 255;
    createElement.style.boxShadow = "inset 0 0 10px rgba(" + r + ", " + g + ", " + b + ", " + "0.5)";
    section.appendChild(createElement);

    setTimeout(() => {
        createElement.remove();
    }, 2000);
}

let stage = 1;
let flag;
let isFlip = false;
let audio = new Audio('../audio/correct.mp3');
let timeBegin = new Date();
let prevTime = timeBegin;
let numWrongAttempts = 0;
let timeBetweenWrongAttempts = [];

window.onload = function () {
    document.getElementById(stage.toString()).style.visibility = "visible";
    flag = Math.floor(Math.random() * (2));
    if (flag == 1) {
        document.getElementById("pic1").src = unhealthySnacks[stage][1];
        document.getElementById("name1").innerHTML = unhealthySnacks[stage][2];
        document.getElementById("pic2").src = healthySnacks[stage][1];
        document.getElementById("name2").innerHTML = healthySnacks[stage][2];
    } else {
        document.getElementById("pic1").src = healthySnacks[stage][1];
        document.getElementById("name1").innerHTML = healthySnacks[stage][2];
        document.getElementById("pic2").src = unhealthySnacks[stage][1];
        document.getElementById("name2").innerHTML = unhealthySnacks[stage][2];
    }
}


