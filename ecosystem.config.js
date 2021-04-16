/** @format */

module.exports = {
    apps: [
        {
            name: 'entertainme - Client',
            script: 'cd client/app && npm start',
        },
        {
            name: 'entertainme - Orchestrator',
            script: 'cd server/orchestrator && npm install &&  node app.js',
            env: {
                PORT: 4000,
            },
        },
        {
            name: 'entertainme - Service Movies',
            script: 'cd server/services/movies && npm install && node app.js',
            env: {
                DATABASE_NAME: 'entertainme',
                COLLECTION_NAME: 'movies',
                PORT: 4001,
            },
        },
        {
            name: 'entertainme - Service TV Series',
            script: 'cd server/services/series && npm install && node app.js',
            env: {
                DATABASE_NAME: 'entertainme',
                COLLECTION_NAME: 'series',
                PORT: 4002,
            },
        },
    ],
};
