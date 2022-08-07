import Task from "./task";
import {
   editTaskForm,
   editTaskSelections,

} from "./domElements";

export default class Popup {
   static addEventListeners() {
      editTaskSelections.forEach(select => select.addEventListener('click', () => {
         const container = document.querySelector('[data-select="' + select.getAttribute('data-select') + '"]');
         container.classList.toggle('active');
      }))
   }
} 