document.addEventListener("DOMContentLoaded", function () {
    const activeChallenge = JSON.parse(localStorage.getItem("activeChallenge"));
    const challengeContainer = document.getElementById("currentChallenge");

    if (!activeChallenge) {
        window.location.href = "./challenges.html";
        return;
    }
    // Display the active challenge
    challengeContainer.innerHTML = `
        <div class="card challenge mt-5 mx-auto" style="max-width: 350px; padding: 10px;">
            <div class="card-body text-center">
                <h5 class="card-title">${activeChallenge.challenge}</h5>
                <p class="card-text">Challenge ID: ${activeChallenge.challenge_id}</p>
                <p class="card-text">Skillpoints: ${activeChallenge.skillpoints}</p>
                <div class="d-flex justify-content-center">
                    <input type="text" id="notes-${activeChallenge.challenge_id}" class="form-control mt-4" placeholder="Write your notes here"></input>
                </div>
                <div class="d-flex justify-content-center">
                    <button id="complete-btn" class="btn btn-success btn-block m-3 finishedBtn">Complete</button>
                    <button id="giveup-btn" class="btn btn-danger btn-block m-3 finishedBtn">Give Up</button>
                </div>
            </div>
        </div>
    `;
});
