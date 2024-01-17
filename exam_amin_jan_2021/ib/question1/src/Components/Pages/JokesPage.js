import { Redirect } from "../Router/Router";

import DEFAULT_TEXTS from "./../../utils/jokes"; //ajouter
import img1 from "../../img/Christmas.jpg";        //recuper image
import img2 from "../../img/Programming.jpg"; //recuper image
import img3 from "../../img/Pun.jpg";//recupere image

let imagePage;
imagePage = 
`<div>
    <img id="image1" src="${img1}">
    <img id="image2" src="${img2}">
    <img id="image3" src="${img3}">
</div>`;

let responsePage;
responsePage = 
`<div id="quest" class="alert alert-success" role="alert"></div>`

const JokePage = () => { 
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = imagePage;

    document.getElementById("image1").addEventListener("click",clickChristmas);
    document.getElementById("image2").addEventListener("click",clickProg);
    document.getElementById("image3").addEventListener("click",clickPun);
};



function clickProg() {
    let cat = "Programming";
    let phrase = getText(cat);

    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = responsePage;

    document.getElementById("quest").innerHTML = phrase.question;

    setTimeout(function() {
        pageDiv.innerHTML += `<div class="alert alert-info" role="alert">${phrase.answer}</div>`;
        pageDiv.innerHTML += `<button type="button" class="btn btn-secondary" id="retour">Reselect a joke</button>`;
        document.getElementById("retour").addEventListener("click", () => {
            Redirect("/jokes");
        });
    }, 5000);

}

function clickPun() {
    let cat = "Pun";
    let phrase = getText(cat);

    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = responsePage;

    document.getElementById("quest").innerHTML = phrase.question;

    setTimeout(function() {
        pageDiv.innerHTML += `<div class="alert alert-info" role="alert">${phrase.answer}</div>`;
        pageDiv.innerHTML += `<button type="button" class="btn btn-secondary" id="retour">Reselect a joke</button>`;
        document.getElementById("retour").addEventListener("click", () => {
            Redirect("/jokes");
        });
    }, 5000);
}

function clickChristmas() {
    let cat = "Christmas";
    let phrase = getText(cat);

    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML = responsePage;

    document.getElementById("quest").innerHTML = phrase.question;

    setTimeout(function() {
        pageDiv.innerHTML += `<div class="alert alert-info" role="alert">${phrase.answer}</div>`;
        pageDiv.innerHTML += `<button type="button" class="btn btn-secondary" id="retour">Reselect a joke</button>`;
        document.getElementById("retour").addEventListener("click", () => {
            Redirect("/jokes");
        });
    }, 5000);
}



//comment recupere des phrase dans le bd 
function getText(cat) {
    let tabPos = new Array();
    DEFAULT_TEXTS.forEach(element => {
      if(element.category == cat)
        tabPos.push(element);
    });
    let indice = Math.floor(Math.random()*tabPos.length);
    return tabPos[indice];
}
  
export default JokePage;