
type List = {
    title: string;
    category: string;
    link: string;
}
const arr:List[] = [
  {title:"1", category:"a", link:"link/1"},
  {title:"2", category:"a", link:"link/2"},
  {title:"3", category:"a", link:"link/3"},
  {title:"4", category:"a", link:"link/4"},
  {title:"5", category:"a", link:"link/5"},
  {title:"1", category:"b", link:"link/1"},
  {title:"2", category:"b", link:"link/2"},
  {title:"3", category:"b", link:"link/3"},
  {title:"4", category:"b", link:"link/4"},
  {title:"5", category:"b", link:"link/5"},
  {title:"1", category:"c", link:"link/1"},
  {title:"2", category:"c", link:"link/2"},
  {title:"3", category:"c", link:"link/3"},
  {title:"4", category:"c", link:"link/4"},
  {title:"5", category:"c", link:"link/5"}
]

// 카테고리 정렬
const categoryArray:any[] = []
arr.forEach(item=>{
  const {title, category, link} = item
  // categoryArray에 카테고리가 없으면 새로운 카테고리를 추가하고, 배열로 만듬
  if (!(categoryArray.hasOwnProperty(category))) categoryArray[category] = []
  // 배열에 {타이틀, 링크} 추가
  categoryArray[category].push({title, link})
})

console.log(categoryArray)
// 정렬결과
// const bb = [
//   a: [
//     { title: '1', link: 'link/1' },
//     { title: '2', link: 'link/2' },
//     { title: '3', link: 'link/3' },
//     { title: '4', link: 'link/4' },
//     { title: '5', link: 'link/5' }
//   ],
//   b: [
//     { title: '1', link: 'link/1' },
//     { title: '2', link: 'link/2' },
//     { title: '3', link: 'link/3' },
//     { title: '4', link: 'link/4' },
//     { title: '5', link: 'link/5' }
//   ],
//   c: [
//     { title: '1', link: 'link/1' },
//     { title: '2', link: 'link/2' },
//     { title: '3', link: 'link/3' },
//     { title: '4', link: 'link/4' },
//     { title: '5', link: 'link/5' }
//   ]
// ]

