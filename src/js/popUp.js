
import { fetchUsers, updateInputListener } from "./fetchUsers.js";
function closePopUp(){

    const popUpWrapper = document.querySelector('.popup-wrapper')
    const btn = popUpWrapper.querySelector('.icon-background');
    const body = document.querySelector('body')

    popUpWrapper.addEventListener('click', (e) => {
        if (e.target.classList.contains('popup-wrapper')){
            popUpWrapper.remove();
            body.style.overflow = 'auto';
        }  
    })
    btn.addEventListener('click', () => {
        popUpWrapper.remove();
        body.style.overflow = 'auto';
    })
    updateInputListener()
}
export const createPopUp = async (userName) => {
    const input = document.querySelector('input');
    if (input.value.length !== 0){  //Переводим пользователя на "начальную страницу" со списком всех пользователей если он на данный момент не находится на ней
        fetchUsers()
    }
    let user;
    await fetch(`http://127.0.0.1:3000/?term=${userName}`)
        .then(response => response.json())
        .then((data) => {
            user = data[0]
        })
    const {name, phone, email, hire_date,position_name,department} = user
    const popUp = `
    <div class = 'popup-wrapper'>
    <div class = 'popup'>
        <div class="icon-background">
            <img class = 'close-icon' src = './src/imgs/close.png'>
        </div>
        <h2 class="name">${name}</h2>
        <div class = 'info info-wrapper'>
            <div class="tags info__tags">
                <h5>Телефон:</h5>
                <h5>Почта:</h5>
                <h5>Дата приёма:</h5>
                <h5>Должность:</h5>
                <h5>Подразделение:</h5>
            </div>
            <div class="values info__values">
                <h5 class="number">${phone}</h5>
                <h5 class='email'>${email}</h5>
                <h5>${hire_date}</h5>
                <h5>${position_name}</h5>
                <h5>${department}</h5>
            </div>
        </div>
        <div class = 'additionally info__additionally'>
            <h5>Дополнительная информация:</h5>
            <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            </p>
        </div>
    </div>
    </div>
    `;

    document.body.innerHTML += popUp;
    const body = document.querySelector('body')
    body.style.overflow = 'hidden';
    closePopUp();
    const updatedUsers = document.querySelectorAll('.users-list .user')
    updatedUsers.forEach((user) => {
        const name = user.querySelector('.name').innerHTML
        user.addEventListener('click', () => {
            createPopUp(name)
        })
    })
}