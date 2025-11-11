document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const minionList = document.getElementById("minionList");
        
        minionList.innerHTML = "";
        
        const row = document.createElement("div");
        row.className = "row d-flex flex-wrap";

        responseData.forEach((minions) => {
            const minionId = minions.minion_id;

            const displayItem = document.createElement("div");
            displayItem.className = "col-md-6 col-sm-12 p-3 mx-auto d-flex align-items-center";
            displayItem.id = `minion-${minionId}`;

            displayItem.innerHTML = `
            <div class="card challenge w-100 d-flex flex-row align-items-center minionCard">
                <div class="col-4 d-flex justify-content-center">
                    <img src="./images/minion-${minionId}.png" alt="Minion Image" class="img-fluid minions">
                </div>
                <div class="col-8">
                    <div class="card-body p-5">
                        <h5 class="card-title text-center">${minions.minion_name}</h5>
                        <p class="card-text">Title: ${minions.title}</p>
                        <p class="card-text">Minion Level: ${minions.minion_level}</p>
                        <p class="card-text">Current Active Booster: ${minions.current_active_booster}</p>
                        <p class="card-text">Booster Duration: ${minions.booster_duration}</p>
                        <p class="card-text">Resources Collected: ${minions.resources_collected}</p>
                        <p class="card-text">Purchase Date: ${minions.bought_on}</p>
                        <p class="card-text">Last Login In: ${minions.last_checked_on}</p>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-block m-3 collectBtn" data-completion-id="${minionId}">Collect Resources</button>
                        </div>
                    </div>
                </div>
            </div>
            `;
            displayItem.querySelector(".card").style.backgroundImage = `url('./images/minion-background-${minionId}.png')`;
            row.appendChild(displayItem);
        });
        
        minionList.appendChild(row);
    };
    fetchMethod(currentUrl + "/api/minions", callback, "GET", null, token);
});