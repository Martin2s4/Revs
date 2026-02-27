export const mockPayments = [
  { id: 'PAY-1029', citizen: 'John Doe', amount: 150.00, date: '2023-10-25', department: 'Lands', status: 'Completed' },
  { id: 'PAY-1030', citizen: 'Jane Smith', amount: 45.50, date: '2023-10-25', department: 'Markets', status: 'Pending' },
  { id: 'PAY-1031', citizen: 'Acme Corp', amount: 1250.00, date: '2023-10-24', department: 'Trade', status: 'Completed' },
  { id: 'PAY-1032', citizen: 'Michael Johnson', amount: 25.00, date: '2023-10-24', department: 'Transport', status: 'Failed' },
  { id: 'PAY-1033', citizen: 'Sarah Williams', amount: 300.00, date: '2023-10-23', department: 'Lands', status: 'Completed' },
  { id: 'PAY-1034', citizen: 'David Brown', amount: 15.00, date: '2023-10-23', department: 'Transport', status: 'Completed' },
  { id: 'PAY-1035', citizen: 'Tech Solutions Ltd', amount: 550.00, date: '2023-10-22', department: 'Trade', status: 'Completed' },
  { id: 'PAY-1036', citizen: 'Mary Davis', amount: 120.00, date: '2023-10-22', department: 'Health', status: 'Pending' },
  { id: 'PAY-1037', citizen: 'Robert Wilson', amount: 75.00, date: '2023-10-21', department: 'Markets', status: 'Completed' },
  { id: 'PAY-1038', citizen: 'Global Logistics', amount: 890.00, date: '2023-10-21', department: 'Transport', status: 'Completed' },
];

export const mockCitizens = [
  { id: 'CIT-001', name: 'John Doe', idNumber: '12345678', phone: '+254 712 345678', registered: '2023-01-15', status: 'Active' },
  { id: 'CIT-002', name: 'Jane Smith', idNumber: '23456789', phone: '+254 723 456789', registered: '2023-02-20', status: 'Active' },
  { id: 'CIT-003', name: 'Michael Johnson', idNumber: '34567890', phone: '+254 734 567890', registered: '2023-03-10', status: 'Inactive' },
  { id: 'CIT-004', name: 'Sarah Williams', idNumber: '45678901', phone: '+254 745 678901', registered: '2023-04-05', status: 'Active' },
  { id: 'CIT-005', name: 'David Brown', idNumber: '56789012', phone: '+254 756 789012', registered: '2023-05-12', status: 'Active' },
  { id: 'CIT-006', name: 'Mary Davis', idNumber: '67890123', phone: '+254 767 890123', registered: '2023-06-18', status: 'Active' },
  { id: 'CIT-007', name: 'Robert Wilson', idNumber: '78901234', phone: '+254 778 901234', registered: '2023-07-22', status: 'Active' },
];

export const mockDepartments = [
  { id: 'DEP-01', name: 'Lands & Physical Planning', target: 500000, collected: 425000, transactions: 1250, icon: 'Map' },
  { id: 'DEP-02', name: 'Trade & Enterprise', target: 750000, collected: 680000, transactions: 3420, icon: 'Briefcase' },
  { id: 'DEP-03', name: 'Transport & Infrastructure', target: 300000, collected: 150000, transactions: 890, icon: 'Bus' },
  { id: 'DEP-04', name: 'Health Services', target: 200000, collected: 195000, transactions: 5600, icon: 'HeartPulse' },
  { id: 'DEP-05', name: 'Agriculture & Markets', target: 150000, collected: 120000, transactions: 430, icon: 'Wheat' },
];
