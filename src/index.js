import './styles/main.scss';
import Application from './domFunctionality';
import { Task, createTask, loopTasks } from './task';
import { tasksObject } from './tasksObject';

Application.startApp();
const exampleTask1 = new Task('Buy vegetables', '', '🛒 Grocery list', 'p1', null, false, 0);
const exampleTask2 = new Task('Buy fruits', '', '🛒 Grocery list', 'p2', null, false, 1);
const exampleTask3 = new Task('Buy dsads', '', '🛒 Grocery list', 'p1', null, false, 2);
const exampleTask4 = new Task('Buy apple', '', '🛒 Grocery list', 'p2', null, false, 3);
const exampleGroceryTask1 = new Task('Buy vegetables', '', '🛒 Grocery list', 'p1', null, false, 0);
const exampleGroceryTask2 = new Task('Buy fruits', '', '🛒 Grocery list', 'p2', null, false, 1);
createTask(exampleTask1);
createTask(exampleTask2);
createTask(exampleTask3);
createTask(exampleTask4);
tasksObject.Inbox.tasks.push(exampleTask1)
tasksObject['🛒 Grocery list'].tasks.push(exampleGroceryTask1);
tasksObject.Inbox.tasks.push(exampleTask2)
tasksObject['🛒 Grocery list'].tasks.push(exampleGroceryTask2);
tasksObject.Inbox.tasks.push(exampleTask3)
tasksObject.Inbox.tasks.push(exampleTask4)
loopTasks()