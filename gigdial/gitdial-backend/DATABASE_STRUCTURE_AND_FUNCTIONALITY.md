# Database Structure Overview

This document explains the organization of the GigDial database. We differentiate data between **Authentication**, **Worker Profiles**, and **Customer Profiles** to ensure clean separation of concerns.

## 1. Core Authentication (Users Table)
The `User` collection is the single source of truth for **Authentication and Access Control**. It contains fields common to *all* users.

- **Role:** Handled by `isProvider` (Customer vs Worker) and `isAdmin`.
- **Primary Fields:** `name`, `email`, `password`, `city`, `phone`.

## 2. Separate Detail Tables
To satisfy the requirement of "different tables for details", we have created specialized profile collections that link back to the main `User` table.

### A. WorkerProfile (`workerprofiles`)
This table holds all the heavy details specific to a Service Provider.
- **Link:** `user` (Foreign Key to Users)
- **Identity:** `aadhaarCard`, `panCard`, `isVerified`.
- **Professional:** `skills`, `portfolio`, `bio`, `experience`.
- **Performance:** `rating`, `numReviews`.
- **Finance:** `walletBalance`.

### B. CustomerProfile (`customerprofiles`)
This table holds details specific to a Customer.
- **Link:** `user` (Foreign Key to Users)
- **Preferences:** `favorites` (List of favorite Gigs).
- **Logistics:** `savedAddresses` (For recurring service locations).
- **Points:** `loyaltyPoints` (Reward system).

### C. AdminProfile (`adminprofiles`)
Specific data for administrators.
- **Link:** `user` (Foreign Key to Users)
- **Security:** `permissions` (Access Control List), `actionLogs`.

## 3. Functional Modules
We have also implemented the following tables to support specific features:

- **Messages:** Real-time chat history between users.
- **Wallet:** Financial ledger for all credit/debit transactions.
- **Notifications:** System alerts for order updates, messages, etc.
- **Reviews:** Dedicated table for managing feedback independent of Gig documents.

## Relationship Diagram (Conceptual)

```
[User] 1 <---> 1 [WorkerProfile]
[User] 1 <---> 1 [CustomerProfile]
[User] 1 <---> N [Order]
[Order] 1 <---> 1 [Wallet Transaction]
[User] 1 <---> N [Message]
```

This structure ensures that our "Sign Up" process is lightweight (creating the User), while "Detail" tables are populated as the user fills out their profile.
