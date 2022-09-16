// This div is where my profile info will appear
const overviewEl = document.querySelector(".overview");
const username = "ivy-p";
repoListEl = document.querySelector(".repo-list");

const profileFetch = async function () {
    const userInfo = await fetch (`https://api.github.com/users/${username}`);

    const data = await userInfo.json();
    console.log(data);

    profileDisplay(data);
};

profileFetch();

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


const repoFetch = async function () {
    const res = await fetch (`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);

    const repos = await res.json();
    console.log(repos);

    repoInfoDisplay(repos);
}; 

function repoInfoDisplay (repos) {
 for (const repo of repos) {
    const repoLi = document.createElement("li");
    repoLi.classList.add("repo");
    repoLi.innerHTML = `<h3>${repo.name}</h3>`

    repoListEl.append(repoLi);
 };
};