module.exports = {
  async up(db) {
    // See https://github.com/seppevs/migrate-mongo/#creating-a-new-migration-script
    await db.createCollection("koaUsers", {
      validator: { $jsonSchema: {
          bsonType: "object",
          required: [ "username", "password" ],
          properties: {
            username: {
              bsonType: "string",
              description: "must be a string and is required"
            },
            password: {
              bsonType : "string",
              description: "must be a string and is required"
            },
            status: {
              enum: [ "active", "blocked" ],
              description: "can only be one of the enum values"
            }
          }
        } }
    });
    await db.collection('koaUsers').insertOne({
      "username": "koa",
      "password": "koa-pass",
      "status": "active"
    });
  },

  async down(db) {
    await db.collection('koaUsers').drop();
  }
};
