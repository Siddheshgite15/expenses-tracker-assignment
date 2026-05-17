# 💰 Expense Tracker - Modern Financial Management App

A beautiful, feature-rich expense tracking application built with React and Vite. Manage your finances with style, track expenses by category, and gain insights into your spending patterns.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![React](https://img.shields.io/badge/React-19-61dafb)
![Vite](https://img.shields.io/badge/Vite-8-7c3aed)

---

## ✨ Features

### Core Functionality
- ✅ **Add Transactions** - Easily add income and expense transactions
- 💰 **Dual Transaction Types** - Support for both income and expenses
- 📊 **Real-time Balance Calculation** - See your balance updated instantly
- 💾 **Local Storage** - All data persists in your browser

### Advanced Features
- 🎯 **Category Management** - Organize expenses by category (Food, Transport, Shopping, etc.)
- 🔍 **Smart Search** - Find transactions quickly by title
- 🏷️ **Category Filtering** - Filter transactions by specific categories
- ✏️ **Edit Transactions** - Modify existing transactions anytime
- 🗑️ **Delete Transactions** - Remove unwanted transactions
- 📅 **Date & Time Tracking** - Every transaction includes timestamp

### UI/UX Enhancements
- 🌓 **Dark Mode** - Toggle between light and dark themes
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ⚡ **Smooth Animations** - Beautiful transitions and effects
- 🎨 **Modern Design** - Clean, intuitive interface with gradient backgrounds
- ♿ **Accessibility** - Full keyboard navigation and screen reader support

### Analytics & Insights
- 📈 **Statistics Dashboard** - View key metrics at a glance:
  - Total transactions count
  - Average transaction amount
  - Highest transaction
- 📊 **Spending Breakdown** - Visual breakdown of expenses by category
- 📉 **Category-wise Analysis** - See which categories you spend most on

### Data Management
- 📥 **CSV Export** - Export all transactions to CSV format
- 🔄 **Real-time Sync** - Changes sync immediately to localStorage

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd expense-tracker-assignment
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Navigate to `http://localhost:5173` (Vite default)
   - The app will hot-reload on file changes

### Build for Production

```bash
npm run build
```

The optimized build will be created in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

---

## 📖 Usage Guide

### Adding a Transaction

1. Fill in the **Title** field (e.g., "Lunch", "Salary")
2. Enter the **Amount** (₹)
3. Select the **Type** (Income or Expense)
4. Choose a **Category** from the dropdown
5. Click **Add Transaction**

### Editing a Transaction

1. Click the **✏️ Edit** button on any transaction
2. The form will populate with the transaction details
3. Make your changes
4. Click **Update** to save

### Deleting a Transaction

1. Click the **🗑️ Delete** button on any transaction
2. The transaction will be removed immediately

### Filtering & Searching

1. **By Category**: Use the category dropdown to filter
2. **By Title**: Type in the search box to find transactions
3. Combine both for precise filtering

### Viewing Statistics

- Click **📊 Show Stats** to view or **✕** to hide the statistics panel
- See total transactions, average amount, and highest transaction
- View spending breakdown by category with visual progress bars

### Exporting Data

- Click **📥 Export to CSV** to download your transactions
- File is named with the current date

### Toggling Dark Mode

- Click the **🌙** button in the top-right corner to switch themes
- Your theme preference is saved automatically

---

## 🏗️ Project Structure

```
expense-tracker-assignment/
├── src/
│   ├── components/
│   │   ├── Balance.jsx           # Balance display component
│   │   ├── ExpenseForm.jsx       # Transaction form component
│   │   ├── ExpenseList.jsx       # Transaction list component
│   │   ├── TransactionItem.jsx   # Individual transaction display
│   │   ├── Statistics.jsx        # Statistics & insights panel
│   │   └── FilterPanel.jsx       # Search & filter controls
│   ├── models/
│   │   ├── Transaction.js        # Transaction class model
│   │   └── ExpenseTracker.js     # Main tracker logic
│   ├── App.jsx                   # Main app component
│   ├── App.css                   # Styling
│   ├── index.css                 # Global styles
│   └── main.jsx                  # Entry point
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

---

## 💡 Technology Stack

| Technology | Purpose |
|-----------|---------|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **CSS3** | Styling with CSS variables & Grid |
| **LocalStorage API** | Data persistence |
| **ES6+** | JavaScript features |

---

## 🎨 Design Features

### Color Scheme
- **Primary**: `#667eea` → `#764ba2` (Gradient)
- **Success**: `#27ae60` (Income - Green)
- **Danger**: `#e74c3c` (Expense - Red)
- **Info**: `#3498db` (Information)

### Typography
- **Font Family**: System fonts (-apple-system, BlinkMacSystemFont, etc.)
- **Font Sizes**: Responsive scaling from mobile to desktop
- **Font Weights**: 400 (regular), 600 (semibold), 700 (bold), 800 (extra-bold)

### Responsive Breakpoints
- **Desktop**: 900px max-width
- **Tablet**: 768px and below
- **Mobile**: 480px and below

### Animations
- **Slide Down**: Entrance animation for main sections
- **Fade In**: Smooth appearance for statistics
- **Hover Effects**: Interactive feedback on buttons and cards
- **Transform Scale**: Icon scaling on hover

---

## 🔧 Key Components

### Balance Component
Displays current balance with income and expense summary in a beautiful gradient card.

### ExpenseForm Component
Handles adding and editing transactions with category support.

### Statistics Component
Shows spending analytics and category breakdown.

### FilterPanel Component
Provides search and category filtering capabilities.

---

## 📊 Data Model

### Transaction Class

```javascript
class Transaction {
  constructor(id, title, amount, category, date)
  - id: Unique identifier (timestamp)
  - title: Transaction description
  - amount: Positive for income, negative for expenses
  - category: Transaction category
  - date: ISO format date string
  
  Methods:
  - getFormattedDate(): Returns date as "DD Mon YYYY"
  - getFormattedTime(): Returns time as "HH:MM"
}
```

### ExpenseTracker Class

```javascript
class ExpenseTracker {
  Methods:
  - addTransaction(transaction): Add new transaction
  - updateTransaction(id, transaction): Update existing
  - deleteTransaction(id): Remove transaction
  - getTransactions(): Get all transactions
  - getTransactionsByCategory(category): Filter by category
  - getTransactionsByDateRange(start, end): Filter by date
  - getCategories(): Get all used categories
  - getBalance(): Calculate total balance
  - getIncome(): Calculate total income
  - getExpense(): Calculate total expenses
  - getSpendingByCategory(): Get category breakdown
  - searchTransactions(query): Search by title
  - saveTransactions(): Persist to localStorage
}
```

---

## 🌙 Dark Mode Implementation

The app supports seamless theme switching with CSS variables and localStorage persistence. Toggle between light and dark themes instantly while your preference is automatically saved.

---

## 💾 LocalStorage Schema

The app uses two localStorage keys to persist data:

```javascript
// Transactions array
localStorage.transactions

// Dark mode preference
localStorage.darkMode
```

---

## 🚀 Performance Optimizations

- ✅ Efficient re-renders using React hooks
- ✅ CSS Grid for responsive layouts
- ✅ Hardware-accelerated animations
- ✅ Minimal JavaScript bundle with Vite
- ✅ Optimized localStorage access

---

## 🔐 Data Privacy

- All data is stored locally in your browser
- No data is sent to external servers
- Clear browser cache to remove all data
- Export feature for data backup

## AI Tools Used

- Claude : Responsive UI/UX 
- Chatgpt : Documentation 