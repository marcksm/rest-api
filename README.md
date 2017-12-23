
# REST API in Node
This is an API REST in NodeJS for my application in theVelops following their criteria.

This API uses Node, NPM, MongoDB and mLab for a online database.

For mLab mongo database, I set up a dummy user for tests, you can access by:

```
Using their standard MongoDB URI:
mongodb://marcos:marcos123@ds133162.mlab.com:33162/db_marcos_thevelops
```
or
```
Using mongo shell (I prefer):
mongo ds133162.mlab.com:33162/db_marcos_thevelops -u marcos -p marcos123
```
## Documentation
You can check the Swagger documentation of the API:
 
https://app.swaggerhub.com/apis/marcos-application/RESTfulAPI/1.0.0#/

You can check the code documentation of the API created using JSDoc:

in /out/index.html

## Demo:

Check out demo deployed in Google Cloud Computer Engine of the API on the link below:

http://35.227.122.182:4000

(depending when you are accessing, it may not be up anymore)


## Dependencies

* Unix/Linux machine
* Git
* NodeJS
* Mongo DB set up and running (for local only)
* npm

## Installing locally via NPM

Clone this repository

**(check npm permissions to avoid error : EACCES)
```
git clone https://github.com/marcksm/rest-api.git
cd rest-api
npm install
```
## Running locally via NPM

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

## Populate Script

Inside the rest-api folder

To check parameters just type:

```
node populate.js h
```
Populate the local mongo db with 50 entries:

```
node populate.js L
```

Populate the mLab mongo db with 50 entries:

```
node populate.js 
```
