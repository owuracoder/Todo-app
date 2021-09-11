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

        myUI.clearInputArea([noteArea,scheduleArea,projChoiceArea])
        
    })

}

todoApp()






/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsZ0JBQWdCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxRQUFRO0FBQ25ELG9DQUFvQyxRQUFROztBQUU1QztBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLOztBQUVMOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vVUkgY29udHJvbGxlciB0aGF0IGhhbmRsZXMgYWxsIERvbSBzdHVmZnNcbmNvbnN0IFVJQ29udHJvbGxlciA9IHtcbiAgICBzZWxlY3RFbGVtZW50KGVsZW1lbnRJZCl7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpXG4gICAgfSxcblxuICAgIGRpc3BsYXlUZXh0Qm94KGVsZW1lbnQsYWN0aXZlQ2xhc3Mpe1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5hZGQoYWN0aXZlQ2xhc3MpXG4gICAgfSxcblxuICAgIGFkZENsYXNzVG9FbGVtZW50KGVsZW1lbnQsY2xhc3NOYW1lKXtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSlcbiAgICB9LFxuXG4gICAgY3JlYXRlUHJvamVjdExpc3QocHJvamVjdENvbnRhaW5lcix1c2VySW5wdXQpe1xuICAgICAgICBpZih1c2VySW5wdXQudmFsdWUgIT0gJycpe1xuICAgICAgICAgICAgY29uc3QgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgICAgIG5ld0Rpdi5jbGFzc0xpc3QuYWRkKCdjaXJjbGUnKVxuICAgICAgICAgICAgbmV3RGl2LnN0eWxlLmJhY2tncm91bmQgPSB0aGlzLmdlbmVyYXRlRHluYW1pY0NvbG9ycygpXG4gICAgXG4gICAgICAgICAgICBjb25zdCBjaXJsZVdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICAgICAgY2lybGVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2NpcmNsZXMtd3JhcHBlcicpXG4gICAgICAgICAgICBjaXJsZVdyYXBwZXIuY2xhc3NMaXN0LmFkZCgnZGVsLWJ1dHRvbicpXG4gICAgXG4gICAgICAgICAgICBjb25zdCBjaXJjbGVIZWFkICA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gzJylcbiAgICAgICAgICAgIGNpcmNsZUhlYWQuY2xhc3NMaXN0LmFkZCgnY2lyY2xlLWhlYWQnKVxuICAgICAgICAgICAgY2lyY2xlSGVhZC50ZXh0Q29udGVudCA9IGAke3VzZXJJbnB1dC52YWx1ZX1gXG4gICAgICAgICAgIFxuICAgICAgICAgICAgY2lybGVXcmFwcGVyLmFwcGVuZENoaWxkKG5ld0RpdilcbiAgICAgICAgICAgIGNpcmxlV3JhcHBlci5hcHBlbmRDaGlsZChjaXJjbGVIZWFkKVxuICAgIFxuICAgICAgICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChjaXJsZVdyYXBwZXIpXG4gICAgXG4gICAgICAgICAgICB1c2VySW5wdXQudmFsdWUgPSAnJ1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIHJlbW92ZUNsYXNzRnJvbUVsZW1lbnQoZWxlbWVudCxjbGFzc05hbWUpe1xuICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY2xhc3NOYW1lKVxuICAgICAgICBcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVEeW5hbWljQ29sb3JzKCl7XG4gICAgICAgIGxldCByYW5kb21Db2xvciA9ICcjJytNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTY3NzcyMTUpLnRvU3RyaW5nKDE2KTtcbiAgICAgICByZXR1cm4gcmFuZG9tQ29sb3I7XG4gICAgfSxcblxuICAgIHJlbW92ZVByb2plY3QoZXZlbnRPYmplY3QsY2xhc3NJZGVudGlmaWVyKXtcblxuICAgICAgICBpZihldmVudE9iamVjdC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzSWRlbnRpZmllcikpe1xuICAgICAgICAgICAgZXZlbnRPYmplY3QudGFyZ2V0LnJlbW92ZSgpXG4gICAgICAgICAgICBjb25zdCB0ZXh0ID0gZXZlbnRPYmplY3QudGFyZ2V0LnRleHRDb250ZW50XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUl0ZW1Gcm9tUHJvamVjdCh0ZXh0KVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNyZWF0ZUxpc3RQcm9qZWN0KHByb2plY3RDb250YWluZXIpe1xuICAgICAgICB0aGlzLmNsZWFyQWxsRWxlbWVudHMocHJvamVjdENvbnRhaW5lcilcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKVxuICAgICAgICAgICAgb3B0aW9uLnNldEF0dHJpYnV0ZShcInZhbHVlXCIsYCR7cHJvamVjdH1gKVxuICAgICAgICAgICAgb3B0aW9uLnRleHRDb250ZW50ID0gYCR7cHJvamVjdH1gXG5cbiAgICAgICAgICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQob3B0aW9uKVxuICAgICAgICB9KVxuICAgICAgICAgICBcbiAgICB9LFxuXG4gICAgY2xlYXJBbGxFbGVtZW50cyhFbGVtZW50UGFyZW50KXtcbiAgICAgICAgRWxlbWVudFBhcmVudC5pbm5lckhUTUwgPSAnJ1xuICAgIH0sXG5cbiAgICBjbGVhcklucHV0QXJlYShlbGVtZW50cyl7XG4gICAgICAgIGVsZW1lbnRzLmZvckVhY2goKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgIGVsZW1lbnQudmFsdWUgPSAnJ1xuICAgICAgICB9KVxuICAgIH0sXG5cbn1cblxuLy9Ub2RvIG9iamVjdCB0aGF0IGhhbmRsZXMgYXBwbGljYXRpb24gbG9naWNcbmNvbnN0IFRvZG8gPSB7XG4gICAgcHJvamVjdExpc3Q6IFtdLFxuXG4gICAgdG9kb0xpc3Q6IFtdLFxuXG4gICAgaW5pdFRvZG9JdGVtcyhub3RlcyxkYXRlLHByb2pDaG9pY2Upe1xuICAgICAgICBjb25zdCB0ZW1wT2JqID0geyB9XG4gICAgICAgIHRlbXBPYmoubm90ZXMgPSBub3Rlc1xuICAgICAgICB0ZW1wT2JqLmRhdGUgPSBkYXRlXG4gICAgICAgIHRlbXBPYmoucHJvakNob2ljZSA9IHByb2pDaG9pY2VcblxuICAgICAgICB0aGlzLnRvZG9MaXN0LnB1c2godGVtcE9iailcblxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLnRvZG9MaXN0KVxuICAgIH0sXG5cbiAgICBhZGRQcm9qZWN0cyhwcm9qZWN0KXtcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdC5wdXNoKHByb2plY3QpXG4gICAgfSxcblxuICAgIHJlbW92ZUl0ZW1Gcm9tUHJvamVjdCh0ZXh0KXtcbiAgICAgICAgdGhpcy5wcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KSA9PiB7XG4gICAgICAgICAgICBpZih0ZXh0ID09PSBwcm9qZWN0KXtcbiAgICAgICAgICAgICAgICBjb25zdCBpZHggPSB0aGlzLnByb2plY3RMaXN0LmluZGV4T2YocHJvamVjdClcbiAgICAgICAgICAgICAgICB0aGlzLnByb2plY3RMaXN0LnNwbGljZShpZHgsMSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9LFxuXG59XG5cbk9iamVjdC5zZXRQcm90b3R5cGVPZihVSUNvbnRyb2xsZXIsVG9kbylcblxuY29uc3QgdG9kb0FwcCA9IGZ1bmN0aW9uKCl7XG5cbiAgICBjb25zdCBteVVJID0gT2JqZWN0LmNyZWF0ZShVSUNvbnRyb2xsZXIpXG4gICAgY29uc3QgbXlUb2RvID0gT2JqZWN0LmNyZWF0ZShUb2RvKVxuXG4gICAgY29uc3QgYWRkUHJvakJ0biA9IG15VUkuc2VsZWN0RWxlbWVudCgnaGVhZGVyLWljb24nKVxuICAgIGFkZFByb2pCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgY29uc3Qgbm90ZUJveCA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvai1hcmVhJylcbiAgICAgICAgbXlVSS5kaXNwbGF5VGV4dEJveChub3RlQm94LCdhY3RpdmUtYmxvY2snKSAgICAgICBcbiAgICB9KVxuXG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0QnRuID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qZWN0LWljb24nKVxuICAgIGNyZWF0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdElucHV0VGV4dCA9IG15VUkuc2VsZWN0RWxlbWVudCgnYWRkLXByb2otaW5wdXQnKVxuICAgICAgICBteVVJLmFkZENsYXNzVG9FbGVtZW50KGFkZFByb2plY3RJbnB1dFRleHQsJ3Nob3cnKVxuICAgIH0pXG5cblxuICAgIGNvbnN0IGlucHV0QWRkQnV0dG9uID0gbXlVSS5zZWxlY3RFbGVtZW50KCdhZGQtYnRuLWlucHV0JylcbiAgICBpbnB1dEFkZEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZXh0SW5wdXQgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ3Byb2plY3QnKVxuICAgICAgICBteVRvZG8uYWRkUHJvamVjdHModGV4dElucHV0LnZhbHVlKVxuICAgICAgICBjb25zdCBzZWxlY3RQcm9qZWN0Q29udGFpbmVyID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qLXdyYXAnKVxuICAgICAgICBteVVJLmNyZWF0ZVByb2plY3RMaXN0KHNlbGVjdFByb2plY3RDb250YWluZXIsdGV4dElucHV0KVxuXG4gICAgICAgIGNvbnN0IHByb2plY3RMaXN0Q29udGFpbmVyID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qZWN0LWNob2ljZScpXG4gICAgICAgIG15VUkuY3JlYXRlTGlzdFByb2plY3QocHJvamVjdExpc3RDb250YWluZXIpXG4gICAgICAgXG4gICAgfSlcblxuICAgIGNvbnN0IGlucHV0Q2FuY2VsQnV0dG9uID0gbXlVSS5zZWxlY3RFbGVtZW50KCdjYW5jZWwtYnRuLWlucHV0JylcbiAgICBpbnB1dENhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCBhZGRQcm9qZWN0SW5wdXRUZXh0ID0gbXlVSS5zZWxlY3RFbGVtZW50KCdhZGQtcHJvai1pbnB1dCcpXG4gICAgICAgIG15VUkucmVtb3ZlQ2xhc3NGcm9tRWxlbWVudChhZGRQcm9qZWN0SW5wdXRUZXh0LCdzaG93JylcbiAgICB9KSBcbiAgICBcbiAgICBjb25zdCBhbGxQcm9qZWN0c0NvbnRhaW5lciA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvai13cmFwJylcbiAgICBhbGxQcm9qZWN0c0NvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKGV2ZW50KT0+e1xuICAgICAgICBteVVJLnJlbW92ZVByb2plY3QoZXZlbnQsJ2RlbC1idXR0b24nKVxuICAgICAgICBjb25zdCBwcm9qZWN0TGlzdENvbnRhaW5lciA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvamVjdC1jaG9pY2UnKVxuICAgICAgICBteVVJLmNyZWF0ZUxpc3RQcm9qZWN0KHByb2plY3RMaXN0Q29udGFpbmVyKSBcbiAgICB9KVxuXG4gICAgY29uc3QgY3JlYXRlVGFza0J0biA9IG15VUkuc2VsZWN0RWxlbWVudCgnYWRkQnRuJylcbiAgICBjcmVhdGVUYXNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vdGVBcmVhID0gbXlVSS5zZWxlY3RFbGVtZW50KCdub3RlcycpXG4gICAgICAgIGNvbnN0IHNjaGVkdWxlQXJlYSA9IG15VUkuc2VsZWN0RWxlbWVudCgnc2NoZWR1bGUnKVxuICAgICAgICBjb25zdCBwcm9qQ2hvaWNlQXJlYSA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvamVjdC1jaG9pY2UnKVxuXG4gICAgICAgIG15VG9kby5pbml0VG9kb0l0ZW1zKG5vdGVBcmVhLnZhbHVlLHNjaGVkdWxlQXJlYS52YWx1ZSxwcm9qQ2hvaWNlQXJlYS52YWx1ZSlcblxuICAgICAgICBteVVJLmNsZWFySW5wdXRBcmVhKFtub3RlQXJlYSxzY2hlZHVsZUFyZWEscHJvakNob2ljZUFyZWFdKVxuICAgICAgICBcbiAgICB9KVxuXG59XG5cbnRvZG9BcHAoKVxuXG5cblxuXG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==