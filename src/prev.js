import { format } from 'date-fns'

const TodoItems = {
    initOnSchedulerDisplay(){
        this.addProjectBtnId = 'project-choice'
        this.noteElementId = 'notes'
        this.dateScheduleId = 'schedule'
    },

    getNoteElement(noteId){
        this.noteArea = document.getElementById(noteId).value
    },

    getAddBtnElement(elementId){
        this.addProjectBtn = document.getElementById(elementId).value
    },

    getDateElement(dateId){
        this.dateBtn = document.getElementById(dateId)
    },


}

const UI = {
    actionBtnsInit(){
        this.addTaskBtnId = 'addBtn'
        this.cancelTaskBtnId = 'cancelBtn'
    },

    renderScheduler(plusBtn,projectArea){
        plusBtn.addEventListener('click',() => {
            
            this.displayScheduler(projectArea)
            
            this.actionBtnsInit()

            this.initOnSchedulerDisplay()

            this.getDateElement(this.dateScheduleId)

            this.formatDateToday(this.dateBtn)

            this.selctAddTaskBtn(this.addTaskBtnId)

            this.addTaskBtn.addEventListener('click',()=>{
                console.log("will be continued soon...")
                
            })
            
        })
    },

    formatDateToday(dateBtn){
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = yyyy+'-'+mm+'-'+ dd;
        dateBtn.value = today
    },

    selctAddTaskBtn(buttonId){
        this.addTaskBtn = document.getElementById(buttonId)
    },

    displayScheduler(projectArea){
        projectArea.style.display = 'block'
    },

    renderProjectSection(){
        this.initTodoProjectIds()

        this.selctCreateProjectBtn()

        this.selctProjWrapper()

        this.createProjectBtn.addEventListener('click',() => {
            
            this.selctAddProjectInput()

            this.addProjectInput.classList.add('show')

            this.selctAddButtonInputProj()

            this.addButtonInputProj.addEventListener('click',() => {
               
                this.selctProjectInputText() 

                this.selctProjWrapper()


                this.projWrapper.innerHTML += `
                <div class="circles-wrapper">
                        <div class="gray-circle"></div>
                        <h3 class="gray-circle-head">${this.projectInputText.value}</h3>
                </div>
                `            
                this.projectInputText.value = ''

            },false)

            this.selctCancelButtonInput()

            this.cancelButtonInput.addEventListener('click',() => {     
                this.addProjectInput.classList.remove('show')
            },false)


        })
    },

}

const TodoProjectSection = {
    initTodoProjectIds(){
        this.createProjectId = 'project-icon'
        this.projItemsWrapId = 'proj-wrap'
        this.addProjectInputId = 'add-proj-input'
        this.addButtonInputId = 'add-btn-input'
        this.cancelButtonInputId = 'cancel-btn-input'
        this.projectInputTextId = 'project'
    },

    selctCreateProjectBtn(){
        this.createProjectBtn = document.getElementById(this.createProjectId)
    },

    selctProjWrapper(){
        this.projWrapper = document.getElementById(this.projItemsWrapId)
    },

    selctAddProjectInput(){
        this.addProjectInput = document.getElementById(this.addProjectInputId)
    },

    selctAddButtonInputProj(){
        this.addButtonInputProj = document.getElementById(this.addButtonInputId)
    },

    selctProjectInputText(){
        this.projectInputText = document.getElementById(this.projectInputTextId)
    },

    selctCancelButtonInput(){
        this.cancelButtonInput = document.getElementById(this.cancelButtonInputId)
    }


}

const Todo = {
    initTodoIds(){
        this.plusBtnId = 'plus-sign'
        this.projAreaId = 'proj-area'
        this.projBtnId = 'project-icon'
    },

    selectPlusBtn(btnId){
        this.plusButton = document.getElementById(btnId)
    },

    selectProjArea(projectId){
        this.projArea = document.getElementById(projectId)
    },

    selectProjBtn(btnId){
        this.projBtn = document.getElementById(btnId)
    }

}


Object.setPrototypeOf(Todo,UI)

Object.setPrototypeOf(UI,TodoItems)

Object.setPrototypeOf(TodoItems,TodoProjectSection)

const myTodo = Object.create(Todo)

myTodo.initTodoIds()

myTodo.selectPlusBtn(myTodo.plusBtnId)

myTodo.selectProjArea(myTodo.projAreaId)

myTodo.selectProjBtn(myTodo.projBtnId)

myTodo.renderScheduler(myTodo.plusButton,myTodo.projArea)

myTodo.renderProjectSection()











