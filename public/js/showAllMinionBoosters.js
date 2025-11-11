document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseData.length != 0){
            const bought = document.getElementById("bought");
            bought.classList.add("d-none");
            const boosterList = document.getElementById("boosterList");
            boosterList.innerHTML = "";

            responseData.forEach((booster) => {

                const boosterId = booster.booster_id; 
                const minionId = booster.minion_id; 

                const displayItem = document.createElement("div");
                displayItem.className = "col-12 p-3 d-flex mx-auto justify-content-center";
                displayItem.id = `minion-${minionId}-booster${boosterId}`;

                displayItem.innerHTML = `
                <h5 class="text-center">For: <img src="./images/minion-${minionId}.png" alt="Minion Image" class="img-fluid minions"> ${booster.minion_name}</h5>
                <div class="card challenge m-3 p-3">
                    <div class="card-body d-flex flex-column">
                        <span class="h-100">
                            <h5 class="card-title text-center">${booster.description}</h5>
                        </span>
                        <p class="card-text">
                            Booster ID: ${boosterId}
                        </p>
                        <p class="card-text">
                            Booster Duration: ${booster.duration}
                        </p>
                        <p class="card-text">
                            Cost: ${booster.price}
                        </p>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-block m-3 purchaseBtn" upgrade-level="${upgradeLevel}" minion-id="${minionId}"">Purchase</button>
                        </div>
                    </div>
                </div>
                `;
                boosterList.appendChild(displayItem);
            });
        } else {
                const bought = document.getElementById("bought");
                bought.classList.remove("d-none");
        }
    };

    fetchMethod(currentUrl + "/api/minions/booster", callback, "GET");
});
