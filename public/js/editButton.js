document.addEventListener("DOMContentLoaded", function () {
  
    const completionList = document.getElementById("completionList");
    completionList.addEventListener("keyup", function(event) {
        if (event.target && event.target.classList.contains("noteField")) {
        const completionId = event.target.getAttribute("data-completion-id");
        const noteField = document.getElementById(`notes-${completionId}`);
        const updateButton = document.getElementById(`edit-${completionId}`);
        if (noteField.value.trim() !== '') {
            updateButton.disabled = false;
        } else {
            updateButton.disabled = true;
        }
        }
  });
});