// This div is where my profile info will appear
const overviewEl = document.querySelector(".overview");
const username = "ivy-p";

const profileFetch = async function () {
    const res = await fetch (`https://api.github.com/users/${username}`);

    const data = await res.json();
    console.log(data);

    profileDisplay(data);
};

profileFetch();

function profileDisplay (data) {
    const userInfoEl = document.createElement("div");
    userInfoEl.classList.add(".user-info")

    userInfoEl.innerHTML = `
    <figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
    `;

    overviewEl.append(userInfoEl);
}
// In your next await statement, resolve the JSON response. Log out the response to the console and call your function to see your results. 
