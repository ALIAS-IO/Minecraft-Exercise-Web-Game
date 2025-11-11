document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const boosterList = document.getElementById("boosterList");
        boosterList.innerHTML = "";

        responseData.forEach((minions) => {
            const minionId = minions.minion_id;

            const displayItem = document.createElement("div");
            displayItem.className = "p-3";
            displayItem.id = `challenge-${minionId}`;

            displayItem.innerHTML = `
                <h5 class="text-center">For: <img src="./images/minion-${minionId}.png" alt="Minion Image" class="img-fluid minions"> ${minions.minion_name}</h5>
                <p class="">${minions.minion_name}</p>
            `;
            boosterList.appendChild(displayItem);
        });
        document.dispatchEvent(new Event("challengeShown"));
    };

    fetchMethod(currentUrl + "/api/minions/booster/show", callback, "GET");
    
});