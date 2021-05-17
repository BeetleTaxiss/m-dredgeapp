const  {app, Menu} = require("electron");

const isMac= process.platform==="darwin";

const menuLocations=[
    {
        label:"Menu",
        subMenu:[
            {label:"Reload", role:"reload"},
            isMac? { label:"Exit",role:"close"} : {label:"Exit",role:"quit"},
        ]
    }
];

/** create our custom menus */
const menu= Menu.buildFromTemplate(menuLocations);

/** set as application menu */
Menu.setApplicationMenu(menu);

module.exports={
    menu
}
