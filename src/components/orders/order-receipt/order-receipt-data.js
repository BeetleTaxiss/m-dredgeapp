/**
 * Order Receipt Data object to create dynamic single order receipts which are divided into the header, body and footer sections
 */
export const orderReceiptData = {
  header: {
    logoSection: {
      image: "assets/img/cork-logo.png",
      brandName: "Atop",
    },
    contactSection: [
      "No. 4 Odienna Close, Libreville Street, Wuse 2, Abuja.",
      "info@beetletaxis.com",
      "+234 8090 247 247",
    ],
    ReferenceNumber: "#01101",
    date: "20 Aug 2021",
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
      quantity: 10,
      price: 30000,
      amount: 30000,
    },
    {
      sn: 2,
      product: "Stockpiled Sand",
      quantity: 15,
      price: 31500,
      amount: 31500,
    },
  ],
  footer: {
    subtotal: 31500,
    total: 31500,
  },
};
