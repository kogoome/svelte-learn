import serviceList from "../../backend/lowdb/api/0.index.js"
const { NodeService, EdgeService } = serviceList

// read
export const get = async () => {

  const nodeDB = new NodeService("node")
  const edgeDB = new EdgeService("edge")
  if (!nodeDB.nodeLow) await nodeDB.connect()
  if (!edgeDB.edgeLow) await edgeDB.connect()

  const nodeArray = await nodeDB.getAllNode()
  const edgeJson = await edgeDB.getAllEdge()
  return {
    status: 200,
    body: {
      nodeArray,
      edgeJson
    }
  }
}

// write
export const post = async ({ request }) => {
  const nodeJson = await request.json()
  const db = new NodeService("node")
  if (!db.nodeLow) {
    await db.connect()
  }
  const msg = await db.setAllNode(nodeJson)

  return {
    status: 200,
    body: {
      msg
    }
  }
}