const fs = require('fs');

fs.appendFile("mw.txt", "Kelas mobile dan Web", function (err) {
    if (err) throw err;

    console.log("Berhasil disimpan!");
});