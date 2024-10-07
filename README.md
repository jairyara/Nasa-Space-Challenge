# Nasa Space Apps Challenge 2024 
## Team: Sapientiam ETITC - Tell us story climate

## Description
This project is a web application built with React and TypeScript. It uses a global state management system to handle user and points data. The application fetches user data and their corresponding points from a Supabase database and displays a ranking table.

## Technologies Used
- TypeScript
- React
- npm
- Supabase
- Tailwind CSS
- Zustand

## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/jairyara/Nasa-Space-Challenge
    ```
2. Navigate to the project directory:
    ```sh
    cd Nasa Space Challenge
    ```
3. Install dependencies:
    ```sh
    npm install
    ```

## Usage
1. Start the development server:
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:5173`.

## Features
- Fetches user data and points from Supabase.
- Displays a ranking table with user avatars, nicknames, and points.
- Highlights the current user in the ranking table.

## File Structure
- `src/views/End.tsx`: Main component that fetches and displays user data and points.
- `src/components/Avatar.tsx`: Component that displays a user avatar.
- `src/context/globalState.ts`: Contains the global state management for user and points.

## Contributing
1. Fork the repository.
2. Create a new branch:
    ```sh
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```sh
    git commit -m "Description of changes"
    ```
4. Push to the branch:
    ```sh
    git push origin feature-branch
    ```
5. Open a pull request.

## Link demo
[Link demo](https://nasa-space-challenge.pages.dev/)

## License
This project is licensed under the MIT License.
