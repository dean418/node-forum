const app = require('./index');

app.listen(process.env.PORT, () => {
    console.log(`server listening on port: ${process.env.PORT}`);
})