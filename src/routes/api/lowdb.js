import serviceList from "../../backend/lowdb/api/0.index.js"
const { NodeService } = serviceList

// read
export const get = async () => {

  const db = new NodeService("node")
  if (!db.nodeLow) {
    await db.connect()
  }
  const nodeJson = await db.getAllNode()
  return {
    status: 200,
    body: {
      nodeJson
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