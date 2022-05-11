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

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const snackButtonOnClick = id => {
    button = document.getElementById(id);

    if (!button.style.borderColor) {
        if (numButtonSelected < 3) {
            let curTime = new Date()
            buttonClickTimestamp.push(curTime);
            button.style.border = "5px solid lightblue";
            numButtonSelected += 1
            snacksSelected.add(id);
            warningMessage.style.display = "none";
        } else {
            numExceededSelected += 1;
            warningMessage = document.getElementById("warningMessage");
            warningMessage.style.display = "block";
        }
    } else {
        buttonClickTimestamp.pop();
        button.style.border = '';
        numButtonSelected -= 1
        snacksSelected.delete(id)
        warningMessage.style.display = "none";
    }    
}

const submitButtonOnClick = () => {

    if (snacksSelected.size == 0) {
        numSubmitWithoutSelected += 1;
        warningMessage = document.getElementById("warningMessage");
        warningMessage.innerHTML = "Oops! Choose at least one snack";
        warningMessage.style.display = "block";
        return ;
    }

    let timeEnd = new Date();

    // record selected snacks
    snacksSelectedIter = snacksSelected.values();
    while (true) {
        next = snacksSelectedIter.next()
        if (next.done) {
            break;
        }
        console.log(snacks[next.value])
    }
    
    console.log("Time elapsed for prev-test page ", (timeEnd.getTime() - timeBegin.getTime()) / 1000, "seconds");
    console.log("Number of submission without any snacks selected ", numExceededSelected);
    console.log("Number of exceeded selection (with 4+ selection) ", numSubmitWithoutSelected);
    let timeBetweenButtonClick = []
    for (let idx = 1; idx < buttonClickTimestamp.length; idx++) {
        timeBetweenButtonClick.push((buttonClickTimestamp[idx].getTime() - buttonClickTimestamp[idx - 1].getTime()) / 1000);
    }
    console.log("Time elapsed between each button click ", timeBetweenButtonClick);


    output = [];
    // selected snacks
    // numSnackSelected
    output.push([
        "numSnackSelected", snacksSelected.size
    ])
    // snackType(healthy/unhealthy), snackName
    snacksSelectedIter = snacksSelected.values();
    while (true) {
        next = snacksSelectedIter.next();
        if (next.done) {
            break;
        }
        output.push([
            snacks[next.value][0],
            snacks[next.value][2],
        ]);
    }

    // duration
    output.push([
        "duration", (timeEnd.getTime() - timeBegin.getTime()) / 1000
    ]);

    // numExceededSelected
    output.push([
        "numExceededSelected", numExceededSelected
    ]);

    // numSubmitWithoutSelected
    output.push([
        "numSubmitWithoutSelected", numSubmitWithoutSelected
    ]);

    timeBetweenButtonClick.unshift("timeBetweenButtonClick")
    // timeBetweenButtonClick
    output.push(
        timeBetweenButtonClick
    );

    /* File Name */
    let filename = "post_test_" + Date.now() + ".xlsx";
    /* Sheet Name */
    let sheetNname = "sheet1";
    let workBook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.aoa_to_sheet(output);
    /* Add workSheet to workBook */
    XLSX.utils.book_append_sheet(workBook, workSheet, sheetNname);
    XLSX.writeFile(workBook, filename);
    window.location.href = "../html/ending.html";
}

let numButtonSelected = 0;
let snacksSelected = new Set();
let snacks;
const numSnacks = 8;
let timeBegin = new Date();
let numSubmitWithoutSelected = 0;
let numExceededSelected = 0;
// add timeBegin for the left boundary
let buttonClickTimestamp = [timeBegin];

// on windows reload 
window.onload = function() {
    
    snacks = healthySnacks.concat(unhealthySnacks)

    // reset the selected button
    numButtonSelected = 0;

    shuffleArray(snacks)

    for (let idx = 0; idx < numSnacks; idx++) {
        document.getElementById(idx.toString() + "_name").innerHTML=snacks[idx][2]
        document.getElementById(idx.toString() + "_img").src=snacks[idx][1]
    }
}

  
