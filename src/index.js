//UI controller that handles all Dom stuffs
const UIController = {
    selectElement(elementId){
        return document.getElementById(elementId)
    },

    displayTextBox(element){
        element.style.display = 'block'
    },

    addClassToElement(element,className){
        element.classList.add(className)
    },

    createProjectList(projectContainer,userInput){
        const newDiv = document.createElement('div')
        newDiv.classList.add('gray-circle')
        newDiv.style.background = this.generateDynamicColors()

        const cirleWrapper = document.createElement('div')
        cirleWrapper.classList.add('circles-wrapper')

        const circleHead  = document.createElement('h3')
        circleHead.classList.add('gray-cirlce-head')
        circleHead.textContent = `${userInput.value}`
       
        cirleWrapper.appendChild(newDiv)
        cirleWrapper.appendChild(circleHead)

        projectContainer.appendChild(cirleWrapper)

        userInput.value = ''
    },

    removeClassFromElement(element,className){
        element.classList.remove(className)
    },

    generateDynamicColors(){
        let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
       return randomColor;
    }

}

//Todo object that handles application logic
const Todo = {

}

const todoApp = function(){
    const myUI = Object.create(UIController)

    const myTodo = Object.create(Todo)

    const addTaskBtn = myUI.selectElement('header-icon')

    addTaskBtn.addEventListener('click',() => {
        const noteBox = myUI.selectElement('proj-area')
        myUI.displayTextBox(noteBox)
        
    })


    const createProjectBtn = myUI.selectElement('project-icon')
    createProjectBtn.addEventListener('click',() => {
        const addProjectInputText = myUI.selectElement('add-proj-input')
        myUI.addClassToElement(addProjectInputText,'show')

    })


    const inputAddButton = myUI.selectElement('add-btn-input')
    inputAddButton.addEventListener('click',() => {
        const textInput = myUI.selectElement('project')
        const selectProjectContainer = myUI.selectElement('proj-wrap')
        myUI.createProjectList(selectProjectContainer,textInput)

    })


    const inputCancelButton = myUI.selectElement('cancel-btn-input')
    inputCancelButton.addEventListener('click',() => {
        const addProjectInputText = myUI.selectElement('add-proj-input')
        myUI.removeClassFromElement(addProjectInputText,'show')
    })
    
    
}

todoApp()





