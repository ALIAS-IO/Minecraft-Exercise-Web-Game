document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const userDetails = document.getElementById("userDetails");
        userDetails.innerHTML = ""; // Clear previous content if needed

        const centerContainer = document.createElement("div");
        centerContainer.className = "d-flex justify-content-center align-items-center min-vh-50"; // Centering styles

        responseData.forEach((user) => {
            const displayItem = document.createElement("div");
            displayItem.className = "container";

            displayItem.innerHTML = `
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div id="user" class="card mb-3">
                        <div class="card-body text-center p-2">
                            <h5 class="card-title">${user.username}</h5>
                            <p class="card-text">Email: ${user.email}</p>
                            <p class="card-text">Skillpoints: ${user.skillpoints}</p>
                        </div>
                    </div>

                    <div class="d-flex flex-column align-items-center">
                        <a id="reviews" href="./userReviews.html" class="btn mb-2">Reviews</a>
                        <a id="completions" href="./completions.html" class="btn mb-2">Completions</a>
                        <a id="editBtn" href="./editProfile.html" class="btn mb-2">Edit Profile</a>
                        <a id="challengeBtn" href="./userChallenges.html" class="btn">Created Challenges</a>
                    </div>
                </div>
                
                <div class="col-md-5">
                    <div class="card h-100">
                        <div class="card-body text-center p-2>
                            <h5 class="card-title">Modifiers</h5>
                            <p class="card-text">Current Upgrade Level: ${user.current_upgrade_level}</p>
                            <p class="card-text">Current Active Booster: ${user.current_active_booster}</p>
                            <p class="card-text">Number of Boosted Challenges Left: ${user.no_of_boosted_challenges_left}</p>
                            <p class="card-text">Total Minions: ${user.total_minions}</p>
                            <div class="d-flex justify-content-center">
                                <a id="shopBtn" href="./shop.html" class="btn mt-2">Shop</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;

            centerContainer.appendChild(displayItem);
        });

        userDetails.appendChild(centerContainer);
    };

    fetchMethod(currentUrl + "/api/user", callback, "GET", null, token);
});
