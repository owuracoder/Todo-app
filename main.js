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






/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsZ0JBQWdCO0FBQ3BEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWFwcC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvL1VJIGNvbnRyb2xsZXIgdGhhdCBoYW5kbGVzIGFsbCBEb20gc3R1ZmZzXG5jb25zdCBVSUNvbnRyb2xsZXIgPSB7XG4gICAgc2VsZWN0RWxlbWVudChlbGVtZW50SWQpe1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKVxuICAgIH0sXG5cbiAgICBkaXNwbGF5VGV4dEJveChlbGVtZW50KXtcbiAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJ1xuICAgIH0sXG5cbiAgICBhZGRDbGFzc1RvRWxlbWVudChlbGVtZW50LGNsYXNzTmFtZSl7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpXG4gICAgfSxcblxuICAgIGNyZWF0ZVByb2plY3RMaXN0KHByb2plY3RDb250YWluZXIsdXNlcklucHV0KXtcbiAgICAgICAgY29uc3QgbmV3RGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgbmV3RGl2LmNsYXNzTGlzdC5hZGQoJ2dyYXktY2lyY2xlJylcbiAgICAgICAgbmV3RGl2LnN0eWxlLmJhY2tncm91bmQgPSB0aGlzLmdlbmVyYXRlRHluYW1pY0NvbG9ycygpXG5cbiAgICAgICAgY29uc3QgY2lybGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY2lybGVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2NpcmNsZXMtd3JhcHBlcicpXG5cbiAgICAgICAgY29uc3QgY2lyY2xlSGVhZCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXG4gICAgICAgIGNpcmNsZUhlYWQuY2xhc3NMaXN0LmFkZCgnZ3JheS1jaXJsY2UtaGVhZCcpXG4gICAgICAgIGNpcmNsZUhlYWQudGV4dENvbnRlbnQgPSBgJHt1c2VySW5wdXQudmFsdWV9YFxuICAgICAgIFxuICAgICAgICBjaXJsZVdyYXBwZXIuYXBwZW5kQ2hpbGQobmV3RGl2KVxuICAgICAgICBjaXJsZVdyYXBwZXIuYXBwZW5kQ2hpbGQoY2lyY2xlSGVhZClcblxuICAgICAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKGNpcmxlV3JhcHBlcilcblxuICAgICAgICB1c2VySW5wdXQudmFsdWUgPSAnJ1xuICAgIH0sXG5cbiAgICByZW1vdmVDbGFzc0Zyb21FbGVtZW50KGVsZW1lbnQsY2xhc3NOYW1lKXtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGNsYXNzTmFtZSlcbiAgICB9LFxuXG4gICAgZ2VuZXJhdGVEeW5hbWljQ29sb3JzKCl7XG4gICAgICAgIGxldCByYW5kb21Db2xvciA9ICcjJytNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkqMTY3NzcyMTUpLnRvU3RyaW5nKDE2KTtcbiAgICAgICByZXR1cm4gcmFuZG9tQ29sb3I7XG4gICAgfVxuXG59XG5cbi8vVG9kbyBvYmplY3QgdGhhdCBoYW5kbGVzIGFwcGxpY2F0aW9uIGxvZ2ljXG5jb25zdCBUb2RvID0ge1xuXG59XG5cbmNvbnN0IHRvZG9BcHAgPSBmdW5jdGlvbigpe1xuICAgIGNvbnN0IG15VUkgPSBPYmplY3QuY3JlYXRlKFVJQ29udHJvbGxlcilcblxuICAgIGNvbnN0IG15VG9kbyA9IE9iamVjdC5jcmVhdGUoVG9kbylcblxuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSBteVVJLnNlbGVjdEVsZW1lbnQoJ2hlYWRlci1pY29uJylcblxuICAgIGFkZFRhc2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgY29uc3Qgbm90ZUJveCA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvai1hcmVhJylcbiAgICAgICAgbXlVSS5kaXNwbGF5VGV4dEJveChub3RlQm94KVxuICAgICAgICBcbiAgICB9KVxuXG5cbiAgICBjb25zdCBjcmVhdGVQcm9qZWN0QnRuID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qZWN0LWljb24nKVxuICAgIGNyZWF0ZVByb2plY3RCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdElucHV0VGV4dCA9IG15VUkuc2VsZWN0RWxlbWVudCgnYWRkLXByb2otaW5wdXQnKVxuICAgICAgICBteVVJLmFkZENsYXNzVG9FbGVtZW50KGFkZFByb2plY3RJbnB1dFRleHQsJ3Nob3cnKVxuXG4gICAgfSlcblxuXG4gICAgY29uc3QgaW5wdXRBZGRCdXR0b24gPSBteVVJLnNlbGVjdEVsZW1lbnQoJ2FkZC1idG4taW5wdXQnKVxuICAgIGlucHV0QWRkQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRleHRJbnB1dCA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvamVjdCcpXG4gICAgICAgIGNvbnN0IHNlbGVjdFByb2plY3RDb250YWluZXIgPSBteVVJLnNlbGVjdEVsZW1lbnQoJ3Byb2otd3JhcCcpXG4gICAgICAgIG15VUkuY3JlYXRlUHJvamVjdExpc3Qoc2VsZWN0UHJvamVjdENvbnRhaW5lcix0ZXh0SW5wdXQpXG5cbiAgICB9KVxuXG5cbiAgICBjb25zdCBpbnB1dENhbmNlbEJ1dHRvbiA9IG15VUkuc2VsZWN0RWxlbWVudCgnY2FuY2VsLWJ0bi1pbnB1dCcpXG4gICAgaW5wdXRDYW5jZWxCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgY29uc3QgYWRkUHJvamVjdElucHV0VGV4dCA9IG15VUkuc2VsZWN0RWxlbWVudCgnYWRkLXByb2otaW5wdXQnKVxuICAgICAgICBteVVJLnJlbW92ZUNsYXNzRnJvbUVsZW1lbnQoYWRkUHJvamVjdElucHV0VGV4dCwnc2hvdycpXG4gICAgfSlcbiAgICBcbiAgICBcbn1cblxudG9kb0FwcCgpXG5cblxuXG5cblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9