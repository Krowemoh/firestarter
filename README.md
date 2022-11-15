# Firestarter

Firestarter is my github repo that sets up an express project according to my express cheatsheet. Hopefully it's actually useful as building it out was procrastination as I didn't want to start the real project I have in mind for it.

https://nivethan.dev/devlog/express-cheatsheet.html

This application uses the following global packages:

    - nodemon - code watcher and runner
    - pm2 - process manager 

I install the following packages for the project:

    - bcrypt - library for password hashing
    - better-sqlite3 - added for sessions backend
    - better-sqlite3-session-store - sessions backend
    - dotenv - environment variables
    - express-fileupload - adds support for file uploads
    - express-session - adds support for sessions
    - helmet - adds secure headers in production
    - hpp - stops queries from being arrays
    - method-override - adds support for put, patch and delete
    - sequelize - adds an orm
    - sqlite3 - adds a database

I changed the `<% %>` delimiters in ejs to `\<? ?>`.

This project has a working register and login system. 

I also have a sample nginx configuration in this folder.

```
cp sample-nginx.conf /etc/nginx/sites-available/project-name.conf
ln -s /etc/nginx/sites-available/project-name.conf /etc/nginx/sites-enabled/
service nginx restart
```

Once the project is installed and nginx is configured. You can start developing.

```
npm run start-dev
```

