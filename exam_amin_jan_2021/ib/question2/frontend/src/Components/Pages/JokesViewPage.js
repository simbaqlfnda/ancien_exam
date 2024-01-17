//qui affiche dynamiquement toutes les blagues simples renvoyées 
//par l’API développée
 //dans /question2/api.

import RandomJokes from "../../Domain/RandomJokes" 

let phraseHasard;
let tab;
let timeref;

const myJoke = new RandomJokes(); // a etait cree dans le dossier domainb

const JokesViewPage = async () => {
  const pageDiv = document.querySelector("#page");
  pageDiv.innerHTML = "";
  // setInterval(async function() { ---> cela ne fonctionnait pas bien, les pages s'entremellait
    phraseHasard = await myJoke.getOneJokeByChance();
    pageDiv.innerHTML = phraseHasard;
    getAllJokes();
  // }, 5000);
};

async function getAllJokes() {
  try {
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(`/api/joke/`, options);

    if (!response.ok) {
      throw new Error(
        "fetch error : " + response.status + " : " + response.statusText
      );
    }

    const allJokes = await response.json();
    let htmlTable = `<br>
    <br>
    <table class="table">
    <thead>
      <tr>
        <p>All jokes</p> 
      </tr>
    </thead>
    <tbody>`;
    if (allJokes && allJokes.length > 0) {
        allJokes.forEach((element) => {
          htmlTable += `<tr>
              <td class="fw-bold text-info" contenteditable="true">${element.content}</td>
          </tr>`;
        });
    }
    htmlTable += `</tbody>
    </table>`;
    tab = htmlTable;
    const pageDiv = document.querySelector("#page");
    pageDiv.innerHTML += tab;

  } catch (error) {
    console.error("ViewJoke::error: ", error);
  }
}

export default JokesViewPage;
