데이터는 로우디비 연결 안됨.

노드 설명은 각종 사이트의 검색을 이용,
혹은 차후 크롤링해서 제공
디비에 반영안함.

노드 속성 구성은
객체 안에 키값으로 노드id (영문)으로 노드 객체를 참조.
노드 객체는 이름과 타입으로 구성
이름은 문자열타입이나 배열로 전환해서 한국어 영어 이외의 언어를 지원할 예정
언어 스위칭은 배열인덱스로 바꾸는데, 사용자가 선택한 언어 인덱스에 따라 표현방식을 바꿀예정
영어가 키값으로 디폴트 값으로 되어있기 때문에 영어버전의 화면은 새로 구성해야 할지 고민
```js
db = {
  node:{
    tree:{
      name:["나무", "árbol", "arbre"] 
      // 한국어(0), 스페인어(1), 프랑스어(2).. 이후 언어추가는 어렵지 않음.
      type:"node"
      // 타입은 노드(기본값)
      // 엣지타입은 unary binary polynary로 일항연산자 이항연산자 다항연산자에서 착안하여 가져옴.
      // 관계의 섭셋이 함수고 함수는 위처럼 해석할 수 있기 때문에 
      // 대부분의 관계를 셋팅할 수 있다고 생각.
      // 처음 만들때 셋팅하거나, 엣지에 등록시 포함된 노드의 갯수에 따라 변화됨.
    }
  },
  edge:{
    _Category:{ // 내장엣지, 트리구조형 자료정리를 위한 엣지. 무한뎁스사용.
      plant:{
        tree:{
          fruit:{
            apple,
            banana,
            //...
          }
        }
      },
      math:{
        highSchool:{
          grade1:{
            일차방정식:{
              ...
            }
          },
          grade2:{ },
          grade3:{ }
        },
        middleSchool:{ },
      }
    },
    _Subset:[ 
      // 내장엣지 카테고리 기반 엣지, 
      // binary 타입의 기본형태
      // 키값이 존재하지 않기 때문에 배열로 구성
      // 뎁스1
      // 이론기반은 집합론의 relation. aRb 이면 (a,b) is in R
      // R은 AxB의 섭셋
      // 관계는 node x node , 즉 [node1, node2]의 총체를 Relation이라고함.
      // 포함관계의 경우 reflexive antisymmetric transitive 한 속성을 가짐.
      // [A, A] A집합은 A집합에 포함, 즉, 포함관계는 항상 자기 자신과의 관계가 항상 존재.
      // [A, B] is in Subset, if A != B then [B, A] is not in Subset => antisymmetric : 방향성의 존재.
      // [A, B] is in Subset, and [B, C] is in Subset then [A, C] is in Subset => transitive
      // 이런 속성에 의해 포함관계집합은 partially ordered set 부분 순서 집합 poset이 됨.
      // poset에서 부분순서를 만족하는 원소들은 범주(카테고리)라고 볼 수 있음.
      // 이 transitive한 속성 때문에 엣지들의 추론이 가능.

      [tree, fruit], // fruit은 tree의 subset이다. 
      [realNumber, raionalNumber]
      [realNumber, irrational number]
      [raionalNumber, integer],
      [integer, naturalNumber], // 연쇄 릴레이션에 의해 _Path 엣지를 생성가능 - 3단논법, 추론

      // 배열의 추가는 [node1, node2] 형식으로 추가되는데, node1을 엣지 배열에서 검색 
      // [othernode, node1] 이 있는 마지막 인덱스 뒤쪽에 추가한다. 그럼 배열은
      [somenode, node1],
      [othernode, node1],
      [node1, node2],
      ... 
      // 으로 구성, 추론하기 쉬운 형태의 순서로 나타난다. 위 구성에도 문제가 있는데
      // [somenode, node1],
      // [othernode, node1], 에 의해 somenode와 othernode의 관계가 나타나있지 않다.
      // 만약 [somenode, othernode] 이거나 [othernode, somenode]라면 빠진관계를 입력하여
      // 한 컨셉의 트리구조를 더 견고하게 만들 수 있지만,
      // 두 경우에 모두 성립하지 않아 somenode와 othernode가 서로 포함관계가 아니라면
      // 상이한 두 상위구조의 공통요소로 node1이 존재하게 된다.
      // 즉 트리구조 이상의 정보를 포함하고, 다수의 상한supremum이 존재하게 된다.
      // 이 상한을 추론해서 카테고리 영역을 채워넣을 수 있을 듯하다.

      // 엣지 원소로부터 
    ],
    _PathOfSubset:[
      [realNumber, raionalNumber, integer, naturalNumber] 
    ],

    _Include:{ // 내장엣지 카테고리 기반 엣지, 뎁스1
      [naturalNumber, 1]  // 1은 자연수에 포함된다.
    }
  }
}


