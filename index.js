const checkBoxList = document.querySelectorAll('.custom-checkbox');
const inputFields = document.querySelectorAll('.goal-input');
const errorLabel = document.querySelector('.error-label');
const inputValue = document.querySelector('.progress-value')
const progresslabel = document.querySelector('.progress-lable')

const allQuotes = [
    'Raise the bar by completing your goals!',
    'well begun is half done',
    'just a step away, keep going',
    'whoa! You just completed all the goals, time for chill :Dude',
]
const allGoals = JSON.parse(localStorage.getItem('allGoals')) || {};
let completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length
inputValue.style.width=`${(completedGoalsCount/3)*100}%`
inputValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
progresslabel.innerText = allQuotes[completedGoalsCount]

checkBoxList.forEach((checkbox) =>{
    checkbox.addEventListener('click',(e)=>{
        const allFieldsFilled = [...inputFields].every((e)=>{
            return e.value
        })
        console.log(allFieldsFilled)
        if(allFieldsFilled){
            checkbox.parentElement.classList.toggle('completed')
            
            const inputId = checkbox.nextElementSibling.id;
            allGoals[inputId].completed = !allGoals[inputId].completed
            completedGoalsCount = Object.values(allGoals).filter((goal) => goal.completed).length

            localStorage.setItem('allGoals' , JSON.stringify(allGoals));
            inputValue.style.width=`${(completedGoalsCount/3)*100}%`
            inputValue.firstElementChild.innerText = `${completedGoalsCount}/3 completed`
            progresslabel.innerText = allQuotes[completedGoalsCount]
        }
        else{
            console.log("class added")
            errorLabel.classList.add('show-error')
        }   
    })
})

inputFields.forEach((input) =>{
    console.log(allGoals)
    input.value = allGoals[input.id]?.name || '';
    if(allGoals[input.id]?.completed){
        input.parentElement.classList.add('completed')
    }
    
    input.addEventListener('focus',() =>{
        errorLabel.classList.remove('show-error')
    })

    input.addEventListener('input',(e) =>{
        if(allGoals[input.id]?.completed){
            input.value = allGoals[input.id].name
            return;
        }
        allGoals[input.id] = {
            name:input.value,
            completed:false,
        }
        localStorage.setItem('allGoals' , JSON.stringify(allGoals));
    })
})
