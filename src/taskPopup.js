import Task from "./task";
import {
   popupForm,
   popupSelections,
   popupInputs,
} from "./domElements";

export default class Popup {
   static fillTitleInput(value) {
      popupInputs.title.value = value;
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
      const title = popupInputs.title.value;
      const desc = popupInputs.desc.value;
      const project = popupInputs.project.textContent;
      const priority = popupInputs.priority.getAttribute('data-priority');
      const newTask = new Task(title, desc, project, priority);
      newTask.displayTask();
      popupInputs.title.value = '';
      popupInputs.desc.value = '';
      popupInputs.project.innerHTML = '<img src="./images/inbox.svg" alt="" class="icon">Inbox</div>';
      popupInputs.priority.innerHTML = '<img src="./images/priority.svg" alt="">Priority 4';
      popupInputs.priority.setAttribute('data-priority', 'p4');
   }

   static addEventListeners() {
      popupSelections.forEach(select => {
         select.addEventListener('click', () => this.activateSelection(select));
         this.chooseOption(select, document.querySelector('[data-select="' + select.getAttribute('data-select') + '"]'));
      })

      popupForm.addEventListener('submit', (ev) => this.createTask(ev));
   }
} 