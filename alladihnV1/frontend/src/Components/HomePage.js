import { RedirectUrl } from "./Router.js";
import lampe from "../images/lampe_magique.png";

let homePage = `
  <button id="buttonAladdin">Je suis Aladdin</button>
  <button id="buttonGenie">Je suis un Génie</button>
`;

let page = document.querySelector("#page");

const HomePage = () => {
  page.innerHTML = homePage;

  document.getElementById("buttonGenie").addEventListener("click",onButtonGenie);
  document.getElementById("buttonAladdin").addEventListener("click",onButtonAladdin);
};

const onButtonGenie = () => {

  let geniePage = `
  <p>Entre une idée de voeu que le génie de la lampe pourra accorder :</p>
  <form>
  <input required type="text" id="voeu" name="voeu">
  <input type="submit" value="Envoyer" />
  </form>
  `;
  page.innerHTML += geniePage;

  let voeuForm = document.querySelector("form");
  voeuForm.addEventListener("submit", onSubmitVoeu);
}

const onSubmitVoeu = (e) => {
  e.preventDefault();
  let voeu = {
    voeu: document.getElementById("voeu").value,
  } 
  
  fetch("/api/voeux/", {
    method: "POST",
    body: JSON.stringify(voeu),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then(() => HomePage())
    .catch((err) => onError(err));
}

const onButtonAladdin = () => {

  let timer = 21;

  let aladdinPage = `
  <p>Frotte la lampe magique et un voeu te sera accordé :</p>
  <p>Pour frotter la lampe, bouge avec la souris sur l'image.</p>
  <img id="lampeMagique" src="${lampe}">
  <div id="timer">
    <p>${timer}</p>
  </div>
  <div id="voeu">
    <button id="buttonVoeu">Faire apparaître mon voeu</button>
  </div>
  `;

  page.innerHTML += aladdinPage;

  //Fonction qui nous sert à lancer et arrêter le timer
  let timerInterval;

  //Quand on frotte la lampe
  document.getElementById("lampeMagique").addEventListener("mouseenter", () => {
    console.log("Timer On");
    //On lance le timer
    timerInterval = setInterval(() => {
    if(timer > -1) timer--;
    document.getElementById("timer").innerHTML = `<p>${timer}</p>`;
    }, 1000);

  });

  //Quand on ne frotte plus la lampe
  document.getElementById("lampeMagique").addEventListener("mouseleave", () => {
    console.log("Timer Off");
    //On arrête le timer
    clearInterval(timerInterval);
  });

  //Quand on clique pour faire apparaitre un voeu
  document.getElementById("buttonVoeu").addEventListener("click",() =>{
    if(timer >= 21){
      document.getElementById("voeu").innerHTML = `<p>Tu n'as pas frotté assez longtemps la lampe !</p>`;
    } else if(timer <= -1){
      document.getElementById("voeu").innerHTML = `<p>Tu as frotté trop longtemps la lampe !</p>`;
    } else {
      //Appel API pour récupérer un voeu random
      fetch("/api/voeux", {
        method: "GET",
        headers: {
        },
      })
        .then((response) => {
          if (!response.ok)
            throw new Error(
              "Error code : " + response.status + " : " + response.statusText
            );
          return response.json();
        })
        .then((data) => displayVoeu(data))
        .catch((err) => onError(err));
    }
  });
}

const displayVoeu = (data) => {
  document.getElementById("voeu").innerHTML = `<p>${data.voeu.voeu}</p>`;
}

const onError = (err) => {
  let errorMessage = err.message;
  RedirectUrl("/error", errorMessage);
};

export default HomePage;