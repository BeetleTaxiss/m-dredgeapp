const  {Menu} = require("electron");

const isMac= process.platform==="darwin";

const menuLocations=[
    {
        label:"App",
        subMenu:[
            {role:"reload"},
            isMac? { role:"close"} : {role:"quit"},
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
