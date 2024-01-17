-	qui affiche tous les 5 secondes une blague simple renvoyée aléatoirement par l’API développée dans dans /question2/api.
-	qui se trouve dans un module nommé RandomJokes.js
-	qui est appelé dans le header de toutes les pages.


class RandomJokes {
    async getOneJokeByChance() {
        try {
            const options = {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            };
        
            const response = await fetch(`/api/joke/chance`, options);
        
            if (!response.ok) {
              throw new Error(
                "fetch error : " + response.status + " : " + response.statusText
              );
            }
            const joke = await response.json();
            console.log(joke);
            return joke.content;
        } catch (error) {
            console.error("ViewJoke::error: ", error);
        }
    }
}

export default RandomJokes;