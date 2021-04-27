
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
}