document.addEventListener("DOMContentLoaded", function () {
  
  const token = localStorage.getItem("token");
  const completionList = document.getElementById("completionList");
  completionList.addEventListener("click", function(event) {
      if (event.target && event.target.classList.contains("editBtn")) {
          const completionId = event.target.getAttribute("data-completion-id");

          const noteField = document.getElementById(`notes-${completionId}`);
          
          const newNote = noteField.value.trim();
          
          if (newNote.length <= 50) {

              const data = {
                  complete_id: completionId,
                  notes: newNote
              };

              const callback = (responseStatus, responseData) => {
                  console.log("responseStatus:", responseStatus);
                  console.log("responseData:", responseData);
                  noteField.value = "";
                  window.location.href = "completions.html";
              };

              fetchMethod(currentUrl + `/api/user/completions/${completionId}`, callback, "PUT", data, token);
          } else {
              alert("Note is too long. Please keep it under 500 characters.");
          }
      }
  });
});
