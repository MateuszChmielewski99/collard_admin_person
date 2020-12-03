# collard_admin_person
This api was created with TypeScript, Express and Node.js. Mongo db was used to store data about persons in collard admin application e.g. actors and directors.
Client application uses this api to search persons by name or last name. It was possible thanks to Mongo full text search. Used such design patterns as:
* dependency injection
* repository/servce.

In this repository are also stored scripts to seed mongo db with data from json files. It it possible to invoke them with following commands:
+ yarn seedDirs
+ yarn seedActors

This api was deployed to aws as well. used code pipeline, code buiild and elastic beansalk. 
