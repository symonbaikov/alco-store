# 🍷 Alco Store — Modern Online Alcohol Store

Welcome to Alco Store! This is a modern fullstack application built with React/Node.js featuring multilingual support, reviews, blog, registration, authentication, and a beautiful UI.

---

## 🚀 Main Features

### 📰 Multilingual Blog
- **Dynamic articles**: Articles and images are loaded from the database.
- **Multilingual**: Supports Russian, Bulgarian, and English. Translations are matched by article slug.
- **Universal routing**: Each article is available at `/blog/:slug`.
- **Fallback**: If translation is missing, the original title and date are shown.

### 💬 Reviews
- **Leave a review**: Form with file attachment support (e.g., photo of a receipt).
- **Email delivery**: Review and file are sent to the admin's email.
- **Instant display**: New reviews appear without page reload.
- **Multilingual**: All review texts are translated.

### 👤 Registration & Login
- **Email confirmation**: After registration, a confirmation code is sent to your email.
- **Login via email/password or Google**.
- **Password recovery**: Form to send a recovery email.
- **Password validation**: Checks for length, digits, and letters.

### 🛒 Cart & Catalog
- **Product catalog**: Easy navigation by categories (wine, spirits, beer, etc.).
- **Cart**: Add/remove products, view item count.
- **Product comparison**: Separate section for comparing products.

### 🏷️ Full Site Multilingual Support
- **Language switcher**: Change language at any time, with preference saved.
- **Localization**: All sections (Navbar, Footer, Blog, Reviews, Profile, etc.) are translated.

### 👤 User Profile
- **Edit name**: Supports Google account and email/password.
- **Change password**: With validation and notifications.
- **Logout**.

### 🛡️ Admin Features
- **Admin role**: Badge display, access to advanced features (e.g., blog/review management).

### 📦 Tests
- **Unit tests**: For all key components (Blog, Reviews, Navbar, Footer, Auth, Register, ForgotPassword).
- **Scenario coverage**: Render, validation, success/error cases, form transitions.

---

## 🛠️ Technologies
- **Frontend**: React, TypeScript, Vite, i18next, react-hot-toast, react-router-dom
- **Backend**: Node.js, Express, Prisma, PostgreSQL
- **Testing**: Jest, @testing-library/react
- **Docker**: For local and production deployment

---

## 📚 How to Run the Project

1. **Locally**
   ```sh
   npm install
   npm run dev
   ```
   - Frontend: http://localhost:3000
   - Backend: http://localhost:3001

2. **With Docker**
   ```sh
   docker compose up --build
   ```
   - All services will start automatically.

---

## 📝 Code Structure
- `src/components/` — UI components (Blog, Reviews, Auth, Navbar, Footer, etc.)
- `src/pages/` — Site pages
- `server/` — Server logic, API, Prisma
- `public/locales/` — i18n translations
- `prisma/` — DB migrations and schema

---

## 💡 Highlights
- Beautiful and responsive design
- Full multilingual support
- Real email notifications for reviews and registration
- Modern React/Node best practices
- Unit test coverage for all key scenarios

---

## 🏁 Enjoy using Alco Store!

If you have any questions — feel free to open an issue or contact support 🍷
