const githubForm = document.querySelector("#github-form");
const nameInput = document.querySelector("#githubname");
const clearLastUsers = document.querySelector("#clear-last-users");
const lastUsers = document.querySelector("#last-users");
const github = new Github();
const ui = new UI();
eventListeners();

function eventListeners() {
  githubForm.addEventListener("submit", getData);
  clearLastUsers.addEventListener("click", clearAllSearched);
  document.addEventListener("DOMContentLoaded", getAllSearched);
}
function getData(e) {
  let username = nameInput.value.trim();

  if (username === "") {
    alert("Enter an username");
  } else {
    github
      .getGithubData(username)
      .then((response) => {
        if (response.user.message === "Not Found") {
          ui.showError("User not found");
        } else {
          ui.addSearchedUserToStorage(username);
          Storage.addSearchedUserToStorage(username);
          ui.showUserInfo(response.user);
          ui.showRepoInfo(response.repo);
        }
      })
      .catch((err) => console.log(err));
  }
  ui.clearInput();
  e.preventDefault();
}
function clearAllSearched() {
  if (confirm("Are you sure?")) {
    Storage.clearAllSearchedUsersFromStorage();
    ui.clearAllSearchedFromUI();
  }
}
function getAllSearched() {
  let users = Storage.getSearchedUsersFromStorage();
  let result = "";
  users.forEach((user) => {
    result += `<li class="list-group-item">${user}</li>`;
  });
  lastUsers.innerHTML = result;
}
