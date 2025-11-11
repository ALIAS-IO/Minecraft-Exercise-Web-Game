document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const upgradeList = document.getElementById("upgradeList");
        upgradeList.innerHTML = ""; // Clear previous content

        responseData.forEach((minion) => {
            const minionId = minion.minion_id;

            const displayItem = document.createElement("div");
            displayItem.className = "p-3";
            displayItem.id = `minion-${minionId}`;

            const noUpgradesMessage = `
                <p class="my-3 text-center" id="no-upgrades-${minionId}">No more upgrades!</p>
            `;

            displayItem.innerHTML = `
                <h5 class="text-center">For: 
                    <img src="./images/minion-${minionId}.png" alt="Minion Image" class="img-fluid minions">
                </h5>
                <p class="text-center">${minion.minion_name}</p>
                <div id="upgrades-${minionId}" class="upgrades-container">
                    ${noUpgradesMessage}
                </div>
            `;

            upgradeList.appendChild(displayItem);
        });

        document.dispatchEvent(new Event("minionsLoaded"));
    };

    fetchMethod(currentUrl + "/api/minions/show", callback, "GET");
});