document.addEventListener("DOMContentLoaded", function () {
  const challengeForm = document.getElementById("challengeForm");
  const warningCard = document.getElementById("warningCard");
  const warningText = document.getElementById("warningText");
  const confirmationModal = document.getElementById("confirmationModal");
  const startChallengeBtn = document.getElementById("startChallengeBtn");
  const reviewChallengesBtn = document.getElementById("reviewChallengesBtn");

  challengeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const challenge = document.getElementById("challenge").value;
    const token = localStorage.getItem("token");
    const skillpoints = document.getElementById("skillpoints").value;

    if (challenge.length <= 100) {
      console.log("Challenge Creation successful");
      console.log("Challenge:", challenge);
      console.log("Skillpoints:", skillpoints);
      warningCard.classList.add("d-none");

      const data = {
        challenge: challenge,
        skillpoints: skillpoints,
      };

      const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        confirmationModal.style.display = "block";
      };

      fetchMethod(currentUrl + "/api/challenges/new", callback, "POST", data, token);

      challengeForm.reset();
    } else {
      warningCard.classList.remove("d-none");
      warningText.innerText = "Challenge details are too long";
    }
  });

  startChallengeBtn.addEventListener("click", function () {
    window.location.href = "challenge.html";
  });

  reviewChallengesBtn.addEventListener("click", function () {
    window.location.href = "userChallenges.html";
  });

  continueBtn.addEventListener("click", function () {
    confirmationModal.style.display = "none";
  });
});
