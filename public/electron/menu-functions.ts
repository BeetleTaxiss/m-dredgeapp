const {remote, ipcRenderer} =require("electron");

const getCurrentWindow=()=>{
    return remote.getCurrentWebContents();
}

const closeWindow=(currentWindow= getCurrentWindow())=>{
    currentWindow.closeWindow();
}


/** this will minimize the window */
const minimizeWindow=(currentWindow= getCurrentWindow())=>{
    if(currentWindow.minimizable) 
        currentWindow.minimize();
}

/** function to maximize the screen */
const maximizeWindow=(currentWindow= getCurrentWindow())=>{
    if(currentWindow.maximizable) 
        currentWindow.maximize();
}

type menuLocationArgs= {
    x: number,
    y: number
}

/** show the menu */
const showMenu=(e: menuLocationArgs)=>{
    ipcRenderer.send("show-custom-menu", {x: e.x, y:e.y})
}

module.exports = {
    closeWindow, 
    minimizeWindow,
    maximizeWindow,
    showMenu
}