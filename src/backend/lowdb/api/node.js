import { LowConnetor } from '../model/connector.ts'

export default class NodeService {
  name
  nodeLow
  // nodeJson
  constructor(name) {
    this.name = name
  }

  async connect() {
    const db = new LowConnetor(this.name)
    this.nodeLow = await db.connect()
    // this.nodeJson = this.nodeLow.data.node
    console.log("Lowdb connect success")
  }

  // 언어검색기
  whatLang(nodeName) {
    const kr = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    const en = /[a-z]/;
    // 언어 분석 추가시
    const langs = [kr, en] // 여기도 추가
    const langsIndex = langs.map((lang, i) => {
      return lang.test(nodeName)
    })
    const langIndex = langsIndex.indexOf(true)
    const langLength = langsIndex.length
    const name = nodeName
    return { name, langIndex, langLength }
  }// clear

  // 노드 읽기
  getAllNode() {
    return this.nodeLow.data.node
  }
  // 노드 쓰기
  setAllNode(nodeJson) {
    this.nodeLow.data.node = nodeJson
    this.nodeLow.write()
    return "success"
  }
  // // 노드 한개 찾기
  // getNodeObj(nodeName) {
  //   const { name, langIndex, langLength } = this.whatLang(nodeName)
  //   return this.nodeJson.find(node => node.name[langIndex] === nodeName)
  // }
  // // 노드 한개 쓰기
  // setNodeObj(nodeObj) {
  //   const { nodeJsonIndex } = this.findNode(nodeObj.name[0])
  //   if (nodeJsonIndex >= 0) {
  //     this.nodeJson[nodeJsonIndex] = nodeObj
  //     this.nodeLow.write()
  //     return "success"
  //   }
  // }

  // // 노드 찾기
  // findNode(nodeName) {
  //   const { name, langIndex, langLength } = this.whatLang(nodeName)
  //   const node = this.nodeJson.find(node => node.name[langIndex] === name)
  //   const nodeJsonIndex = this.nodeJson.findIndex(node => node.name[langIndex] === name)
  //   return {
  //     nodeJsonIndex,
  //     "name": node?.name[langIndex] || "",
  //     "description": node?.description[langIndex] || "",
  //     langIndex,
  //     langLength
  //   }
  // }
  // // 노드 추가
  // async setNode(nodeName, nodeDescription) {
  //   const { nodeJsonIndex, name, description, langIndex, langLength } = this.findNode(nodeName)
  //   if (nodeJsonIndex < 0) {
  //     const nameArray = Array.from({ length: langLength }, () => "")
  //     const descArray = Array.from({ length: langLength }, () => "")
  //     nameArray[langIndex] = nodeName
  //     descArray[langIndex] = nodeDescription
  //     this.nodeJson.push({ "name": nameArray, "description": descArray })
  //     await this.nodeLow.write()
  //     return `${nodeName} is pushed`
  //   } else if (description !== nodeDescription) {
  //     console.log("update process")
  //     return this.updateNode(nodeName, nodeDescription)
  //   } else {
  //     return `"${nodeName}", "${nodeDescription}" are already pushed,`
  //   }
  // }
  // // 노드 수정
  // async updateNode(nodeName, nodeDescription) {
  //   const { nodeJsonIndex, langIndex } = this.findNode(nodeName)
  //   if (nodeJsonIndex >= 0) {
  //     this.nodeJson[nodeJsonIndex].description[langIndex] = nodeDescription
  //     await this.nodeLow.write()
  //     return `${nodeDescription} is updated`
  //   } else {
  //     return `update fail. "${nodeName}" is not found`
  //   }
  // }
  // // 노드 삭제
  // async deleteNode(nodeName) {
  //   const { nodeJsonIndex, langIndex } = this.findNode(nodeName)
  //   if (nodeJsonIndex >= 0) {
  //     this.nodeJson.splice(nodeJsonIndex, 1)
  //     await this.nodeLow.write()
  //     return `${nodeName} is deleted`
  //   } else {
  //     return `delete fail. "${nodeName}" is not found`
  //   }
  // }

  // 프론트에 노드 검색하면 한글 영어 동시에 보여주고 빈칸도 보여줌.
  // 사용자가 빈 공백에 입력 수정을 요청하면 노드 수정
  // 머지 노드
  // async mergeNode(en_name, kr_name) {
  //   // en_name이 있는지 확인
  //   // kr_name이 있는지 확인
  //   // en_name이 있으면 kr_name을 en_name에 머지

  //   const en = this.findNode(en_name)
  //   const kr = this.findNode(kr_name)
  //   // 둘다 없는경우 : 없다고 보내기 - 없는경우지만 만일을 대비해 만듬
  //   // en 만 있는 경우
  //   // kr 만 있는 경우 : 있는 인덱스 쪽으로 머지
  //   // 둘 다 있는 경우 : 낮은 인덱스 쪽으로 머지
  //   en?.nodeJsonIndex > kr?.nodeJsonIndex ? 
  //   // 인덱스 비교식
  //   switch () {
  //     // 인덱스 결과식
  //     case value:

  //       break;

  //     default:
  //       break;
  //   }
  // }

  // 한글검색 실패시 프론트에서 영어검색 요청 반대경우도 마찬가지
}
