document.addEventListener("DOMContentLoaded", function () {
  
    const token = localStorage.getItem("token");
    const boosterList = document.getElementById("boosterList");
    boosterList.addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("purchaseBtn")) {
            const boosterId = event.target.getAttribute("data-completion-id");
                console.log(boosterId)
                const data = {
                    booster_id: boosterId,
                    token: token
                };
  
                const callback = (responseStatus, responseData) => {
                    console.log("responseStatus:", responseStatus);
                    console.log("responseData:", responseData);
                    if (responseStatus == 403){
                        alert(responseData.message)
                    } else {
                        alert(responseData.message)
                        window.location.href = "profile.html";
                    }
                };
  
                fetchMethod(currentUrl + `/api/shop/tempbooster`, callback, "PUT", data, token);
            }
        });
    });