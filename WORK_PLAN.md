# Work Plan: A-Family-Dashboard

This document outlines the work to be done to improve the A-Family-Dashboard application.

## Phase 1: Configuration and Setup

*   [x] Create a `.env` file to store all API keys and configuration details.
*   [x] Update the code to use the environment variables.
*   [x] Add instructions to the `README.md` on how to set up the environment variables.

## Phase 2: Authentication

*   [x] Implement user authentication using Firebase Authentication with Google as a provider.
*   [x] Create a login page.
*   [x] Protect the dashboard page so that only authenticated users can access it.
*   [x] Update the Firestore rules to only allow authenticated users to read and write their own data.

## Phase 3: Feature Improvements

*   [x] Make the postcode in the `Weather.jsx` component configurable.
*   [x] Add more robust error handling to all components.
*   [x] Improve the UI/UX of the application.

## Phase 4: Testing

*   [ ] Add unit tests for all components.
*   [ ] Add integration tests for the main application flows.