import bcrypt from 'bcrypt'

export default class Password {
	static hash(password: string): string {
		return bcrypt.hashSync(password, 10)
	}

	static isValid(password: string, passwordToValidate: string): boolean {
		return bcrypt.compareSync(password, passwordToValidate)
	}
}
