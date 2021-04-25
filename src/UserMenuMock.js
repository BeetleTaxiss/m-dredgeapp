
export const userMenu = {

    dashboard:{
        dashboardHome: {
            text: "Dashboard Content",
            link: "/dashboard",
            //usePageWrapper: false,
        },

        recentOrders: {
            text: "Recent Orders",
            link: "orders",
        },
        totalRevenue: {
            text: "Total Revenue",
            link: "#",
            usePageWrapper: false,
            showOnDashboard:true,
            showInMenu:false,

        },
    },  

    order: {
        placeOrder: {
            label: "Place Order",
            route: "/placeorder",
            link: "./components/orders/order-form",
            subItem: [
                {link: "/checkorderstatus", text: "Sub Menu Order"}
            ]
        },
        orderReceipt: {
            text: "Order Receipt",
            link: "/orderreceipt",
        },
    },
    production: {
        production: {
            text: "Start Pumping",
            link: "/production",
        },
        wetSand: {
            text: "Wet Sand",
            link: "/wetsand",
        },
        stockUpdate: {
            text: "Production Stock Movements",
            link: "/stockupdate",
        },
    },
    account :{
        postExpenses: {
            text: "Post Expenses",
            link: "/postexpense",
        },
        expenseReport: {
            text: "Expenses Report",
            link: "/expensereport",
        },
        chartOfAccount: {
            text: "Chart of Account",
            link: "/chartlist",
        },
        addBusinessAccount: {
            text: "Add Business Account",
            link: "/accountlist",
        },
        postToAccount: {
            text: "Post Entry",
            link: "/postaccount",
        },
    },

    admin :{
        addUsers: {
            text: "Add User",
            link: "/users",
        },
        product: {
            text: "Add Products",
            link: "/products",
        },
        addMachinery: {
            text: "Add Machinery",
            link: "/operations",
        },
        addFuel: {
            text: "Add Fuel Stock",
            link: "/addfuel",
        },
        issueFuel: {
            text: "Issue Fuel",
            link: "/fuelissue",
        },
        fuelIssued: {
            text: "Issued Fuel",
            link: "/fuelissuelist",
        },
        fuelStockEntry: {
            text: "Fuel Stock Entry",
            link: "/fuelupdatelist",
        },
    },

    inspector:{
        inspect: {
            text: "Inspect Order",
            link: "/inspect",
        },
    },
    security:{
        inspect: {
            text: "Clear Order",
            link: "/security",
        },
    },
revenue : {
    revenueReport: {
        text: "Revenue Report",
        link: "/revenuereport",
    },
    singleRevenueReport: {
        text: "Single Revenue Report",
        link: "/singlerevenuereport",
    },
},
storeOperations :{
    addMachinery: {
        text: "Add Machinery",
        link: "/operations",
    },
    addFuel: {
        text: "Add Fuel Stock",
        link: "/addfuel",
    },
    issueFuel: {
        text: "Issue Fuel",
        link: "/fuelissue",
    },
    fuelIssued: {
        text: "Issued Fuel",
        link: "/fuelissuelist",
    },
    fuelStockEntry: {
        text: "Fuel Stock Entry",
        link: "/fuelupdatelist",
    },
},
loader: {
    placeOrder: {
        text: "Load Order",
        link: "/loader"
    },  
},

}