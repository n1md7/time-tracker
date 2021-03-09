// Creates DB koa [insert is necessary to create it]
db.createUser(
    {
        user: "koa",
        pwd: "secret",
        roles: [
            {
                role: "readWrite",
                db: "koa"
            }
        ]
    }
);
db.test.insert({"test": "test"});
