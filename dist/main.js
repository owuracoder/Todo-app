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

            showProjectSection.innerHTML += `<div class="todo-note">
            <input type="checkbox" name="projectName" id="ProjectName" class="projectCheckBox">
            <label class="projectLabel" id="projectLabel" for="projectName">${todo.notes}</label>
        </div>
        <div class="todo-date show-date-icon">
            <h3>${todo.date}</h3>
        </div>`
        })

        selctProjectNote.insertBefore(showProjectSection,projectArea)

    },

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

}

todoApp()






/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxRQUFRO0FBQ25ELG9DQUFvQyxRQUFROztBQUU1QztBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUNBQXlDLGdCQUFnQjs7QUFFekQ7QUFDQTtBQUNBLDhFQUE4RSxXQUFXO0FBQ3pGO0FBQ0E7QUFDQSxrQkFBa0IsVUFBVTtBQUM1QjtBQUNBLFNBQVM7O0FBRVQ7O0FBRUEsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG9kby1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy9VSSBjb250cm9sbGVyIHRoYXQgaGFuZGxlcyBhbGwgRG9tIHN0dWZmc1xuY29uc3QgVUlDb250cm9sbGVyID0ge1xuICAgIHNlbGVjdEVsZW1lbnQoZWxlbWVudElkKXtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnRJZClcbiAgICB9LFxuXG4gICAgZGlzcGxheVRleHRCb3goZWxlbWVudCxhY3RpdmVDbGFzcyl7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChhY3RpdmVDbGFzcylcbiAgICB9LFxuXG4gICAgYWRkQ2xhc3NUb0VsZW1lbnQoZWxlbWVudCxjbGFzc05hbWUpe1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKVxuICAgIH0sXG5cbiAgICBjcmVhdGVQcm9qZWN0TGlzdChwcm9qZWN0Q29udGFpbmVyLHVzZXJJbnB1dCl7XG4gICAgICAgIGlmKHVzZXJJbnB1dC52YWx1ZSAhPSAnJyl7XG4gICAgICAgICAgICBjb25zdCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgbmV3RGl2LmNsYXNzTGlzdC5hZGQoJ2NpcmNsZScpXG4gICAgICAgICAgICBuZXdEaXYuc3R5bGUuYmFja2dyb3VuZCA9IHRoaXMuZ2VuZXJhdGVEeW5hbWljQ29sb3JzKClcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IGNpcmxlV3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG4gICAgICAgICAgICBjaXJsZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnY2lyY2xlcy13cmFwcGVyJylcbiAgICAgICAgICAgIGNpcmxlV3JhcHBlci5jbGFzc0xpc3QuYWRkKCdkZWwtYnV0dG9uJylcbiAgICBcbiAgICAgICAgICAgIGNvbnN0IGNpcmNsZUhlYWQgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDMnKVxuICAgICAgICAgICAgY2lyY2xlSGVhZC5jbGFzc0xpc3QuYWRkKCdjaXJjbGUtaGVhZCcpXG4gICAgICAgICAgICBjaXJjbGVIZWFkLnRleHRDb250ZW50ID0gYCR7dXNlcklucHV0LnZhbHVlfWBcbiAgICAgICAgICAgXG4gICAgICAgICAgICBjaXJsZVdyYXBwZXIuYXBwZW5kQ2hpbGQobmV3RGl2KVxuICAgICAgICAgICAgY2lybGVXcmFwcGVyLmFwcGVuZENoaWxkKGNpcmNsZUhlYWQpXG4gICAgXG4gICAgICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNpcmxlV3JhcHBlcilcbiAgICBcbiAgICAgICAgICAgIHVzZXJJbnB1dC52YWx1ZSA9ICcnXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3NGcm9tRWxlbWVudChlbGVtZW50LGNsYXNzTmFtZSl7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZUR5bmFtaWNDb2xvcnMoKXtcbiAgICAgICAgbGV0IHJhbmRvbUNvbG9yID0gJyMnK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxNjc3NzIxNSkudG9TdHJpbmcoMTYpO1xuICAgICAgIHJldHVybiByYW5kb21Db2xvcjtcbiAgICB9LFxuXG4gICAgcmVtb3ZlUHJvamVjdChldmVudE9iamVjdCxjbGFzc0lkZW50aWZpZXIpe1xuXG4gICAgICAgIGlmKGV2ZW50T2JqZWN0LnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NJZGVudGlmaWVyKSl7XG4gICAgICAgICAgICBldmVudE9iamVjdC50YXJnZXQucmVtb3ZlKClcbiAgICAgICAgICAgIGNvbnN0IHRleHQgPSBldmVudE9iamVjdC50YXJnZXQudGV4dENvbnRlbnRcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlSXRlbUZyb21Qcm9qZWN0KHRleHQpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgY3JlYXRlTGlzdFByb2plY3QocHJvamVjdENvbnRhaW5lcil7XG4gICAgICAgIHRoaXMuY2xlYXJBbGxFbGVtZW50cyhwcm9qZWN0Q29udGFpbmVyKVxuICAgICAgICB0aGlzLnByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ29wdGlvbicpXG4gICAgICAgICAgICBvcHRpb24uc2V0QXR0cmlidXRlKFwidmFsdWVcIixgJHtwcm9qZWN0fWApXG4gICAgICAgICAgICBvcHRpb24udGV4dENvbnRlbnQgPSBgJHtwcm9qZWN0fWBcblxuICAgICAgICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChvcHRpb24pXG4gICAgICAgIH0pXG4gICAgICAgICAgIFxuICAgIH0sXG5cbiAgICBjbGVhckFsbEVsZW1lbnRzKEVsZW1lbnRQYXJlbnQpe1xuICAgICAgICBFbGVtZW50UGFyZW50LmlubmVySFRNTCA9ICcnXG4gICAgfSxcblxuICAgIGNsZWFySW5wdXRBcmVhKGVsZW1lbnRzKXtcbiAgICAgICAgZWxlbWVudHMuZm9yRWFjaCgoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgZWxlbWVudC52YWx1ZSA9ICcnXG4gICAgICAgIH0pXG4gICAgfSxcblxuICAgIHNob3dQcm9qZWN0SW5UaGVEb20oKXtcbiAgICAgICAgY29uc3Qgc2VsY3RQcm9qZWN0Tm90ZSA9IHRoaXMuc2VsZWN0RWxlbWVudCgncHJvamVjdC1ub3RlcycpXG5cbiAgICAgICAgY29uc3QgcHJvamVjdEFyZWEgPSB0aGlzLnNlbGVjdEVsZW1lbnQoJ3Byb2otYXJlYScpXG5cbiAgICAgICAgY29uc3Qgc2hvd1Byb2plY3RTZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgc2hvd1Byb2plY3RTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3Nob3ctcHJvamVjdHMtc2VjdGlvbicpXG5cbiAgICAgICAgY29uc3Qgc2VsY3RQcm9qZWN0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaG93LXByb2plY3RzLXNlY3Rpb24nKVxuXG4gICAgICAgIGlmKHNlbGN0UHJvamVjdFNlY3Rpb24pe1xuICAgICAgICAgICAgc2VsY3RQcm9qZWN0U2VjdGlvbi5yZW1vdmUoKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy50b2RvTGlzdC5mb3JFYWNoKCh0b2RvKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0SGVhZCA9IHRoaXMuc2VsZWN0RWxlbWVudCgncHJvai10eXBlLWhlYWQnKVxuICAgICAgICAgICAgcHJvamVjdEhlYWQudGV4dENvbnRlbnQgPSBgJHt0b2RvLnByb2pDaG9pY2V9YFxuXG4gICAgICAgICAgICBzaG93UHJvamVjdFNlY3Rpb24uaW5uZXJIVE1MICs9IGA8ZGl2IGNsYXNzPVwidG9kby1ub3RlXCI+XG4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInByb2plY3ROYW1lXCIgaWQ9XCJQcm9qZWN0TmFtZVwiIGNsYXNzPVwicHJvamVjdENoZWNrQm94XCI+XG4gICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJwcm9qZWN0TGFiZWxcIiBpZD1cInByb2plY3RMYWJlbFwiIGZvcj1cInByb2plY3ROYW1lXCI+JHt0b2RvLm5vdGVzfTwvbGFiZWw+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzPVwidG9kby1kYXRlIHNob3ctZGF0ZS1pY29uXCI+XG4gICAgICAgICAgICA8aDM+JHt0b2RvLmRhdGV9PC9oMz5cbiAgICAgICAgPC9kaXY+YFxuICAgICAgICB9KVxuXG4gICAgICAgIHNlbGN0UHJvamVjdE5vdGUuaW5zZXJ0QmVmb3JlKHNob3dQcm9qZWN0U2VjdGlvbixwcm9qZWN0QXJlYSlcblxuICAgIH0sXG5cbn1cblxuLy9Ub2RvIG9iamVjdCB0aGF0IGhhbmRsZXMgYXBwbGljYXRpb24gbG9naWNcbmNvbnN0IFRvZG8gPSB7XG4gICAgcHJvamVjdExpc3Q6IFtdLFxuXG4gICAgdG9kb0xpc3Q6IFtdLFxuXG4gICAgaW5pdFRvZG9JdGVtcyhub3RlcyxkYXRlLHByb2pDaG9pY2Upe1xuICAgICAgICBjb25zdCB0ZW1wT2JqID0geyB9XG4gICAgICAgIHRlbXBPYmoubm90ZXMgPSBub3Rlc1xuICAgICAgICB0ZW1wT2JqLmRhdGUgPSBkYXRlXG4gICAgICAgIHRlbXBPYmoucHJvakNob2ljZSA9IHByb2pDaG9pY2VcblxuICAgICAgICB0aGlzLnRvZG9MaXN0LnB1c2godGVtcE9iailcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRvZG9MaXN0KVxuICAgIH0sXG5cbiAgICBhZGRQcm9qZWN0cyhwcm9qZWN0KXtcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdC5wdXNoKHByb2plY3QpXG4gICAgfSxcblxuICAgIHJlbW92ZUl0ZW1Gcm9tUHJvamVjdCh0ZXh0KXtcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBpZih0ZXh0ID09PSBwcm9qZWN0KXtcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLnByb2plY3RMaXN0LmluZGV4T2YocHJvamVjdClcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RMaXN0LnNwbGljZShpZHgsMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9LFxuXG59XG5cbk9iamVjdC5zZXRQcm90b3R5cGVPZihVSUNvbnRyb2xsZXIsVG9kbylcblxuY29uc3QgdG9kb0FwcCA9IGZ1bmN0aW9uKCl7XG5cbiAgICBjb25zdCBteVVJID0gT2JqZWN0LmNyZWF0ZShVSUNvbnRyb2xsZXIpXG4gICAgY29uc3QgbXlUb2RvID0gT2JqZWN0LmNyZWF0ZShUb2RvKVxuXG4gICAgY29uc3QgYWRkUHJvakJ0biA9IG15VUkuc2VsZWN0RWxlbWVudCgnaGVhZGVyLWljb24nKVxuICAgIGFkZFByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgY29uc3Qgbm90ZUJveCA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvai1hcmVhJylcbiAgICAgICAgbXlVSS5kaXNwbGF5VGV4dEJveChub3RlQm94LCdhY3RpdmUtYmxvY2snKSAgICAgICBcbiAgICB9KVxuXG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0QnRuID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qZWN0LWljb24nKVxuICAgIGNyZWF0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdElucHV0VGV4dCA9IG15VUkuc2VsZWN0RWxlbWVudCgnYWRkLXByb2otaW5wdXQnKVxuICAgICAgICBteVVJLmFkZENsYXNzVG9FbGVtZW50KGFkZFByb2plY3RJbnB1dFRleHQsJ3Nob3cnKVxuICAgIH0pXG5cblxuICAgIGNvbnN0IGlucHV0QWRkQnV0dG9uID0gbXlVSS5zZWxlY3RFbGVtZW50KCdhZGQtYnRuLWlucHV0JylcbiAgICBpbnB1dEFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0SW5wdXQgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ3Byb2plY3QnKVxuICAgICAgICBteVRvZG8uYWRkUHJvamVjdHModGV4dElucHV0LnZhbHVlKVxuICAgICAgICBjb25zdCBzZWxlY3RQcm9qZWN0Q29udGFpbmVyID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qLXdyYXAnKVxuICAgICAgICBteVVJLmNyZWF0ZVByb2plY3RMaXN0KHNlbGVjdFByb2plY3RDb250YWluZXIsdGV4dElucHV0KVxuXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0Q29udGFpbmVyID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qZWN0LWNob2ljZScpXG4gICAgICAgIG15VUkuY3JlYXRlTGlzdFByb2plY3QocHJvamVjdExpc3RDb250YWluZXIpXG4gICAgICAgXG4gICAgfSlcblxuICAgIGNvbnN0IGlucHV0Q2FuY2VsQnV0dG9uID0gbXlVSS5zZWxlY3RFbGVtZW50KCdjYW5jZWwtYnRuLWlucHV0JylcbiAgICBpbnB1dENhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCBhZGRQcm9qZWN0SW5wdXRUZXh0ID0gbXlVSS5zZWxlY3RFbGVtZW50KCdhZGQtcHJvai1pbnB1dCcpXG4gICAgICAgIG15VUkucmVtb3ZlQ2xhc3NGcm9tRWxlbWVudChhZGRQcm9qZWN0SW5wdXRUZXh0LCdzaG93JylcbiAgICB9KSBcbiAgICBcbiAgICBjb25zdCBhbGxQcm9qZWN0c0NvbnRhaW5lciA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvai13cmFwJylcbiAgICBhbGxQcm9qZWN0c0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGV2ZW50KT0+e1xuICAgICAgICBteVVJLnJlbW92ZVByb2plY3QoZXZlbnQsJ2RlbC1idXR0b24nKVxuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdENvbnRhaW5lciA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvamVjdC1jaG9pY2UnKVxuICAgICAgICBteVVJLmNyZWF0ZUxpc3RQcm9qZWN0KHByb2plY3RMaXN0Q29udGFpbmVyKSBcbiAgICB9KVxuXG4gICAgY29uc3QgY3JlYXRlVGFza0J0biA9IG15VUkuc2VsZWN0RWxlbWVudCgnYWRkQnRuJylcbiAgICBjcmVhdGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vdGVBcmVhID0gbXlVSS5zZWxlY3RFbGVtZW50KCdub3RlcycpXG4gICAgICAgIGNvbnN0IHNjaGVkdWxlQXJlYSA9IG15VUkuc2VsZWN0RWxlbWVudCgnc2NoZWR1bGUnKVxuICAgICAgICBjb25zdCBwcm9qQ2hvaWNlQXJlYSA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvamVjdC1jaG9pY2UnKVxuXG4gICAgICAgIG15VG9kby5pbml0VG9kb0l0ZW1zKG5vdGVBcmVhLnZhbHVlLHNjaGVkdWxlQXJlYS52YWx1ZSxwcm9qQ2hvaWNlQXJlYS52YWx1ZSlcblxuICAgICAgICBteVVJLnNob3dQcm9qZWN0SW5UaGVEb20oKVxuXG4gICAgICAgIG15VUkuY2xlYXJJbnB1dEFyZWEoW25vdGVBcmVhLHNjaGVkdWxlQXJlYSxwcm9qQ2hvaWNlQXJlYV0pXG4gICAgICAgIFxuICAgIH0pXG5cbn1cblxudG9kb0FwcCgpXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9