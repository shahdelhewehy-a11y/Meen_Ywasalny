require('dotenv').config();
const app = require('./app');
const { getConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Initialize database connection and start server
const startServer = async () => {
    try {
        // Test database connection
        await getConnection();
        
        // Start Express server
        app.listen(PORT, () => {
            console.log(`
╔═══════════════════════════════════════╗
║   Meen Ywasalny API Server Running   ║
╠═══════════════════════════════════════╣
║   Port: ${PORT}                        ║
║   URL: http://localhost:${PORT}        ║
╚═══════════════════════════════════════╝
            `);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        process.exit(1);
    }
};

startServer();