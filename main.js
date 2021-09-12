/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
//UI controller that handles all Dom stuffs
const UIController = {
    selectElement(elementId){
        return document.getElementById(elementId)
    },

    displayTextBox(element,activeClass){
        element.classList.add(activeClass)
    },

    addClassToElement(element,className){
        element.classList.add(className)
    },

    createProjectList(projectContainer,userInput){
        if(userInput.value != ''){
            const newDiv = document.createElement('div')
            newDiv.classList.add('circle')
            newDiv.style.background = this.generateDynamicColors()
    
            const cirleWrapper = document.createElement('div')
            cirleWrapper.classList.add('circles-wrapper')
            cirleWrapper.classList.add('del-button')
    
            const circleHead  = document.createElement('h3')
            circleHead.classList.add('circle-head')
            circleHead.textContent = `${userInput.value}`
           
            cirleWrapper.appendChild(newDiv)
            cirleWrapper.appendChild(circleHead)
    
            projectContainer.appendChild(cirleWrapper)
    
            userInput.value = ''
        }
    },

    removeClassFromElement(element,className){
        element.classList.remove(className)
        
    },

    generateDynamicColors(){
        let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
       return randomColor;
    },

    removeProject(eventObject,classIdentifier){

        if(eventObject.target.classList.contains(classIdentifier)){
            eventObject.target.remove()
            const text = eventObject.target.textContent
            this.removeItemFromProject(text)
        }
    },

    createListProject(projectContainer){
        this.clearAllElements(projectContainer)
        this.projectList.forEach((project) => {
            const option = document.createElement('option')
            option.setAttribute("value",`${project}`)
            option.textContent = `${project}`

            projectContainer.appendChild(option)
        })
           
    },

    clearAllElements(ElementParent){
        ElementParent.innerHTML = ''
    },

    clearInputArea(elements){
        elements.forEach((element) => {
            element.value = ''
        })
    },

    showProjectInTheDom(){
        const selctProjectNote = this.selectElement('project-notes')

        const projectArea = this.selectElement('proj-area')

        const showProjectSection = document.createElement('div')
        showProjectSection.classList.add('show-projects-section')


        const selctProjectSection = document.querySelector('.show-projects-section')

        if(selctProjectSection){
            selctProjectSection.remove()
        }

        this.todoList.forEach((todo) => {
            const projectHead = this.selectElement('proj-type-head')
            projectHead.textContent = `${todo.projChoice}`

            showProjectSection.innerHTML += `<div class="todo-note" id="${todo.id}">
            <input type="checkbox" name="projectName" id="ProjectName" class="projectCheckBox">
            <label class="projectLabel" id="projectLabel" for="projectName">${todo.notes}</label>
        </div>
        <div class="todo-date show-date-icon">
            <h3>${todo.date}</h3>
        </div>`
        })

        selctProjectNote.insertBefore(showProjectSection,projectArea)

    },

    removeTaskInputBox(element,className){
        element.classList.remove(`${className}`)
    },

    targetIsDone(eventObject){
        if(eventObject.target.id === 'ProjectName'){
           const parentTarg = eventObject.target.parentElement.parentElement
            const elementId = eventObject.target.parentElement.id
           this.waitAndRemove(parentTarg,elementId,2000)
        }
    },

    waitAndRemove(element,elementId,time){
        setTimeout(() => {
            element.remove()
            this.todoList.forEach((todo)=>{

                if(todo.id === parseInt(elementId)){
                   const idx = this.todoList.indexOf(todo)
                   this.todoList.splice(idx,1)
                    console.log(this.todoList)
                }
            })
        },time)
    }
}

//Todo object that handles application logic
const Todo = {
    projectList: [],

    todoList: [],

    initTodoItems(notes,date,projChoice){
        const tempObj = { }
        tempObj.notes = notes
        tempObj.date = date
        tempObj.projChoice = projChoice
        tempObj.id = this.generateCodeForElements()
        this.todoList.push(tempObj)

        console.log(this.todoList)
    },

    addProjects(project){
        this.projectList.push(project)
    },

    removeItemFromProject(text){
        this.projectList.forEach((project) => {
            if(text === project){
                const idx = this.projectList.indexOf(project)
                this.projectList.splice(idx,1)
            }
        })
    },

    generateCodeForElements(){
        return Math.floor(Math.random() * 1000)
    }

}

