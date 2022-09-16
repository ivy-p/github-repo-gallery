// This div is where my profile info will appear
const overviewEl = document.querySelector(".overview");
const username = "ivy-p";
// List Element
repoListEl = document.querySelector(".repo-list");

// Section where all repo information appears
const repoSectionEl = document.querySelector(".repos");
// Section where individual repo data will appear
const repoDataEl = document.querySelector(".repo-data");

// Fetching profile information from GitHub
const profileFetch = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);

    const data = await userInfo.json();
    console.log(data);

    //Displaying profile information on page
    profileDisplay(data);
};

profileFetch();

//Displaying specified GitHub Profile information 
function profileDisplay (data) {
    const userInfoDiv = document.createElement("div");
    userInfoDiv.classList.add(".user-info")

    userInfoDiv.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    `;

    overviewEl.append(userInfoDiv);

    repoFetch();
};

// Fetching GitHub Repo information
const repoFetch = async function () {
    const res = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    // ^ Specifying here that I want repos to be displayed from most-recent to least-recent, and limiting the number displayed per-page to 100.

    const repos = await res.json();
    console.log(repos);

    repoNameDisplay(repos);
}; 


// Displaying Repo names on page.
function repoNameDisplay (repos) {
 for (const repo of repos) {
    const repoLi = document.createElement("li");
    repoLi.classList.add("repo");
    repoLi.innerHTML = `<h3>${repo.name}</h3>`

    repoListEl.append(repoLi);
 };
};

repoListEl.addEventListener("click", function (e) {
    // If the element that was clicked on matches the h3 element (aka name of repo)
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        repoInfoFetch(repoName);
    };
});

// Fetching specific repo information
async function repoInfoFetch(repoName) {
    const customRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);

    const repoInfo = await customRepo.json();
    console.log(repoInfo);

    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();

    console.log(languageData);

    const languages = [];
    for (const language in languageData) {
        languages.push(language);
    };

    repoInfoDisplay(repoInfo, languages);
};

// Displaying specific repo information
function repoInfoDisplay(repoInfo, languages) {
    repoDataEl.innerHTML = "";
    const repoInfoDiv = document.createElement("div");
    repoInfoDiv.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
        <p>Description: ${repoInfo.description}</p>
        <p>Default Branch: ${repoInfo.default_branch}</p>
        <p>Languages: ${languages.join(", ")}</p>
        <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

    repoDataEl.append(repoInfoDiv);
    repoDataEl.classList.remove("hide");

    repoSectionEl.classList.add("hide");
};

