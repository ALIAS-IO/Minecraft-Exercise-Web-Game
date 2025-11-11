document.addEventListener("DOMContentLoaded", function () {
    const createChallengeBtn = document.getElementById("createChallengeBtn");
    const token = localStorage.getItem("token");

    createChallengeBtn.addEventListener("click", function () {
      if (token) {
        createChallengeBtn.href = "newChallenge.html";
      } else {
        alert("You must be logged in to create a challenge.");
        createChallengeBtn.href = "login.html";
      }
    });
  });