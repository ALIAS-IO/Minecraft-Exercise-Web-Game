document.addEventListener("minionsLoaded", function () {
    const upgradeCallback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        if (responseData.length === 0) {
            return;
        }

        responseData.forEach((upgrade) => {
            const minionId = upgrade.minion_id;
            const upgradeContainer = document.getElementById(`upgrades-${minionId}`);
            const noUpgradesMessage = document.getElementById(`no-upgrades-${minionId}`);

            if (noUpgradesMessage) {
                noUpgradesMessage.remove();
            }

            if (!upgradeContainer) return;

            const upgradeItem = document.createElement("div");
            upgradeItem.className = "col-12 p-3 d-flex mx-auto justify-content-center";
            upgradeItem.id = `upgrade-${upgrade.upgrade_level}`;

            upgradeItem.innerHTML = `
                <div class="card challenge m-3 p-3">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title text-center">${upgrade.description}</h5>
                        <p class="card-text">Upgrade Level: ${upgrade.upgrade_level}</p>
                        <p class="card-text">Cost: ${upgrade.price}</p>
                        <div class="d-flex justify-content-center">
                            <button class="btn btn-block m-3 purchaseBtn" 
                                upgrade-level="${upgrade.upgrade_level}" 
                                minion-id="${minionId}">
                                Purchase
                            </button>
                        </div>
                    </div>
                </div>
            `;

            upgradeContainer.appendChild(upgradeItem);
        });

        document.dispatchEvent(new Event("upgradesLoaded"));
    };

    fetchMethod(currentUrl + "/api/minions/upgrade", upgradeCallback, "GET");
});