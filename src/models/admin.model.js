const mongoose = require("mongoose");
// NOTE - "validator" external library and not the custom middleware at src/middlewares/validate.js
const validator = require("validator");
const config = require("../config/config");
const bcrypt = require("bcryptjs");
const { required } = require("joi");

const AdminSchema = mongoose.Schema({
    isSuperAdmin: {
        type: Boolean,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        validate: {
            validator: (email) => validator.isEmail(email),
            message: (props) => `${props.value} is not a valid email.`,
        },
        lowercase: true,
    },
    contact: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        validate: {
            validator: (number) => {
                // Basic validation for 10-digit mobile numbers
                const phoneRegex = /^\d{10}$/;
                return phoneRegex.test(number);
            },
            message: (props) =>
                `${props.value} is not a valid mobile number. It should be exactly 10 digits.`,
        },
        minlength: 10,
        maxlength: 10,
    },
    password: {
        type: String,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error(
                    "Password must contain at least one letter and one number"
                );
            }
        },
        required: true,
        minLength: 8,
        trim: true,
        // validate: [passwordValidator, 'Password must be at least 8 characters long and contain at least one letter and one number.']
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    },
});

/**
 * Pre-save hook to hash the password before saving to the database
 */

AdminSchema.pre("save", async function (next) {
    const admin = this;

    if (this.isModified("password")) {
        // Only hash the password if it has been modified (or is new)
        try {
            // Generate a salt
            const salt = await bcrypt.genSalt(10);

            // Hash the password with the salt
            const hashedPassword = await bcrypt.hash(admin.password, salt);

            // Replace the plain password with the hashed password
            admin.password = hashedPassword;

            next();
        } catch (error) {
            return next(error);
        }
    }
});

/**
 * Check if email is taken
 * @param {string} email - The user's email
 * @returns {Promise<boolean>}
 */
AdminSchema.statics.isEmailTaken = async function (email) {
    let result = await this.findOne({ email: email });
    return !!result;
};

/**
 * Check if contact is taken
 * @param {string} contact - The user's contact
 * @returns {Promise<boolean>}
 */
AdminSchema.statics.isContactTaken = async function (contact) {
    let result = await this.findOne({ contact: contact });
    return !!result;
};

/**
 * Check if entered password matches the user's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
AdminSchema.methods.isPasswordMatch = async function (password) {
    // const user = this;

    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            if (err) {
                reject(err);
            }
            resolve(isMatch);
        });
    });
};

const Admin = mongoose.model("Admin", AdminSchema);

module.exports = {
    Admin,
    AdminSchema,
};
