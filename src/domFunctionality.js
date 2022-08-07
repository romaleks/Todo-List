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

   angle = 0;

   startApp() { this.addEventListeners() }
   /// Actions
   // Menu
   toggleMenu = () => {
      menu.classList.toggle('inactive');
      menuOpenCloseBtn.style.transform = 'rotateY(' + (this.angle += 180) + 'deg)';
   }

   activateSection(btn) {
      sectionBtns.forEach(btn => btn.classList.remove('active'));
      btn.classList.add('active');
   }

   strikeOutTask(btn) {
      btn.classList.toggle('striked');
   }
   // Tasks
   openClosePopup(ev) {
      if (ev) ev.preventDefault();
      taskPopup.classList.toggle('active');
      Popup.addEventListeners();
   }
   /// Event listeners
   addEventListeners() {
      // Menu
      sectionBtns.forEach(btn => btn.addEventListener('click', () => this.activateSection(btn)));
      menuOpenCloseBtn.addEventListener('click', this.toggleMenu);
      // Tasks
      addTaskForm.addEventListener('submit', (ev) => this.openClosePopup(ev));
      popupCloseBtn.addEventListener('click', () => this.openClosePopup());
      taskCheckBoxBtns.forEach(btn => btn.addEventListener('click', () => this.strikeOutTask(btn)));
   }

}