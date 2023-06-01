// ////////////////////////data///////////////////
// users and authorization
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
    arrival:"11:51",
    seats:0
},
{
    type:"bus",
    from:"Тернопіль",
    to:"Київ",
    available:[23,24,25],
    time:"8год. 52хв",
    price:"800",
    departure:"02:59",
    arrival:"11:51",
    seats:14

},

]

//////////////////////// variables///////////////
// containers
const userContainer = document.querySelector(".user-panel")
const adminContainer = document.querySelector(".admin-panel")
const boughtContainer = document.querySelector(".bought")
const allContainer = document.querySelector(".all")


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
const inputTo = document.querySelector(".to");
const inputThere = document.querySelector(".there")
const inputBack = document.querySelector(".back")
const btnSearch = document.querySelector(".search")

//tickets render
const ticketContainer = document.querySelector(".tickets");
const ticketsNotFound = document.querySelector(".tickets__not-found")
const ticket = document.querySelector(".tickets__ticket")
// payment

const fullName = document.querySelector(".full-name")
const cardNumber = document.querySelector(".card-number")
const cardCode = document.querySelector(".code")
const paymentContainer = document.querySelector(".payment")
const paymentDetails = document.querySelector(".details")
const paymentDate = document.querySelector(".date")
const paymentPrice = document.querySelector(".ticket-price")

const paymentNum = document.querySelector(".num-seats")
const paymentSubmit = document.querySelector(".btn-seats")
const btnFinish = document.querySelector(".finish")

