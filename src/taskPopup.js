import Application from "./domFunctionality";
import { Task, loopTasks } from "./task";
import {
   popupForm,
   popupSelections,
   popupInputs,
   addTaskInput,
   menuProjects,
   popupProjectSelection,
   refreshMenuSections,
} from "./domElements";

export default class Popup {
   static taskIndex = 3;

   static fillExistingInputs(value) {
      if (typeof value === 'object') {
         const priorityText = popupForm.querySelector('.selection__selected[data-select="priority"]').lastChild;
         popupInputs.title.value = value.title;
         popupInputs.desc.value = value.desc;
         popupInputs.project.textContent = value.project;
         priorityText.textContent = 'Priority ' + value.priority[1];
         popupInputs.priority.setAttribute('data-priority', value.priority);
         popupInputs.dueDate.value = value.dueDate;
         popupInputs.isEdit = true;
         popupInputs.task = value;
      } else {
         popupInputs.title.value = value;
         popupInputs.isEdit = false;
      }
   }

   static activateSelection(select) {
      const container = document.querySelector('[data-select="' + select.getAttribute('data-select') + '"]');
      container.classList.toggle('active');
      return container;
   }

   static chooseOption(select, container, isNewProject) {
      if (isNewProject) {
         const option = container.querySelector('.selection__option:last-child');
         option.addEventListener('click', () => {
            select.innerHTML = option.innerHTML;
            container.classList.toggle('active');
         });
      } else {
         const options = container.querySelectorAll('.selection__option');
         options.forEach(option => option.addEventListener('click', () => {
            select.innerHTML = option.innerHTML;
            if (select.hasAttribute('data-priority')) {
               select.setAttribute('data-priority', option.getAttribute('data-priority'));
            }
            container.classList.toggle('active');
         }));
      }
   }

   static addProject(ev, value) {
      ev.preventDefault();
      const newProject = document.createElement('div');
      newProject.classList.add('section');
      newProject.innerHTML = `
         <div class="section__icon"><img src="./images/project.svg" class="icon triangle"></div>
         <div class="section__title">${value}</div>
      `;
      newProject.addEventListener('click', () => {
         refreshMenuSections();
         Application.activateSection(newProject);
      });

      menuProjects.appendChild(newProject);

      const newProjectObj = {
         tasksNum: 0,
         tasks: []
      }

      localStorage.setItem(value, JSON.stringify(newProjectObj));

      const newProjectOption = document.createElement('div');
      newProjectOption.classList.add('selection__option');
      newProjectOption.textContent = value;
      popupProjectSelection.appendChild(newProjectOption);

      const popupProjectSelect = popupProjectSelection.nextElementSibling;
      newProjectOption.addEventListener('click', this.chooseOption(popupProjectSelect, popupProjectSelection, true));
   }

   static createTask(ev) {
      ev.preventDefault();
      if (popupInputs.isEdit) this.editTask(popupInputs.task);
      else {
         const title = popupInputs.title.value;
         const desc = popupInputs.desc.value;
         const project = popupInputs.project.textContent;
         const priority = popupInputs.priority.getAttribute('data-priority');
         const dueDate = popupInputs.dueDate.value;
         const newTask = new Task(title, desc, project, priority, dueDate, false, null, false);

         addTaskInput.value = '';
         popupInputs.title.value = '';
         popupInputs.desc.value = '';
         popupInputs.project.innerHTML = '<img src="./images/inbox.svg" alt="" class="icon">Inbox</div>';
         popupInputs.priority.innerHTML = '<img src="./images/priority.svg" alt="">Priority 4';
         popupInputs.priority.setAttribute('data-priority', 'p4');
         popupInputs.dueDate.value = '';

         const projectObj = JSON.parse(localStorage.getItem(newTask.project));
         const inboxObj = JSON.parse(localStorage['Inbox']);
         if (newTask.project != 'Inbox') {
            const newTask = new Task(title, desc, project, priority, dueDate, false, null, false);
            newTask.initialIndex = projectObj.tasksNum;
            newTask.index = projectObj.tasksNum++;
            newTask.globalIndex = inboxObj.tasksNum;
            projectObj.tasks.push(newTask);
            localStorage.setItem(newTask.project, JSON.stringify(projectObj));
         }
         newTask.initialIndex = inboxObj.tasksNum;
         newTask.index = inboxObj.tasksNum++;
         inboxObj.tasks.push(newTask);
         localStorage.setItem('Inbox', JSON.stringify(inboxObj));
         loopTasks();
      }
   }

   static editTask(task) {
      const inboxObj = JSON.parse(localStorage.getItem('Inbox'));
      const projectObj = JSON.parse(localStorage.getItem(task.project));

      task.title = popupInputs.title.value;
      task.desc = popupInputs.desc.value;
      task.project = popupInputs.project.textContent;
      task.priority = popupInputs.priority.getAttribute('data-priority');
      task.dueDate = popupInputs.dueDate.value;
      projectObj.tasks[task.initialIndex] = task;

      inboxObj.tasks[task.globalIndex].title = popupInputs.title.value;
      inboxObj.tasks[task.globalIndex].desc = popupInputs.desc.value;
      inboxObj.tasks[task.globalIndex].project = popupInputs.project.textContent;
      inboxObj.tasks[task.globalIndex].priority = popupInputs.priority.getAttribute('data-priority');
      inboxObj.tasks[task.globalIndex].dueDate = popupInputs.dueDate.value;

      localStorage.setItem('Inbox', JSON.stringify(inboxObj));
      localStorage.setItem(task.project, JSON.stringify(projectObj));

      loopTasks();
   }

   static addEventListeners() {
      popupSelections.forEach(select => {
         select.addEventListener('click', () => this.activateSelection(select));
         this.chooseOption(select, document.querySelector('[data-select="' + select.getAttribute('data-select') + '"]'));
      })

      popupForm.addEventListener('submit', (ev) => this.createTask(ev));
   }
} 