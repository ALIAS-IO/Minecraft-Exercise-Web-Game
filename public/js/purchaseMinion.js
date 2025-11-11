document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const minionList = document.getElementById("minionList");
    
    // Create modal structure
    const modal = document.createElement("div");
    modal.innerHTML = `
        <div id="minionModal" class="modal" style="display: none; position: fixed; z-index: 1000; left: 0; top: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); border-radius: 2px;">
            <div class="modal-content" style="background: white; padding: 20px; margin: 10% auto; width: 300px; text-align: center;">
                <h3>Name Your Minion</h3>
                <input type="text" id="minionNameInput" placeholder="Optional: Enter minion name" style="width: 100%; padding: 5px;">
                <button id="confirmPurchase" style="margin-top: 10px;">Confirm</button>
                <button id="cancelPurchase" style="margin-top: 10px;">Cancel</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const minionModal = document.getElementById("minionModal");
    const minionNameInput = document.getElementById("minionNameInput");
    const confirmPurchase = document.getElementById("confirmPurchase");
    const cancelPurchase = document.getElementById("cancelPurchase");
    let selectedMinionId = null;
    
    minionList.addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("purchaseBtn")) {
            selectedMinionId = event.target.getAttribute("data-completion-id");
            minionNameInput.value = "";
            minionModal.style.display = "block";
        }
    });
    
    cancelPurchase.addEventListener("click", function() {
        minionModal.style.display = "none";
    });
    
    confirmPurchase.addEventListener("click", function() {
        const minionName = minionNameInput.value.trim();
        
        const data = {
            minion_id: selectedMinionId,
            minion_name: minionName,
            token: token
        };

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            alert(responseData.message);
            if (responseStatus !== 403) {
                window.location.href = "userMinions.html";
            }
        };

        fetchMethod(currentUrl + `/api/shop/minion`, callback, "PUT", data, token);
        minionModal.style.display = "none";
    });
});