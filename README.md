# InstaJAM

## Introduction
This is a demo app that (more or less) covers the basic features of v1 Instagram.  

It's built using React Native with Expo (managed workflow) and the backend it talks to is a Laravel based REST API.  It will perform the following functions:
- User registration
- User login
- Image upload
- "Favouriting" images
- Viewing favourite images in on a separate screen
- View an image in a modal with the ability to see/hide image metadata

## Installation
Note: Before running the app, you will need to have the backend API up and running.  See it's repo for details.  Once you've done that, come back here.

Your machine will need to be setup to build and run expo apps.  Information on setup of Expo and needed dependencies can be found here: https://docs.expo.dev/get-started/installation.
Once your machine is ready, clone the repo to your local machine.  Open your favourite terminal, and in the repo directory run:

```sh
yarn install
```

Once this has finished, duplicate the `.env.example` file - renaming it `.env`. 

```sh
cp .env.example .env
```

Open your .env file in your text editor/IDE of choice, and change the `API_URL` to the address the backend API is running from e.g`

```env
# Do NOT add a trailing slash, and do not forget "/api/v1"
API_URL=http://instajam-api.test/api/v1
```

Once done, run `yarn start` to get metro running.  After that: press `i` boot up and install the app on an iOS simulator (NOTE: I've only
tested on iPhones so I'm not sure of results on an iPad), or press `a` to boot into an android emulator.  Note, your networking settings will 
need to be configured to talk to your local machine, as android has some funny ideas about local networking.

# Known Issues
A number of things either uncompleted or problems that may be noticable:
- Form validation.  There is no clientside form validation, I have not had time to implement any.  There is validation serverside, but that's it for now.
- You may run into issues when signing into the app where no images will appear on the homepage.  Pull down to refresh and (assuming you have some) your images should load.  I think this may be part of a race condition, but I'm still debugging the issue
- There are probably a few opportunities for performance enhancements and code refactoring.  I had to write instagram from scratch in a week, sacrifices had to be made.
- Error handling.  Needs to be much better when serverside validation fails
- Typescript warnings, more comprehensive typing. Far too many to tackle in the time available