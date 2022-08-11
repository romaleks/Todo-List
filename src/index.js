import './styles/main.scss';
import Application from './domFunctionality';
import { Task, createTask, loopTasks } from './task';
import { tasksObject } from './tasksObject';
import { format, endOfDay } from 'date-fns';

Application.startApp();
const exampleTask1 = new Task('Buy vegetables', '', '🛒 Grocery list', 'p1',
   format(endOfDay(new Date()), 'yyyy-MM-dd'), false, 0);
const exampleTask2 = new Task('Buy fruits', '', '🛒 Grocery list', 'p2',
   format(endOfDay(new Date()), 'yyyy-MM-dd'), false, 1);
const exampleGroceryTask1 = new Task('Buy vegetables', '', '🛒 Grocery list', 'p1',
   format(endOfDay(new Date()), 'yyyy-MM-dd'), false, 0);
const exampleGroceryTask2 = new Task('Buy fruits', '', '🛒 Grocery list', 'p2',
   format(endOfDay(new Date()), 'yyyy-MM-dd'), false, 1);
createTask(exampleTask1);
createTask(exampleTask2);
tasksObject.Inbox.tasks.push(exampleTask1)
tasksObject['🛒 Grocery list'].tasks.push(exampleGroceryTask1);
tasksObject.Inbox.tasks.push(exampleTask2)
tasksObject['🛒 Grocery list'].tasks.push(exampleGroceryTask2);
loopTasks()