import { Task, loopTasks } from "./task";
import { tasksObject } from "./tasksObject";
import {
   popupForm,
   popupSelections,
   popupInputs,
   addTaskInput,
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

   static chooseOption(select, container) {
      const options = container.querySelectorAll('.selection__option');
      options.forEach(option => option.addEventListener('click', () => {
         select.innerHTML = option.innerHTML;
         if (select.hasAttribute('data-priority')) {
            select.setAttribute('data-priority', option.getAttribute('data-priority'));
         }
         container.classList.toggle('active');
      }));
   }

   static createTask(ev) {
      ev.preventDefault();
      if (popupInputs.isEdit) this.editTask(popupInputs.task);
      else {
         const title = popupInputs.title.value;
         const desc = popupInputs.desc.value;
         const project = popupInputs.project.textContent;
         const priority = popupInputs.priority.getAttribute('data-priority');
         const newTask = new Task(title, desc, project, priority, null, false, null);

         addTaskInput.value = '';
         popupInputs.title.value = '';
         popupInputs.desc.value = '';
         popupInputs.project.innerHTML = '<img src="./images/inbox.svg" alt="" class="icon">Inbox</div>';
         popupInputs.priority.innerHTML = '<img src="./images/priority.svg" alt="">Priority 4';
         popupInputs.priority.setAttribute('data-priority', 'p4');
         if (newTask.project != 'Inbox') {
            const newTask = new Task(title, desc, project, priority, null, false, null);
            newTask.initialIndex = tasksObject[newTask.project].tasksNum;
            newTask.index = tasksObject[newTask.project].tasksNum++;
            newTask.globalIndex = tasksObject.Inbox.tasksNum;
            tasksObject[newTask.project].tasks.push(newTask);
         }
         newTask.initialIndex = tasksObject.Inbox.tasksNum;
         newTask.index = tasksObject.Inbox.tasksNum++;
         tasksObject.Inbox.tasks.push(newTask);
         loopTasks();
      }
   }

   static editTask(task) {
      task.title = popupInputs.title.value;
      task.desc = popupInputs.desc.value;
      task.project = popupInputs.project.textContent;
      task.priority = popupInputs.priority.getAttribute('data-priority');

      tasksObject.Inbox.tasks[task.globalIndex].title = popupInputs.title.value;
      tasksObject.Inbox.tasks[task.globalIndex].desc = popupInputs.desc.value;
      tasksObject.Inbox.tasks[task.globalIndex].project = popupInputs.project.textContent;
      tasksObject.Inbox.tasks[task.globalIndex].priority = popupInputs.priority.getAttribute('data-priority');

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