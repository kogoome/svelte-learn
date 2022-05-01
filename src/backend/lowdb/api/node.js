import { Lowdb } from '../model/model.js'
// read, write
const db = new Lowdb("node")
const nodeLow = await db.connect()
const nodeJson = nodeLow.data.node

// 언어검색기
function whatLang(nodeName) {
  const kr = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  const en = /[a-z]/;
  // 언어 분석 추가시
  const langs = [kr, en] // 여기도 추가
  const langsIndex = langs.map((lang,i)=>{
    return lang.test(nodeName)
  })
  const langIndex = langsIndex.indexOf(true)
  const langLength = langsIndex.length
  const name = nodeName
  return {name,langIndex,langLength}
}// clear

// 모든 노드 읽기
function getAllNode() {
  return nodeJson
}

// 노드 찾기
function findNode(nodeName) {
  const { name, langIndex, langLength } = whatLang(nodeName) //무조건나옴
  const node = nodeJson.find(node => node.name[langIndex] === name) //안나올수있음
  const nodeJsonIndex = nodeJson.findIndex(node => node.name[langIndex] === name)
  return {
    nodeJsonIndex,
    "name":node?.name[langIndex]||"",
    "description":node?.description[langIndex]||"",
    langIndex,
    langLength
  }
}// clear

// 노드 추가
async function setNode(nodeName, nodeDescription) {
  const { nodeJsonIndex, name, description, langIndex, langLength } = findNode(nodeName)
  if ( nodeJsonIndex < 0 ) {
    const nameArray = Array.from({length: langLength}, () => "")
    const descArray = Array.from({length: langLength}, () => "")
    nameArray[langIndex] = nodeName
    descArray[langIndex] = nodeDescription
    nodeJson.push({ "name":nameArray, "description":descArray })
    await nodeLow.write()
    return `${nodeName} is pushed`
  } else if (description !== nodeDescription) {
    console.log("update process")
    return updateNode(nodeName, nodeDescription)
  } else {
    return `${nodeName}, ${nodeDescription} are already pushed,`
  }
}

// 노드 수정
async function updateNode(nodeName, nodeDescription) {
  const { nodeJsonIndex, langIndex } = findNode(nodeName)
  if (nodeJsonIndex>=0) {
    nodeJson[nodeJsonIndex].description[langIndex] = nodeDescription
    await nodeLow.write()
    return `${nodeDescription} is updated`
  } else {
    return `update fail. ${nodeName} is not found`
  }
}

// 노드 삭제
async function deleteNode(nodeName) {
  const { nodeJsonIndex, langIndex } = findNode(nodeName)
  if (nodeJsonIndex>=0) {
    nodeJson.splice(nodeJsonIndex, 1)
    await nodeLow.write()
    return `${nodeName} is deleted`
  } else {
    return `delete fail. ${nodeName} is not found`
  }
}

// 테스팅
console.log(await updateNode("나무", "큰나무2"))
console.log(await deleteNode("나무"))
console.log(findNode("나무").nodeJsonIndex)
console.log(await setNode("tree", "grape tree"))
console.log(findNode("tree"))


// setNode("apple", "macintosh")
// console.log(findNode("tree"))
