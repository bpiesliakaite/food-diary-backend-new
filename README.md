# Food Diary Backend API

## Database Migrations
Migrations are run automatically when the server is started. To generate a migration run:
```sh
npm run typeorm migration:generate -- -n MigrationName
```
**Note**: Make sure to have correct configuration in [database.js]. This configuration is used to compare code with the actual state of the database.
