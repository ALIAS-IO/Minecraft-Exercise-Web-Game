document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("token");
    const reviewedChallengeIds = [];
    const reviewed = document.getElementById("reviewed");

    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const reviewedList = document.getElementById("reviewedList");
        reviewedList.innerHTML = "";

        if (responseData.length === 0) {
            reviewed.classList.remove("d-none");
        } else {
            reviewed.classList.add("d-none");

            responseData.forEach((review) => {

                const reviewId = review.review_id;

                reviewedChallengeIds.push(reviewId);

                const displayItem = document.createElement("div");
                displayItem.className = "col-xl-3 col-lg-4 col-md-6 col-sm-12 p-3 d-flex justify-content-center";
                displayItem.id = `challenge-${reviewId}`;

                displayItem.innerHTML = `
                    <div class="card challenge w-100">
                        <div class="card-body d-flex flex-column">
                            <span class="border h-50 mb-3">
                                <h5 class="card-title text-center">${review.challenge}</h5>
                            </span>
                            <p class="card-text">Challenge ID: ${review.challenge_id}</p>
                            <p class="card-text">Review ID: ${reviewId}</p>
                            <p class="card-text">Latest Challenge Date: ${review.creation_date}</p>
                            <p class="card-text">Created Date: ${review.review_creation_date}</p>
                            <p class="card-text">Status: ${review.completed ? "Completed" : "Gave Up"}</p>
                            <p class="card-text">Last Edited Date: ${review.last_edited_date}</p>
                            <div class="d-flex justify-content-center gap-3">
                                <a id="edit-btn-${reviewId}" href="./reviewPage.html" class="btn editBtn" role="button">Edit</a>
                                <a id="delete-btn-${reviewId}" href="#" class="btn deleteBtn" role="button">Delete</a>
                            </div>
                        </div>
                    </div>
                `;

                reviewedList.appendChild(displayItem);
            
                displayItem.querySelector(`#edit-btn-${reviewId}`).addEventListener("click", function () {
                    localStorage.setItem("editReview", JSON.stringify(review));
                    window.location.href = "./reviewPage.html";
                });

                displayItem.querySelector(`#delete-btn-${reviewId}`).addEventListener("click", function () {
                    const data = { review_id: reviewId };
                    const callback = (responseStatus, responseData) => {
                        if (responseStatus == 204){
                            alert("Review deleted successfully")
                            window.location.href = "./userReviews.html";
                        } else {
                            alert(responseData.error)
                        }
                    }
                    fetchMethod(currentUrl + "/api/reviews", callback, "DELETE", data, token);
                });
            });
        }

        localStorage.setItem("reviewedChallengeIds", JSON.stringify(reviewedChallengeIds));
    };

    document.dispatchEvent(new Event("challengeShown"));
    
    fetchMethod(currentUrl + "/api/reviews/completed", callback, "GET", null, token);
});

