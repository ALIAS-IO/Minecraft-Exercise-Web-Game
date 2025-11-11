document.addEventListener("DOMContentLoaded", function () {
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        responseData.forEach((review) => {
            const challengeId = review.challenge_id;
            const challengeContainer = document.getElementById(`challenge-${challengeId}`);
            const reviewsPlaceholder = document.getElementById(`reviews-${challengeId}`);

            if (challengeContainer) {

                if (reviewsPlaceholder) {
                    reviewsPlaceholder.remove();
                }

                const reviewContainer = document.createElement("div");
                reviewContainer.className = "col-xl-3 col-lg-4 col-md-6 col-sm-12 p-3 d-flex justify-content-center";
                reviewContainer.id = `challenge-review-${challengeId}`;

                const starRating = createStarRating(review.rating);

                reviewContainer.innerHTML = `
                    <div class="card challenge w-100 d-flex flex-row align-items-center">
                        <div class="card-body d-flex flex-column">
                            <span class="h-100">
                                <h5 class="card-title text-center">Review By: ${review.username}</h5>
                            </span>
                            <p class="card-text">
                                Review: ${review.review}
                            </p>
                            <p class="card-text star-align">
                                Rating: ${starRating}
                            </p>
                        </div>
                    </div>
                `;

                challengeContainer.appendChild(reviewContainer);
            }
        });
    };

    document.addEventListener("challengeShown", function () {
        fetchMethod(currentUrl + "/api/reviews/public", callback, "GET");
    });

    function createStarRating(rating) {
        let starHtml = '<span class="rating-stars">';
        
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starHtml += '<span class="star filled"></span>';
            } else {
                starHtml += '<span class="star"></span>';
            }
        }
        
        starHtml += '</span>';
        return starHtml;
    }
});
