import { refresh, taskCheckBoxBtns } from "./domElements";

export default class Task {
   constructor(title, desc, project, priority, dueDate, isPinned) {
      this.title = title;
      this.desc = desc;
      this.project = project;
      this.dueDate = dueDate;
      this.priority = priority;
      this.isPinned = isPinned;
   }

   strikeOutTask(btn) {
      btn.classList.toggle('striked');
   }

   displayTask() {
      const taskContainer = document.querySelector('.tasks');
      const taskElement = document.createElement('div');
      taskElement.classList.add('tasks__task', 'task');
      taskElement.setAttribute('data-priority', this.priority);
      taskElement.innerHTML = `
         <div class="task__checkbox"><span>✔</span></div>
         <div class="task__title"><span>${this.title}</span></div>
         <div class="task__date">27 May</div>
         <div id="edit-btn" class="task__icon">
            <img src="./images/edit.svg" alt="Edit" class="icon">
         </div>
         <div id="priority-btn" class="task__icon">
            <img src="./images/priority.svg" alt="Prioriry" class="icon">
         </div>
         <div id="priority-btn" class="task__icon">
            <img src="./images/pin.svg" alt="Pin" class="icon">
         </div>
         <div id="del-btn" class="task__icon del">
            <img src="./images/delete.svg" alt="Delete" class="icon">
         </div>
      `;
      taskContainer.appendChild(taskElement);
      refresh();
      taskCheckBoxBtns.forEach(btn => btn.addEventListener('click', () => this.strikeOutTask(btn)));
   }
}