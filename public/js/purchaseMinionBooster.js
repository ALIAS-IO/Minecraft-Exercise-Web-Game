document.addEventListener("DOMContentLoaded", function () {
  
    const token = localStorage.getItem("token");
    const boosterList = document.getElementById("boosterList");
    boosterList.addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("purchaseBtn")) {
            const boosterId = event.target.getAttribute("booster-id");
            const minionId = event.target.getAttribute("minion-id");
                console.log(boosterId)
                const data = {
                    booster_id: boosterId,
                    minion_id: minionId,
                    token: token
                };
  
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
  
                fetchMethod(currentUrl + `/api/minions/booster`, callback, "PUT", data, token);
            }
        });
    });