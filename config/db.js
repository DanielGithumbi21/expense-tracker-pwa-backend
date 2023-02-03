MongoURI = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.jws5g.gcp.mongodb.net/?retryWrites=true&w=majority`;

module.exports = { MongoURI };
