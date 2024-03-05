// Navbar code
const nav_links = document.querySelectorAll('.link');
const sections = document.querySelectorAll('.hero-section');

nav_links[0].classList.add('link-active');

nav_links.forEach(link => {
    link.addEventListener('click', () => {
        nav_links.forEach(otherLink => {
            otherLink.classList.remove('link-active');
        });
        link.classList.add('link-active');
    });
});







//TODO app 

const todoContainer = document.querySelector('.all-todo-container');
const todoInput = document.querySelector('.todo-add');
const addTodoButton = document.querySelector('.add-todo-button');

let addButtonText = addTodoButton.innerText;

let todoArray = [];

let editId = null;

document.addEventListener('DOMContentLoaded', () => {
    todoArray = JSON.parse(localStorage.getItem('todoList')) || [];
    displayTodo(todoArray);
});

const displayTodo = (todoArray) => {
    let updateTodo;
    todoContainer.innerHTML = '';
    if(todoArray.length == 0){
        todoContainer.innerHTML = `<div style='color: gray'>Add a todo now!!!</div>`;
    }else{
        todoArray.forEach((todoItem , index) => {
            let todoSingle = document.createElement('div');
            todoSingle.className = 'single-todo';
            
            let todoLeftSection = document.createElement('div');
            todoLeftSection.className = 'todo-left-section';
            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'todo-checkbox';
            
            
            checkbox.checked = todoItem.done;
            
            checkbox.onclick = () => {
                todoArray[index].done = checkbox.checked;
                saveTodo(todoArray);
                // Update text decoration immediately upon checkbox click
                todoText.style.textDecoration = checkbox.checked ? 'line-through' : 'none';
            };
            
            let todoText = document.createElement('div');
            todoText.className = 'todo';
            todoText.innerText = todoItem.todo;
            
            // Update text decoration based on todoItem.done
            todoText.style.textDecoration = todoItem.done ? 'line-through' : 'none';
            
            let todoRightSection = document.createElement('div');
            todoRightSection.className = 'todo-right-section';
            let editTodoButton = document.createElement('button');
            editTodoButton.className = 'edit-todo-button btn';
            editTodoButton.addEventListener('click' , () => editTodo(todoItem , index));
            editTodoButton.innerText = 'Edit';
            let deleteTodoButton = document.createElement('button');
            deleteTodoButton.className = 'delete-todo-button btn';
            deleteTodoButton.addEventListener('click' , () => deleteTodo(index));
            deleteTodoButton.innerText = 'Delete';
            
            todoRightSection.appendChild(editTodoButton);
            todoRightSection.appendChild(deleteTodoButton);
            todoLeftSection.appendChild(checkbox);
            todoLeftSection.appendChild(todoText);
            todoSingle.appendChild(todoLeftSection);
            todoSingle.appendChild(todoRightSection)
            
            
            updateTodo = todoSingle;
            // todoContainer.insertAdjacentHTML('beforeend', updateTodo); // Append each todo item to the container
            todoContainer.appendChild(updateTodo);
        });
    }
}

todoInput.addEventListener('keydown', (e) => {
    let key = e.key;
    if(key == 'Enter'){
        todoDataPush();
        todoInput.value = '';
    }
});

addTodoButton.addEventListener('click', () => { 
    todoDataPush();
    todoInput.value = '';
});

const todoDataPush = () => {
    let todoValue = todoInput.value;
    
    if(todoValue.trim().length == 0 || todoValue == null || todoValue == undefined){
        alert('Please enter something before adding!!!');
    }else{
        if(editId == null){
            todoArray.push(
                { 
                    'todo' : todoValue,
                    'done' : false
                }
                ); // Push new todo item to the array
            }else{
                todoArray[editId].todo = todoValue;
                editId = null;
                addTodoButton.innerText = addButtonText;
            }
            saveTodo(todoArray);
            displayTodo(todoArray); // Display only the last added todo item
        }
    }

    const saveTodo = (todoArray) => {
        localStorage.setItem('todoList', JSON.stringify(todoArray));
    };
    
    const editTodo = (todo , index) => {
        // console.log(todo , index);
        todoInput.value = todo.todo;
        todoInput.focus();
        addTodoButton.innerText = 'Change todo';
        editId = index;
        console.log(index);
    };
    
    const deleteTodo = (index) => {
        todoArray = JSON.parse(localStorage.getItem('todoList')) || [];
        todoArray.splice(index, 1); // Remove 1 element at the specified index
        saveTodo(todoArray);
        displayTodo(todoArray);
    };
    
    
    
    
    
    


    
    
    //QR code generator
    
    
    const qrName = document.querySelector('.qr-name');
    const qrEmail = document.querySelector('.qr-email');
    const qrPhone = document.querySelector('.qr-phone');
    const qrImage = document.querySelector('.qr-image');
    const generateQRButton = document.querySelector('.generate-qr-button');
    const qrMessage = document.querySelector('.qr-message');
    const qrImageContainer = document.querySelector('.qr-image-container');
    const loader = qrImageContainer.querySelector('.loader');

    qrMessage.innerText = 'Generate a qr now!!'
    qrMessage.style.color = 'gray';

