const dotenv = require("dotenv");
const path = require("path");
const Joi = require("joi");

//to load environment variables from a .env file into the process.env object.
dotenv.config({ path: path.join(__dirname, "../../.env") });

const envVarsSchema = Joi.object()
    .keys({
        NODE_ENV: Joi.string()
            .valid("production", "development", "test")
            .required(),
        PORTT: Joi.number().default(3000),
        MONGODB_URL: Joi.string().required().description("Mongo DB url"),
        JWT_SECRET: Joi.string().required().description("JWT secret key"),
        JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
            .default(30)
            .description("minutes after which access tokens expire"),
    })
    .unknown();

const { value: envVars, error } = envVarsSchema
    .prefs({ errors: { label: "key" } })
    .validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

//Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgAQFmH6psRZIqmMNhcnvYZxcYsNl9TbA",
    authDomain: "rajmudra-3eb6c.firebaseapp.com",
    projectId: "rajmudra-3eb6c",
    storageBucket: "rajmudra-3eb6c.appspot.com",
    messagingSenderId: "273374375297",
    appId: "1:273374375297:web:8bf520ac51e3e862428c80",
};

module.exports = {
    env: envVars.NODE_ENV,
    port: envVars.PORTT,
    // Set mongoose configuration
    mongoose: {
        url: envVars.MONGODB_URL + (envVars.NODE_ENV === "test" ? "-test" : ""),
        options: {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        },
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    },
    firebase: {
        porjectId: envVars.PROJECT_ID,
        clientEmail: envVars.CLIENT_EMAIL,
        privateKey: envVars.PRIVATE_KEY,
    },
};
