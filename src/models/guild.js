const { model, Schema } = require('mongoose')

exports.guilds = new Schema({
    name: { type: String, default: '' },
    id: Number,
    configs: {
        rolesReaction: {
            name: String,
            emoji: String
        },
        registerRole: {
            name: String
        }
    }
})

exports.Guild = model('guild', this.guilds)