const fetchQR = async (name , email , phone) => {
    let qrData = ` name : ${name.value } email : ${email.value} phone : ${phone.value} `
    const qrURL = ` https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${qrData}`;

    loader.style.display = 'block';

    if(name.value.trim().length == 0 || email.value.trim().length == 0 || phone.value.trim().length == 0){
        alert('Invalid credentials!!!');
        name.focus();
        loader.style.display = 'none';
    }else{
        qrMessage.innerText = '';
        const response = await fetch(qrURL);
        const result = await response.blob();
        let url = URL.createObjectURL(result);
        // if(url){
        // }
        qrImage.src = url;

        loader.style.display = 'none';


        setTimeout(() => {            
            qrName.value = '';
            qrEmail.value = '';
            qrPhone.value = '';
        }, 10000);
    }
}

generateQRButton.addEventListener('click', () => {
    fetchQR(qrName, qrEmail, qrPhone)
    qrImage.src = '';
})









//Random Quote Generator

const generateQuoteButton = document.querySelector('.generate-quote-button');
const quoteInput = document.querySelector('.quote-keyword-input');
const quote = document.querySelector('.quote');

const quoteContainer = document.querySelector('.quote-lower-section');
const quoteLoader = quoteContainer.querySelector('.loader');

quote.innerHTML = `<p style="color:gray">Generate a quote now!!😁😍</p>`
generateQuoteButton.addEventListener('click', () => {
    fetchQuote();
});

quoteInput.addEventListener('keydown', (e) => {
    let key = e.key;
    if(key == 'Enter'){
        fetchQuote();
    }
});

quoteInput.addEventListener('input', (e) => {
    let val = e.target.value;
    if(val.trim() == ''){
        quote.innerHTML = `<p style="color:gray">Generate a quote now!!😁😍</p>`
    }
});


const fetchQuote = async () => {
    let value = quoteInput.value;
    
    quoteLoader.style.display = 'block';
    quote.innerHTML = '';

    if(value.trim().length == 0 || value == null){
        alert('Enter valid credentials!!');
    }else{
        const quoteURL = `https://api.api-ninjas.com/v1/quotes?category=${value}`;

        const res = await fetch(quoteURL , {
            method: 'GET',
            headers: { 'X-Api-Key': 'YOUR_API_KEY'},
            contentType: 'application/json'
        })
        const data = await res.json();

        if(data.length == 0){
            quote.innerHTML = `<p >No datas found!!</p>`;
            quoteLoader.style.display = 'none';
        }else{
            quote.innerHTML = data[0].quote;
            quoteLoader.style.display = 'none';
        }
    }
};









//OTP verification app

const otpInputs = document.querySelectorAll('.otp-input');
const verifyOTPButton = document.querySelector('.otp-verify-button');
const successForm = document.querySelector('.otp-success-form');
const goBackButton = document.querySelector('.otp-back-button');

// otpInputs[0].focus();

let expectedOTP = '6234';

let enteredOTP = [];

otpInputs.forEach((otpInput , index) => {
    otpInput.addEventListener('keyup', (e) => {
        if (otpInput.value !== "" && index < otpInputs.length - 1) {
            otpInputs[index + 1].focus();
            enteredOTP[index] = otpInput.value;
        }else if(index == otpInputs.length - 1) {
            enteredOTP[index] = otpInput.value;
        }
    });

    otpInput.addEventListener('keydown', (e) => {
        let key = e.key;
        if(otpInput.value == "" && key == 'Backspace' && index > 0){
            otpInputs[index - 1].focus();
            enteredOTP.splice(index - 1 , 1);
        }
    });
})



verifyOTPButton.addEventListener('click', () => {
    if(expectedOTP == enteredOTP.join('')){
        successForm.style.display = 'flex';
        otpInputs.forEach(otpInput => otpInput.value = '');
        goBackButton.addEventListener('click',() => {
            successForm.style.display = 'none';
            otpInputs[0].focus();
        });
    }else{
        alert('OTP not matching!!');
        successForm.style.display = 'none';
        otpInputs[0].focus();
        otpInputs.forEach(otpInput => otpInput.value = '');
    }
})














//faqs accordian

const accordionTitles = document.querySelectorAll('.accordian-title');
const accordionDescriptions = document.querySelectorAll('.accordian-description');
const accordionIcons = document.querySelectorAll('.accordian-icon');

accordionTitles.forEach((title, index) => {
    title.addEventListener('click', () => {
        accordionDescriptions.forEach((description, i) => {
            if (i === index) {
                if (description.style.display === 'none' || description.style.display === '') {
                    description.style.display = 'block';
                    accordionIcons[index].innerText = '-';
                } else {
                    description.style.display = 'none';
                    accordionIcons[index].innerText = '+';
                }
            } else {
                description.style.display = 'none';
                accordionIcons[i].innerText = '+';
            }
        });
    });
});


accordionDescriptions[0].style.display = 'block';
accordionIcons[0].innerText = '-';



