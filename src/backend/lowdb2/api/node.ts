import { LowConnector } from '../model/connector';
import type { dbFileName } from '../interface';

export default class NodeService {
	private nodeLow: unknown; // TODO 이거 어떵
	constructor(private name: dbFileName) {}

	async connect() {
		const db = new LowConnector(this.name);
		this.nodeLow = await db.connectDB();
		this.timeLog();
	}

	getAllNode() {
		return this.nodeLow.data.node;
	}
	// 노드 쓰기
	setAllNode(nodeJson) {
		const result = nodeJson.map((node) => {
			if (!node._id) node._id = uuidv4();
			return node;
		});
		this.nodeLow.data.node = result;
		this.nodeLow.write();
		return 'success';
	}
  
	private timeLog() {
		const time: number = new Date().getSeconds();
		console.log(time + 'Lowdb-node connect success');
	}
}