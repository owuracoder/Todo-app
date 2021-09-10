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
        newDiv.classList.add('circle')
        newDiv.style.background = this.generateDynamicColors()

        const cirleWrapper = document.createElement('div')
        cirleWrapper.classList.add('circles-wrapper')

        const circleHead  = document.createElement('h3')
        circleHead.classList.add('circle-head')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsZ0JBQWdCO0FBQ3BEO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvZG8tYXBwLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vVUkgY29udHJvbGxlciB0aGF0IGhhbmRsZXMgYWxsIERvbSBzdHVmZnNcbmNvbnN0IFVJQ29udHJvbGxlciA9IHtcbiAgICBzZWxlY3RFbGVtZW50KGVsZW1lbnRJZCl7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpXG4gICAgfSxcblxuICAgIGRpc3BsYXlUZXh0Qm94KGVsZW1lbnQpe1xuICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snXG4gICAgfSxcblxuICAgIGFkZENsYXNzVG9FbGVtZW50KGVsZW1lbnQsY2xhc3NOYW1lKXtcbiAgICAgICAgZWxlbWVudC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSlcbiAgICB9LFxuXG4gICAgY3JlYXRlUHJvamVjdExpc3QocHJvamVjdENvbnRhaW5lcix1c2VySW5wdXQpe1xuICAgICAgICBjb25zdCBuZXdEaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuICAgICAgICBuZXdEaXYuY2xhc3NMaXN0LmFkZCgnY2lyY2xlJylcbiAgICAgICAgbmV3RGl2LnN0eWxlLmJhY2tncm91bmQgPSB0aGlzLmdlbmVyYXRlRHluYW1pY0NvbG9ycygpXG5cbiAgICAgICAgY29uc3QgY2lybGVXcmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2JylcbiAgICAgICAgY2lybGVXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ2NpcmNsZXMtd3JhcHBlcicpXG5cbiAgICAgICAgY29uc3QgY2lyY2xlSGVhZCAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMycpXG4gICAgICAgIGNpcmNsZUhlYWQuY2xhc3NMaXN0LmFkZCgnY2lyY2xlLWhlYWQnKVxuICAgICAgICBjaXJjbGVIZWFkLnRleHRDb250ZW50ID0gYCR7dXNlcklucHV0LnZhbHVlfWBcbiAgICAgICBcbiAgICAgICAgY2lybGVXcmFwcGVyLmFwcGVuZENoaWxkKG5ld0RpdilcbiAgICAgICAgY2lybGVXcmFwcGVyLmFwcGVuZENoaWxkKGNpcmNsZUhlYWQpXG5cbiAgICAgICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChjaXJsZVdyYXBwZXIpXG5cbiAgICAgICAgdXNlcklucHV0LnZhbHVlID0gJydcbiAgICB9LFxuXG4gICAgcmVtb3ZlQ2xhc3NGcm9tRWxlbWVudChlbGVtZW50LGNsYXNzTmFtZSl7XG4gICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjbGFzc05hbWUpXG4gICAgICAgIFxuICAgIH0sXG5cbiAgICBnZW5lcmF0ZUR5bmFtaWNDb2xvcnMoKXtcbiAgICAgICAgbGV0IHJhbmRvbUNvbG9yID0gJyMnK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSoxNjc3NzIxNSkudG9TdHJpbmcoMTYpO1xuICAgICAgIHJldHVybiByYW5kb21Db2xvcjtcbiAgICB9XG5cbn1cblxuLy9Ub2RvIG9iamVjdCB0aGF0IGhhbmRsZXMgYXBwbGljYXRpb24gbG9naWNcbmNvbnN0IFRvZG8gPSB7XG5cbn1cblxuY29uc3QgdG9kb0FwcCA9IGZ1bmN0aW9uKCl7XG4gICAgY29uc3QgbXlVSSA9IE9iamVjdC5jcmVhdGUoVUlDb250cm9sbGVyKVxuXG4gICAgY29uc3QgbXlUb2RvID0gT2JqZWN0LmNyZWF0ZShUb2RvKVxuXG4gICAgY29uc3QgYWRkVGFza0J0biA9IG15VUkuc2VsZWN0RWxlbWVudCgnaGVhZGVyLWljb24nKVxuXG4gICAgYWRkVGFza0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCBub3RlQm94ID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qLWFyZWEnKVxuICAgICAgICBteVVJLmRpc3BsYXlUZXh0Qm94KG5vdGVCb3gpXG4gICAgICAgIFxuICAgIH0pXG5cblxuICAgIGNvbnN0IGNyZWF0ZVByb2plY3RCdG4gPSBteVVJLnNlbGVjdEVsZW1lbnQoJ3Byb2plY3QtaWNvbicpXG4gICAgY3JlYXRlUHJvamVjdEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCBhZGRQcm9qZWN0SW5wdXRUZXh0ID0gbXlVSS5zZWxlY3RFbGVtZW50KCdhZGQtcHJvai1pbnB1dCcpXG4gICAgICAgIG15VUkuYWRkQ2xhc3NUb0VsZW1lbnQoYWRkUHJvamVjdElucHV0VGV4dCwnc2hvdycpXG5cbiAgICB9KVxuXG5cbiAgICBjb25zdCBpbnB1dEFkZEJ1dHRvbiA9IG15VUkuc2VsZWN0RWxlbWVudCgnYWRkLWJ0bi1pbnB1dCcpXG4gICAgaW5wdXRBZGRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCgpID0+IHtcbiAgICAgICAgY29uc3QgdGV4dElucHV0ID0gbXlVSS5zZWxlY3RFbGVtZW50KCdwcm9qZWN0JylcbiAgICAgICAgY29uc3Qgc2VsZWN0UHJvamVjdENvbnRhaW5lciA9IG15VUkuc2VsZWN0RWxlbWVudCgncHJvai13cmFwJylcbiAgICAgICAgbXlVSS5jcmVhdGVQcm9qZWN0TGlzdChzZWxlY3RQcm9qZWN0Q29udGFpbmVyLHRleHRJbnB1dClcblxuICAgIH0pXG5cblxuICAgIGNvbnN0IGlucHV0Q2FuY2VsQnV0dG9uID0gbXlVSS5zZWxlY3RFbGVtZW50KCdjYW5jZWwtYnRuLWlucHV0JylcbiAgICBpbnB1dENhbmNlbEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsKCkgPT4ge1xuICAgICAgICBjb25zdCBhZGRQcm9qZWN0SW5wdXRUZXh0ID0gbXlVSS5zZWxlY3RFbGVtZW50KCdhZGQtcHJvai1pbnB1dCcpXG4gICAgICAgIG15VUkucmVtb3ZlQ2xhc3NGcm9tRWxlbWVudChhZGRQcm9qZWN0SW5wdXRUZXh0LCdzaG93JylcbiAgICB9KVxuICAgIFxuICAgIFxufVxuXG50b2RvQXBwKClcblxuXG5cblxuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=