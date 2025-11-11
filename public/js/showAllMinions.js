document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseData.length != 0){
            const minionList = document.getElementById("minionList");
            minionList.innerHTML = "";

            responseData.forEach((minion) => {

                const minionId = minion.minion_id; 

                const displayItem = document.createElement("div");
                displayItem.className = "col-lg-2 col-md-6 col-sm-12 p-3 d-flex mx-auto justify-content-center";
                displayItem.id = `upgrade-${minionId}`;

                displayItem.innerHTML = `
                <div class="card challenge">
                    <div class="card-body d-flex flex-column">
                        <span class="h-100">
                            <h5 class="card-title text-center">${minion.minion_name}</h5>
                        </span>
                        <p class="card-text">
                            Minion ID: ${minionId}
                        </p>
                        <p class="card-text">
                            Cost: ${minion.price}
                        </p>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-block m-3 purchaseBtn" data-completion-id="${minionId}">Purchase</button>
                        </div>
                    </div>
                </div>
                `;
                minionList.appendChild(displayItem);
            });
        } else {
            const bought = document.getElementById("bought");
            bought.classList.remove("d-none");
        }
    };

    fetchMethod(currentUrl + "/api/shop/minion", callback, "GET");
});
