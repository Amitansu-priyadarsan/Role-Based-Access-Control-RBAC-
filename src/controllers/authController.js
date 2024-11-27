const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Role = require('../models/roleModel');

const register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        const existingRole = await Role.findOne({ where: { name: role } });
        if (!existingRole) return res.status(400).json({ error: 'Invalid role' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            roleId: existingRole.id,
        });

        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email }, include: Role });

        if (!user) return res.status(404).json({ error: 'User not found!' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials!' });

        const token = jwt.sign({ id: user.id, role: user.Role.name }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { register, login };
