const cors = require("cors");

const corsOptions = {
    origin: "*",
    methods: "GET,POST",
    allowedHeaders: "Content-Type"
};

module.exports = cors(corsOptions);
