import Application from "./domFunctionality";
import Popup from "./taskPopup";
import { tasksObject } from "./tasksObject";
import { tasksContainer, detailsTaskPopup, detailsTaskPopupBtn, detailsText } from "./domElements";
import pin from './assets/pin.svg';
import pin_active from './assets/pin-active.svg';

export class Task {
   constructor(title, desc, project, priority, dueDate, isPinned, index) {
      this.title = title;
      this.desc = desc;
      this.project = project;
      this.priority = priority;
      this.dueDate = dueDate;
      this.isPinned = isPinned;
      this.index = index;
      this.initialIndex = index;
   }

   strikeOutTask(btn) {
      btn.classList.toggle('striked');
   }

   togglePinClass(taskElement) {
      const taskIcon = taskElement.querySelector('#pin-btn img');
      taskElement.classList.toggle('pinned');
      if (taskElement.classList.contains('pinned')) taskIcon.src = pin_active;
      else taskIcon.src = pin;
   }

   pinTask(task) {
      const pinnedTask = tasksObject.Inbox.splice(task.index, 1)[0];
      pinnedTask.isPinned = true;
      tasksObject.Inbox.unshift(pinnedTask);
      loopTasks();
   }

   unpinTask(task) {
      const pinnedTask = tasksObject.Inbox.splice(task.index, 1)[0];
      pinnedTask.isPinned = false;
      tasksObject.Inbox.splice(task.initialIndex, 0, pinnedTask);
      loopTasks();
   }

   seeTaskDetails(task) {
      detailsTaskPopup.classList.add('active');
      detailsText.title.textContent = task.title;
      detailsText.desc.textContent = task.desc;
      detailsTaskPopupBtn.addEventListener('click', () => detailsTaskPopup.classList.remove('active'))
   }

   deleteTask(task) {
      tasksObject.Inbox.splice(task.index, 1);
      loopTasks(task.initialIndex);
   }
}

export function createTask(task) {
   const taskElement = document.createElement('div');
   taskElement.classList.add('tasks__task', 'task');
   taskElement.setAttribute('data-priority', task.priority);
   taskElement.innerHTML = `
      <div class="task__checkbox"><span>✔</span></div>
      <div class="task__title"><span>${task.title}</span></div>
      <div class="task__date">27 May</div>
      <div id="edit-btn" class="task__icon">
         <img src="./images/edit.svg" alt="Edit" class="icon">
      </div>
      <div id="details-btn" class="task__icon">
         <img src="./images/details.svg" alt="Details" class="icon">
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
   const editBtn = taskElement.querySelector('#edit-btn');
   const pinBtn = taskElement.querySelector('#pin-btn');
   const pinIcon = pinBtn.querySelector('img');
   const detailsBtn = taskElement.querySelector('#details-btn');
   const deleteBtn = taskElement.querySelector('#del-btn');
   pinIcon.src = pin;

   checkBox.addEventListener('click', () => task.strikeOutTask(checkBox));
   editBtn.addEventListener('click', () => {
      Application.togglePopup();
      Popup.fillExistingInputs(task);
   });
   pinBtn.addEventListener('click', () => {
      if (!task.isPinned) task.pinTask(task);
      else task.unpinTask(task);
   });
   detailsBtn.addEventListener('click', () => task.seeTaskDetails(task));
   deleteBtn.addEventListener('click', () => task.deleteTask(task));

   return taskElement;
}

export function loopTasks(delIndex) {
   const activeSection = document.querySelector('.section.active').lastElementChild;
   tasksContainer.innerHTML = '';
   let index = 0;
   if (Object.keys(tasksObject).includes(activeSection.textContent)) {
      for (const task of tasksObject[activeSection.textContent]) {
         task.index = index++;
         if (delIndex !== undefined) {
            if (task.initialIndex > delIndex) task.initialIndex -= 1;
         }
         if (task.isPinned) task.togglePinClass(createTask(task));
         else createTask(task);
      }
   }
}