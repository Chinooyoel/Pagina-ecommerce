import bcrypt from 'bcrypt';

export default class Encryption{

	static encrypt(password: string):string {
		return bcrypt.hashSync(password, 10);
	}

	static isValid(password:string, passwordToValidate:string):boolean {
		return bcrypt.compareSync(password, passwordToValidate);
	}
}
