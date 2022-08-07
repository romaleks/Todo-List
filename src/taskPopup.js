import Task from "./task";
import {
   editTaskForm,
   editTaskSelections,
   editTaskInputs,

} from "./domElements";

export default class Popup {
   static fillTitleInput(value) {
      editTaskInputs.title.value = value;
   }

   static addEventListeners() {
      editTaskSelections.forEach(select => select.addEventListener('click', () => {
         const container = document.querySelector('[data-select="' + select.getAttribute('data-select') + '"]');
         const options = container.querySelectorAll('.selection__option');
         const selected = container.nextElementSibling;
         container.classList.toggle('active');
         options.forEach(option => option.addEventListener('click', () => {
            selected.innerHTML = option.innerHTML;
            if (select.hasAttribute('data-priority')) {
               select.setAttribute('data-priority', option.getAttribute('data-priority'));
            }
         }));
      }));
   }
} 