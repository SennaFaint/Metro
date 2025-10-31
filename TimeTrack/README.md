# TimeTrack v2 - Enhanced Manager Dashboard with Collapsible Store Cards

## Overview

This updated version of TimeTrack features a completely redesigned **Manager Dashboard** with **collapsible store cards** that provide a clean, organized view of all stores. Each store card starts in a simple, compact state and expands to reveal comprehensive details when the manager clicks "Manage Store".

---

## Key Features

### 1. **Collapsible Store Cards**

The manager dashboard now displays stores in a clean, minimal format by default. Each store card shows:

- **Store name** in a beautiful gradient header (purple/blue theme)
- **Active status badge** indicating the store is operational
- **"Manage Store" button** to expand and view detailed information

When you click the **"Manage Store"** button, the card smoothly expands to reveal:

- Quick statistics dashboard
- Employee clock in/out status
- Inventory preview with color-coded quantities
- Latest end of day financial report

The button changes to **"Hide Details"** when expanded, allowing you to collapse the card back to its simple state.

### 2. **Quick Stats Dashboard** 📊

When expanded, each store card displays four key metrics at the top:

- **Total Inventory**: Shows total quantity and number of unique items in stock
- **Low Stock Alerts**: Highlights items needing attention (≤3 units) and out-of-stock count
- **Employee Activity**: Displays total employees who worked today and currently clocked in count
- **EOD Reports**: Shows total reports submitted and the latest submission date

These color-coded info boxes provide instant visibility into store health.

### 3. **Employee Clock In/Out Tracking** 👥

Real-time employee status with visual indicators:

- Shows all employees who clocked in or out today
- **Green badge and border** for currently clocked in employees
- **Red badge and border** for clocked out employees
- Displays clock in/out times and work duration
- Clean, easy-to-read employee cards

### 4. **Inventory Preview** 📦

Quick inventory overview showing the top 8 items:

- Displayed in a responsive grid layout
- **Color-coded quantities** for instant stock level assessment:
  - **Red (0)**: Out of stock - immediate attention needed
  - **Orange (1-3)**: Low stock - reorder soon
  - **Green (4+)**: Adequate stock - no action needed

### 5. **Latest End of Day Report** 💰

Financial summary showing the most recent EOD submission:

- Date of the report
- Cash, Credit, and QPay payment breakdowns
- Total amount prominently displayed
- Professional table format with clear labels

---

## Sample Data Included

The application includes realistic sample data based on the provided Trial.xlsx file:

**Lawrence Store:**
- 110 total inventory items (41 unique products)
- 18 low stock items (13 out of stock)
- 2 employees worked today (Lowell clocked out, Manoj clocked in)
- 2 EOD reports submitted (latest: 10/28/2025)
- Sample inventory: A15, A16, A35, A36, C210, G310, G400, HSI
- Latest EOD total: $1,070.00

**Oakville Store:**
- 43 total inventory items (20 unique products)
- 8 low stock items (8 out of stock)
- 1 employee worked today (Employee clocked out)
- 1 EOD report submitted (latest: 10/29/2025)
- Sample inventory: A15, A16, A35, A36, C210, G310, G400, HSI
- Latest EOD total: $1,195.00

All inventory items are based on real product data from the trial spreadsheet, including phones (A15, A16, A35, A36), tablets, watches (C210, G310, G400), and accessories (HSI).

---

## User Interface Improvements

### Design Enhancements

- **Modern gradient headers** with purple/blue color scheme
- **Smooth expand/collapse animations** for a polished user experience
- **Color-coded information boxes** for quick visual scanning
- **Responsive grid layouts** that adapt to different screen sizes
- **Professional typography** with clear visual hierarchy
- **Subtle shadows and borders** for depth and card separation
- **Hover effects** on buttons for better interactivity

### User Experience

- **Clean initial view** - No information overload, just store names and action buttons
- **On-demand details** - Expand only the stores you need to review
- **Independent cards** - Each store can be expanded/collapsed separately
- **Visual feedback** - Button text and icon change to indicate current state
- **Smooth transitions** - Animated expand/collapse for a professional feel

---

## How to Use

### Installation

1. **Extract the zip file** to your desired location
2. **Open `index.html`** in a modern web browser
3. No installation or server setup required - runs entirely in the browser

### Login Credentials

**Manager Account:**
- Username: `manager`
- Password: `mgr123`

**Store Accounts (for testing):**
- Lawrence Store: `lawrence` / `law123`
- Oakville Store: `oakville` / `oak123`

### Using the Manager Dashboard

1. Login with manager credentials
2. View the list of stores in collapsed state
3. Click **"Manage Store"** on any store to expand and view details
4. Review employee activity, inventory levels, and financial reports
5. Click **"Hide Details"** to collapse the card back to simple view
6. Expand/collapse multiple stores as needed

---

## Technical Details

### Technologies Used

- **HTML5** for semantic structure
- **CSS3** for modern styling and animations
- **Vanilla JavaScript** for interactive functionality
- **LocalStorage** for data persistence

### Browser Compatibility

Works perfectly in all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

### Code Quality

- **Clean, well-organized CSS** with semantic class names
- **Efficient JavaScript** with no dependencies or frameworks
- **Modular design** for easy maintenance and updates
- **Responsive layout** that works on desktop, tablet, and mobile
- **Smooth animations** using CSS transitions

---

## Features Retained

All original TimeTrack features remain fully functional:

- **Employee time clock** with photo capture capability
- **Inventory management** with bulk update functionality
- **End of day report** submission with cash/credit/QPay tracking
- **Activity history** with detailed clock in/out logs
- **Store-specific data** isolation for multi-location management
- **Separate store dashboards** for individual store employees

---

## What Changed from Previous Version

### Before
- Store cards displayed all information by default
- Large, information-dense cards took up significant screen space
- No way to hide details or simplify the view
- Scrolling required to see multiple stores

### After
- **Collapsible cards** start in a simple, compact state
- **"Manage Store" button** expands to reveal detailed information
- **Clean, minimal default view** shows all stores at a glance
- **On-demand details** - expand only what you need to see
- **Independent control** - each store card operates separately
- **Smooth animations** for professional expand/collapse transitions

---

## File Structure

```
TimeTrack_Updated/
├── index.html              # Login page
├── dashboard.html          # Store employee dashboard
├── manager.html            # Manager dashboard (updated)
├── timeclock.html          # Employee time clock
├── inventory.html          # Inventory management
├── eod.html                # End of day report
├── history.html            # Activity history
├── store-employees.html    # Store employee list (manager view)
├── store-eod.html          # Store EOD reports (manager view)
├── store-inventory.html    # Store inventory (manager view)
├── style.css               # Enhanced styles with collapsible cards
├── script.js               # Updated with toggle functionality
└── README.md               # This file
```

---

## Summary

The TimeTrack Manager Dashboard has been transformed into a powerful, user-friendly control center that provides complete visibility into store operations while maintaining a clean, uncluttered interface. The new collapsible card design allows managers to quickly scan all stores and dive into details only when needed, making store management more efficient and enjoyable.

**Key Benefits:**
- ✅ Clean, minimal interface by default
- ✅ Detailed information available on-demand
- ✅ Independent control of each store card
- ✅ Smooth, professional animations
- ✅ All information from the trial data integrated
- ✅ Color-coded alerts for quick decision making
- ✅ Responsive design for any device

Enjoy your enhanced TimeTrack experience!
