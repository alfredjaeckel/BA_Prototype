# Prototype for Bachelor Thesis

This is a prototype for my Bachelor Thesis in Computer Science at the Freie Universität Berlin, titled **"Assisting the Forecast of Postoperative Delirium by Creating a User Interface for Decision Trees"**.

## Purpose

The purpose of this prototype is to enable usability testing of the design,  and the implementation focuses solely on the front-end functionality. To allow testing with different scenarios, the prototype loads patient data from two JSON files, which can easily be modified. Contexts, partially initiated from JSON files, are used to store cue values, track progress through the tool, take notes on the notes page, and manage other values required for the application's functionality.
The prototype is implemented in using React Native and the Expo framework.

## Running the Prototype

### Prerequisites

- **Node.js**: Install using Homebrew  `$brew install node`

- **Expo**: `npm install expo`

- **Xcode and IOS environment** - required for simulation on macOS

- **ExpoGo App** -required for on device testing, device and computer need to be connected to the same network.

### Run the Prototype

`npx expo start`

Sann the QR code displayed in the terminal with your mobile device.

Press i for simulating IOS



These instruction are only tested for macOS steps on other operating systems might vary slightly.

If you have any questions or feedback, please contact me at alfredjackel@zedat.fu-berlin.de