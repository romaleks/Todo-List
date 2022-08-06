import { menu, sectionBtns, menuOpenCloseBtn, taskCheckBoxBtns } from "./domElements";

export default class Application {

   angle = 0;

   startApp() { this.addEventListeners() }
   // Actions
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
   // Event listeners
   addEventListeners() {
      sectionBtns.forEach(btn => btn.addEventListener('click', () => this.activateSection(btn)));
      taskCheckBoxBtns.forEach(btn => btn.addEventListener('click', () => this.strikeOutTask(btn)));
      menuOpenCloseBtn.addEventListener('click', this.toggleMenu);
   }

}