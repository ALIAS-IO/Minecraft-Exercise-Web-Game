document.addEventListener("challengeShown", function () {
    const token = localStorage.getItem("token");
    const reviewedIds = JSON.parse(localStorage.getItem("reviewedChallengeIds"));
    const unreviewed = document.getElementById("unreviewed");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const unreviewedList = document.getElementById("unreviewedList");
        unreviewedList.innerHTML = "";

        if (responseData.length === 0) {
            unreviewed.classList.remove("d-none");
        } else {

            unreviewed.classList.add("d-none");

            responseData.filter(challenge => !reviewedIds.includes(challenge.challenge_id))
                .forEach((challenge) => {
                    const challengeId = challenge.challenge_id; 

                    const displayItem = document.createElement("div");
                    displayItem.className = "col-xl-3 col-lg-4 col-md-6 col-sm-12 p-3 d-flex justify-content-center";
                    displayItem.id = `challenge-${challengeId}`;

                    displayItem.innerHTML = `
                    <div class="card challenge w-100">
                        <div class="card-body d-flex flex-column">
                            <span class="border h-50">
                                <h5 class="card-title text-center">${challenge.challenge}</h5>
                            </span>
                            <p class="card-text">
                                Challenge ID: ${challenge.challenge_id}
                            </p>
                            <p class="card-text">
                                Completed Date: ${challenge.creation_date}
                            </p>
                            <p class="card-text">
                                Status: ${challenge.completed ? "Completed" : "Gave Up"}
                            </p>
                            <div class="d-flex justify-content-center">
                                <a id="review-btn-${challengeId}" href="./reviewPage.html" class="btn btn-primary btn-block m-3 reviewBtn" role="button">Review</a>
                            </div>
                        </div>
                    </div>
                    `;

                    unreviewedList.appendChild(displayItem);

                    // Event Listener for Review button
                    displayItem.querySelector(`#review-btn-${challengeId}`).addEventListener("click", function () {
                        localStorage.setItem("challengeReview", JSON.stringify(challenge));
                        window.location.href = "./reviewPage.html";
                    });
                });
        };
    };
    fetchMethod(currentUrl + "/api/reviews", callback, "GET", null, token);
});
