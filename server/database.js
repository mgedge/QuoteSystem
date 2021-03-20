// const MongoClient = require('mongodb').MongoClient;
// const dbConnection = "mongodb+srv://QuoteSystem:CORMupWKD6bxfjGy@quotesystem.qrfhq.mongodb.net/Quote?retryWrites=true&w=majority"


// function initialize(
//     dbName,
//     dbCollectionName,
//     success,
//     failure
// ) {
//     MongoClient.connect(dbConnection, function (err, dbInstance) {
//         if(err) {
//             console.log(`MongoDB connection Error: ${err}`);
//             failure(err);
//         }
//         else {
//             const dbObject = dbInstance.db(dbName);
//             const dbCollection = dbObject.collection(dbCollectionName);
//             console.log("MongoDB connection success!");

//             success(dbCollection);
//         }
//     });
// }

// module.exports = {
//     initialize
// };