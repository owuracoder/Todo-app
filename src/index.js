import { format } from 'date-fns'

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

    createProjectList(projectContainer){
        if(projectContainer === undefined){
            projectContainer = this.selectElement('proj-wrap')
        }   
        projectContainer.innerHTML = ''
            this.projectList.forEach((project)=>{
                const numb = this.showNumOfTask(project)
                
                const newDiv = document.createElement('div')
                newDiv.classList.add('circle')
                newDiv.style.background = this.generateDynamicColors()
        
                const cirleWrapper = document.createElement('div')
                cirleWrapper.classList.add('circles-wrapper')
                cirleWrapper.classList.add('del-button')
        
                const circleHead  = document.createElement('h3')
                circleHead.classList.add('circle-head')
                circleHead.textContent = `${project}`

                const span = document.createElement('span')
                span.classList.add('num-task')

                if(numb!= null){
                    span.classList.add('num-task-addon')
                }

                span.innerText = numb

                circleHead.appendChild(span)
               
                cirleWrapper.appendChild(newDiv)
                cirleWrapper.appendChild(circleHead)
        
                projectContainer.appendChild(cirleWrapper)
            })
        
    },

    removeClassFromElement(element,className){
        element.classList.remove(className)
        
    },

    generateDynamicColors(){
        let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
       return randomColor;
    },

    removeProject(eventObject,classIdentifier){

        const selectedElement = eventObject.target

        if(selectedElement.classList.contains(classIdentifier)){
            
            const isDelBtn = window.getComputedStyle(document.querySelector(`.${classIdentifier}`), ':after').getPropertyValue('font-family')

            if (isDelBtn){
                selectedElement.remove()
                const text = selectedElement.innerText
                const lastText = text.length - 1
                this.removeItemFromProject(text)

                const nText = text.replace(text[lastText],'')


                this.removeTaskFromTodo(nText)
                
            }
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

    showProjectInTheDom(todoList){
        const selctProjectNote = this.selectElement('project-notes')

        const projectArea = this.selectElement('proj-area')

        const showProjectSection = document.createElement('div')
        showProjectSection.classList.add('show-projects-section')


        const selctProjectSection = document.querySelector('.show-projects-section')

        if(selctProjectSection){
            selctProjectSection.remove()
        } 

        if(todoList.length > 0){

            todoList.forEach((todo) => {
                const projectHead = this.selectElement('proj-type-head')
                projectHead.textContent = `${todo.projChoice}`
                
                showProjectSection.innerHTML += `<div class="todo-note" id="${todo.id}">
                <input type="checkbox" name="projectName" id="ProjectName" class="projectCheckBox">
                <label class="projectLabel" id="projectLabel" for="projectName">${todo.notes}</label>
                <div class="edit-icon" id="edit-icon"><i class="far fa-edit"></i></div>
            </div>
            <div class="todo-date show-date-icon">
                <h3>${format(new Date(todo.date), 'MMM do')}</h3>
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

    showMyProject(eventObj){
        if(eventObj.target.className === 'circle-head'){
            
            let projectName = eventObj.target.childNodes[0].data
     
            const tmpContainer = []
            this.todoList.forEach((project)=>{
                
                if(project.projChoice === projectName){
                    
                    tmpContainer.push(project)
                }
            })

            this.showProjectInTheDom(tmpContainer)     
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
                   this.createProjectList()
                   this.showTotalNumsOfTask()
                }
            })
        },time)
    },

    renderEditState(eventObj){

        if(eventObj.target.classList.contains('fa-edit')){
            const noteBox = this.selectElement('proj-area')
            if(!noteBox.classList.contains('active-block')){
                this.displayTextBox(noteBox,'active-block')
            }
            
            const textArea = this.selectElement('notes')
            const dateSchedule = this.selectElement('schedule')

            const projectCont = document.querySelector('.show-projects-section')
            const elementTodo = eventObj.target.parentElement.parentElement
            const elementId = eventObj.target.parentElement.parentElement.id
            const elementDate = eventObj.target.parentElement.parentElement.nextElementSibling

            this.todoList.forEach((project)=>{
                if(project.id === parseInt(elementId)){
                    if(projectCont.childElementCount > 2){
                        elementTodo.remove()
                        elementDate.remove()
                    }else {
                        projectCont.remove()
                    }
            
                    textArea.value = project.notes
                    dateSchedule.value = project.date
                    const idx = this.todoList.indexOf(project)
                    this.todoList.splice(idx,1)
                    this.createProjectList()
                    localStorage.setItem('todo',JSON.stringify(this.todoList))
                }
            })
            
        }
    },

    showNumOfTask(proj){
        let numOfPrjs = null;
        this.todoList.forEach((project)=>{
            if(project.projChoice === proj){
                numOfPrjs += 1
            }
        })
        return numOfPrjs
    },

    showTotalNumsOfTask(){
        this.showProjectInTheDom(this.todoList)
        let num = null
         this.projectList.forEach((proj) => {
            num += this.showNumOfTask(proj)
            
        })

        const totalNumElement = this.selectElement('all-num')
        if(num == null){
            totalNumElement.innerText = null
        }else {
            totalNumElement.innerHTML = ''
            totalNumElement.classList.add('all-num-addon')
            totalNumElement.innerText = num
        }
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
    },

    removeTaskFromTodo(task){
        this.todoList.forEach((todoTask,index) => {
            if(task === todoTask.projChoice){
                this.todoList.splice(index,1)
                localStorage.setItem('todo',JSON.stringify(this.todoList))
                this.showProjectInTheDom(this.todoList)
            }
        })
    }

}

//local storage
const persistData = {
    getTodoFromStorage(){
        const fromStorage = JSON.parse(localStorage.getItem('todo'))

        if(fromStorage !== null){
            
            fromStorage.forEach((obj)=>{
                this.todoList.push(obj)

                this.projectList.push(obj.projChoice)

            })
            
        }else {
            this.todoList = []
            this.projectList.push('Personal')
        }
        
        this.projectList.forEach((project,index) => {
            if(this.projectList.indexOf(project) != index){
                this.projectList.splice(index,1)
            }
        })   
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
        myUI.createProjectList(selectProjectContainer)

        const projectListContainer = myUI.selectElement('project-choice')
        myUI.createListProject(projectListContainer)
       textInput.value = ''
    })

    const inputCancelButton = myUI.selectElement('cancel-btn-input')
    inputCancelButton.addEventListener('click',() => {
        const addProjectInputText = myUI.selectElement('add-proj-input')
        myUI.removeClassFromElement(addProjectInputText,'show')
    }) 
    
    const allProjectsContainer = myUI.selectElement('proj-wrap')
    allProjectsContainer.addEventListener('click',(event)=>{
        myUI.removeProject(event,'del-button')
        myUI.showMyProject(event)
        const projectListContainer = myUI.selectElement('project-choice')
        myUI.createListProject(projectListContainer) 
    })

    const createTaskBtn = myUI.selectElement('addBtn')
    createTaskBtn.addEventListener('click',() => {
        const noteArea = myUI.selectElement('notes')
        const scheduleArea = myUI.selectElement('schedule')
        const projChoiceArea = myUI.selectElement('project-choice')

        if(noteArea.value.length > 0 && scheduleArea.value.length > 0 &&projChoiceArea.value.length > 0){
            
            myTodo.initTodoItems(noteArea.value,scheduleArea.value,projChoiceArea.value)

            myUI.showProjectInTheDom(myTodo.todoList)

            myUI.clearInputArea([noteArea,scheduleArea,projChoiceArea])

            myUI.createProjectList()
        }
    })


    const cancelTaskBtn = myUI.selectElement('cancelBtn')
    cancelTaskBtn.addEventListener('click',() => {
        const noteBox = myUI.selectElement('proj-area')     
        myUI.removeTaskInputBox(noteBox,'active-block')
    })


    const projectNoteContainer = myUI.selectElement('project-notes')
    projectNoteContainer.addEventListener('click',(event) => {
        myUI.targetIsDone(event)
        myUI.renderEditState(event)
    })

    const seeAllProjects = myUI.selectElement('see-icon')
    seeAllProjects.addEventListener('click',()=>{
        myUI.showTotalNumsOfTask()
    })
    

    window.addEventListener('load',() => {
       myLocalStorage.getTodoFromStorage()
       myUI.showProjectInTheDom(myTodo.todoList)
       const selectProjectContainer = myUI.selectElement('proj-wrap')
       myUI.createProjectList(selectProjectContainer)
       const projectListContainer = myUI.selectElement('project-choice')
       myUI.createListProject(projectListContainer)
    })

}

todoApp()





