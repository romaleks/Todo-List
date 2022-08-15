import {
  menu,
  sectionBtns,
  menuOpenCloseBtn,
  addTaskForm,
  addTaskInput,
  taskPopup,
  popupCloseBtn,
  headerTitle,
  addProjectSection,
  addProjectPopup,
  addProjectForm,
  addProjectInput,
  addProjectCloseBtn,
  themeBtn,
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
    menu.classList.toggle("inactive");
    menuOpenCloseBtn.style.transform =
      "rotateY(" + (this.angle += 180) + "deg)";
  };

  static activateSection(btn) {
    sectionBtns.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    headerTitle.textContent = btn.textContent;
    loopTasks();
  }

  static toggleProjectPopup() {
    addProjectPopup.classList.toggle("active");
    if (addProjectPopup.classList.contains("active")) {
      addProjectForm.addEventListener("submit", (ev) => {
        Popup.addProject(ev, addProjectInput.value);
        addProjectInput.value = "";
      });
    }
  }
  // Tasks
  static togglePopup(ev, value) {
    if (ev) {
      ev.preventDefault();
      Popup.fillExistingInputs(value);
    }
    taskPopup.classList.toggle("active");
  }
  /// Event listeners
  static addEventListeners() {
    //Sidebar
    const root = document.documentElement;
    themeBtn.addEventListener("click", () => root.classList.toggle("dark"));
    // Menu
    sectionBtns.forEach((btn) =>
      btn.addEventListener("click", () => this.activateSection(btn))
    );
    addProjectSection.addEventListener("click", () =>
      this.toggleProjectPopup()
    );
    addProjectCloseBtn.addEventListener("click", () =>
      this.toggleProjectPopup()
    );
    menuOpenCloseBtn.addEventListener("click", this.toggleMenu);
    // Tasks
    addTaskForm.addEventListener("submit", (ev) =>
      this.togglePopup(ev, addTaskInput.value)
    );
    popupCloseBtn.addEventListener("click", () => this.togglePopup());
  }
}
