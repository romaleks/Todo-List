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
      const options = container.querySelectorAll('.selection__option');
      container.classList.toggle('active');
      options.forEach(option => option.addEventListener('click', () => {
         select.innerHTML = option.innerHTML;
         if (select.hasAttribute('data-priority')) {
            select.setAttribute('data-priority', option.getAttribute('data-priority'));
         }
         container.classList.remove('active');
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
   }

   static addEventListeners() {
      popupSelections.forEach(select => select.addEventListener('click', () => this.activateSelection(select)));

      popupForm.addEventListener('submit', (ev) => this.createTask(ev));
   }
} 