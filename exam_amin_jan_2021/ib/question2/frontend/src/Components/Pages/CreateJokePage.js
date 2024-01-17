//on dois tout ajouter
-	qui doit être accessible lorsqu’on clique sur un bouton (ou un élément d’une barre de navigation) appelé « Create simple joke » et via cette URI « /addsimplejoke ».
-	qui affiche un formulaire de création d’une blague simple ;
-	qui consomme l’API développée dans /question2/api pour la création d’une blague simple ;
-	qui redirige vers la page affichant toutes les blagues simples une fois l’ajout réussi (URI « /simplejokes »).


import { Redirect } from "../Router/Router";
import RandomJokes from "../../Domain/RandomJokes"

const myJoke = new RandomJokes();

// let timeref;
let phraseHasard;
let formJoke;
formJoke = 
`<form id="form_joke">
    <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea2" style="height: 10px"></textarea>
    </div>
    <br>
    <button type="submit" class="btn btn-dark">Add</button>
    <br>
</form>`;

const CreateJokePage = async () => { 
    const pageDiv = document.querySelector("#page");
    // timeref = setInterval(async function() { ---> cela ne fonctionnait pas, les pages s'entremellait
      phraseHasard = await myJoke.getOneJokeByChance();
      pageDiv.innerHTML = phraseHasard;
      pageDiv.innerHTML += formJoke;
      let form = document.getElementById("form_joke");
      form.addEventListener("submit",onSubmitForm);
    // }, 5000);
};

async function onSubmitForm(e) {
    e.preventDefault();
    let txt = document.getElementById("floatingTextarea2").value;
    try {
        const options = {
          method: "POST",
          body: JSON.stringify({
            content: txt,
          }),
          headers: {
            "Content-Type": "application/json"
          },
        };
  
        const response = await fetch(`/api/joke/`, options);
  
        if (!response.ok) {
          throw new Error(
            "fetch error : " + response.status + " : " + response.statusText
          );
        }
  
        const joke = await response.json();
        console.log(joke);
        //clearInterval(timeref);
        Redirect("/simplejokes");
    } catch(error) {
        console.error("CreateJoke::error: ", error);
    }
}


  
export default CreateJokePage;