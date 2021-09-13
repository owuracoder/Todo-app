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

        if(this.todoList.length > 0){

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
        }

    },

    removeTaskInputBox(element,className){
        element.classList.remove(`${className}`)
    },

    targetIsDone(eventObject){
        if(eventObject.target.id === 'ProjectName'){
            const mainParentTarg = eventObject.target.parentElement.parentElement
           const parentTarg = eventObject.target.parentElement
           const siblingElement  = eventObject.target.parentElement.nextElementSibling
            const elementId = eventObject.target.parentElement.id
           this.waitAndRemove(mainParentTarg,parentTarg,siblingElement,elementId,2000)
        }
    },

    waitAndRemove(mainParent,parentTarg,siblingElement,elementId,time){
        setTimeout(() => {
            if(mainParent.childElementCount == 2){
                parentTarg.remove()
                siblingElement.remove()
                mainParent.remove()
            }else {
                parentTarg.remove()
                siblingElement.remove()
            }

            this.todoList.forEach((todo)=>{

                if(todo.id === parseInt(elementId)){
                   const idx = this.todoList.indexOf(todo)
                   this.todoList.splice(idx,1)
                   localStorage.setItem('todo',JSON.stringify(this.todoList))
                }
            })
        },time)
    }
}

//Todo object that handles application logic
const Todo = {
    projectList: [],

    todoList: [],

    defaultProj: {
        value: 'Personal'
    },

    initTodoItems(notes,date,projChoice){
        const tempObj = { }
        tempObj.notes = notes
        tempObj.date = date
        tempObj.projChoice = projChoice
        tempObj.id = this.generateCodeForElements()
        this.todoList.push(tempObj)
        localStorage.setItem('todo',JSON.stringify(this.todoList))
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

//local storage
const persistData = {
    getTodoFromStorage(){
        const fromStorage = JSON.parse(localStorage.getItem('todo'))

        if(fromStorage !== null){
            fromStorage.forEach((obj)=>{
                this.todoList.push(obj)
            })
            
        }else {
            this.todoList = []
        }
        
    },
}

Object.setPrototypeOf(UIController,Todo)
Object.setPrototypeOf(persistData,Todo)


const todoApp = function(){
    const myLocalStorage = Object.create(persistData)
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

    window.addEventListener('load',() => {
       myLocalStorage.getTodoFromStorage()
       myUI.showProjectInTheDom()

       const selectProjectContainer = myUI.selectElement('proj-wrap')
       myTodo.addProjects(myTodo.defaultProj.value)
       myUI.createProjectList(selectProjectContainer,myTodo.defaultProj)

       const projectListContainer = myUI.selectElement('project-choice')
       myUI.createListProject(projectListContainer)
    })

}

todoApp()






/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxRQUFRO0FBQ25ELG9DQUFvQyxRQUFROztBQUU1QztBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLGdCQUFnQjtBQUM3RDtBQUNBLDhFQUE4RSxRQUFRO0FBQ3RGO0FBQ0Esa0ZBQWtGLFdBQVc7QUFDN0Y7QUFDQTtBQUNBLHNCQUFzQixVQUFVO0FBQ2hDO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOztBQUVMO0FBQ0Esb0NBQW9DLFVBQVU7QUFDOUMsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vVUkgY29udHJvbGxlciB0aGF0IGhhbmRsZXMgYWxsIERvbSBzdHVmZnNcbmNvbnN0IFVJQ29udHJvbGxlciA9IHtcbiAgICBzZWxlY3RFbGVtZW50KGVsZW1lbnRJZCl7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpXG4gICAgfSxcblxuICAgIGRpc3BsYXlUZXh0Qm94KGVsZW1lbnQsYWN0aXZlQ2xhc3Mpe1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYWN0aXZlQ2xhc3MpXG4gICAgfSxcblxuICAgIGFkZENsYXNzVG9FbGVtZW50KGVsZW1lbnQsY2xhc3NOYW1lKXtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSlcbiAgICB9LFxuXG4gICAgY3JlYXRlUHJvamVjdExpc3QocHJvamVjdENvbnRhaW5lcix1c2VySW5wdXQpe1xuICAgICAgICBpZih1c2VySW5wdXQudmFsdWUgIT0gJycpe1xuICAgICAgICAgICAgY29uc3QgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIG5ld0Rpdi5jbGFzc0xpc3QuYWRkKCdjaXJjbGUnKVxuICAgICAgICAgICAgbmV3RGl2LnN0eWxlLmJhY2tncm91bmQgPSB0aGlzLmdlbmVyYXRlRHluYW1pY0NvbG9ycygpXG4gICAgXG4gICAgICAgICAgICBjb25zdCBjaXJsZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY2lybGVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2NpcmNsZXMtd3JhcHBlcicpXG4gICAgICAgICAgICBjaXJsZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZGVsLWJ1dHRvbicpXG4gICAgXG4gICAgICAgICAgICBjb25zdCBjaXJjbGVIZWFkICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICAgICAgICAgIGNpcmNsZUhlYWQuY2xhc3NMaXN0LmFkZCgnY2lyY2xlLWhlYWQnKVxuICAgICAgICAgICAgY2lyY2xlSGVhZC50ZXh0Q29udGVudCA9IGAke3VzZXJJbnB1dC52YWx1ZX1gXG4gICAgICAgICAgIFxuICAgICAgICAgICAgY2lybGVXcmFwcGVyLmFwcGVuZENoaWxkKG5ld0RpdilcbiAgICAgICAgICAgIGNpcmxlV3JhcHBlci5hcHBlbmRDaGlsZChjaXJjbGVIZWFkKVxuICAgIFxuICAgICAgICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChjaXJsZVdyYXBwZXIpXG4gICAgXG4gICAgICAgICAgICB1c2VySW5wdXQudmFsdWUgPSAnJ1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUNsYXNzRnJvbUVsZW1lbnQoZWxlbWVudCxjbGFzc05hbWUpe1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgICAgICBcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVEeW5hbWljQ29sb3JzKCl7XG4gICAgICAgIGxldCByYW5kb21Db2xvciA9ICcjJytNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTY3NzcyMTUpLnRvU3RyaW5nKDE2KTtcbiAgICAgICByZXR1cm4gcmFuZG9tQ29sb3I7XG4gICAgfSxcblxuICAgIHJlbW92ZVByb2plY3QoZXZlbnRPYmplY3QsY2xhc3NJZGVudGlmaWVyKXtcblxuICAgICAgICBpZihldmVudE9iamVjdC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzSWRlbnRpZmllcikpe1xuICAgICAgICAgICAgZXZlbnRPYmplY3QudGFyZ2V0LnJlbW92ZSgpXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gZXZlbnRPYmplY3QudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW1Gcm9tUHJvamVjdCh0ZXh0KVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZUxpc3RQcm9qZWN0KHByb2plY3RDb250YWluZXIpe1xuICAgICAgICB0aGlzLmNsZWFyQWxsRWxlbWVudHMocHJvamVjdENvbnRhaW5lcilcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsYCR7cHJvamVjdH1gKVxuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gYCR7cHJvamVjdH1gXG5cbiAgICAgICAgICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQob3B0aW9uKVxuICAgICAgICB9KVxuICAgICAgICAgICBcbiAgICB9LFxuXG4gICAgY2xlYXJBbGxFbGVtZW50cyhFbGVtZW50UGFyZW50KXtcbiAgICAgICAgRWxlbWVudFBhcmVudC5pbm5lckhUTUwgPSAnJ1xuICAgIH0sXG5cbiAgICBjbGVhcklucHV0QXJlYShlbGVtZW50cyl7XG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSAnJ1xuICAgICAgICB9KVxuICAgIH0sXG5cbiAgICBzaG93UHJvamVjdEluVGhlRG9tKCl7XG4gICAgICAgIGNvbnN0IHNlbGN0UHJvamVjdE5vdGUgPSB0aGlzLnNlbGVjdEVsZW1lbnQoJ3Byb2plY3Qtbm90ZXMnKVxuXG4gICAgICAgIGNvbnN0IHByb2plY3RBcmVhID0gdGhpcy5zZWxlY3RFbGVtZW50KCdwcm9qLWFyZWEnKVxuXG4gICAgICAgIGNvbnN0IHNob3dQcm9qZWN0U2VjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgIHNob3dQcm9qZWN0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdzaG93LXByb2plY3RzLXNlY3Rpb24nKVxuXG5cbiAgICAgICAgY29uc3Qgc2VsY3RQcm9qZWN0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG93LXByb2plY3RzLXNlY3Rpb24nKVxuXG4gICAgICAgIGlmKHNlbGN0UHJvamVjdFNlY3Rpb24pe1xuICAgICAgICAgICAgc2VsY3RQcm9qZWN0U2VjdGlvbi5yZW1vdmUoKVxuICAgICAgICB9IFxuXG4gICAgICAgIGlmKHRoaXMudG9kb0xpc3QubGVuZ3RoID4gMCl7XG5cbiAgICAgICAgICAgIHRoaXMudG9kb0xpc3QuZm9yRWFjaCgodG9kbykgPT4ge1xuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIGNvbnN0IHByb2plY3RIZWFkID0gdGhpcy5zZWxlY3RFbGVtZW50KCdwcm9qLXR5cGUtaGVhZCcpXG4gICAgICAgICAgICAgICAgcHJvamVjdEhlYWQudGV4dENvbnRlbnQgPSBgJHt0b2RvLnByb2pDaG9pY2V9YFxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHNob3dQcm9qZWN0U2VjdGlvbi5pbm5lckhUTUwgKz0gYDxkaXYgY2xhc3M9XCJ0b2RvLW5vdGVcIiBpZD1cIiR7dG9kby5pZH1cIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInByb2plY3ROYW1lXCIgaWQ9XCJQcm9qZWN0TmFtZVwiIGNsYXNzPVwicHJvamVjdENoZWNrQm94XCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwicHJvamVjdExhYmVsXCIgaWQ9XCJwcm9qZWN0TGFiZWxcIiBmb3I9XCJwcm9qZWN0TmFtZVwiPiR7dG9kby5ub3Rlc308L2xhYmVsPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1kYXRlIHNob3ctZGF0ZS1pY29uXCI+XG4gICAgICAgICAgICAgICAgPGgzPiR7dG9kby5kYXRlfTwvaDM+XG4gICAgICAgICAgICA8L2Rpdj5gXG4gICAgICAgICAgICB9KVxuICAgIFxuICAgICAgICAgICAgc2VsY3RQcm9qZWN0Tm90ZS5pbnNlcnRCZWZvcmUoc2hvd1Byb2plY3RTZWN0aW9uLHByb2plY3RBcmVhKVxuICAgICAgICB9XG5cbiAgICB9LFxuXG4gICAgcmVtb3ZlVGFza0lucHV0Qm94KGVsZW1lbnQsY2xhc3NOYW1lKXtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGAke2NsYXNzTmFtZX1gKVxuICAgIH0sXG5cbiAgICB0YXJnZXRJc0RvbmUoZXZlbnRPYmplY3Qpe1xuICAgICAgICBpZihldmVudE9iamVjdC50YXJnZXQuaWQgPT09ICdQcm9qZWN0TmFtZScpe1xuICAgICAgICAgICAgY29uc3QgbWFpblBhcmVudFRhcmcgPSBldmVudE9iamVjdC50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50XG4gICAgICAgICAgIGNvbnN0IHBhcmVudFRhcmcgPSBldmVudE9iamVjdC50YXJnZXQucGFyZW50RWxlbWVudFxuICAgICAgICAgICBjb25zdCBzaWJsaW5nRWxlbWVudCAgPSBldmVudE9iamVjdC50YXJnZXQucGFyZW50RWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmdcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnRJZCA9IGV2ZW50T2JqZWN0LnRhcmdldC5wYXJlbnRFbGVtZW50LmlkXG4gICAgICAgICAgIHRoaXMud2FpdEFuZFJlbW92ZShtYWluUGFyZW50VGFyZyxwYXJlbnRUYXJnLHNpYmxpbmdFbGVtZW50LGVsZW1lbnRJZCwyMDAwKVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIHdhaXRBbmRSZW1vdmUobWFpblBhcmVudCxwYXJlbnRUYXJnLHNpYmxpbmdFbGVtZW50LGVsZW1lbnRJZCx0aW1lKXtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBpZihtYWluUGFyZW50LmNoaWxkRWxlbWVudENvdW50ID09IDIpe1xuICAgICAgICAgICAgICAgIHBhcmVudFRhcmcucmVtb3ZlKClcbiAgICAgICAgICAgICAgICBzaWJsaW5nRWxlbWVudC5yZW1vdmUoKVxuICAgICAgICAgICAgICAgIG1haW5QYXJlbnQucmVtb3ZlKClcbiAgICAgICAgICAgIH1lbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRUYXJnLnJlbW92ZSgpXG4gICAgICAgICAgICAgICAgc2libGluZ0VsZW1lbnQucmVtb3ZlKClcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5mb3JFYWNoKCh0b2RvKT0+e1xuXG4gICAgICAgICAgICAgICAgaWYodG9kby5pZCA9PT0gcGFyc2VJbnQoZWxlbWVudElkKSl7XG4gICAgICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy50b2RvTGlzdC5pbmRleE9mKHRvZG8pXG4gICAgICAgICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5zcGxpY2UoaWR4LDEpXG4gICAgICAgICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ3RvZG8nLEpTT04uc3RyaW5naWZ5KHRoaXMudG9kb0xpc3QpKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0sdGltZSlcbiAgICB9XG59XG5cbi8vVG9kbyBvYmplY3QgdGhhdCBoYW5kbGVzIGFwcGxpY2F0aW9uIGxvZ2ljXG5jb25zdCBUb2RvID0ge1xuICAgIHByb2plY3RMaXN0OiBbXSxcblxuICAgIHRvZG9MaXN0OiBbXSxcblxuICAgIGRlZmF1bHRQcm9qOiB7XG4gICAgICAgIHZhbHVlOiAnUGVyc29uYWwnXG4gICAgfSxcblxuICAgIGluaXRUb2RvSXRlbXMobm90ZXMsZGF0ZSxwcm9qQ2hvaWNlKXtcbiAgICAgICAgY29uc3QgdGVtcE9iaiA9IHsgfVxuICAgICAgICB0ZW1wT2JqLm5vdGVzID0gbm90ZXNcbiAgICAgICAgdGVtcE9iai5kYXRlID0gZGF0ZVxuICAgICAgICB0ZW1wT2JqLnByb2pDaG9pY2UgPSBwcm9qQ2hvaWNlXG4gICAgICAgIHRlbXBPYmouaWQgPSB0aGlzLmdlbmVyYXRlQ29kZUZvckVsZW1lbnRzKClcbiAgICAgICAgdGhpcy50b2RvTGlzdC5wdXNoKHRlbXBPYmopXG4gICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b2RvJyxKU09OLnN0cmluZ2lmeSh0aGlzLnRvZG9MaXN0KSlcbiAgICB9LFxuXG4gICAgYWRkUHJvamVjdHMocHJvamVjdCl7XG4gICAgICAgIHRoaXMucHJvamVjdExpc3QucHVzaChwcm9qZWN0KVxuICAgIH0sXG5cbiAgICByZW1vdmVJdGVtRnJvbVByb2plY3QodGV4dCl7XG4gICAgICAgIHRoaXMucHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCkgPT4ge1xuICAgICAgICAgICAgaWYodGV4dCA9PT0gcHJvamVjdCl7XG4gICAgICAgICAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5wcm9qZWN0TGlzdC5pbmRleE9mKHByb2plY3QpXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9qZWN0TGlzdC5zcGxpY2UoaWR4LDEpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIGdlbmVyYXRlQ29kZUZvckVsZW1lbnRzKCl7XG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDAwKVxuICAgIH1cblxufVxuXG4vL2xvY2FsIHN0b3JhZ2VcbmNvbnN0IHBlcnNpc3REYXRhID0ge1xuICAgIGdldFRvZG9Gcm9tU3RvcmFnZSgpe1xuICAgICAgICBjb25zdCBmcm9tU3RvcmFnZSA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oJ3RvZG8nKSlcblxuICAgICAgICBpZihmcm9tU3RvcmFnZSAhPT0gbnVsbCl7XG4gICAgICAgICAgICBmcm9tU3RvcmFnZS5mb3JFYWNoKChvYmopPT57XG4gICAgICAgICAgICAgICAgdGhpcy50b2RvTGlzdC5wdXNoKG9iailcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICBcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b2RvTGlzdCA9IFtdXG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSxcbn1cblxuT2JqZWN0LnNldFByb3RvdHlwZU9mKFVJQ29udHJvbGxlcixUb2RvKVxuT2JqZWN0LnNldFByb3RvdHlwZU9mKHBlcnNpc3REYXRhLFRvZG8pXG5cblxuY29uc3QgdG9kb0FwcCA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgbXlMb2NhbFN0b3JhZ2UgPSBPYmplY3QuY3JlYXRlKHBlcnNpc3REYXRhKVxuICAgIGNvbnN0IG15VUkgPSBPYmplY3QuY3JlYXRlKFVJQ29udHJvbGxlcilcbiAgICBjb25zdCBteVRvZG8gPSBPYmplY3QuY3JlYXRlKFRvZG8pXG5cbiAgICBjb25zdCBhZGRQcm9qQnRuID0gbXlVSS5zZWxlY3RFbGVtZW50KCdoZWFkZXItaWNvbicpXG4gICAgYWRkUHJvakJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCBub3RlQm94ID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qLWFyZWEnKVxuICAgICAgICBteVVJLmRpc3BsYXlUZXh0Qm94KG5vdGVCb3gsJ2FjdGl2ZS1ibG9jaycpICAgICAgIFxuICAgIH0pXG5cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3RCdG4gPSBteVVJLnNlbGVjdEVsZW1lbnQoJ3Byb2plY3QtaWNvbicpXG4gICAgY3JlYXRlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCBhZGRQcm9qZWN0SW5wdXRUZXh0ID0gbXlVSS5zZWxlY3RFbGVtZW50KCdhZGQtcHJvai1pbnB1dCcpXG4gICAgICAgIG15VUkuYWRkQ2xhc3NUb0VsZW1lbnQoYWRkUHJvamVjdElucHV0VGV4dCwnc2hvdycpXG4gICAgfSlcblxuXG4gICAgY29uc3QgaW5wdXRBZGRCdXR0b24gPSBteVVJLnNlbGVjdEVsZW1lbnQoJ2FkZC1idG4taW5wdXQnKVxuICAgIGlucHV0QWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHRJbnB1dCA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvamVjdCcpXG4gICAgICAgIG15VG9kby5hZGRQcm9qZWN0cyh0ZXh0SW5wdXQudmFsdWUpXG4gICAgICAgIGNvbnN0IHNlbGVjdFByb2plY3RDb250YWluZXIgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ3Byb2otd3JhcCcpXG4gICAgICAgIG15VUkuY3JlYXRlUHJvamVjdExpc3Qoc2VsZWN0UHJvamVjdENvbnRhaW5lcix0ZXh0SW5wdXQpXG5cbiAgICAgICAgY29uc3QgcHJvamVjdExpc3RDb250YWluZXIgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ3Byb2plY3QtY2hvaWNlJylcbiAgICAgICAgbXlVSS5jcmVhdGVMaXN0UHJvamVjdChwcm9qZWN0TGlzdENvbnRhaW5lcilcbiAgICAgICBcbiAgICB9KVxuXG4gICAgY29uc3QgaW5wdXRDYW5jZWxCdXR0b24gPSBteVVJLnNlbGVjdEVsZW1lbnQoJ2NhbmNlbC1idG4taW5wdXQnKVxuICAgIGlucHV0Q2FuY2VsQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFkZFByb2plY3RJbnB1dFRleHQgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ2FkZC1wcm9qLWlucHV0JylcbiAgICAgICAgbXlVSS5yZW1vdmVDbGFzc0Zyb21FbGVtZW50KGFkZFByb2plY3RJbnB1dFRleHQsJ3Nob3cnKVxuICAgIH0pIFxuICAgIFxuICAgIGNvbnN0IGFsbFByb2plY3RzQ29udGFpbmVyID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qLXdyYXAnKVxuICAgIGFsbFByb2plY3RzQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZXZlbnQpPT57XG4gICAgICAgIG15VUkucmVtb3ZlUHJvamVjdChldmVudCwnZGVsLWJ1dHRvbicpXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0Q29udGFpbmVyID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qZWN0LWNob2ljZScpXG4gICAgICAgIG15VUkuY3JlYXRlTGlzdFByb2plY3QocHJvamVjdExpc3RDb250YWluZXIpIFxuICAgIH0pXG5cbiAgICBjb25zdCBjcmVhdGVUYXNrQnRuID0gbXlVSS5zZWxlY3RFbGVtZW50KCdhZGRCdG4nKVxuICAgIGNyZWF0ZVRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgY29uc3Qgbm90ZUFyZWEgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ25vdGVzJylcbiAgICAgICAgY29uc3Qgc2NoZWR1bGVBcmVhID0gbXlVSS5zZWxlY3RFbGVtZW50KCdzY2hlZHVsZScpXG4gICAgICAgIGNvbnN0IHByb2pDaG9pY2VBcmVhID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qZWN0LWNob2ljZScpXG5cbiAgICAgICAgbXlUb2RvLmluaXRUb2RvSXRlbXMobm90ZUFyZWEudmFsdWUsc2NoZWR1bGVBcmVhLnZhbHVlLHByb2pDaG9pY2VBcmVhLnZhbHVlKVxuXG4gICAgICAgIG15VUkuc2hvd1Byb2plY3RJblRoZURvbSgpXG5cbiAgICAgICAgbXlVSS5jbGVhcklucHV0QXJlYShbbm90ZUFyZWEsc2NoZWR1bGVBcmVhLHByb2pDaG9pY2VBcmVhXSkgIFxuICAgIH0pXG5cblxuICAgIGNvbnN0IGNhbmNlbFRhc2tCdG4gPSBteVVJLnNlbGVjdEVsZW1lbnQoJ2NhbmNlbEJ0bicpXG4gICAgY2FuY2VsVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCBub3RlQm94ID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qLWFyZWEnKSAgICAgXG4gICAgICAgIG15VUkucmVtb3ZlVGFza0lucHV0Qm94KG5vdGVCb3gsJ2FjdGl2ZS1ibG9jaycpXG4gICAgfSlcblxuXG4gICAgY29uc3QgcHJvamVjdE5vdGVDb250YWluZXIgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ3Byb2plY3Qtbm90ZXMnKVxuICAgIHByb2plY3ROb3RlQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoZXZlbnQpID0+IHtcbiAgICAgICAgbXlVSS50YXJnZXRJc0RvbmUoZXZlbnQpXG4gICAgfSlcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywoKSA9PiB7XG4gICAgICAgbXlMb2NhbFN0b3JhZ2UuZ2V0VG9kb0Zyb21TdG9yYWdlKClcbiAgICAgICBteVVJLnNob3dQcm9qZWN0SW5UaGVEb20oKVxuXG4gICAgICAgY29uc3Qgc2VsZWN0UHJvamVjdENvbnRhaW5lciA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvai13cmFwJylcbiAgICAgICBteVRvZG8uYWRkUHJvamVjdHMobXlUb2RvLmRlZmF1bHRQcm9qLnZhbHVlKVxuICAgICAgIG15VUkuY3JlYXRlUHJvamVjdExpc3Qoc2VsZWN0UHJvamVjdENvbnRhaW5lcixteVRvZG8uZGVmYXVsdFByb2opXG5cbiAgICAgICBjb25zdCBwcm9qZWN0TGlzdENvbnRhaW5lciA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvamVjdC1jaG9pY2UnKVxuICAgICAgIG15VUkuY3JlYXRlTGlzdFByb2plY3QocHJvamVjdExpc3RDb250YWluZXIpXG4gICAgfSlcblxufVxuXG50b2RvQXBwKClcblxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=