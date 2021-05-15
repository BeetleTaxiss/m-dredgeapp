const appName= require("../src/hooks/API")("APP_NAME");

/**
 * This file will serves as a brideg between our  react app and electron
 * Since we cannot make a direct node call withing our electron Main
 * all react/node related function call will reside within this file
 */
window.addEventListener("DOMContentLoaded", ()=>{
  /** update the title of our application using our define  constanst */
  window.document.title=appName
})