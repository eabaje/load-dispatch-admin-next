const menuItemsPublic = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },
  {
    title: "Renew your Subscription",
    path: `/user-subscription/${user.UserId}`,
    icon: "first fas fa-users",
  },
];

const menuItemsAudit = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },
  {
    title: "Activation",
    path: `/user-subscription/${user.UserId}`,
    icon: "first fas fa-users",
  },
];

const menuItemsDriver = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },
  {
    title: "Find Shipments",
    path: `/shipment/?assigned=assigned&companyId=${user.CompanyId}`,
    icon: "first fas fa-car",
  },

  {
    title: "Driver Management",
    icon: "first fas fa-users",
    submenu: [
      {
        title: "Update Driver Profile",
        path: `/driver/driver-action/?userid=${user.UserId}`,
      },
      {
        title: " View Assigned Vehicle To Driver",
        path: `/vehicle/?userid=${user.UserId}`,
      },
    ],
  },
  {
    title: "List All Trips",
    path: `/trip/?userId=${user.UserId}`,
    icon: "first fas fa-road",
  },
];

const menuItemsShipper = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },
  {
    title: "Ship Vehicles",
    icon: "first fas fa-car",
    submenu: [
      {
        title: "Post a Vehicle/Shipment",
        path: `/shipment/shipment-action`,
      },
      {
        title: "My Shipment(s)",
        path: `/shipment/?userId=${user.UserId}`,
      },
    ],
  },

  {
    title: "Connect with Drivers",
    path: `/driver/driver-profile-list`,
    icon: "first fas fa-users",
  },
];

const menuItemsCarrier = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },

  {
    title: "Ship Vehicles",
    icon: "first fas fa-car",

    submenu: [
      {
        title: "Post a Vehicle",
        path: `/shipment/shipment-action`,
      },
      {
        title: "List all Shipments",
        path: `/shipment/`,
      },
      {
        title: "My Shipments",
        path: `/shipment/?userId=${user.UserId}`,
      },

      {
        title: "Vehicle List",
        path: `/vehicle/?companyId=${user.CompanyId}`,
      },
    ],
  },
  {
    title: "Carrier",
    icon: "first fas fa-truck",
    submenu: [
      {
        title: "List carrier Info",
        path: `/carrier/?companyId=${user.CompanyId}`,
      },
      {
        title: "Create carrier Info",
        path: `/carrier/carrier-action`,
      },
      {
        title: " Find all Vehicles",
        path: `/vehicle/?companyId=${user.CompanyId}`,
      },
      {
        title: "Vehicle List",
        path: `/vehicle/?companyId=${user.CompanyId}`,
      },
    ],
  },

  {
    title: "Driver Management",
    icon: "first fas fa-users",
    submenu: [
      {
        title: "List Drivers",
        path: `/driver/?companyId=${user.CompanyId}`,
      },
      {
        title: "Create Driver Profile",
        path: `/driver/driver-action`,
      },
    ],
  },
  {
    title: "Check Trips Made",
    path: `/trip/?companyId=${user.CompanyId}`,
    icon: "first fas fa-road",
  },
];

const menuItemsAdmin = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard/",
    icon: "first fas fa-home",
  },
  {
    title: "Ship Vehicles",
    icon: "first fas fa-car",
    submenu: [
      {
        title: "Post a Vehicle/Shipment",
        path: `/shipment/shipment-action`,
      },
      {
        title: "List all Vehicles",
        path: `/vehicle/`,
      },
      {
        title: "List all Assigned Shipment",
        path: `/shipment/?assigned=assigned`,
      },
      {
        title: "List all sent/delivered Shipment",
        path: `/shipment/?sent=sent`,
      },
    ],
  },
  {
    title: "Carrier",
    icon: "first fas fa-truck",
    submenu: [
      {
        title: "List carrier Info",
        path: `/carrier/`,
      },
      {
        title: "View Drivers",
        path: ` /driver/`,
      },

      {
        title: "View Requests",
        path: `/shipment/shipment-interest-list`,
      },

      {
        title: "View All Company record(s)",
        path: `/company/`,
      },
    ],
  },
  {
    title: "View All Trips made",
    path: "/trip/",
    icon: "first fas fa-road",
  },
  {
    title: "Manage Subscription ",
    icon: "first fas fa-gift",
    submenu: [
      {
        title: "List All Subscription Types",
        path: `/subscription/`,
      },
      {
        title: "Create Subscription",
        path: `/subscription/subscription-action`,
      },
    ],
  },
  {
    title: "Settings ",
    icon: "first fas fa-cog",
    submenu: [
      {
        title: "View list user",
        path: `/user/`,
      },
      {
        title: "View Payment Transaction",
        path: `/payment/`,
      },
    ],
  },
];

export {
  menuItemsPublic,
  menuItemsAudit,
  menuItemsDriver,
  menuItemsCarrier,
  menuItemsAdmin,
  menuItemsShipper,
};
