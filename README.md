## Quick Start: Run Locally, Take Tests, Collect Data:

1. Clone the repo
2. `npm install` ( run from inside repo, this installs dependencies, and might take a second )
3. Install MongoDB.  `brew install mongodb` (on mac) or check [MongoDB Install Docs](https://docs.mongodb.com/manual/installation/)  Probably the hardest part of the setup.
4. `npm run mongo` (on mac) or `npm run mongo-win` (on windows)
5. Leave mongo running and open a new terminal window: `npm start`
6. open up [localhost:3000](http://localhost:3000/)

## Development

1. Install babel-cli globally with `npm install -g babel-cli`
2. To watch files and compile them with webpack: `npm run watch`

##Logs

1. After you've clicked through and completed a few tests, check out  [http://localhost:3000/api/logs](http://localhost:3000/api/logs)
2. Try to add a querystring like http://localhost:3000/api/logs?test=zombie
3. ( More to come )

## Editing the Tests

1. Question config data is is /src/data
2. Chosen tests to include are in an array of video names in /src/modules/Tests/Test.js.




( This is still in development, specifically the logging component )
Email thornebrandt@gmail.com with any problems, questions, feedback.