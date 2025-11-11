document.addEventListener("DOMContentLoaded", function () {
    const editForm = document.getElementById("editForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const token = localStorage.getItem("token");

    editForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();

        // Clear previous errors
        warningCard.classList.add("d-none");
        warningText.innerText = "";

        // If password is filled but confirm password is blank, show error
        if (password && !confirmPassword) {
            warningCard.classList.remove("d-none");
            warningText.innerText = "Please confirm your password";
            return;
        }

        // If passwords are filled but do not match, show error
        if (password && password !== confirmPassword) {
            warningCard.classList.remove("d-none");
            warningText.innerText = "Passwords do not match";
            return;
        }

        // Send an empty string ("") for fields left blank
        const data = {
            username: username || "",
            email: email || "",
            password: password || ""
        };

        const callback = (responseStatus, responseData) => {
            console.log("responseStatus:", responseStatus);
            console.log("responseData:", responseData);
            if (responseStatus == 409) {
                warningCard.classList.remove("d-none");
                warningText.innerText = responseData.message;
            } else {
                window.location.href = "profile.html";
            }
        };

        // Send the request with blank values if fields are empty
        fetchMethod(currentUrl + "/api/user/update", callback, "PUT", data, token);
    });
});
