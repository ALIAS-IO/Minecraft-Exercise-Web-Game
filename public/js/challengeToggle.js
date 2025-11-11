document.addEventListener("DOMContentLoaded", function () {
    const activeChallenge = JSON.parse(localStorage.getItem("activeChallenge"));
    console.log("activeChallenge", activeChallenge)

    if (activeChallenge) {
        // Change Challenges link to currentChallenges.html if there's an active challenge
        document.getElementById("challengeLink").href = "currentChallenge.html";
    } else {
        // Change Challenges link to currentChallenges.html if there's an active challenge
        document.getElementById("challengeLink").href = "challenges.html";
    }
});