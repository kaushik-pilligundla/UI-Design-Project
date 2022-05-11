const buttonOnClick = () => {
    let timeEnd = new Date();
    console.log("Time elapsed for congratulations page ", (timeEnd.getTime() - timeBegin.getTime()) / 1000, "seconds");

    output = [];
    // duration
    output.push([
        "duration", (timeEnd.getTime() - timeBegin.getTime()) / 1000
    ]);

    /* File Name */
    let filename = "congratulations_" + Date.now() + ".xlsx";
    /* Sheet Name */
    let sheetNname = "sheet1";
    let workBook = XLSX.utils.book_new();
    let workSheet = XLSX.utils.aoa_to_sheet(output);
    /* Add workSheet to workBook */
    XLSX.utils.book_append_sheet(workBook, workSheet, sheetNname);
    XLSX.writeFile(workBook, filename);

    window.location.href = "./post_test.html";
}

let timeBegin = new Date();