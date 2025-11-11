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

                const displayItem = document.createElement("div");
                displayItem.className = "col-lg-2 col-md-4 col-sm-8 p-3 d-flex mx-auto justify-content-center";
                displayItem.id = `upgrade-${boosterId}`;

                displayItem.innerHTML = `
                <div class="card challenge">
                    <div class="card-body d-flex flex-column">
                        <span class="h-100">
                            <h5 class="card-title text-center">${booster.description}</h5>
                        </span>
                        <p class="card-text">
                            Booster ID: ${booster.booster_id}
                        </p>
                        <p class="card-text">
                            Booster Duration: ${booster.duration}
                        </p>
                        <p class="card-text">
                            Cost: ${booster.price}
                        </p>
                        <div class="d-flex justify-content-center">
                            <button id="upgrade-btn-${boosterId}" class="btn btn-block m-3 purchaseBtn" data-completion-id="${boosterId}">Purchase</button>
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

    fetchMethod(currentUrl + "/api/shop/tempbooster", callback, "GET");
});
