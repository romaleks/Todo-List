import { menu, menuOpenCloseBtn } from "./domElements";

export default class Application {

   angle = 0;

   startApp() { this.addEventListeners() }
   // Actions
   toggleMenu = () => {
      console.log(this.angle);
      menu.classList.toggle('inactive');
      menuOpenCloseBtn.style.transform = 'rotateY(' + (this.angle += 180) + 'deg)';
   }
   // Event listeners
   addEventListeners() {
      menuOpenCloseBtn.addEventListener('click', this.toggleMenu);
   }

}