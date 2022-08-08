import {
   menu,
   sectionBtns,
   menuOpenCloseBtn,
   addTaskForm,
   addTaskInput,
   taskCheckBoxBtns,
   taskPopup,
   popupCloseBtn,
} from "./domElements";
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
   }
   // Tasks
   static openClosePopup(ev, value) {
      if (ev) {
         ev.preventDefault();
         Popup.fillTitleInput(value);
      }
      taskPopup.classList.toggle('active');
   }
   /// Event listeners
   static addEventListeners() {
      // Menu
      sectionBtns.forEach(btn => btn.addEventListener('click', () => this.activateSection(btn)));
      menuOpenCloseBtn.addEventListener('click', this.toggleMenu);
      // Tasks
      addTaskForm.addEventListener('submit', (ev) => this.openClosePopup(ev, addTaskInput.value));
      popupCloseBtn.addEventListener('click', () => this.openClosePopup());
   }

}