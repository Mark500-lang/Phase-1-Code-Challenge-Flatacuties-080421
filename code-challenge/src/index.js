// Your code here
const img = document.getElementById("image");
const charName = document.getElementById("name");
const voteCount = document.getElementById("vote-count");
const voteForm = document.getElementById("votes-form");

function fetchCharacters(charServUrl) {
    fetch("http://localhost:3000/characters")
    .then((resp) => resp.json()) 
    .then((data) => {
      createCharacterBar(data)
    });

};

//creating span element with an onClick event that will display all the characters details 
 function createCharacterBar(data) {  
     const div = document.getElementById('character-bar');
     data.forEach(data => {
         const span = document.createElement('span');
         span.innerHTML = data.name;
         span.addEventListener("click", ()=>{
            charName.textContent=data.name;
            img.src =data.image;
            voteCount.textContent = data.votes;
        } );
         div.appendChild(span);
       });
     };

     //updating votes
voteForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newVotes = parseInt(event.target.votes.value);
    const voteCount = document.getElementById("vote-count");
    let current = parseInt(voteCount.textContent);
    let votecount = (current += newVotes);
    voteCount.innerText = votecount;
    
    //Updating the database 
    function updateVotes(voteCount){
    fetch("http://localhost:3000/characters/${characters.id}", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({voteCount}),
      })
        .then((res) => res.json())
        .then((json) => console.log(json));
    };
    return updateVotes;
  });
 
    
//resetting vote count back to zero
const resetButton = document.getElementById("reset-btn");
resetButton.addEventListener("click", (e) => {
  e.preventDefault();
  voteCount.innerText = 0;
});
    
document.addEventListener('DOMContentLoaded', function() {
    fetchCharacters();
});
