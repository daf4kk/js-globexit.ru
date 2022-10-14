import { createPopUp } from "./popUp.js";
export const fetchUsers = async(sortby) => {
    const currentUsers = document.querySelectorAll('.user');
    currentUsers.forEach((user) => {
        user.remove()
    })
    let users = [];
    if (sortby){
        await fetch(`http://127.0.0.1:3000/?term=${sortby}`)
        .then(res => res.json())
        .then((data) => {
            users = [...data]   
        })
    }else{
        await fetch(`http://127.0.0.1:3000/`)
        .then(res => res.json())
        .then((data) => {
            users = [...data]   
        })
    }

    users.forEach((user) => {
        const userBlock = 
            `<div class="user">
            <h2 class="name user__name">${user.name}</h2>
            <div class="contacts user__contacts">
                <div class = 'number contacts__number'>
                    <img src = './src/imgs/phone.png'></img>
                    <p class="">${user.phone}</p>
                </div>
                <div class = 'email contacts__email'>
                    <img src = './src/imgs/email.png'></img>
                    <p class = "email contacts__email">${user.email}</p>
                </div>
            </div>
        </div>`
        const DOMUsersList = document.querySelector('.users-list');
        DOMUsersList.innerHTML += userBlock;
    })
    updatePopUpListener();
}
export const updateInputListener = () => {
    const input = document.querySelector('input');
    input.addEventListener('input', (e) => {
        fetchUsers(e.target.value)
    })
}

export const updatePopUpListener = () => {
    const updatedUsers = document.querySelectorAll('.users-list .user')
    updatedUsers.forEach((user) => {
        const name = user.querySelector('.name').innerHTML
        user.addEventListener('click', () => {
            createPopUp(name)
        })
    })
}
fetchUsers()
updateInputListener()
