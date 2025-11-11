document.addEventListener("DOMContentLoaded", function () {

    const activeChallenge = JSON.parse(localStorage.getItem("activeChallenge"));
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");

        
    document.getElementById("complete-btn").addEventListener("click", function () {
        const notes = document.getElementById(`notes-${activeChallenge.challenge_id}`).value.trim();
        if (notes.length <= 30) {
            alert("Challenge Completed!");

            localStorage.setItem("challengeStatus", true);
            localStorage.setItem("challengeId", activeChallenge.challenge_id);
            localStorage.setItem("challengeNotes", notes);

            localStorage.removeItem("activeChallenge");

            window.location.href = "./completions.html";
        } else {
            warningCard.classList.remove("d-none");
            if (warningText) {
                warningText.innerText = "Note is too long";
            }
        }
    });

    document.getElementById("giveup-btn").addEventListener("click", function () {
        const notes = document.getElementById(`notes-${activeChallenge.challenge_id}`).value.trim();
        if (notes.length <= 30) {
            alert("Challenge Abandoned!");

            localStorage.setItem("challengeStatus", false);
            localStorage.setItem("challengeId", activeChallenge.challenge_id);
            localStorage.setItem("challengeNotes", notes);

            localStorage.removeItem("activeChallenge");

            window.location.href = "./completions.html";
        } else {
            warningCard.classList.remove("d-none");
            if (warningText) {
                warningText.innerText = "Note is too long";
            }
        }
    });
    
});
