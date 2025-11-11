document.addEventListener("DOMContentLoaded", function () {
    const challenge = JSON.parse(localStorage.getItem("challengeReview"));
    const challengeDetails = document.getElementById("challengeDetails");
    challengeDetails.innerHTML = "";

    const displayItem = document.createElement("div");
    displayItem.className = "container text-center";

    displayItem.innerHTML = `
        <div class="card challenge w-100">
            <div class="card-body d-flex flex-column p-4">
                <p class="card-text">
                    Challenge Details: ${challenge.challenge}
                </p>
                <p class="card-text">
                    Challenge ID: ${challenge.challenge_id}
                </p>
                <p class="card-text">
                    Completed Date: ${challenge.creation_date}
                </p>
                <p class="card-text">
                    Status: ${challenge.completed ? "Completed" : "Gave Up"}
                </p>
            </div>
        </div>
    `;

    challengeDetails.appendChild(displayItem);
});
