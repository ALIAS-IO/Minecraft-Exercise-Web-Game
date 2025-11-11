document.addEventListener("DOMContentLoaded", function () {
    url = new URL(document.URL);
    const urlParams = url.searchParams;
    const user_id = urlParams.get("player_id");
  
    const callbackForUserInfo = (responseStatus, responseData) => {
      console.log("responseStatus:", responseStatus);
      console.log("responseData:", responseData);
  
      const userInfo = document.getElementById("userInfo");
  
      if (responseStatus == 404) {
        userInfo.innerHTML = `${responseData.message}`;
        return;
      }
  
      userInfo.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <p class="card-text">
                  User ID: ${responseData.id} <br>
                      Username: ${responseData.username} <br>
                      Created On: ${responseData.created_on} <br>
                      Updated On: ${responseData.updated_on} <br>
                      Last Login On: ${responseData.last_login_on} <br>
                  </p>
              </div>
          </div>
      `;
    };

    const callbackForUserPlayers = (responseStatus, responseData) => {
        console.log("responseStatus:", responseStatus);
        console.log("responseData:", responseData);
    
        const playerList = document.getElementById("playerList");
    
        if (responseStatus == 404) {
          playerList.innerHTML = `${responseData.message}`;
          return;
        }
    
        userInfo.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <p class="card-text">
                    Character Name: ${responseData.name} <br>
                        User ID: ${responseData.user_id} <br>
                        Player ID: ${responseData.player_id} <br>
                        Username: ${responseData.username} <br>
                        Character Level: ${responseData.character_level} <br>
                        Character Created On: ${responseData.char_created_on} <br>
                        User Created On: ${responseData.user_created_on} <br>
                    </p>
                </div>
            </div>
        `;
      };
  
    fetchMethod(currentUrl + `/api/player/${user_id}`, callbackForUserInfo, callbackForUserPlayers);
  });