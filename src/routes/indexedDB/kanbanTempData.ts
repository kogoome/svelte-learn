type kanban = {
  [key: string]: { title: string; list: string[] }[]
}

export const kanbanDb: kanban = {
  Todo: [
    {
      title: 'todayWork',
      list: [
        '1. 인덱스디비 입력 하면',
        '2. 인덱스 디비 출력해서 클락 워크에 넣기',
        '3. 스크린 수정한거 디비에 반영하기'
      ]
    },
    { title: '0.0.z', list: [] },
    { title: '0.y.0', list: [] },
    { title: 'x.0.0', list: [] },
    {
      title: 'philosophy',
      list: [
        '1. make high quality education share platform',
        '2. structured knowledge make knowledge relation freely',
        '3. education out of the world'
      ]
    }
  ],
  Process: [],
  Complete: []
}

type bgColor = {
  [key: string]: string
}
export const bgColor: bgColor = {
  Todo: 'bg-slate-300',
  Process: 'bg-slate-400',
  Complete: 'bg-slate-500'
}
