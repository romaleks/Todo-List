import { tasksContainer } from "./domElements";
import pin from './assets/pin.svg';
import pin_active from './assets/pin-active.svg';

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

   pinTask(btn) {
      const task = btn.parentNode;
      const taskIcon = btn.querySelector('img');
      task.classList.toggle('pinned');
      if (task.classList.contains('pinned')) taskIcon.src = pin_active;
      else taskIcon.src = pin;
   }

   displayTask() {
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
         <div id="pin-btn" class="task__icon">
            <img src="./images/pin.svg" alt="Pin" class="icon">
         </div>
         <div id="del-btn" class="task__icon del">
            <img src="./images/delete.svg" alt="Delete" class="icon">
         </div>
      `;
      tasksContainer.appendChild(taskElement);

      const checkBox = taskElement.querySelector('.task__checkbox');
      const pinBtn = taskElement.querySelector('#pin-btn');
      const pinIcon = pinBtn.querySelector('img');
      pinIcon.src = pin;
      checkBox.addEventListener('click', () => this.strikeOutTask(checkBox))
      pinBtn.addEventListener('click', () => this.pinTask(pinBtn));
   }
}