


const express = require ('express');
const cors = require ('cors');
const mongoose = require ('mongoose');
const bodyParser = require ('body-parser');
const port = process.env.PORT || 5000;
const path = require ('path');

const { UserModel } = require (path.resolve(__dirname, 'Database', 'Models', 'UserModel'));
const DBuri = 'mongodb+srv://MyMongoDBUser:abc@cluster0.tskxx.mongodb.net/NodeJsTest?retryWrites=true&w=majority';


/* Configuring the mongoose */
mongoose.Promise = global.Promise;
mongoose.connect(DBuri).then(() => {
    console.log('Connected to DB');
})
.catch((error) => {
    console.log('Error in connecting to DB');
})


/* Configuring the App instance */
const app = express ();
app.use(bodyParser.json());


/* Handing the Routes */
app.get ('/', (req, res) => {

    UserModel.create ({
        name: 'Sparsh Kumar'
    })
    .then((createdDoc) => {

        return res.status(200).send({
            status: 'Success',
            createdDoc
        })
    })

    .catch((error) => {

        return res.status(401).send({


            status: 'Failure',
            ErrorMessage: error.message

        })

    })

})

/* Showing all the docs */
app.get ('/show', (req, res) => {

    UserModel.find({})

    .then((foundDoc) => {

        return res.status(200).send({

            status: 'Success',
            foundDoc

        })

    })

    .catch((error) => {

        return res.status (400).send({

            status: 'Failure',
            errorMessage:error.message

        })
    })

})


/* Listening for Connections */
app.listen(port, () => {

    console.log(`http://localhost${port}`);

})