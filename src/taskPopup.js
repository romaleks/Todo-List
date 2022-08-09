import { Task, loopTasks } from "./task";
import { tasksObject } from "./tasksObject";
import {
   popupForm,
   popupSelections,
   popupInputs,
   taskIndex,
} from "./domElements";

export default class Popup {
   static fillExistingInputs(value) {
      if (typeof value === 'object') {
         popupInputs.title.value = value.title;
         popupInputs.desc.value = value.desc;
         popupInputs.project.textContent = value.project;
         popupInputs.priority.innerHTML = value.priorityHTML;
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
         const priorityHTML = popupInputs.priority.innerHTML;
         const newTask = new Task(title, desc, project, priority, priorityHTML, index);

         popupInputs.title.value = '';
         popupInputs.desc.value = '';
         popupInputs.project.innerHTML = '<img src="./images/inbox.svg" alt="" class="icon">Inbox</div>';
         popupInputs.priority.innerHTML = '<img src="./images/priority.svg" alt="">Priority 4';
         popupInputs.priority.setAttribute('data-priority', 'p4');
         tasksObject.Inbox.push(newTask);
         loopTasks();
         taskIndex++;
      }
   }

   static editTask(task) {
      task.title = popupInputs.title.value;
      task.desc = popupInputs.desc.value;
      task.project = popupInputs.project.textContent;
      task.priority = popupInputs.priority.getAttribute('data-priority');
   }

   static addEventListeners() {
      popupSelections.forEach(select => {
         select.addEventListener('click', () => this.activateSelection(select));
         this.chooseOption(select, document.querySelector('[data-select="' + select.getAttribute('data-select') + '"]'));
      })

      popupForm.addEventListener('submit', (ev) => this.createTask(ev));
   }
} 