export default {
  translation: {
    common: {
      search: 'Search',
      searchPlaceholder: 'Search for products, customers, sales...',
      notifications: 'Notifications',
      viewAll: 'View All',
      storeName: 'My Store',
      actions: {
        new: 'New',
        edit: 'Edit',
        delete: 'Delete',
        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm',
        back: 'Back',
        export: 'Export',
        import: 'Import',
        filter: 'Filter',
        moreFilters: 'More Filters',
        clearAll: 'Clear All',
        viewDetails: 'View Details',
        markAsRead: 'Mark as Read',
        markAllAsRead: 'Mark All as Read'
      },
      status: {
        active: 'Active',
        inactive: 'Inactive',
        pending: 'Pending',
        completed: 'Completed',
        cancelled: 'Cancelled',
        processing: 'Processing'
      },
      priority: {
        high: 'High',
        medium: 'Medium',
        low: 'Low'
      },
      time: {
        now: 'Now',
        minutesAgo: '{{count}} minute ago',
        minutesAgo_plural: '{{count}} minutes ago',
        hoursAgo: '{{count}} hour ago',
        hoursAgo_plural: '{{count}} hours ago',
        today: 'Today',
        yesterday: 'Yesterday',
        daysAgo: '{{count}} day ago',
        daysAgo_plural: '{{count}} days ago'
      }
    },
    navigation: {
      dashboard: 'Dashboard',
      quicksale: 'Quick Sale',
      scanner: 'Scanner',
      menu: 'Menu',
      sales: 'Sales',
      inventory: 'Inventory',
      finance: 'Finance',
      customers: 'Customers',
      settings: 'Settings',
      activity: 'Activity'
    },
    dashboard: {
      title: 'Dashboard',
      stats: {
        todaySales: 'Today\'s Sales',
        goal: 'Goal: {{amount}} ({{percentage}}%)',
        vsYesterday: '{{percentage}}% vs yesterday',
        newCustomers: 'New Customers ({{month}})',
        newCount: '{{count}} new',
        recurringCount: '{{count}} recurring',
        last24h: '{{new}} new, {{recurring}} recurring in last 24h',
        stockItems: 'Stock Items',
        needsReplenishment: '{{count}} items need replenishment',
        alerts: 'Alerts',
        criticalAlerts: '{{count}} critical alerts',
        totalSales: 'Total Sales',
        averageTicket: 'Average Ticket',
        activeCustomers: 'Active Customers',
        lowStock: 'Low Stock Items'
      },
      activity: {
        newSale: 'New Sale',
        orderAmount: 'Order #{{order}} - {{amount}}',
        lowStock: 'Low Stock Alert',
        productStock: '{{product}} has {{units}} units left',
        newCustomer: 'New Customer',
        customerRegistered: '{{name}} registered'
      },
      recentActivity: 'Recent Activity',
      months: {
        march: 'March'
      }
    },
    sales: {
      title: 'Sales',
      newSale: 'New Sale',
      quickSale: 'Quick Sale',
      recentSales: 'Recent Sales',
      paymentMethods: {
        cash: 'Cash',
        credit: 'Credit Card',
        debit: 'Debit Card',
        pix: 'PIX',
        transfer: 'Bank Transfer'
      }
    },
    inventory: {
      title: 'Inventory',
      products: 'Products',
      categories: 'Categories',
      suppliers: 'Suppliers',
      lowStock: 'Low Stock',
      stockIn: 'Stock In',
      stockOut: 'Stock Out'
    },
    customers: {
      title: 'Customers',
      newCustomer: 'New Customer',
      profile: 'Profile',
      history: 'History',
      type: {
        individual: 'Individual',
        company: 'Company'
      }
    },
    notifications: {
      title: 'Notifications',
      unread: 'Unread',
      markAsRead: 'Mark as read',
      clearAll: 'Clear all',
      empty: 'No notifications',
      types: {
        alert: 'Alert',
        inventory: 'Inventory',
        financial: 'Financial',
        system: 'System'
      }
    },
    errors: {
      general: 'An error occurred. Please try again.',
      notFound: 'Page not found',
      unauthorized: 'Unauthorized access',
      validation: 'Please check the highlighted fields'
    }
  }
};