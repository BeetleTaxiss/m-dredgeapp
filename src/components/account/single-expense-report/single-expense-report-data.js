/**
 * Single Expense Report Data object to create dynamic single expense reports which is divided into the header, body and footer sections
 */

export const expenseReportData = {
  header: {
    logoSection: {
      image: "assets/img/cork-logo.png",
      brandName: "Atup",
    },
    contactSection: [
      "No. 4 Odienna Close, Libreville Street, Wuse 2, Abuja.",
      "info@beetletaxis.com",
      "+234 8090 247 247",
    ],
    ReferenceNumber: "#01101",
    date: "2 April 2021",
  },
  truckDetails: {
    truckNumber: "ADJUFTJWBNSK",
    productDesc:
      "High quality stockpiled sand used in construction and farming",
  },
  body: [
    {
      sn: 1,
      product: "Stockpiled Sand",
      quantity: "High quality stockpiled sand used in construction and farming",
      price: "2 April 2021",
      amount: 30000,
    },
    {
      sn: 2,
      product: "Stockpiled Sand",
      quantity: "High quality stockpiled sand used in construction and farming",
      price: "2 April 2021",
      amount: 31500,
    },
  ],
  footer: {
    subtotal: 61500,
    total: 61500,
  },
};