Object.setPrototypeOf(UIController,Todo)

const todoApp = function(){

    const myUI = Object.create(UIController)
    const myTodo = Object.create(Todo)

    const addProjBtn = myUI.selectElement('header-icon')
    addProjBtn.addEventListener('click',() => {
        const noteBox = myUI.selectElement('proj-area')
        myUI.displayTextBox(noteBox,'active-block')       
    })


    const createProjectBtn = myUI.selectElement('project-icon')
    createProjectBtn.addEventListener('click',() => {
        const addProjectInputText = myUI.selectElement('add-proj-input')
        myUI.addClassToElement(addProjectInputText,'show')
    })


    const inputAddButton = myUI.selectElement('add-btn-input')
    inputAddButton.addEventListener('click',() => {
        const textInput = myUI.selectElement('project')
        myTodo.addProjects(textInput.value)
        const selectProjectContainer = myUI.selectElement('proj-wrap')
        myUI.createProjectList(selectProjectContainer,textInput)

        const projectListContainer = myUI.selectElement('project-choice')
        myUI.createListProject(projectListContainer)
       
    })

    const inputCancelButton = myUI.selectElement('cancel-btn-input')
    inputCancelButton.addEventListener('click',() => {
        const addProjectInputText = myUI.selectElement('add-proj-input')
        myUI.removeClassFromElement(addProjectInputText,'show')
    }) 
    
    const allProjectsContainer = myUI.selectElement('proj-wrap')
    allProjectsContainer.addEventListener('click',(event)=>{
        myUI.removeProject(event,'del-button')
        const projectListContainer = myUI.selectElement('project-choice')
        myUI.createListProject(projectListContainer) 
    })

    const createTaskBtn = myUI.selectElement('addBtn')
    createTaskBtn.addEventListener('click',() => {
        const noteArea = myUI.selectElement('notes')
        const scheduleArea = myUI.selectElement('schedule')
        const projChoiceArea = myUI.selectElement('project-choice')

        myTodo.initTodoItems(noteArea.value,scheduleArea.value,projChoiceArea.value)

        myUI.showProjectInTheDom()

        myUI.clearInputArea([noteArea,scheduleArea,projChoiceArea])
        
    })

    const cancelTaskBtn = myUI.selectElement('cancelBtn')

    cancelTaskBtn.addEventListener('click',() => {

        const noteBox = myUI.selectElement('proj-area')
        
        myUI.removeTaskInputBox(noteBox,'active-block')
    })

    const projectNoteContainer = myUI.selectElement('project-notes')
    projectNoteContainer.addEventListener('click',(event) => {

        myUI.targetIsDone(event)
    })

}

todoApp()






