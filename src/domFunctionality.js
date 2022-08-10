import {
   menu,
   sectionBtns,
   menuOpenCloseBtn,
   addTaskForm,
   addTaskInput,
   taskPopup,
   popupCloseBtn,
   headerTitle,
   headerIcon,
} from "./domElements";
import { loopTasks } from "./task";
import Popup from "./taskPopup";

export default class Application {

   static angle = 0;

   static startApp() {
      this.addEventListeners();
      Popup.addEventListeners();
   }
   /// Actions
   // Menu
   static toggleMenu = () => {
      menu.classList.toggle('inactive');
      menuOpenCloseBtn.style.transform = 'rotateY(' + (this.angle += 180) + 'deg)';
   }

   static activateSection(btn) {
      sectionBtns.forEach(btn => btn.classList.remove('active'));
      btn.classList.add('active');
      headerTitle.textContent = btn.textContent;
      loopTasks();
   }
   // Tasks
   static togglePopup(ev, value) {
      if (ev) {
         ev.preventDefault();
         Popup.fillExistingInputs(value);
      }
      taskPopup.classList.toggle('active');
   }
   /// Event listeners
   static addEventListeners() {
      // Menu
      sectionBtns.forEach(btn => btn.addEventListener('click', () => this.activateSection(btn)));
      menuOpenCloseBtn.addEventListener('click', this.toggleMenu);
      // Tasks
      addTaskForm.addEventListener('submit', (ev) => this.togglePopup(ev, addTaskInput.value));
      popupCloseBtn.addEventListener('click', () => this.togglePopup());
   }

}