// event handlers
let currentTicket;
const app = function(){

    // authorization
btnUser.addEventListener("click",function(e){
    formLogin.classList.toggle("hidden");
})
    // login
btnSubmit.addEventListener("click",function(e){
    const username = inputUsername.value;  
    const password = inputPassword.value;
    users.forEach(el=>{
        if (username === el.username && 
            password === el.password && el.type==="admin"){
            // btnUser.classList.toggle("hidden");
            btnMenu.classList.toggle("hidden");
            formLogin.classList.toggle("hidden");
            userContainer.classList.add("hidden");
            adminContainer.classList.toggle("hidden")
            console.log("success")
        }
        if (username === el.username && 
            password === el.password && el.type==="user"){
            btnMenu.classList.add("hidden");
            formLogin.classList.toggle("hidden");
            userContainer.classList.toggle("hidden");
            adminContainer.classList.add("hidden");
            console.log("success")
        }
    })
})

formClose.addEventListener("click",function(e){
    e.preventDefault();
    formLogin.classList.toggle("hidden");
})

const allMarkup = tickets.map(el=>
   ` <div class="tickets__ticket">               
                    <div class="tickets__ticket__place tickets__ticket__place--bought">
                        <span class="tickets__ticket__from">${el.from}</span>            
                       <span class="to">${el.to}</span>
                    </div>
                    <div class="tickets__ticket__details">
                    <div class="tickets__ticket__dates">Дати: ${el.available}</div>

                    <div class="tickets__ticket__type">Ціна: ${el.price}грн </div>   
                    <div class="tickets__ticket__type">Тип: ${el.type}</div>   
                </div>
                    
                </div>`
).join().replaceAll(",", " ")

allContainer.insertAdjacentHTML("afterbegin",allMarkup)

let btnBuy = []
let ticketPrice;
let currentData={
    type:"",
    from:"",
    to:"",
    available:[],
    time:"",
    price:"",
    departure:"",
    arrival:"",
    seats: 14
}

////////////////////////////////////////////////
//                 inputFrom.value = "тернопіль"
//                 inputTo.value = "львів"
//                 inputThere.value = "23"
//                 inputBack.value = ""
// ///////////////////////////////////////////////

btnSearch.addEventListener("click",function(e){
     tickets.forEach(el=>{
        if(inputFrom.value.toLowerCase() === el.from.toLowerCase() &&
            inputTo.value.toLowerCase() === el.to.toLowerCase() && el.seats > 0){
                ticketsNotFound.classList.add("hidden") 
                // ticket.classList.toggle("hidden")
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
                <div class="buy">
                <div class="tickets__ticket__price">
                    Ціна: ${el.price}
                </div>
                <button class="tickets__ticket__btn buy">Купити</button>
                <div class="tickets__ticket__price">
                    К-сть місць: ${el.seats}
                </div>
            </div>
            </div>
                `
                ticketContainer.insertAdjacentHTML("afterbegin",markup)
                ticketContainer.scrollIntoView({behavior:"smooth",block:"start"})
                btnBuy = document.querySelectorAll(".buy")
                // console.log(btnBuy)

                currentData=
                {type:el.type,
                from:el.from,
                to:el.to,
                available:el.available,
                time:el.time,
                price:el.price,
                departure:el.departure,
                arrival:el.arrival,
                seats: el.seats
                }
                console.log(currentData)
                inputFrom.value = ""
                inputTo.value = ""
                inputThere.value = ""
                inputBack.value = ""

                btnBuy.forEach(el=>el.addEventListener("click",function(e){
                    e.preventDefault()
                    paymentContainer.classList.remove("hidden")
                    currentTicket = el.parentElement;
                    console.log(currentTicket)
                    ticketPrice = e.target.parentElement.querySelector(".tickets__ticket__price").innerText.split(" ").pop()
                    console.log(ticketPrice)
                    paymentContainer.style.display = "flex"
                    paymentContainer.scrollIntoView({behavior:"smooth",block:"start"})
                    paymentPrice.innerText = `Ціна: ${ticketPrice}`;
                }))
            }
            else {ticketsNotFound.classList.remove("hidden")
            ticketsNotFound.scrollIntoView({behavior:"smooth",block:"start"})}  

        })
})
    

function paymentFunctionality(){
paymentSubmit.addEventListener("click",function(e){
    if(paymentNum.value > 0){
        paymentPrice.innerText=`Ціна: ${ticketPrice*(paymentNum.value)}`;
    }
    else{
        alert("Введість к-сть місць!")
    }
   
})  
btnFinish.addEventListener("click",function(e){
    e.preventDefault()
    paymentContainer.classList.add("hidden")
    ticketContainer.innerHTML = ""
    alert("Дякуємо за покупку!")
    currentData.seats-= paymentNum.value
    currentData.price = ticketPrice*paymentNum.value
    
    tickets.forEach(el=>{
        if(currentData.from === el.from && currentData.to=== el.to) el.seats = currentData.seats 

    })

    const markup = 
    `       <div class="tickets__ticket">
                <div class="tickets__ticket__time">
                    <span class="tickets__ticket__departure">${currentData.departure}</span>
                    <span class="time">${currentData.time}</span>
                    <span class="arrival">${currentData.arrival}</span>
                </div>
                <div class="tickets__ticket__place">
                    <span class="tickets__ticket__from">${currentData.from}</span>
                    <span class="to">${currentData.to}</span>
                </div>
                <div class="buy">
                <div class="tickets__ticket__price">
                    Ціна: ${currentData.price}
                </div>
                <div class="tickets__ticket__price">
                    К-сть місць: ${currentData.seats}
                </div>
                </div>
                <div class="info">
                <div class="tickets__ticket__price">
                    Ім'я: ${fullName.value}
                </div>
                <div class="tickets__ticket__price">
                    Номер карти: ${cardNumber.value}
                </div>
            </div>
                `

    boughtContainer.insertAdjacentHTML("afterbegin",markup)  
    fullName.value = ""
    cardNumber.value = ""
    cardCode.value = ""
    paymentDate.value = ""
})
}
paymentFunctionality()
// ADMIN FUNCTIONALITY

const addContainer = document.querySelector(".add")
const addFrom = document.querySelector(".add-from")
const addTo = document.querySelector(".add-to")
const addDate = document.querySelector(".add-date")
const addType = document.querySelector(".add-type")
const addDeparture = document.querySelector(".add-departure")
const addArrival = document.querySelector(".add-arrival")
const addPrice = document.querySelector(".add-price")
const addTime = document.querySelector(".add-time")
const addSeats = document.querySelector(".add-seat")
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
    const newTicket = 
    {
        type: addType.value,
        from:addFrom.value,
        to:addTo.value,
        available:addDate.value,
        departure:addDeparture.value,
        arrival: addArrival.value,
        time: addTime.value,
        price: addPrice.value,
        seats:addSeats
    }
    tickets.push(newTicket)

    const markup = 
    ` <div class="tickets__ticket">               
    <div class="tickets__ticket__place tickets__ticket__place--bought">
        <span class="tickets__ticket__from">${newTicket.from}</span>            
       <span class="to">${newTicket.to}</span>
    </div>
    <div class="tickets__ticket__details">
    <div class="tickets__ticket__dates">Дати: ${newTicket.available}</div>

    <div class="tickets__ticket__type">Ціна: ${newTicket.price}грн </div>   
    <div class="tickets__ticket__type">Тип: ${newTicket.type}</div>   
    </div>
    </div>`

    allContainer.insertAdjacentHTML("afterbegin",markup)

    addDate.value=""
    addFrom.value=""
    addTo.value=""
    addType.value=""
    addDeparture.value=""
    addArrival.value=""
    addPrice.value=""
    addTime.value=""
    addSeats.value=""
    console.log(tickets)
} else{alert("Заповніть всі поля!")}
})
}

app()