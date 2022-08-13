import { Task, createTask } from './task';
import { format, endOfDay } from 'date-fns';

export const tasksObject = {
   'Inbox': {
      tasksNum: 2,
      tasks: []
   },
   '🛒 Grocery list': {
      tasksNum: 2,
      tasks: []
   },
   '📚 Homework': {
      tasksNum: 0,
      tasks: []
   }
}

if (!localStorage.getItem('Inbox')) {
   localStorage.setItem('Inbox', JSON.stringify(tasksObject['Inbox']));
   localStorage.setItem('🛒 Grocery list', JSON.stringify(tasksObject['🛒 Grocery list']));
   localStorage.setItem('📚 Homework', JSON.stringify(tasksObject['📚 Homework']));

   const exampleTask1 = new Task('Buy vegetables', '', '🛒 Grocery list', 'p1',
      format(endOfDay(new Date()), 'yyyy-MM-dd'), false, 0, false);
   const exampleTask2 = new Task('Buy fruits', '', '🛒 Grocery list', 'p2',
      format(endOfDay(new Date()), 'yyyy-MM-dd'), false, 1, false);

   const inboxObj = JSON.parse(localStorage.getItem('Inbox'));
   const groceryObj = JSON.parse(localStorage.getItem('Inbox'));

   inboxObj.tasks.push(exampleTask1);
   inboxObj.tasks.push(exampleTask2);
   groceryObj.tasks.push(exampleTask1);
   groceryObj.tasks.push(exampleTask2);

   localStorage.setItem('Inbox', JSON.stringify(inboxObj));
   localStorage.setItem('🛒 Grocery list', JSON.stringify(groceryObj));
}