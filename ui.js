class UI {
  constructor() {
    this.profileDiv = document.querySelector("#profile");
    this.repoDiv = document.querySelector("#repos");
    this.lastUsers = document.querySelector("#last-users");
    this.inputArea = document.querySelector("#githubname");
    this.cardBody = document.querySelector(".card-body");
  }
  clearInput() {
    this.inputArea.value = "";
  }
  showUserInfo(user) {
    this.profileDiv.innerHTML = `
    <div class="card card-body mb-3">
    <h3 class="page-heading mb-2">Profile</h3>
    <div class="row">
    <div class="col-md-4">
             <a href="${user.html_url}" target = "_blank">
              <img class="img-fluid mb-2" src="${user.avatar_url}"> </a>
              <hr>
              <div id="fullName"><strong>${user.name}</strong></div>
              <hr>
              <div id="bio">${user.bio}</div>
             </div>
           <div class="col-md-8">
                 <button class="btn btn-secondary">
                       Followers  <span class="badge badge-light">${user.followers}</span>
                 </button>
                 <button class="btn btn-info">
                      Following  <span class="badge badge-light">${user.following}</span>
                   </button>
                 <button class="btn btn-danger">
                     Repositories  <span class="badge badge-light">${user.public_repos}</span>
                 </button>
                 <hr>
                 <li class="list-group">
                     <li class="list-group-item borderzero">
                        <i class="fa-solid fa-building"></i> <span id="company">${user.company}</span>
                         
                     </li>
                     <li class="list-group-item borderzero">
                         <i class="fa-solid fa-location-dot"></i> 
                         <span id = "location">${user.location}</a>
                         
                     </li>
                     <li class="list-group-item borderzero">
                         <i class="fa-solid fa-envelope"></i> <span id="company">${user.email}</span>
                         
                     </li>
                     
                 </div>
            </div>
        </div>
    `;
  }

  showRepoInfo(repos) {
    this.repoDiv.innerHTML = `<h3 class="page-heading m-3">Repositories</h3>`;
    this.repoDiv.className += " card";
    repos.forEach((repo) => {
      this.repoDiv.innerHTML += `
         <div class="mb-2 card-body">
             <div class="row">
                 <div class="col-md-2">
                 <a href="${repo.html_url}" target = "_blank" id = "repoName">${repo.name}</a>
                 </div>
                 <div class="col-md-6">
                     <button class="btn btn-secondary">
                         Starts  <span class="badge badge-light" id="repoStar">${repo.stargazers_count}</span>
                     </button>

                     <button class="btn btn-info">
                         Forks  <span class="badge badge-light" id ="repoFork">${repo.forks_count}</span>
                     </button>
             
                 </div>
         </div>

         </div> 
        
        `;
    });
  }

  showError(message) {
    const div = document.createElement("div");
    div.className = "alert alert-danger";
    div.textContent = message;
    this.cardBody.appendChild(div);
    setTimeout(() => {
      div.remove();
    }, 2000);
  }

  addSearchedUserToStorage(username) {
    let users = Storage.getSearchedUsersFromStorage();
    if (users.indexOf(username) === -1) {
      const li = document.createElement("li");
      li.className = "list-group-item";
      li.textContent = username;
      this.lastUsers.appendChild(li);
    }
  }

  clearAllSearchedFromUI() {
    while (this.lastUsers.firstElementChild !== null) {
      this.lastUsers.removeChild(this.lastUsers.firstElementChild);
    }
  }
}
