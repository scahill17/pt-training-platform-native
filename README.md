# Personal Training Tracker Mobile Application

## Overview

The Personal Training Tracker is a mobile application built to help personal trainers and their clients manage workouts, track progress, and set fitness goals. It provides a seamless interface to view workout schedules, log completed exercises, analyse performance trends, and monitor progress. Designed for convenience and functionality, this application enables trainers and trainees to stay engaged with their fitness goals.

## Features for Functionality Criteria

- **User Authentication**:
  - Sign up and log in with user profiles, account validation is copmleted against email address only. 
  - User data and progress are saved correctly into my database.

- **Workout Management**:
  - Schedule and manage workout sessions with a calendar interface.
  - View, create, or update workout sessions for specific dates.
  - Track workouts in real-time, marking exercises as completed while recording reps and weights.

- **Exercise Library**:
  - Includes an extensive list of exercises to select for each workout session.
  - Users can add new exercises dynamically through workout management screens.
  - This library allows flexibility in exercise selection while maintaining an organised record.

- **Analytics Dashboard**:
  - Analyse workout trends and exercise performance with real-time data.
  - Performance data includes metrics such as total workouts, weights lifted, and average performances per session.
  - Switch between different analytics views to focus on specific exercises or general progress over time.

- **Profile Management**:
  - Update personal details, set fitness goals, and manage medical conditions.
    
- **Centralised API Management**:
  - The app uses a centralised API layer to manage data, ensuring efficient data handling and secure interactions.
  - All API interactions are streamlined within a single interface, enhancing maintainability and data flow efficiency.

## Technologies Used

### Frontend
- **React Native**
- **Expo**
- **CSS-in-JS**

### API
- **PostgREST API**: Handles interactions between the app and the backend database.
- **AsyncStorage**: For managing user session data locally on the device.

### Database
- **PostgreSQL**: Used to store all user and workout data, including key tables such as:
  - `users`: Stores user information (both trainers and clients).
  - `athletes`: Contains athlete-specific data, such as age and fitness goals.
  - `exercises`: Holds a list of all exercises available within the app.
  - `workout_sessions`: Tracks individual workout sessions by date.
  - `workout_details`: Logs exercise details for each session.
  - `workout_sets`: Records set-by-set progress, including reps and weight.
  - `exercise_performance`: Tracks performance metrics per exercise and athlete.
  - `workout_trends`: Aggregates data to show long-term trends in workout performance.

## Installation and Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/scahill17/pt-training-platform-native.git
    cd pt-training-platform-native
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the app on a simulator or physical device:
    ```bash
    npx expo start
    ```

## Login and Credentials 
- Users can create their own account if they wish. Be sure to add your own exercises into each day and 'fake' complete the sessions in multiple weeks if you want to see the analytics working functionally.
- The test account that I used was under anthonylonghurst12345@gmail.com. I recommend using this to see full functionality fully applied, however the information in the database for this account isn't copmletely logical.

## Screen Overview

### Sign In / Sign Up
- Allows users to create a new account or sign in with an existing profile.
- After logging in, users are directed to the Home Screen.

### Home Screen
- A navigation hub, allowing users to access Training, Analytics, and Profile sections.

### Training Screen
- Calendar interface to view and manage workout sessions.
- Each date can contain a workout session, accessible by selecting that date on the calendar.

### Start Workout Screen
- Tracks each exercise in a workout, including sets, reps, and weights.
- Enables real-time tracking of workout progress.

### Add Workout Screen
- Allows the addition of new workout sessions by selecting exercises, sets, and reps.
- Exercises can be added from the library or created directly.

### Analytics Screen
- Tracks performance trends and workout progress over time.
- Includes a toggle between metrics for specific exercises and overall performance.

### Profile Screen
- Displays and allows editing of user profile details, such as fitness goals, age, and medical conditions.

---

## Generative AI Disclaimer
Generative AI has been employed throughout the development of this project to enhance code consistency, readability, and component refactoring, such as refactoring specific pieces from my web app to suit my native app. It also assisted in debugging.


