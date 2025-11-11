document.addEventListener("completionPosted", function () {
    const token = localStorage.getItem("token");
    const callback = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);

        const completionList = document.getElementById("completionList");
        
        completionList.innerHTML = "";

        responseData.forEach((completion) => {

            const completionId = completion.complete_id;

            const displayItem = document.createElement("div");
            displayItem.className = "col-xl-3 col-lg-4 col-md-6 col-sm-12 p-3 d-flex justify-content-center";
            displayItem.id = `challenge-${completionId}`;

            displayItem.innerHTML = `
            <div class="card challenge w-100">
                <div class="card-body d-flex flex-column">
                    <span class="border h-50">
                        <h5 class="card-title text-center">Completed Challenge ${completion.complete_id}</h5>
                    </span>
                    <p class="card-text">
                        Challenge ID: ${completion.challenge_id}
                    </p>
                    <p class="card-text">
                        Completed Date: ${completion.creation_date}
                    </p>
                    <p class="card-text">
                        Status: ${completion.completed ? "Completed" : "Gave Up"}
                    </p>
                    <p class="card-text">
                        Notes: ${completion.notes ? completion.notes : ""}
                    </p>
                    <div class="d-flex justify-content-center mb-3">
                        <input type="text" id="notes-${completionId}" class="form-control mt-4 noteField" data-completion-id="${completionId}" placeholder="Edit your notes here"></input>
                    </div>
                    <div class="d-flex justify-content-center">
                        <button id="edit-${completionId}" class="btn btn-primary btn-sm update-notes editBtn" data-completion-id="${completionId}" disabled>Update Notes</button>
                    </div>
                </div>
            </div>
            `;
            completionList.appendChild(displayItem);
        });
    };
    fetchMethod(currentUrl + "/api/user/completions", callback, "GET", null, token);

});