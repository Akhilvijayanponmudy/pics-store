const app = require('./app');
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');



mongoose.connect(`mongodb+srv://akhilvijayanponmudy:bFW1Or3X0j7WsD19@cluster0.dsy1k.mongodb.net/`)
    .then(() => {
        console.log("DB connected");
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
    });


app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});