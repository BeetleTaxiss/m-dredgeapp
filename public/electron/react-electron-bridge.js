/**
 * This file will serves as a brideg between our  react app and electron
 * Since we cannot make a direct node call withing our electron Main
 * all react/node related function call will reside within this file
 */
const {showMenu, minimizeWindow, maximizeWindow} = require("./menu-functions");

window.addEventListener("DOMContentLoaded", ()=>{
  /** update the title of our application using our define  constanst */
  const document= window.document;
  document.title="Atup";

  /** assign our menu functions to gloabl window variable */
  window.showMenu= showMenu;
  window.minimizeWindow= minimizeWindow;
  window.maximizeWindow= maximizeWindow;
})