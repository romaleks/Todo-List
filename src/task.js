import { editTaskSelectBoxes, editTaskOptionCnt } from "./domElements";

class Task {
   constructor(title, description, priority, dueDate, isPinned) {
      this.title = title;
      this.description = description;
      this.priority = priority;
      this.dueDate = dueDate;
      this.project = project;
      this.isPinned = isPinned;
   }
}

export default function createNewTask() {
   // show popup, collect info, create and return new task
   editTaskSelectBoxes.forEach(box => box.addEventListener('click', () => editTaskOptionCnt.classList.toggle('active')))
}