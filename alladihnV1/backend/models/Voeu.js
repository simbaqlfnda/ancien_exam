"use strict";
const FILE_PATH = __dirname + "/../data/voeux.json";

class Voeu {
  constructor(voeu) {
    this.id = Voeu.nextVoeuId();
    this.voeu = voeu;
  }

  static nextVoeuId() {
    let voeuList = getVoeuxListFromFile(FILE_PATH);
    if (voeuList.length === 0) return 0;
    return voeuList[voeuList.length - 1].id + 1;
  }

  save() {
    let voeuList = getVoeuxListFromFile(FILE_PATH);
    if(voeuList.length < 21){
      voeuList.push(this);
    } else {
      let randomNumber = Math.floor(Math.random() * (voeuList.length-1));
      this.id = randomNumber;
      voeuList[randomNumber] = this;
      console.log(randomNumber);
    }
    saveVoeuxListToFile(FILE_PATH, voeuList);
  }

  static getRandomVoeu() {
    let voeuList = getVoeuxListFromFile(FILE_PATH);
    let randomNumber = Math.floor(Math.random() * (voeuList.length));
    console.log("Random voeu : ",voeuList[randomNumber]);
    return voeuList[randomNumber];
  }

  static get(id) {
    let voeuxList = getVoeuxListFromFile(FILE_PATH);
    return voeuxList.find((voeu) => voeu.id == id);
  }

  static get list() {
    return getVoeuxListFromFile(FILE_PATH);
  }

}

function getVoeuxListFromFile(filePath) {
  const fs = require("fs");
  if (!fs.existsSync(filePath)) return [];
  let voeuListRawData = fs.readFileSync(filePath);
  let voeuList;
  if (voeuListRawData) voeuList = JSON.parse(voeuListRawData);
  else voeuList = [];
  return voeuList;
}

function saveVoeuxListToFile(filePath, voeuList) {
  const fs = require("fs");
  let data = JSON.stringify(voeuList);
  fs.writeFileSync(filePath, data);
}

module.exports = Voeu;
