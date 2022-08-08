export const menu = document.querySelector('.menu');
export const sectionBtns = document.querySelectorAll('.section:not(.btn, .menu__sect-title)')
export const menuOpenCloseBtn = document.querySelector('#menu_btn');

export const addTaskForm = document.querySelector('#form');
export const addTaskInput = addTaskForm.querySelector('#add_task_input');
export const tasksContainer = document.querySelector('.tasks');

export const taskPopup = document.querySelector('.task-popup');
export const popupCloseBtn = taskPopup.querySelector('#popup_close_btn');
export const popupForm = taskPopup.querySelector('.task-popup__form');
export const popupSelections = taskPopup.querySelectorAll('.selection__selected');
export const popupInputs = {
   title: popupForm.querySelector('#popup_title'),
   desc: popupForm.querySelector('#popup_desc'),
   project: popupForm.querySelector('.selection__selected[data-select="project"]'),
   priority: popupForm.querySelector('.selection__selected[data-select="priority"]'),
}