let users = [
    {
        name: "Roronoa Zoro",
        pic: "https://cdn.oneesports.gg/wp-content/uploads/2024/04/Anime_OnePiece_Zoro_Sword_Attack-1024x576.jpg",
        bio: "the swordsman",
    },

    {
        name: "Monkey D Luffy",
        pic: "https://i.pinimg.com/originals/b9/ff/56/b9ff56209b3d5156c0790e01ecde7abf.jpg?nii=t",
        bio: "the caption",
    },

    {
        name: "sanji",
        pic: "https://cdn.oneesports.gg/wp-content/uploads/2024/06/OnePiece_Sanji_DiableJambe.jpg",
        bio: "the cook",
    },

    {
        name: "nami",
        pic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1iOxHC9hJwm_WIedgI7nSCHh-Lb5JJz_tfU9xr4XSHA&s",
        bio: "the navigater",
    },

    {
        name: "robin",
        pic: "https://cdn.shopify.com/s/files/1/0770/3425/8763/files/nico_robin_cute_girl_mugiwara.jpg?v=1705866391",
        bio: "arceoplogicist",
    },
];

 function showusers(arr) {
    arr.forEach((user) => {
        // create outer card div
        const card = document.createElement("div");
        card.classList.add("div3");

        // create image
        const img = document.createElement("img");
        img.src = user.pic;
        img.classList.add("image");

        // create blurred-layer div
        const blurredlayer = document.createElement("div");
        blurredlayer.style.backgroundImage = `url(${user.pic})`;
        blurredlayer.classList.add("div4");

        // create content div
        const content = document.createElement("div");
        content.classList.add("div5");

        // create h3 and paragraph
        const heading = document.createElement("h3");
        heading.textContent = user.name;

        const para = document.createElement("p");
        para.textContent = user.bio;

        // append heading and paragraph to content
        content.appendChild(heading);
        content.appendChild(para);

        // append all the card
        card.appendChild(img);
        card.appendChild(blurredlayer);
        card.appendChild(content);

        // finally, append card to the body or any container
        document.querySelector(".div2").appendChild(card);
    });
 }

 showusers(users);

 let inp = document.querySelector(".inp");

inp.addEventListener("input", function () {
    let newusers = users.filter((user) => {
        return user.name.startsWith(inp.value);
    });

    document.querySelector(".div2").innerHTML = "";


    if(newusers.length === 0){
        document.querySelector(".div2").style.color = "white";
        document.querySelector(".div2").textContent = "no card found";
    } else {
        showusers(newusers);
    }
    
});