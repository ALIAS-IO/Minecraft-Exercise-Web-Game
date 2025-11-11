document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");

    // If the token is null, redirect to login page
    if (token === null) {
        window.location.href = "./login.html";
        return; // Stop execution further
    }

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const challengeList = document.getElementById("challengeList");
        challengeList.innerHTML = "";

        responseData.forEach((challenge) => {
            const challengeId = challenge.challenge_id;

            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-3 col-lg-4 col-md-6 col-sm-12 p-3 d-flex justify-content-center";
            displayItem.id = `challenge-${challengeId}`;

            displayItem.innerHTML = `
            <div class="card challenge w-100">
                <div class="card-body d-flex flex-column">
                    <span class="h-100">
                        <h5 class="card-title text-center">${challenge.challenge}</h5>
                    </span>
                    <p class="card-text">
                        Skillpoints: ${challenge.skillpoints}
                    </p>
                    <div class="d-flex justify-content-center">
                        <a id="start-btn-${challengeId}" href="./currentChallenge.html" class="btn btn-block m-3 startBtn" role="button">Start</a>
                    </div>
                </div>
            </div>
            `;
            challengeList.appendChild(displayItem);

            displayItem.querySelector(`#start-btn-${challengeId}`).addEventListener("click", function () {
                if (token != null) {
                    localStorage.setItem("activeChallenge", JSON.stringify(challenge));
                    window.location.href = "./currentChallenge.html";
                } else {
                    window.location.href = "./login.html";
                }
            });
        });
    };

    fetchMethod(currentUrl + "/api/challenges", callback, "GET");
});