/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxRQUFRO0FBQ25ELG9DQUFvQyxRQUFROztBQUU1QztBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHlDQUF5QyxnQkFBZ0I7O0FBRXpELDBFQUEwRSxRQUFRO0FBQ2xGO0FBQ0EsOEVBQThFLFdBQVc7QUFDekY7QUFDQTtBQUNBLGtCQUFrQixVQUFVO0FBQzVCO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQSxLQUFLOztBQUVMO0FBQ0Esb0NBQW9DLFVBQVU7QUFDOUMsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL1VJIGNvbnRyb2xsZXIgdGhhdCBoYW5kbGVzIGFsbCBEb20gc3R1ZmZzXG5jb25zdCBVSUNvbnRyb2xsZXIgPSB7XG4gICAgc2VsZWN0RWxlbWVudChlbGVtZW50SWQpe1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKVxuICAgIH0sXG5cbiAgICBkaXNwbGF5VGV4dEJveChlbGVtZW50LGFjdGl2ZUNsYXNzKXtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGFjdGl2ZUNsYXNzKVxuICAgIH0sXG5cbiAgICBhZGRDbGFzc1RvRWxlbWVudChlbGVtZW50LGNsYXNzTmFtZSl7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpXG4gICAgfSxcblxuICAgIGNyZWF0ZVByb2plY3RMaXN0KHByb2plY3RDb250YWluZXIsdXNlcklucHV0KXtcbiAgICAgICAgaWYodXNlcklucHV0LnZhbHVlICE9ICcnKXtcbiAgICAgICAgICAgIGNvbnN0IG5ld0RpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBuZXdEaXYuY2xhc3NMaXN0LmFkZCgnY2lyY2xlJylcbiAgICAgICAgICAgIG5ld0Rpdi5zdHlsZS5iYWNrZ3JvdW5kID0gdGhpcy5nZW5lcmF0ZUR5bmFtaWNDb2xvcnMoKVxuICAgIFxuICAgICAgICAgICAgY29uc3QgY2lybGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIGNpcmxlV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdjaXJjbGVzLXdyYXBwZXInKVxuICAgICAgICAgICAgY2lybGVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2RlbC1idXR0b24nKVxuICAgIFxuICAgICAgICAgICAgY29uc3QgY2lyY2xlSGVhZCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXG4gICAgICAgICAgICBjaXJjbGVIZWFkLmNsYXNzTGlzdC5hZGQoJ2NpcmNsZS1oZWFkJylcbiAgICAgICAgICAgIGNpcmNsZUhlYWQudGV4dENvbnRlbnQgPSBgJHt1c2VySW5wdXQudmFsdWV9YFxuICAgICAgICAgICBcbiAgICAgICAgICAgIGNpcmxlV3JhcHBlci5hcHBlbmRDaGlsZChuZXdEaXYpXG4gICAgICAgICAgICBjaXJsZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2lyY2xlSGVhZClcbiAgICBcbiAgICAgICAgICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQoY2lybGVXcmFwcGVyKVxuICAgIFxuICAgICAgICAgICAgdXNlcklucHV0LnZhbHVlID0gJydcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICByZW1vdmVDbGFzc0Zyb21FbGVtZW50KGVsZW1lbnQsY2xhc3NOYW1lKXtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSlcbiAgICAgICAgXG4gICAgfSxcblxuICAgIGdlbmVyYXRlRHluYW1pY0NvbG9ycygpe1xuICAgICAgICBsZXQgcmFuZG9tQ29sb3IgPSAnIycrTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpKjE2Nzc3MjE1KS50b1N0cmluZygxNik7XG4gICAgICAgcmV0dXJuIHJhbmRvbUNvbG9yO1xuICAgIH0sXG5cbiAgICByZW1vdmVQcm9qZWN0KGV2ZW50T2JqZWN0LGNsYXNzSWRlbnRpZmllcil7XG5cbiAgICAgICAgaWYoZXZlbnRPYmplY3QudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhjbGFzc0lkZW50aWZpZXIpKXtcbiAgICAgICAgICAgIGV2ZW50T2JqZWN0LnRhcmdldC5yZW1vdmUoKVxuICAgICAgICAgICAgY29uc3QgdGV4dCA9IGV2ZW50T2JqZWN0LnRhcmdldC50ZXh0Q29udGVudFxuICAgICAgICAgICAgdGhpcy5yZW1vdmVJdGVtRnJvbVByb2plY3QodGV4dClcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjcmVhdGVMaXN0UHJvamVjdChwcm9qZWN0Q29udGFpbmVyKXtcbiAgICAgICAgdGhpcy5jbGVhckFsbEVsZW1lbnRzKHByb2plY3RDb250YWluZXIpXG4gICAgICAgIHRoaXMucHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJylcbiAgICAgICAgICAgIG9wdGlvbi5zZXRBdHRyaWJ1dGUoXCJ2YWx1ZVwiLGAke3Byb2plY3R9YClcbiAgICAgICAgICAgIG9wdGlvbi50ZXh0Q29udGVudCA9IGAke3Byb2plY3R9YFxuXG4gICAgICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKG9wdGlvbilcbiAgICAgICAgfSlcbiAgICAgICAgICAgXG4gICAgfSxcblxuICAgIGNsZWFyQWxsRWxlbWVudHMoRWxlbWVudFBhcmVudCl7XG4gICAgICAgIEVsZW1lbnRQYXJlbnQuaW5uZXJIVE1MID0gJydcbiAgICB9LFxuXG4gICAgY2xlYXJJbnB1dEFyZWEoZWxlbWVudHMpe1xuICAgICAgICBlbGVtZW50cy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnZhbHVlID0gJydcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgc2hvd1Byb2plY3RJblRoZURvbSgpe1xuICAgICAgICBjb25zdCBzZWxjdFByb2plY3ROb3RlID0gdGhpcy5zZWxlY3RFbGVtZW50KCdwcm9qZWN0LW5vdGVzJylcblxuICAgICAgICBjb25zdCBwcm9qZWN0QXJlYSA9IHRoaXMuc2VsZWN0RWxlbWVudCgncHJvai1hcmVhJylcblxuICAgICAgICBjb25zdCBzaG93UHJvamVjdFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBzaG93UHJvamVjdFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgnc2hvdy1wcm9qZWN0cy1zZWN0aW9uJylcblxuXG4gICAgICAgIGNvbnN0IHNlbGN0UHJvamVjdFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2hvdy1wcm9qZWN0cy1zZWN0aW9uJylcblxuICAgICAgICBpZihzZWxjdFByb2plY3RTZWN0aW9uKXtcbiAgICAgICAgICAgIHNlbGN0UHJvamVjdFNlY3Rpb24ucmVtb3ZlKClcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudG9kb0xpc3QuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdEhlYWQgPSB0aGlzLnNlbGVjdEVsZW1lbnQoJ3Byb2otdHlwZS1oZWFkJylcbiAgICAgICAgICAgIHByb2plY3RIZWFkLnRleHRDb250ZW50ID0gYCR7dG9kby5wcm9qQ2hvaWNlfWBcblxuICAgICAgICAgICAgc2hvd1Byb2plY3RTZWN0aW9uLmlubmVySFRNTCArPSBgPGRpdiBjbGFzcz1cInRvZG8tbm90ZVwiIGlkPVwiJHt0b2RvLmlkfVwiPlxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJwcm9qZWN0TmFtZVwiIGlkPVwiUHJvamVjdE5hbWVcIiBjbGFzcz1cInByb2plY3RDaGVja0JveFwiPlxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwicHJvamVjdExhYmVsXCIgaWQ9XCJwcm9qZWN0TGFiZWxcIiBmb3I9XCJwcm9qZWN0TmFtZVwiPiR7dG9kby5ub3Rlc308L2xhYmVsPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInRvZG8tZGF0ZSBzaG93LWRhdGUtaWNvblwiPlxuICAgICAgICAgICAgPGgzPiR7dG9kby5kYXRlfTwvaDM+XG4gICAgICAgIDwvZGl2PmBcbiAgICAgICAgfSlcblxuICAgICAgICBzZWxjdFByb2plY3ROb3RlLmluc2VydEJlZm9yZShzaG93UHJvamVjdFNlY3Rpb24scHJvamVjdEFyZWEpXG5cbiAgICB9LFxuXG4gICAgcmVtb3ZlVGFza0lucHV0Qm94KGVsZW1lbnQsY2xhc3NOYW1lKXtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGAke2NsYXNzTmFtZX1gKVxuICAgIH0sXG5cbiAgICB0YXJnZXRJc0RvbmUoZXZlbnRPYmplY3Qpe1xuICAgICAgICBpZihldmVudE9iamVjdC50YXJnZXQuaWQgPT09ICdQcm9qZWN0TmFtZScpe1xuICAgICAgICAgICBjb25zdCBwYXJlbnRUYXJnID0gZXZlbnRPYmplY3QudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudFxuICAgICAgICAgICAgY29uc3QgZWxlbWVudElkID0gZXZlbnRPYmplY3QudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWRcbiAgICAgICAgICAgdGhpcy53YWl0QW5kUmVtb3ZlKHBhcmVudFRhcmcsZWxlbWVudElkLDIwMDApXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgd2FpdEFuZFJlbW92ZShlbGVtZW50LGVsZW1lbnRJZCx0aW1lKXtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpXG4gICAgICAgICAgICB0aGlzLnRvZG9MaXN0LmZvckVhY2goKHRvZG8pPT57XG5cbiAgICAgICAgICAgICAgICBpZih0b2RvLmlkID09PSBwYXJzZUludChlbGVtZW50SWQpKXtcbiAgICAgICAgICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLnRvZG9MaXN0LmluZGV4T2YodG9kbylcbiAgICAgICAgICAgICAgICAgICB0aGlzLnRvZG9MaXN0LnNwbGljZShpZHgsMSlcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy50b2RvTGlzdClcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9LHRpbWUpXG4gICAgfVxufVxuXG4vL1RvZG8gb2JqZWN0IHRoYXQgaGFuZGxlcyBhcHBsaWNhdGlvbiBsb2dpY1xuY29uc3QgVG9kbyA9IHtcbiAgICBwcm9qZWN0TGlzdDogW10sXG5cbiAgICB0b2RvTGlzdDogW10sXG5cbiAgICBpbml0VG9kb0l0ZW1zKG5vdGVzLGRhdGUscHJvakNob2ljZSl7XG4gICAgICAgIGNvbnN0IHRlbXBPYmogPSB7IH1cbiAgICAgICAgdGVtcE9iai5ub3RlcyA9IG5vdGVzXG4gICAgICAgIHRlbXBPYmouZGF0ZSA9IGRhdGVcbiAgICAgICAgdGVtcE9iai5wcm9qQ2hvaWNlID0gcHJvakNob2ljZVxuICAgICAgICB0ZW1wT2JqLmlkID0gdGhpcy5nZW5lcmF0ZUNvZGVGb3JFbGVtZW50cygpXG4gICAgICAgIHRoaXMudG9kb0xpc3QucHVzaCh0ZW1wT2JqKVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMudG9kb0xpc3QpXG4gICAgfSxcblxuICAgIGFkZFByb2plY3RzKHByb2plY3Qpe1xuICAgICAgICB0aGlzLnByb2plY3RMaXN0LnB1c2gocHJvamVjdClcbiAgICB9LFxuXG4gICAgcmVtb3ZlSXRlbUZyb21Qcm9qZWN0KHRleHQpe1xuICAgICAgICB0aGlzLnByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgIGlmKHRleHQgPT09IHByb2plY3Qpe1xuICAgICAgICAgICAgICAgIGNvbnN0IGlkeCA9IHRoaXMucHJvamVjdExpc3QuaW5kZXhPZihwcm9qZWN0KVxuICAgICAgICAgICAgICAgIHRoaXMucHJvamVjdExpc3Quc3BsaWNlKGlkeCwxKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZUNvZGVGb3JFbGVtZW50cygpe1xuICAgICAgICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTAwMClcbiAgICB9XG5cbn1cblxuT2JqZWN0LnNldFByb3RvdHlwZU9mKFVJQ29udHJvbGxlcixUb2RvKVxuXG5jb25zdCB0b2RvQXBwID0gZnVuY3Rpb24oKXtcblxuICAgIGNvbnN0IG15VUkgPSBPYmplY3QuY3JlYXRlKFVJQ29udHJvbGxlcilcbiAgICBjb25zdCBteVRvZG8gPSBPYmplY3QuY3JlYXRlKFRvZG8pXG5cbiAgICBjb25zdCBhZGRQcm9qQnRuID0gbXlVSS5zZWxlY3RFbGVtZW50KCdoZWFkZXItaWNvbicpXG4gICAgYWRkUHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCBub3RlQm94ID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qLWFyZWEnKVxuICAgICAgICBteVVJLmRpc3BsYXlUZXh0Qm94KG5vdGVCb3gsJ2FjdGl2ZS1ibG9jaycpICAgICAgIFxuICAgIH0pXG5cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3RCdG4gPSBteVVJLnNlbGVjdEVsZW1lbnQoJ3Byb2plY3QtaWNvbicpXG4gICAgY3JlYXRlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCBhZGRQcm9qZWN0SW5wdXRUZXh0ID0gbXlVSS5zZWxlY3RFbGVtZW50KCdhZGQtcHJvai1pbnB1dCcpXG4gICAgICAgIG15VUkuYWRkQ2xhc3NUb0VsZW1lbnQoYWRkUHJvamVjdElucHV0VGV4dCwnc2hvdycpXG4gICAgfSlcblxuXG4gICAgY29uc3QgaW5wdXRBZGRCdXR0b24gPSBteVVJLnNlbGVjdEVsZW1lbnQoJ2FkZC1idG4taW5wdXQnKVxuICAgIGlucHV0QWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHRJbnB1dCA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvamVjdCcpXG4gICAgICAgIG15VG9kby5hZGRQcm9qZWN0cyh0ZXh0SW5wdXQudmFsdWUpXG4gICAgICAgIGNvbnN0IHNlbGVjdFByb2plY3RDb250YWluZXIgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ3Byb2otd3JhcCcpXG4gICAgICAgIG15VUkuY3JlYXRlUHJvamVjdExpc3Qoc2VsZWN0UHJvamVjdENvbnRhaW5lcix0ZXh0SW5wdXQpXG5cbiAgICAgICAgY29uc3QgcHJvamVjdExpc3RDb250YWluZXIgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ3Byb2plY3QtY2hvaWNlJylcbiAgICAgICAgbXlVSS5jcmVhdGVMaXN0UHJvamVjdChwcm9qZWN0TGlzdENvbnRhaW5lcilcbiAgICAgICBcbiAgICB9KVxuXG4gICAgY29uc3QgaW5wdXRDYW5jZWxCdXR0b24gPSBteVVJLnNlbGVjdEVsZW1lbnQoJ2NhbmNlbC1idG4taW5wdXQnKVxuICAgIGlucHV0Q2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RJbnB1dFRleHQgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ2FkZC1wcm9qLWlucHV0JylcbiAgICAgICAgbXlVSS5yZW1vdmVDbGFzc0Zyb21FbGVtZW50KGFkZFByb2plY3RJbnB1dFRleHQsJ3Nob3cnKVxuICAgIH0pIFxuICAgIFxuICAgIGNvbnN0IGFsbFByb2plY3RzQ29udGFpbmVyID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qLXdyYXAnKVxuICAgIGFsbFByb2plY3RzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZXZlbnQpPT57XG4gICAgICAgIG15VUkucmVtb3ZlUHJvamVjdChldmVudCwnZGVsLWJ1dHRvbicpXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0Q29udGFpbmVyID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qZWN0LWNob2ljZScpXG4gICAgICAgIG15VUkuY3JlYXRlTGlzdFByb2plY3QocHJvamVjdExpc3RDb250YWluZXIpIFxuICAgIH0pXG5cbiAgICBjb25zdCBjcmVhdGVUYXNrQnRuID0gbXlVSS5zZWxlY3RFbGVtZW50KCdhZGRCdG4nKVxuICAgIGNyZWF0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgY29uc3Qgbm90ZUFyZWEgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ25vdGVzJylcbiAgICAgICAgY29uc3Qgc2NoZWR1bGVBcmVhID0gbXlVSS5zZWxlY3RFbGVtZW50KCdzY2hlZHVsZScpXG4gICAgICAgIGNvbnN0IHByb2pDaG9pY2VBcmVhID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qZWN0LWNob2ljZScpXG5cbiAgICAgICAgbXlUb2RvLmluaXRUb2RvSXRlbXMobm90ZUFyZWEudmFsdWUsc2NoZWR1bGVBcmVhLnZhbHVlLHByb2pDaG9pY2VBcmVhLnZhbHVlKVxuXG4gICAgICAgIG15VUkuc2hvd1Byb2plY3RJblRoZURvbSgpXG5cbiAgICAgICAgbXlVSS5jbGVhcklucHV0QXJlYShbbm90ZUFyZWEsc2NoZWR1bGVBcmVhLHByb2pDaG9pY2VBcmVhXSlcbiAgICAgICAgXG4gICAgfSlcblxuICAgIGNvbnN0IGNhbmNlbFRhc2tCdG4gPSBteVVJLnNlbGVjdEVsZW1lbnQoJ2NhbmNlbEJ0bicpXG5cbiAgICBjYW5jZWxUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG5cbiAgICAgICAgY29uc3Qgbm90ZUJveCA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvai1hcmVhJylcbiAgICAgICAgXG4gICAgICAgIG15VUkucmVtb3ZlVGFza0lucHV0Qm94KG5vdGVCb3gsJ2FjdGl2ZS1ibG9jaycpXG4gICAgfSlcblxuICAgIGNvbnN0IHByb2plY3ROb3RlQ29udGFpbmVyID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qZWN0LW5vdGVzJylcbiAgICBwcm9qZWN0Tm90ZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGV2ZW50KSA9PiB7XG5cbiAgICAgICAgbXlVSS50YXJnZXRJc0RvbmUoZXZlbnQpXG4gICAgfSlcblxufVxuXG50b2RvQXBwKClcblxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=