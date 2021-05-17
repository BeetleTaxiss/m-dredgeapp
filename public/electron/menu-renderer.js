/**
 * This file will conenct with our react build and call attache events to our menu items
 *
 */

window.addEventListener("DOMContentLoaded", () => {

    /** get all the action buttons to use */
    setTimeout(()=>{

    const closeButton = document.getElementById("app-close");
    closeButton.addEventListener("click", () => {
        console.log(window, "all windows");
        window.showMenu();
  });

   }, 5000)

});