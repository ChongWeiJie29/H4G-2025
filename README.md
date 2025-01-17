# Minimart and Voucher System for Muhammadiyah Welfare Home

## Overview
This project addresses the challenge of efficiently managing a Minimart and Voucher System for Muhammadiyah Welfare Home. It provides residents with an intuitive interface to request products and earn vouchers while offering administrators robust tools for management and reporting.

---

## Key Features

### Resident Features

1. **Dashboard**:
   - **Voucher Balances**: Always visible on every page for convenience.
   - **Transaction History**: View logs of earned and spent vouchers, sorted by recency.
   - **Available Products**: Quickly browse items using a rotating carousel.

2. **Minimart**:
   - **Product Requests**: Residents can browse, search, add to cart, and check out items easily.
   - **Preorder Out-of-Stock Products**: A seamless experience for preordering unavailable items.

3. **Voucher Tasks**:
   - Propose tasks with a defined voucher reward amount.

4. **Secure Login**:
   - Access restricted to designated users only.
   - Password setup and reset via secure email links.
   - Passwords stored securely with hashing and salting.

5. **Real-Time Updates**:
   - Instant reflection of changes, such as voucher deductions or refunds.

---

### Admin Features

1. **User Management**:
   - Add new user accounts.
   - Suspend or deactivate accounts, allowing limited access for viewing history.
   - Reset passwords with secure email links.

2. **Inventory Management**:
   - Intuitive interface for adding or removing products.
   - Detailed logs for auditing purposes.

3. **Request Management**:
   - Approve or reject voucher tasks and product requests.
   - Optimized backend ensures changes are instantly reflected in resident accounts.

4. **Reports and Summary**:
   - Weekly logs of purchase requests and voucher tasks.
   - Inventory summaries showing current stock and change history.

---

## Technical Details

### Tech Stack
- **Frontend**: Built with React.js for a dynamic and responsive user interface.
- **Backend**: GraphQL, caching, and connection pooling for optimized data handling.
- **Database**: Securely stores user credentials and transactional data.

### Deployment
- Hosted on free-tier services for cost-effectiveness.
- Note: Initial logins or periods of inactivity may cause slight delays due to server wake-up times (~2 minutes).

---

## Problem Statement
Design and develop a web-based Minimart and Voucher System that:
- Allows residents to request products and earn vouchers seamlessly.
- Provides administrators with effective tools for management and reporting.

---

## Accessibility and User Experience
- **User-Friendly Design**: Familiar interfaces ensure ease of use.
- **Reduced Transaction Time**: Instant reflection of changes for both residents and admins.
- **Secure System**: Only authorized users can access the platform, ensuring data security.

---

## How to Use

### Residents
1. Log in using your unique credentials.
2. Browse available products, add items to your cart, and checkout.
3. Propose tasks to earn vouchers as rewards.

### Admins
1. Manage user accounts and reset passwords when necessary.
2. Add, update, or remove products from the inventory.
3. Approve or reject product and voucher requests with instant updates.
4. Generate detailed reports for auditing and tracking purposes.

---

## Notes
- The system relies on free hosting services. Please allow a brief delay (~2 minutes) during initial logins or after periods of inactivity.
- For any issues or feedback, please contact the development team.

---

## Future Enhancements
- Implementing advanced analytics for inventory trends.
- Expanding voucher functionalities with additional task types.
- Mobile app integration for better accessibility.
