const bcrypt = require('bcryptjs')

const hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(10)
        await bcrypt.hash(password, salt)
    } catch(ex){
        console.error("Error hashing password ", ex)
    }
}
module.exports = {hashPassword}