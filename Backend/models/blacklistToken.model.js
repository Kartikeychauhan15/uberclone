const mongoose = require('mongoose');

const blacklistTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '86400' // Token will expire after 1 hour
    }
});
// Check if the model already exists to prevent overwriting
const BlacklistToken = mongoose.models.BlacklistToken || mongoose.model('BlacklistToken', blacklistTokenSchema);

module.exports = BlacklistToken;
// module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);
// This model is used to store blacklisted tokens in the database.