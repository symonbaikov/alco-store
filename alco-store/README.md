# Alco Store

Alco Store is a web application that allows users to manage their profiles, including changing passwords and editing personal information. The application is built using React and TypeScript, providing a modern and efficient user experience.

## Project Structure

```
alco-store
├── src
│   ├── pages
│   │   └── Profile
│   │       ├── ProfilePage.tsx
│   │       └── ProfilePage.css
│   ├── components
│   │   ├── AdminBadge.tsx
│   │   └── Breadcrumbs
│   │       └── Breadcrumbs.tsx
│   └── context
│       └── AuthContext.tsx
├── Dockerfile
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- User profile management
- Change password functionality
- Edit personal information
- Admin badge for users with admin privileges
- Breadcrumb navigation for easy navigation

## Getting Started

To get started with the Alco Store application, follow these steps:

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd alco-store
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm start
   ```

## Docker

To build and run the application using Docker, follow these steps:

1. Build the Docker image:
   ```
   docker build -t alco-store .
   ```

2. Run the Docker container:
   ```
   docker run -p 3000:3000 alco-store
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.