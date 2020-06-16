const config = require('./config.js')
const api = require('./src')

api.init().then(app => {
    const port = config.PORT
    app.listen(port, () => {
        console.log(`[INFO] Listening on port ${port}`)
    })
}).catch(e => {
    console.error(`[FATAL] Error starting server`)
    console.error(e)
})