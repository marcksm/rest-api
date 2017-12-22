
# REST API in Node
This is an API REST in NodeJS for my application in theVelops following their criteria.

## Demo:

Check demo deployed in Google Cloud Computer Engine of the API on the link below:

http://35.227.122.182:4000

(depending when you are accessing, it may not be up anymore)

## Dependencies

* Unix/Linux machine
* Git
* NodeJS
* Mongo DB set up and running (for local only)
* npm

## Installing localy via NPM

Clone this repository

**(check npm permissions to avoid error : EACCES)
```
git clone https://github.com/marcksm/rest-api.git
cd rest-api
npm install
```
## Running localy via NPM

Inside the rest-api folder
For development only (Mongo DB must be running locale) :
```
npm run dev
```
For production only (Mongo DB in mLab online):
```
npm start
```
## Running tests via NPM

by default is set to use mLab mongo database, so 

Inside the rest-api folder
```
npm test
```
