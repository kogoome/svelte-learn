import LowConnector from '../model/connector'

export default class EdgeService {
  name
  edgeLow
  // nodeJson
  constructor(name) {
    this.name = name
  }

  async connect() {
    const db = new LowConnector(this.name)
    this.edgeLow = await db.connect()
    // this.nodeJson = this.nodeLow.data.node
    let time = new Date().getSeconds()

    console.log(time + 'Lowdb-edge connect success')
  }

  // 언어검색기
  // whatLang(edgeName) {
  //   const kr = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  //   const en = /[a-z]/;
  //   // 언어 분석 추가시
  //   const langs = [kr, en] // 여기도 추가
  //   const langsIndex = langs.map((lang, i) => {
  //     return lang.test(edgeName)
  //   })
  //   const langIndex = langsIndex.indexOf(true)
  //   const langLength = langsIndex.length
  //   const name = edgeName
  //   return { name, langIndex, langLength }
  // }// clear

  // 노드 읽기
  getAllEdge() {
    return this.edgeLow.data.edge // 객체
  }
  // 노드 쓰기
  // setAllNode(edgeJson) {
  //   const result = edgeJson.map(edge => {
  //     if (!edge._id) edge._id = uuidv4()
  //     return edge
  //     }
  //   )
  //   this.edgeLow.data.edge = result
  //   this.edgeLow.write()
  //   return "success"
  // }
}
