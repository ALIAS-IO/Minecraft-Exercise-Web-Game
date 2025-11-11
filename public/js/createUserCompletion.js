document.addEventListener("DOMContentLoaded", function () {

      const completed = JSON.parse(localStorage.getItem("challengeStatus"));
      const challenge_id = localStorage.getItem("challengeId");
      const notes = localStorage.getItem("challengeNotes");
      const token =  localStorage.getItem("token");
      if (challenge_id){

        const data = {
          challenge_id: parseInt(challenge_id),
          completed: completed,
          notes: notes
        };
    
        const callback = (responseStatus, responseData) => {
          console.log("responseStatus:", responseStatus);
          console.log("responseData:", responseData);
          localStorage.removeItem("challengeStatus");
          localStorage.removeItem("challengeId");
          document.dispatchEvent(new Event("completionPosted"));
        };
  
        fetchMethod(currentUrl + "/api/user/completions", callback, "POST", data, token);

      }
    
      document.dispatchEvent(new Event("completionPosted"));
      
});