document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    console.log(token)
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const challengeList = document.getElementById("challengeList");
        const created = document.getElementById("created")
        challengeList.innerHTML = "";

        responseData.forEach((challenge) => {
            if (responseData.length == 0){
                created.classList.remove("d-none");
            } else {
                created.classList.add("d-none");
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
                </div>
            </div>
            `;
            challengeList.appendChild(displayItem);}
        });
    };

    fetchMethod(currentUrl + "/api/challenges/user", callback, "GET", null, token);
});
