const bcrypt = require('bcryptjs')

export default function CryptPassWord(password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    return hash
}

export async function Compare(password, hashSave){
    const statuPassword = await bcrypt.compare(password, hashSave)

    return statuPassword
}