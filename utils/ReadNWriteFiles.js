const fs = require("fs").promises;
const Queue = require("../classes/Queue.js");

async function readNewFile(dirPath) {
    console.log(dirPath)
  const dataFile = await Queue.enQueue(()=>fs.readFile(dirPath, "utf-8"));
  const data = JSON.parse(dataFile);
  return data;
}

async function writeNewFile(dirPath, newData) {
    Queue.enQueue(fs.writeFile(()=>dirPath, JSON.stringify(newData, null, 2), "utf-8"));
}

module.exports = {
  readNewFile,
  writeNewFile,
};
