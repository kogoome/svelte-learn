import { join, dirname } from 'path';
import { Low, JSONFile } from 'lowdb';
import { fileURLToPath } from 'url';

import type {dbFileName} from '../interface'

export class LowConnector {
	constructor(private dbFileName: dbFileName) { }

	async connectDB() {
		const jsonDB = await this.getJsonDB();
		await jsonDB.read();
		return jsonDB;
	}
	
	private async getJsonDB() {
		const lowAdapter = new JSONFile(this.getDbFilePath());
		return await new Low(lowAdapter);
	}

	private getDbFilePath() {
		return join(
			dirname(fileURLToPath(import.meta.url)),
			`./db/${this.dbFileName}.json`
		);
	}
}
