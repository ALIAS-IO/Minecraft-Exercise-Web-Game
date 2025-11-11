document.addEventListener("DOMContentLoaded", function () {
    const reviewForm = document.getElementById("reviewForm");
    const warningCard = document.getElementById("warningCard");
    const warningText = document.getElementById("warningText");
    const ratingInputs = document.querySelectorAll(".rating input");

    let rating = null;

    ratingInputs.forEach(input => {
        input.addEventListener("change", function () {
            rating = parseInt(this.value);
            console.log("Selected Rating:", rating);
        });
    });

    reviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const challengeReview = JSON.parse(localStorage.getItem("challengeReview"))
        const token = localStorage.getItem("token");
        const review = document.getElementById("review").value;
        const challenge_id = challengeReview.challenge_id
        const challenge = challengeReview.challenge

        if (!rating) {
            warningCard.classList.remove("d-none");
            warningText.innerText = "Please select a rating.";
            return;
        }

        if (review.length <= 100) {
            console.log("Review Submitted successfully");
            console.log("Review:", review);
            console.log("Rating:", rating);
            console.log("Challenge ID:", challenge_id);
            console.log("Challenge Details:", challenge);
            warningCard.classList.add("d-none");

            const data = {
                review: review,
                rating: rating,
                challenge_id: challenge_id,
                challenge: challenge
            };

            const callback = (responseStatus, responseData) => {
                console.log("responseStatus:", responseStatus);
                console.log("responseData:", responseData);
                window.location.href = "userReviews.html";
            };

            localStorage.removeItem("challengeReview")

            fetchMethod(currentUrl + "/api/reviews/submit", callback, "POST", data, token);

        } else {
            warningCard.classList.remove("d-none");
            warningText.innerText = "Challenge details are too long.";
        }
    });
});
