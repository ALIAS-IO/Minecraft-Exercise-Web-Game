document.addEventListener("DOMContentLoaded", function () {
  
    const token = localStorage.getItem("token");
    const upgradeList = document.getElementById("upgradeList");
    upgradeList.addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("purchaseBtn")) {
            const minionId = event.target.getAttribute("minion-id");
            const upgradeLevel = event.target.getAttribute("upgrade-level");
  
                const data = {
                    minion_id: parseInt(minionId),
                    upgrade_level: parseInt(upgradeLevel),
                    token: token
                };
                console.log(data)
  
                const callback = (responseStatus, responseData) => {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);
                    if (responseStatus == 403){
                        alert(responseData.message)
                    } else {
                        alert(responseData.message)
                        window.location.href = "userMinions.html";
                    }
                };
  
                fetchMethod(currentUrl + `/api/minions/upgrade`, callback, "PUT", data, token);
            }
        });
    });