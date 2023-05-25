// ////////////////////////data///////////////////
// users
const users = [{
    type:"user",
    username:"andre",
    password:"1122"
},
{
    type:"admin",
    username:"diana",
    password:"2233"
}]

// tickets

const tickets = [{
    type:"train",
    from:"Тернопіль",
    to:"Львів",
    available:[23,24,25],
    time:"8год. 52хв",
    price:"700",
    departure:"02:59",
    arrival:"11:51"

},
{
    type:"bus",
    from:"Тернопіль",
    to:"Київ",
    available:[23,24,25],
    time:"8год. 52хв",
    price:"800",
    departure:"02:59",
    arrival:"11:51"


}]

//////////////////////// variables///////////////

// loginform
const formLogin = document.querySelector(".login");
const formClose = document.querySelector(".close");
const inputUsername = document.querySelector(".username");
const inputPassword = document.querySelector(".password");
const btnSubmit = document.querySelector(".submit")
// navbar
const btnUser = document.querySelector(".user");
const btnMenu = document.querySelector(".menu");

//ticket form 
const inputFrom = document.querySelector(".from")
const inputTo = document.querySelector(".to")
const inputThere = document.querySelector(".there")
const inputBack = document.querySelector(".back")
const btnSearch = document.querySelector(".search")

//tickets render
const ticketContainer = document.querySelector(".tickets");
const ticketsNotFound = document.querySelector(".tickets__not-found")
const ticket = document.querySelector(".tickets__ticket")
// payment

const paymentContainer = document.querySelector(".payment")
const paymentDetails = document.querySelector(".details")
const btnFinish = document.querySelector(".finish")

// event handlers
btnUser.addEventListener("click",function(e){
    formLogin.classList.toggle("hidden");
})

btnSubmit.addEventListener("click",function(e){
    const username = inputUsername.value;  
    const password = inputPassword.value;
    users.forEach(el=>{
        if (username === el.username && 
            password === el.password){console.log("success")
            formLogin.classList.toggle("hidden");
        }
    })
})

formClose.addEventListener("click",function(e){
    e.preventDefault();
    formLogin.classList.toggle("hidden");
})

btnSearch.addEventListener("click",function(e){
    tickets.forEach(el=>{
        if(inputFrom.value.toLowerCase() === el.from.toLowerCase() &&
            inputTo.value.toLowerCase() === el.to.toLowerCase() &&
            +inputThere.value === el.available[0]){
                ticket.classList.toggle("hidden")
                markup = `
                <div class="tickets__ticket">
                <div class="tickets__ticket__time">
                    <span class="tickets__ticket__departure">${el.departure}</span>
                    <span class="time">${el.time}</span>
                    <span class="arrival">${el.arrival}</span>
                </div>
                <div class="tickets__ticket__place">
                    <span class="tickets__ticket__from">${el.from}</span>
                    <span class="to">${el.to}</span>
                </div>
                <button class="tickets__ticket__btn buy">Купити</button>
            </div>
                `
                ticketContainer.insertAdjacentHTML("afterbegin",markup)
            }
        
    })
})

const btnBuy = document.querySelector(".buy")
btnBuy.addEventListener("click",function(e){
    e.preventDefault()
    paymentContainer.style.opacity = "1"
    paymentContainer.style.display = "flex"
    paymentContainer.scrollIntoView({behavior:"smooth",block:"start"})
})

btnFinish.addEventListener("click",function(e){
    e.preventDefault()
    paymentContainer.style.display = "none"
    paymentContainer.style.opacity = "0"
    alert("Дякуємо за покупку!")
})

// ADMIN FUNCTIONALITY

const addContainer = document.querySelector(".add")
const addFrom = document.querySelector(".add-from")
const addTo = document.querySelector(".add-to")
const addDate = document.querySelector(".add-date")
const addType = document.querySelector(".add-type")
const btnAdd = document.querySelector(".add__btn")


btnMenu.addEventListener("click",function(e){
    addContainer.classList.toggle("hidden")
})

btnAdd.addEventListener("click",function(e){
    e.preventDefault(e)
    if(addDate.value!="" &&
    addFrom.value!="" &&
    addTo.value!="" &&
    addType.value!="")
    {
    tickets.push({
        type: addType.value,
        from:addFrom.value,
        to:addTo.value,
        available:+addDate.value,
    })
    addDate.value=""
    addFrom.value=""
    addTo.value=""
    addType.value=""
    console.log(tickets)
} else{alert("Заповніть всі поля!")}
})