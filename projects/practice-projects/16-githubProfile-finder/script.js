// selecting elements (quering)
let searchForm = document.querySelector(".search-form");
let userInput = document.querySelector(".search-input");
let statusMsg = document.querySelector(".status");
let result = document.querySelector(".results");
let avatar = document.querySelector(".avatar");
let name = document.querySelector(".name");
let username = document.querySelector(".profile-username");
let usernameLink = username.querySelector("a");
let bio = document.querySelector(".profile-bio");
let statsValue = document.querySelectorAll(".stats-value");
let profileLink = document.querySelector(".repo-link");
let repoList = document.querySelector(".repo-list");
let emptyRepo = document.querySelector(".empty-repo");



// function code for the profile when user search for github profile
searchForm.addEventListener("submit", async function (evt) {

    evt.preventDefault();

    let userSearch = userInput.value.trim();

    if (!userSearch) return;

    let encodedName = encodeURIComponent(userSearch);

    const url = `https://api.github.com/users/${encodedName}`;

    statusMsg.textContent = "searching for the profile...";
    statusMsg.hidden = false;
    result.hidden = true;

    try {

        // send the HTTP request and wait for the response object
        const response = await fetch(url);

        // check if the response if ok
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("No GitHub user found with that username.");
            }

            throw new Error("unable to lead the profile. please try again.");
        }

        // parse the reponse body as json
        const data = await response.json();

        const dataobject = {
            avatarUrl: data.avatar_url,
            bio: data.bio,
            followers: data.followers,
            following: data.following,
            name: data.name,
            username: data.login,
            profileLink: data.html_url,
            repos: data.public_repos
        };

        // update the UI by giving the data to its elements

        // update the exisiting profile elements
        avatar.src = dataobject.avatarUrl;
        avatar.alt = dataobject.username;

        if (dataobject.bio == null) {
            bio.textContent = "this user's hans't added a bio";
        } else {
            bio.textContent = dataobject.bio;
        }

        usernameLink.textContent = dataobject.username;
        usernameLink.href = dataobject.profileLink;

        name.textContent = dataobject.name || dataobject.username;

        profileLink.href = dataobject.profileLink;

        statsValue[0].textContent = dataobject.repos;
        statsValue[1].textContent = dataobject.followers;
        statsValue[2].textContent = dataobject.following;


        await fetchRepositories(userSearch);

        // hiding the statusmsg and show the result only after a successful response
        statusMsg.hidden = true;
        result.hidden = false;


    } catch (error) {
        console.error(error);
        if (error instanceof TypeError) {
            statusMsg.textContent = "network error. check your connection and try again.";
        } else {
            statusMsg.textContent = error.message;
        }

        statusMsg.hidden = false;
    }

});


// function code to fetch the repositories
async function fetchRepositories(username) {

    let repoURL = `https://api.github.com/users/${encodeURIComponent(username)}/repos`;

    const response = await fetch(repoURL);

    // check if the response is ok or not
    if (!response.ok) {
        throw new Error("Unable to load repositories. Please try again.");
    }

    const data = await response.json();

    renderRepositories(data);

}



// function code to render the repositories
function renderRepositories(repositories) {

    console.log(repositories);
    console.log(repositories.length);
    console.log(emptyRepo);

    // clearing the old results
    repoList.replaceChildren();


    if (repositories.length === 0) {
        emptyRepo.textContent = "This user has no public repositories.";
        emptyRepo.hidden = false;
        return;
    }

    emptyRepo.hidden = true;


    repositories.forEach(element => {

        // creating the dynamic elements

        let repoItem = document.createElement("li");
        repoItem.classList.add("repo-item");

        let repoName = document.createElement("h4");
        repoName.classList.add("repo-name");

        let repoLink = document.createElement("a");
        repoLink.textContent = element.name;
        repoLink.href = element.html_url;

        let repoDesc = document.createElement("p");
        repoDesc.classList.add("repo-desc");

        if (element.description == null) {
            repoDesc.textContent = "No description provided.";
        } else {
            repoDesc.textContent = element.description;
        }

        let repoMeta = document.createElement("ul");
        repoMeta.classList.add("repo-meta");

        let repoLang = document.createElement("li");
        repoLang.classList.add("repo-lang");

        if (element.language == null) {
            repoLang.style.display = 'none';
        } else {
            repoLang.textContent = element.language;
        }

        let repoStars = document.createElement("li");
        repoStars.classList.add("repo-stars");
        repoStars.textContent = element.stargazers_count;


        // appending the elements

        repoMeta.append(repoLang, repoStars);

        repoName.append(repoLink);

        repoItem.append(repoName, repoDesc, repoMeta);

        repoList.append(repoItem);

    });

}