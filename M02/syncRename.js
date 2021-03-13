const fs = require('fs');
try {
    fs.renameSync("mwsore.json", "mwpagi.json");

    console.log("berhasil mengganti nama!");
} catch (err) {
    console.error(err);
}