import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

// interface jsonDB {

// }

export class LowConnetor {
	name: string;
	constructor(name: string) {
		this.name = name;
	}

	async connect() {
		const filePath = join(dirname(fileURLToPath(import.meta.url)), `./db/${this.name}` + '.json');
		const jsonDB = await new Low(new JSONFile(filePath));
		await jsonDB.read();
		return jsonDB;
	}
}
