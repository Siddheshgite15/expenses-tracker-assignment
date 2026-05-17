# 💰 Expense Tracker - Complete Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Features](#features)
3. [Project Structure](#project-structure)
4. [Component Architecture](#component-architecture)
5. [Model Classes](#model-classes)
6. [Usage Guide](#usage-guide)
7. [Styling & Theme](#styling--theme)
8. [Advanced Features](#advanced-features)

---

## Overview

**Expense Tracker** is a modern, fully-featured personal finance management application built with React and Vite. It helps users track their income and expenses with an intuitive interface, advanced filtering capabilities, and beautiful visualizations.

### Key Highlights
- 🎨 **Modern UI/Design** - Beautiful gradient backgrounds, smooth animations, and responsive layout
- 🌙 **Dark Mode Support** - Toggle between light and dark themes
- 📊 **Rich Statistics** - Visual breakdown of spending by category
- 🔍 **Advanced Filtering** - Filter by category, search by transaction title
- 💾 **Local Storage** - All data persists in browser's localStorage
- 📥 **Export to CSV** - Download all transactions as CSV file
- ✏️ **Edit Transactions** - Update existing transactions
- 📱 **Fully Responsive** - Works perfectly on desktop, tablet, and mobile

---

## Features

### Core Features
- **Add Transactions** - Create income or expense transactions with title, amount, and category
- **Delete Transactions** - Remove unwanted transactions
- **Edit Transactions** - Modify existing transaction details
- **View Balance** - Real-time balance calculation
- **Income/Expense Summary** - Quick overview of total income and expenses

### Advanced Features
- **Category Management** - Automatic category tracking and filtering
- **Statistics Dashboard** - 
  - Total transactions count
  - Average transaction amount
  - Highest transaction amount
  - Spending breakdown by category with visual progress bars
- **Search & Filter** - Find transactions by keyword or category
- **Dark Mode** - Toggle between light and dark themes (persisted)
- **CSV Export** - Export all transactions for external analysis
- **Responsive Design** - Optimized for all screen sizes

---

## Project Structure

```
expense-tracker-assignment/
├── src/
│   ├── models/
│   │   ├── Transaction.js       # Transaction data model
│   │   └── ExpenseTracker.js    # Main business logic
│   ├── components/
│   │   ├── Balance.jsx          # Balance display component
│   │   ├── ExpenseForm.jsx      # Add/Edit transaction form
│   │   ├── ExpenseList.jsx      # Transaction list container
│   │   ├── TransactionItem.jsx  # Individual transaction item
│   │   ├── Statistics.jsx       # Statistics & insights panel
│   │   └── FilterPanel.jsx      # Search & filter controls
│   ├── App.jsx                  # Main app component
│   ├── App.css                  # Global styles & theme
│   ├── index.css                # Base styles
│   └── main.jsx                 # React entry point
├── public/
├── index.html
├── package.json
├── vite.config.js
└── DOCUMENTATION.md             # This file
```

---

## Component Architecture

### 1. **App.jsx** - Main Application Component
The root component that manages:
- Application state (transactions, theme, editing mode)
- Dark mode toggle and persistence
- Transaction filtering and searching
- CSV export functionality
- Component orchestration

**Key State:**
```javascript
- transactions: Array of all transactions
- isDarkMode: Boolean for theme
- editingId: ID of transaction being edited
- filteredCategory: Current category filter
- searchQuery: Current search term
- showStats: Statistics panel visibility
```

---

### 2. **Balance.jsx** - Financial Summary Display
Displays the current financial status with:
- Total balance (with color coding: green for positive, red for negative)
- Total income (with icon)
- Total expenses (with icon)

**Props:**
```javascript
{
  balance: number,     // Current balance
  income: number,      // Total income
  expense: number      // Total expenses
}
```

---

### 3. **ExpenseForm.jsx** - Add/Edit Transaction Form
Comprehensive form for transaction management with:
- Title input field
- Amount input with step validation
- Income/Expense radio buttons
- Category dropdown (dynamic based on type)
- Edit/Add/Cancel buttons

**Features:**
- Form validation (title and amount required)
- Automatic category switching based on transaction type
- Edit mode with cancel functionality
- Clean form reset after submission

**Props:**
```javascript
{
  addTransaction: Function,           // Called with (title, amount, category)
  editingId: number|null,            // ID of transaction being edited
  editingTransaction: Object|null,   // Transaction data for editing
  onCancelEdit: Function,            // Called to cancel editing
  tracker: ExpenseTracker            // Tracker instance
}
```

---

### 4. **ExpenseList.jsx** - Transaction History List
Container component that displays all transactions with:
- Transaction list rendering
- Empty state message
- Edit and delete functionality

**Props:**
```javascript
{
  transactions: Array,              // Array of transactions to display
  deleteTransaction: Function,      // Delete callback
  editTransaction: Function,        // Edit callback
  editingId: number|null           // Currently editing transaction ID
}
```

---

### 5. **TransactionItem.jsx** - Individual Transaction Item
Displays a single transaction with:
- Transaction title
- Category badge
- Date and time
- Amount (color-coded)
- Edit and delete buttons

**Features:**
- Color-coded income (green) vs expense (red)
- Formatted date and time display
- Hover effects and animations
- Responsive design

**Props:**
```javascript
{
  transaction: Object,           // Transaction data
  deleteTransaction: Function,   // Delete callback
  editTransaction: Function,     // Edit callback
  isEditing: boolean            // Is this transaction being edited
}
```

---

### 6. **Statistics.jsx** - Analytics Dashboard
Comprehensive statistics panel showing:
- Total transactions count
- Average transaction amount
- Highest transaction details
- Category-wise spending breakdown with visual bars

**Features:**
- Interactive close button
- Real-time calculations
- Visual category progress bars
- Sorted by spending amount

---

### 7. **FilterPanel.jsx** - Search & Filter Controls
Provides filtering capabilities:
- Category dropdown filter
- Search input with clear button
- Real-time filtering

**Props:**
```javascript
{
  categories: Array,              // Available categories
  selectedCategory: string,       // Currently selected category
  onCategoryChange: Function,     // Category filter callback
  searchQuery: string,            // Current search term
  onSearchChange: Function        // Search callback
}
```

---

## Model Classes

### Transaction Model
Represents a single financial transaction.

**Constructor:**
```javascript
new Transaction(id, title, amount, category, date)
```

**Properties:**
- `id`: Unique timestamp identifier
- `title`: Transaction description
- `amount`: Transaction amount (positive for income, negative for expense)
- `category`: Transaction category
- `date`: ISO string timestamp

**Methods:**
- `getFormattedDate()` - Returns formatted date (e.g., "May 17, 2026")
- `getFormattedTime()` - Returns formatted time (e.g., "02:30 PM")

---

### ExpenseTracker Model
Main business logic class for managing transactions.

**Methods:**

#### Transaction Management
- `addTransaction(transaction)` - Add new transaction
- `updateTransaction(id, transaction)` - Update existing transaction
- `deleteTransaction(id)` - Delete transaction
- `getTransactions()` - Get all transactions

#### Filtering & Search
- `getTransactionsByCategory(category)` - Filter by category
- `getTransactionsByDateRange(start, end)` - Filter by date range
- `searchTransactions(query)` - Search by title
- `getCategories()` - Get all used categories

#### Analytics
- `getBalance()` - Calculate total balance
- `getIncome()` - Calculate total income
- `getExpense()` - Calculate total expenses
- `getSpendingByCategory()` - Get category-wise breakdown

#### Persistence
- `saveTransactions()` - Persist to localStorage

**Example Usage:**
```javascript
const tracker = new ExpenseTracker();

// Add transaction
const transaction = new Transaction(
  Date.now(),
  "Lunch",
  -300,
  "Food"
);
tracker.addTransaction(transaction);

// Get balance
const balance = tracker.getBalance();

// Get spending by category
const spending = tracker.getSpendingByCategory();
```

---

## Usage Guide

### Getting Started

1. **Install Dependencies:**
```bash
npm install
```

2. **Start Development Server:**
```bash
npm run dev
```

3. **Build for Production:**
```bash
npm run build
```

### Adding a Transaction

1. Click on the form at the top
2. Enter transaction title (e.g., "Lunch", "Salary")
3. Enter amount
4. Select "Income" or "Expense"
5. Choose category from dropdown
6. Click "✓ Add Transaction"

### Editing a Transaction

1. Hover over a transaction in the list
2. Click the ✏️ (edit) button
3. Form will populate with transaction details
4. Modify as needed
5. Click "✓ Update" to save

### Filtering Transactions

1. Use the **Category Filter** dropdown to show only transactions from a specific category
2. Use the **Search Box** to find transactions by title
3. Both filters work together

### Viewing Statistics

1. Statistics panel appears below the balance section
2. Shows transaction count, average amount, and highest transaction
3. Displays category breakdown with visual progress bars
4. Click **✕** to close the statistics panel

### Exporting Data

1. Click **"📥 Export to CSV"** button
2. File will download with name format: `expense-tracker-YYYY-MM-DD.csv`
3. Open in Excel or any spreadsheet application

### Toggling Dark Mode

- Click the **🌙** icon in the header to toggle dark mode
- Theme preference is saved automatically

---

## Styling & Theme

### Color System

**Light Mode:**
- Primary background: White
- Secondary background: Light gray
- Text: Dark gray
- Borders: Light gray

**Dark Mode:**
- Primary background: Dark blue-gray
- Secondary background: Darker blue-gray
- Text: Light gray
- Borders: Medium gray

### CSS Variables
```css
/* Colors */
--primary: #2980b9
--success: #27ae60
--danger: #e74c3c
--info: #3498db

/* Gradients */
--gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%)
--gradient-income: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)
--gradient-expense: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)
```

### Responsive Breakpoints
- **Desktop:** 1024px and above
- **Tablet:** 768px to 1023px
- **Mobile:** Below 768px

---

## Advanced Features

### Local Storage Persistence
All transactions are automatically saved to browser's localStorage:
```javascript
// Data key: "transactions"
localStorage.setItem("transactions", JSON.stringify(transactions));
```

### Dark Mode Persistence
Theme preference is saved:
```javascript
localStorage.setItem("darkMode", isDarkMode);
```

### Category Auto-Detection
Categories are automatically extracted from transactions:
```javascript
// Expense categories
["Food", "Transport", "Entertainment", "Utilities", "Shopping", "Health", "Education", "Other"]

// Income categories
["Salary", "Freelance", "Investment", "Bonus", "Other"]
```

### Amount Formatting
- Always displayed to 2 decimal places
- Currency symbol: ₹ (Indian Rupee)
- Example: ₹ 1,234.50

### CSV Export Format
```
Date,Title,Category,Amount
"May 17, 2026","Lunch","Food","-300"
"May 16, 2026","Salary","Salary","50000"
```

---

## Accessibility Features

- ✓ Semantic HTML structure
- ✓ ARIA labels on interactive elements
- ✓ Keyboard navigation support
- ✓ Focus-visible styles for keyboard users
- ✓ Color contrast compliance
- ✓ Theme support for reduced motion preference

---

## Performance Optimizations

- React hooks for efficient state management
- Memoization of expensive calculations
- CSS animations using GPU-accelerated transforms
- Lazy loading of statistics on demand
- Efficient filtering without unnecessary re-renders

---

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## Known Limitations & Future Enhancements

### Current Limitations
- Single user (no authentication)
- Local storage only (no cloud sync)
- No recurring transactions
- No budgeting features

### Planned Features
- Multi-user support with authentication
- Cloud synchronization
- Recurring transactions
- Budget creation and tracking
- Monthly/yearly reports
- Data visualization charts
- Mobile app version
- Notifications and reminders

---

## Troubleshooting

### Transactions Not Showing
- Check if localStorage is enabled in browser
- Open browser DevTools > Application > Local Storage
- Look for "transactions" key

### Dark Mode Not Working
- Clear browser cache
- Verify localStorage has "darkMode" key
- Check browser theme settings

### Export Not Working
- Ensure browser allows downloads
- Check popup blocker settings
- Verify transactions exist before exporting

---

## Code Examples

### Creating and Adding a Transaction
```javascript
import Transaction from './models/Transaction';
import ExpenseTracker from './models/ExpenseTracker';

const tracker = new ExpenseTracker();

const lunch = new Transaction(
  Date.now(),
  "Lunch",
  -300,
  "Food"
);

tracker.addTransaction(lunch);
```

### Getting Financial Summary
```javascript
const balance = tracker.getBalance();
const income = tracker.getIncome();
const expenses = tracker.getExpense();

console.log(`Balance: ₹${balance}`);
console.log(`Income: ₹${income}`);
console.log(`Expenses: ₹${Math.abs(expenses)}`);
```

### Filtering and Searching
```javascript
// By category
const foodExpenses = tracker.getTransactionsByCategory("Food");

// By search
const results = tracker.searchTransactions("coffee");

// By date range
const thisMonth = tracker.getTransactionsByDateRange(
  new Date(2026, 4, 1),
  new Date(2026, 4, 31)
);
```

---

## Contributing

To extend this project:

1. Add new categories in ExpenseForm.jsx
2. Create new statistics components in Statistics.jsx
3. Add new filtering options in FilterPanel.jsx
4. Extend ExpenseTracker model with new analytics methods
5. Update CSS variables for theme customization

---

## License

This project is provided as-is for educational and personal use.

---

## Support

For issues or questions, review the code comments and this documentation. Each component includes JSDoc comments explaining functionality.

---

**Last Updated:** May 17, 2026
**Version:** 1.0.0
