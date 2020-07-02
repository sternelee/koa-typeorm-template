module.exports = {
  "type": "sqlite",
  "database": "./sqlite.db",
  "synchronize": true,
  "logging": false,
  "cache": true,
  "entities": [
     "src/entity/**/*.ts"
  ],
  "migrations": [
     "src/migration/**/*.ts"
  ],
  "subscribers": [
     "src/subscriber/**/*.ts"
  ]
}