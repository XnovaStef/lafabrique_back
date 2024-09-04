const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const AdminSchema = mongoose.Schema({
    nom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateAjout: { type: Date, default: Date.now },
    dateModif: { type: Date, default: Date.now },
    dateSuppress: { type: Date, default: Date.now },
    statut: { type: Boolean, required: true, default: true }
});

AdminSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Admin', AdminSchema);
