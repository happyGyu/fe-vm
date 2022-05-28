# Vending mahcine

## 🎯 소개 및 목적
***

- 웹 자판기를 주어진 디자인 없이, 세부 기획도 자유롭게 개발
- React Routing 적용
- Context API 활용 
<br />

## 🔎 Points
***
<details>
<summary>Context API</summary>
<div markdown="1">

- React의 Context는 props drilling을 해결해준다는 점에서 매력적이지만, 비효율적인 렌더링을 유발하기도 한다.
- 우선, 어떤 상태들을 Context로 묶을 것인지 결정해야한다.
- 하나의 상태가 바뀌었을 때 실질적으로 값이 바뀌지 않는 컴포넌트까지 전부 렌더링 되는 것을 방지하기 위해서는 context를 최대한 분리하는 것이 좋아보인다.
    - 하지만, 두 상태가 굉장히 밀접하여 대부분의 경우 한 값이 바뀌면 다른 값도 영향을 받는 경우(단, 이경우에는 반드시 상태 두개로 관리해야만 하는 것인지 생각해 볼 필요가 있을 것이다. 완벽히 종속적이라면, 상태는 하나로 관리하고 그로부터 원하는 값을 얻을 수 있을 것이다.)에는 Context 하나에 묶어서 관리하는 것이 코드의 응집도 차원에서 더 좋다고 생각한다.
    - 위와 같은 논리로, `inputSum`(자판기 투입 금액)과 `wallet` 상태는 굉장히 밀접하기 때문에 `BalanceProvider`라는 상태로 묶어 관리했다.
- `RecordsProvider`가 문제였는데, Records 값은 활동 기록을 출력하는 `MessageDisplay`에서만 사용되지만 records state를 set하는 `updateRecord` 함수는 대부분의 컴포넌트에서 사용된다.
    - 그 결과 records가 바뀔 때마다 `updateRecord`를 가진 모든 컴포넌트가 re-render 되었다.
    - 해당 이슈를 동료들과 나누며 알게된 사실은 그래서 state 전용 context와 set(dispatcher) 전용 context를 분리한다는 것이다.
    - 물론 모든 경우에 위와 같이 분리할 필요는 없다. 응집도도 떨어지고, import하기 위한 코드도 늘어나기 때문이다.
- React가 익숙하지 않아 학습하는데 시간을 많이 사용해 최적화를 많이 진행하지 못해 아쉬움이 남는다. 조만간 최적화 후 재업데이트하도록 해야겠다.

</div>
</details>

<details>
<summary>Server에 모든 것을 매번 알려야하나?</summary>
<div markdown="1">

- 이번 미션에서는 Json server를 이용해 간략히 서버를 구성했다.
- React Router보다 위에 (App 컴포넌트 안에서 최상단) Context Provider를 두면 Balance와 Stock을 관리할 수 있지만, 돈과 재고는 중요하기 때문에 만약 실제 서비스를 개발한다면 당연히 서버에 저장해야한다고 생각했다.
- 그렇다면 값이 바뀔 때 마다 매번 업데이트를 해야할까?
    - Stock manager에서 재고를 늘리거나 줄일 경우 숫자를 입력 받게 되어있지 않고 +, - 버튼을 클릭하게 구현했기 때문에 재고는 연속적으로 변경된다.
    - 이때, 매 변경마다 context를 업데이트하고 심지어 서버에서 알리는 것은 비효율이라고 생각했다.
    - 재고를 전부 변경한 뒤 Save 버튼을 눌러 서버에 저장하는 방식을 고민했지만, 굳이 한 과정을 더 두는 것이 사용자 입장에선 귀찮음이 될수 있다고 생각했다. 
    - 대신, 재고 변경 버튼 클릭 이후 debounce를 둬 만약 일정 시간안에 추가적으로 재고 변경이 발생하면, 서버에 요청 보내는 것을 미루도록 했다.
    - 지금 돌이켜보니 UX적으로 아쉬운 부분이 있다. 서버에 요청을 지연하는 것은 좋지만 버튼 클릭에 대한 viual적인 피드백은 지연될 필요 없다고 생각한다. 그러나 현재는 stock manger의 재고 숫자가 context에 있는 state에 종속되어 있기 때문에 숫자 변경 또한 http request와 함께 지연된다.
    - 그보단, stock manager 컴포넌트 내에 임시 저장을 담당하는 state를 추가로 둬서 사용자는 입장에서는 매 클릭마다 바로 업데이트 되는 것처럼 보여주는 것이 더 좋았겠다는 생각이 든다.    
</div>
</details>

<br />

## 🎞 데모
***
```
npm install
npm start          //json server start
npm run start:dev  //react-scripts start
```
[데모 링크](https://alan-vm.herokuapp.com/)

<details>
<summary>음료 출력</summary>
<div markdown="1">

https://user-images.githubusercontent.com/95538993/168993067-3c8eb6d4-1091-469d-a3cc-9352017d659f.mp4

</div>
</details>

<details>
<summary>재고 관리</summary>
<div markdown="1">

https://user-images.githubusercontent.com/95538993/170842935-724bdcdb-d502-4cde-bd41-3a0baefc3e53.mp4

</div>
</details>
