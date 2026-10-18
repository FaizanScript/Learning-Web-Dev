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