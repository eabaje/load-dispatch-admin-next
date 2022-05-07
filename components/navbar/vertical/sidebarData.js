



const menuItemsPublic = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard",
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
    path: "/dashboard",
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
    path: "/dashboard",
    icon: "first fas fa-home",
  },
  {
    title: "Find all Vehicles",
    path: "/list-all-shipments",
    icon: "first fas fa-car",
  },

  {
    title: "Driver Management",
    icon: "first fas fa-users",
    submenu: [
      {
        title: "Update Driver Profile",
        path: `/edit-driver-info/${user.UserId}`,
      },
      {
        title: " View Assigned Vehicle To Driver",
        path: `/list-assign-vehicle-driver/${user.UserId}`,
      },
    ],
  },
  {
    title: "List All Trips",
    path: `/list-trip-info/${user.UserId}`,
    icon: "first fas fa-road",
  },
];

const menuItemsShipper = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "first fas fa-home",
  },
  {
    title: "Ship Vehicles",
    icon: "first fas fa-car",
    submenu: [
      {
        title: "Post a Vehicle/Shipment",
        path: `/add-shipment`,
      },
      {
        title: "My Shipment(s)",
        path: `/my-shipments-info/${user.UserId}`,
      },
    ],
  },

  {
    title: "Connect with Drivers",
    path: `/list-drivers-profile`,
    icon: "first fas fa-users",
  },
];

const menuItemsCarrier = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "first fas fa-home",
  },
  {
    title: "My Shipments",
    path:`/my-shipments-info/${user.UserId}`,
    icon: "first fas fa-car",
  },
  {
    title: "Ship Vehicles",
    icon: "first fas fa-car",
   

    submenu: [
      {
        title: "Post a Vehicle",
        path: `/add-shipment`,
      },
      {
        title: "List all Shipments",
        path: `/list-all-shipments`,
      },
      {
        title: "My Shipments",
        path: `/my-shipments-info/${user.UserId}`,
      },
     
      {
        title: "Vehicle List",
        path: `/list-vehicles-info/${user.CompanyId}`,
      },
    ],
  },
  {
    title: "Carrier",
    icon: "first fas fa-truck",
    submenu: [
       {
        title: "List carrier Info",
        path: `/list-carriers-info/${user.CompanyId}`,
      },
      {
        title: "Create carrier Info",
        path: `/add-carrier`,
      },
      {
        title: " Find all Vehicles",
        path: `/list-all-shipments`,
      },
      {
        title: "Vehicle List",
        path: `/list-vehicles-info/${user.CompanyId}`,
      },
    ],
  },

  {
    title: "Driver Management",
    icon: "first fas fa-users",
    submenu: [
      {
        title: "List Drivers",
        path: `/list-carrier-drivers-info/${user.CompanyId}`,
      },
      {
        title: "Create Driver Profile",
        path: `/add-driver-info`,
      },
    ],
  },
  {
    title: "Check Trips Made",
    path: `/list-trip/${user.CompanyId}`,
    icon: "first fas fa-road",
  },
];

const menuItemsAdmin = (user) => [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: "first fas fa-home",
  },
  {
    title: "Ship Vehicles",
    icon: "first fas fa-car",
    submenu: [
      {
        title: "Post a Vehicle/Shipment",
        path: `/add-shipment`,
      },
      {
        title: "List all Vehicles",
        path: `/list-all-shipments`,
      },
      {
        title: "List all Assigned Shipment",
        path: `/list-all-shipments-assigned/assigned`,
      },
      {
        title: "List all sent/delivered Shipment",
        path: `/list-all-shipments-sent/sent`,
      },
    ],
  },
  {
    title: "Carrier",
    icon: "first fas fa-truck",
    submenu: [
      {
        title: "List carrier Info",
        path: `/list-carriers`,
      },
      {
        title: "View Drivers",
        path: ` /list-drivers-info`,
      },

      {
        title: "View Requests",
        path: `/view-vehicle-request`,
      },
      {
        title: "Connect to Shippers",
        path: `/list-vehicle`,
      },
      {
        title: "View All Company record(s)",
        path: `/list-company-info`,
      },
    ],
  },
  {
    title: "View All Trips made",
    path: "/list-trip",
    icon: "first fas fa-road",
  },
  {
    title: "Manage Subscription ",
    icon: "first fas fa-gift",
    submenu: [
      {
        title: "List All Subscription Types",
        path: `/list-subscription`,
      },
      {
        title: "Create Subscription",
        path: `/add-subscription`,
      },
    ],
  },
  {
    title: "Settings ",
    icon: "first fas fa-cog",
    submenu: [
      {
        title: "View list user",
        path: `/list-users`,
      },
      {
        title: "View Payment Transaction",
        path: `/list-payment`,
      },
    ],
  },
];

export {menuItemsPublic,menuItemsAudit,menuItemsDriver, menuItemsCarrier, menuItemsAdmin, menuItemsShipper };
