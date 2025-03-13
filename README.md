# Mindmend74

Welcome to **Mindmend**, an innovative project designed to support individuals with autism through technology. This repository is a blend of JavaScript, TypeScript, and CSS, crafted to provide a seamless and interactive user experience.

![Language Composition](https://quickchart.io/chart?c=%7B%22type%22%3A%22pie%22%2C%22data%22%3A%7B%22labels%22%3A%5B%22JavaScript%22%2C%22TypeScript%22%2C%22CSS%22%5D%2C%22datasets%22%3A%5B%7B%22data%22%3A%5B57.4%2C42.5%2C0.1%5D%2C%22backgroundColor%22%3A%5B%22%23339933%22%2C%22%234C8C4A%22%2C%22%239ACD32%22%5D%7D%5D%7D%7D)

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Backend](#backend)
- [Model](#model)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Mindmend is a comprehensive application aimed at supporting individuals with autism. Our mission is to leverage the power of technology to provide users with tools and resources that can help manage daily challenges and improve overall well-being.

## Features

- **User-Friendly Interface**: Intuitive design for easy navigation.
- **Interactive Tools**: Engage with various exercises and activities tailored for autism support.
- **Personalized Experience**: Tailored recommendations based on user input.
- **Cross-Platform Compatibility**: Available on multiple devices and platforms.
- **Secure and Private**: Your data is safe with us.

## Backend

The backend of Mindmend74 is built using modern technologies to ensure scalability and reliability. It handles user authentication, data storage, and provides APIs for the frontend to interact with.

- **Node.js**: A JavaScript runtime built on Chrome's V8 engine.
- **Express.js**: A minimal and flexible Node.js web application framework.
- **Supabase**: An open-source Firebase alternative that provides a real-time database and authentication.
- **Prisma**: A next-generation ORM for Node.js and TypeScript that helps in managing the database schema and performing database operations.
- **Docker**: Used to containerize the application, ensuring consistency across different environments and simplifying deployment.

### Setting Up the Backend

1. **Clone the repository**:
    ```bash
    git clone https://github.com/akaashsashiraj/Mindmend74.git
    cd Mindmend74/backend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up Supabase**:
    - Create a new project on [Supabase](https://supabase.io/).
    - Copy the API keys and URL to your environment variables.

4. **Set up Prisma**:
    - Initialize Prisma:
        ```bash
        npx prisma init
        ```
    - Update the `prisma/schema.prisma` file with your database connection details.
    - Run the Prisma migration:
        ```bash
        npx prisma migrate dev --name init
        ```

5. **Run the backend using Docker**:
    - Build the Docker image:
        ```bash
        docker build -t mindmend74-backend .
        ```
    - Run the Docker container:
        ```bash
        docker run -p 3000:3000 mindmend74-backend
        ```

The backend will be available at `http://localhost:3000`.


## Model

Mindmend74 incorporates advanced machine learning models to support individuals with autism. These models are trained on diverse and comprehensive datasets to ensure high accuracy and reliability. The key components of our model include:

- **Data Collection**: Gathering data from various sources to create a robust training set.
- **Preprocessing**: Cleaning and normalizing the data to improve model performance.
- **Feature Engineering**: Extracting relevant features that contribute to accurate predictions.
- **Model Training**: Using algorithms such as Random Forest, Support Vector Machines, and Neural Networks to train the models.
- **Validation and Testing**: Evaluating the models on separate validation and test sets to ensure they generalize well to new data.
- **Continuous Improvement**: Regularly updating the models with new data and techniques to maintain and improve their performance.


## Getting Started

To get started with Mindmend74, follow these steps:

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/akaashsashiraj/Mindmend74.git
    cd Mindmend74
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start the application**:
    ```bash
    npx expo start
    ```

In the output, you'll find options to open the app in a:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

### Resetting the Project

If you want to start fresh, run:
```bash
npm run reset-project
```
This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Contact

For any questions or inquiries, please contact us at [mindmend@gmail.com](mailto:mindmend@gmail.com).

Thank you for visiting Mindmend74! We hope our project helps you in your journey towards better mental health.
