

const input = document.querySelector("input");
const button = document.querySelector("button");
let card = document.querySelector('.card');

button.addEventListener("click",createCard);





function createCard(){
    if(input.value != ""){
        getData(input.value);
    }
}

function getData(username){

    const repoAddress = `https://api.github.com/users/${username}/repos`;
    const address = `https://api.github.com/users/${username}`;
    let obj = {};
    let name = "";
    let loginName = "";
    let avatarUrl = "";
    let totalSize = 0;
    let repoNumber;

    // Get name,username and avatar url
    fetch(address)
    .then(res => res.json())
    .then(addressData => {
        name = addressData.name;
        loginName = addressData.login;
        avatarUrl = addressData.avatar_url;
    });

    fetch(repoAddress)
    .then(res => res.json())
    .then((data) => {
        console.log(data);
        repoNumber = data.length;
        for(var i=0; i<data.length ; i++){
            // get language url
            let language_url = data[i].languages_url;
            let size = Number(data[i].size);
            console.log(size);
            totalSize += size;

            fetch(language_url)
            .then(res => res.json())
            .then(data => {
                // assign language data to object
                for(const [key,value] of Object.entries(data)){
                    if(obj.hasOwnProperty(key)){
                        obj[key] += value;
                    }
                    else{
                        obj[key] = value;
                    }
                }
            });
        }



        // obj geçerli bir object dönüyor fakat obj.entries veya obj.keys yapıldığında boş dönüyor.

        card.innerHTML = `
        <div class="content1">
            <img class="image1" src="${avatarUrl}" width="60" height="60" alt="">
            <p class="name"><b>${name}</b></p>
            <p class="username">@${loginName}</p>
        </div>
        <hr>
        <ul class="liste">
            <li class="repoNumber"><b>${repoNumber}</b> repo(s)</li>
            <li class="size"><b>${totalSize} KB</b>code</li>
            <li>
                <ul class="languages">
                    
                </ul>
            </li>
        </ul>
        `;

        
        


    });




}






