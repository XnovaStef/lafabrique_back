const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModels'); // Assurez-vous que le chemin vers le modèle est correct

exports.createAdmin = async (req, res) => {
    try {
        const { nom, email, password } = req.body;

        // Vérifiez si l'email existe déjà
        const adminExists = await Admin.findOne({ email });
        if (adminExists) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        // Hachez le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créez un nouvel admin
        const newAdmin = new Admin({
            nom,
            email,
            password: hashedPassword, // Enregistrez le mot de passe haché
        });

        // Sauvegardez l'admin dans la base de données
        const savedAdmin = await newAdmin.save();

        // Générer un token
        const token = jwt.sign(
            { id: savedAdmin._id, email: savedAdmin.email },
            'votre_secret_token', // Remplacez ceci par votre clé secrète
            { expiresIn: '1h' } // Le token expirera après 1 heure
        );

        res.status(201).json({
            message: 'Admin créé avec succès',
            admin: savedAdmin,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la création de l\'admin', error });
    }
};


exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérifiez si l'admin existe
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'Admin non trouvé.' });
        }

        // Vérifiez si le mot de passe est correct
        const isPasswordValid = await bcrypt.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe incorrect.' });
        }

        // Générer un token
        const token = jwt.sign(
            { id: admin._id, email: admin.email },
            'votre_secret_token', // Remplacez ceci par votre clé secrète
            { expiresIn: '1h' } // Le token expirera après 1 heure
        );

        res.status(200).json({
            message: 'Connexion réussie',
            admin,
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Erreur lors de la connexion', error });
    }
};