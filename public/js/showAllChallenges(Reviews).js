document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const reviewsList = document.getElementById("reviewsList");
        reviewsList.innerHTML = ""; // Clear previous reviews if any

        responseData.forEach((challenge) => {
            const challengeId = challenge.challenge_id;

            const displayItem = document.createElement("div");
            displayItem.className = "p-3";
            displayItem.id = `challenge-${challengeId}`;

            displayItem.innerHTML = `
                <h5 class="text-center">Challenge Details: ${challenge.challenge}</h5>
                <p class="text-center">Challenge ID: ${challengeId}</p>
                <p id="reviews-${challengeId}" class="text-center my-3">No current reviews yet</p>
            `;
            reviewsList.appendChild(displayItem);
        });
        document.dispatchEvent(new Event("challengeShown"));
    };

    fetchMethod(currentUrl + "/api/challenges", callback, "GET");
    
});

