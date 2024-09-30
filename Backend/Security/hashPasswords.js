const bcrypt = require('bcryptjs')

const hashPassword = async (password) => {
    try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
    } catch(ex){
        console.error("Error hashing password ", ex)
        throw new Error("Hashing failed.")
    }
}
module.exports = {hashPassword}