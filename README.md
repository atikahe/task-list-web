# Task List Web

Task List Web is a web app to manage to-do lists from your favorite browser with client-server. Currently only server is available. The server is bootstrapped from [create-express-api](https://github.com/w3cj/create-express-api) package from [CJ Coding Garden](https://github.com/w3cj).

## Usage
Go to server directory, type in your terminal
```bash
npm run dev
```
to run the app with nodemon, or
```bash
npm run start
```
to run the app with node

## Challenges
The challenge of this project lies on implementing the store library and offline-availability. Personally, I'd need further reading and understanding of the library to be able to debug this project. As of now, this app only uses Node-CouchDB library to interact with remote database. This is a massive blocker on offline-availability and any advise/suggestion is highly appreciated.

## TODOs
Per recent commit, here's todo checklist:
1. Add offline feature
2. Add validation schema
3. Add and configure client to serve ui

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits
[CouchDB](https://couchdb.apache.org/)
[create-express-api](https://github.com/w3cj/create-express-api)
[node-couchdb](https://www.npmjs.com/package/node-couchdb)

## License
[MIT](https://choosealicense.com/licenses/mit/)