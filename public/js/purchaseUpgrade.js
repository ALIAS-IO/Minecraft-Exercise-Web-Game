document.addEventListener("DOMContentLoaded", function () {
  
    const token = localStorage.getItem("token");
    const upgradeList = document.getElementById("upgradeList");
    upgradeList.addEventListener("click", function(event) {
        if (event.target && event.target.classList.contains("purchaseBtn")) {
            const upgradeLevel = event.target.getAttribute("data-completion-id");
  
                const data = {
                    upgrade_level: upgradeLevel,
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
  
                fetchMethod(currentUrl + `/api/shop/permaupgrade`, callback, "PUT", data, token);
            }
        });
    });