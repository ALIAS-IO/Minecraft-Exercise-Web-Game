document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseData.length != 0){
            const upgradeList = document.getElementById("upgradeList");
            upgradeList.innerHTML = "";

            responseData.forEach((upgrade) => {

                const upgradeLevel = upgrade.upgrade_level; 

                const displayItem = document.createElement("div");
                displayItem.className = "col-12 p-3 d-flex mx-auto justify-content-center";
                displayItem.id = `upgrade-${upgradeLevel}`;

                displayItem.innerHTML = `
                <div class="card challenge">
                    <div class="card-body d-flex flex-column">
                        <span class="h-100">
                            <h5 class="card-title text-center">${upgrade.description}</h5>
                        </span>
                        <p class="card-text">
                            Upgrade Level: ${upgradeLevel}
                        </p>
                        <p class="card-text">
                            Cost: ${upgrade.price}
                        </p>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-block m-3 purchaseBtn" data-completion-id="${upgradeLevel}">Purchase</button>
                        </div>
                    </div>
                </div>
                `;
                upgradeList.appendChild(displayItem);
            });
        } else {
            const bought = document.getElementById("bought");
            bought.classList.remove("d-none");
        }
    };

    fetchMethod(currentUrl + "/api/shop/permaupgrade", callback, "GET");
});
