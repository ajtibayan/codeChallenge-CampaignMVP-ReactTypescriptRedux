# React + TypeScript + Vite

## MVP Campaign Performance Metrics Dashboard App

Thank you for the opportunity participate and work on this coding challenge! I enjoyed creating this application and solving the challenges of the project requirements. In addition to my 'in code' comments, the following are points I'd like to highlight of my work:

- I scaffolded the app using NPM/Vite utilizing the React/Typescript template
- I used Redux/Redux Toolkit for global state management and Thunks/Axios for API calls but utilized React's Context API to manage color mode state
- Material UI for CSS, component styling and app theme
- I opted to simply use setInterval to poll/ping the API every 5 seconds to update the campaign details as per the project requirements. I realize this is a little crude and not efficient for scaling. For more robust implementations, I would look to web sockets and utilize the serverside code and database to handle the heavy lifting which would also allow for persistent data storage.
- Toast notification for any API request errors
- The app is responsive, accessible by keyboard navigation, elements WCAG/AODA compliant for ARIA roles
- Full transparency, I ran into challenges writing automated (unit/integration) tests for this app. I was only able to get one successful test done for one of the components. The snag I ran into was getting the other components to render properly for me to write thorough tests and assertions for them. I could not get the components to render past the 'loading' state. There was more complexity in setting up the mocks and spy's for the API calls, props and state than I had anticipated. I unfortunately did not have enough time to debug the issues. With that said, I did leave my test setup code (vitest/Jest, RTL, JSDOM, redux provider, mock service worker setup, etc.) along with the failed tests for review. I apologize for leaving that incomplete but I confident that I would eventually be able to debug the issue. One final note on testing, my experience writing automated tests is under the TLD methodology which is why I choose to do that with this challenge as opposed to TDD. With that said, I am familiar with TDD and have really bought into that methodology. I stuck with my comfort zone in this instance but plan to fully adopt a TDD approach as I gain more experience and condifence with it.

## Installation and Test Running Guide

1. Clone Github repo or download and extract files into a local folder on a machine with Node/NPM installed
2. Open a terminal and make sure you are in the folder where the repo was cloned/files were extracted to
3. At the command prompt, type `npm install` and press enter. This will install app dependencies and create node_modules folder
4. Once that's been done, to run the app, type `npm run dev` this will start the server
5. To view the app in browser, go to http://localhost:5173/
6. To stop the server, at the command prompt click CTRL+C on Windows/Mac/Linux
7. To run tests, at the command prompt type `npm run test`. When this command is run, the test runner will continue to run and 'watch' for any file changes and auto run the tests with each change
8. To manually re-run the tests, type `a` and to exit the test process, type `d`
