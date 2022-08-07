import './styles/main.scss';
import Application from './domFunctionality';
import { editTaskSelectBoxes, editTaskOptionCnt } from "./domElements";

const todoApp = new Application;
todoApp.startApp();
editTaskSelectBoxes.forEach(box => box.addEventListener('click', () => editTaskOptionCnt.classList.toggle('active')))