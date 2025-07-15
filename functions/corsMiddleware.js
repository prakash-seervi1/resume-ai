const cors = require('cors');
// For development, allow all origins. For production, set your frontend URL.
module.exports = cors({ origin: true });
// Example for production: cors({ origin: 'http://localhost:5173' }); 