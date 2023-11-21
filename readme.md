# Playwright Framework for Testing

This is a repository that contains a testing framework done in playwright using typescript. Here you will find different sections to show what playwright is capable of.

## Contents

1. [Installation](#installation)
2. [Execution](#execution)
3. [UI Automation](#ui-automation)
4. [API Automation](#api-automation)

## Installation

To install this repository, clone it and run the following commands in the terminal

```
npm install
npm run install-browsers
```

## Execution

You have different options to run this repository. 

# UI Automation

To run UI testing automation for webpage (WIP) run the following command
```
npm run test
```
If you want to run specifically for a browser, you can add that to the command

the options are: 
- chromium
- firefox
- webkit
```
npm run test:<browser>
```

## Notes

By default, this command will run the tests headless. If you want to run them headed, run the following command:

```
npm run test:headed
```
or

```
npm run test:<browser>:headed
```

## API automation

To run API testing automation for the [Restful Booker API](https://restful-booker.herokuapp.com/apidoc/index.html), run the following command:
```
npm run test:api
```

