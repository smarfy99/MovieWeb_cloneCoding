# MovieWeb_cloneCoding
노마드코더 영화웹서비스 클론코딩

## Why React?

- 대기업들이 주로 사용하는 툴
- 커뮤니티 활성화가 잘 되어 있음

## 리액트 기초

> 리액트에서는 JS로 작성한 뒤 → HTML로 보여주는 방식
> 

```html
<script src="https://unpkg.com/react@17/umd/react.development.js"></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
```

- React JS : 어플리케이션이 interactive하도록 만들어주는 라이브러리 - 엔진
- React-dom : 모든 React element들을 HTML body에 둘 수 있게 함

- `React.createElement(”span(**형태**)”, span의 id나 class/style(**property**), “click me같은 **콘텐츠**”)`
- render() : 사용자에게 보여주는 함수

```jsx
// root안에 span이 포함되도록 render해라
ReactDOM.render(span, root);
```

## 바벨

> JSX로 적은 코드를 브라우저가 이해할 수 있도록 바꿔주는 것
> 

```jsx
<script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
<script type="text/babel">
```

## 컴포넌트

- 컴포넌트의 첫문자는 **대문자**여야 함
    
    → 아니면 JSX에서 HTML태그라고 생각함
    

- 함수화 (에로우 function)

```jsx
const Button = () => (
      <button
        style={{
          backgroundColor: "tomato",
        }}
        onClick={() => console.log("im clicked")}
      >
        Click me
      </button>
    );
```

- 함수화 (그냥 function)

```jsx
function Title() {
      return (
        <h3 id="title" onMouseEnter={() => console.log("mouse enter")}>
          HELLO
        </h3>
      );
```

## 값이 바뀔 때마다 리렌더링하기

- React는 바뀐 부분만 확인해서 변경함

## useState

> array로 값을 저장
> 

```jsx
const data = React.useState();
```

⇒ [undefined, f]가 반환 

    (undefined : data, f : 데이터 바꿀 때 사용하는 function)

- useState 초기값 설정 : `React.useState(초기값);`

### 배열 요소를 이름으로 꺼내기

```jsx
const [요소1, 요소2, ...] = array이름;
```

- setCounter 함수로 click할 때마다 counter를 1씩 증가시켜 리렌더링
    
    (React는 데이터가 바뀔 때마다 컴포넌트를 리렌더링하고 UI를 refresh)
    

```jsx
const App = () => {
      let [counter, setCounter] = React.useState(0);
      const onClick = () => {
        setCounter(counter + 1);
      };

      return (
        <div>
          <h3>Total clicks:{counter}</h3>
          <button onClick={onClick}>Click me</button>
        </div>
      );
    };
```

### state 할당

1. **직접 할당**
    
    ```jsx
    setCounter(counter+1);
    ```
    
2. **함수로 할당**
    - 다른 곳에서 counter를 변화시킬 위험이 없음
    - 현재 state를 바탕으로 다음 state 계산
    
    ```jsx
    setCounter((current) => current + 1);
    ```
    

## HTML vs JSX

1. <label for> → <label htmlFor>
2. class → className

## event

> 함수에 event를 넘기면 event 내용 받아올 수 있음
**event.target.value** 로 받아오기 가능
> 

`<input>` 

disabled : input에 입력불가 

- disabled = {false} 이면 input 입력 가능

value : 디폴트 값

- target : 방금 바뀐 input
- event : 사용자의 input

```jsx
const App = () => {
      const [minutes, setMinutes] = React.useState();
      const onChange = (event) => {
        setMinutes(event.target.value);
      };
      return (
        <div>
          <h1>Super Converter</h1>
          <label htmlFor="minutes">Minutes</label>
          <input
            value={minutes}
            id="Minutes"
            placeholder="Minutes"
            type="number"
            onChange={onChange}
          />
          <h4>You want to convert {minutes}</h4>
          <label htmlFor="hours">Hours</label>
          <input id="hours" placeholder="Hours" type="number" />
        </div>
      );
    };
```

**onChange 함수 : 데이터 업데이트 함수**

1. input의 event를 받아와서
2. minutes이나 hours이란 value를 골라 setMinuetes 함수에 토스

onChange={setMinutes(event.target.value) → event 없어서 에러

```jsx
//리셋 버튼까지
<script type="text/babel">
    //   html태그와 같은 이름이어야 함  createElement안
    const root = document.getElementById("root");
    // span과 btn을 동시에 root에 넣고 싶으면 div 만들어서 넣어준다
    // const container = React.createElement("div", null, [Title, button]);
    const App = () => {
      const [minutes, setMinutes] = React.useState(0);
      const onChange = (event) => {
        setMinutes(event.target.value);
      };
      const reset = () => setMinutes(0);
      return (
        <div>
          <div>
            <h1>Super Converter</h1>
            <label htmlFor="minutes">Minutes</label>
            <input
              value={minutes}
              id="Minutes"
              placeholder="Minutes"
              type="number"
              onChange={onChange}
            />
          </div>
          <div>
            <label htmlFor="hours">Hours</label>
            <input
              value={minutes / 60}
              id="hours"
              placeholder="Hours"
              type="number"
            />
          </div>
          <button onClick={reset}>Reset</button>
        </div>
      );
    };
    ReactDOM.render(<App />, root);
  </script>
```

## Flipped state

> flip버튼을 누를때마다 minutes<→hours 변환되도록
> 

```jsx
const [flipped, setFlipped] = React.useState(false);
const onFlip = () => setFlipped((current) => !current);
```

```jsx
<label htmlFor="minutes">Minutes</label>
            <input
							// 삼항연산자로 flipped === True면 amount*60라는 값 반환,
							// false면 amount 반환
              value={flipped ? amount * 60 : amount}
              id="Minutes"
              placeholder="Minutes"
              type="number"
              onChange={onChange}
              disabled={flipped}
            />
<label htmlFor="hours">Hours</label>
            <input
              value={flipped ? amount : Math.round(minutes / 60)}
              id="hours"
              placeholder="Hours"
              type="number"
              onChange={onChange}
              disabled={!flipped}
            />
```

- minutes 기준
    - flipped == True → amount * 60
    - flipped == False → amount
    - disabled={flipped} 이니까 input에 값을 입력할 수 있을 때, 위와 같이 됨
    
- 전체코드
    
    ```jsx
    <!DOCTYPE html>
    <html lang="en">
      <body>
        <div id="root"></div>
      </body>
      <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
      <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
      <script type="text/babel">
    
        const root = document.getElementById("root");
      
        const App = () => {
          const [amount, setAmount] = React.useState(0);
          const [flipped, setFlipped] = React.useState(false);
          const onChange = (event) => {
            setMinutes(event.target.value);
          };
          const reset = () => setAmount(0);
          const onFlip = () => {
            reset();
            setFlipped((current) => !current);
          };
    
          return (
            <div>
              <div>
                <h1>Super Converter</h1>
                <label htmlFor="minutes">Minutes</label>
                <input
                  value={flipped ? amount * 60 : amount}
                  id="Minutes"
                  placeholder="Minutes"
                  type="number"
                  onChange={onChange}
                  disabled={flipped}
                />
              </div>
              <div>
                <label htmlFor="hours">Hours</label>
                <input
                  value={flipped ? amount : Math.round(minutes / 60)}
                  id="hours"
                  placeholder="Hours"
                  type="number"
                  onChange={onChange}
                  disabled={!flipped}
                />
              </div>
              <button onClick={reset}>Reset</button>
              <button onClick={onFlip}>Flipped</button>
            </div>
          );
        };
        ReactDOM.render(<App />, root);
      </script>
    </html>
    ```
    

## props

> 부모 컴포넌트 → 자식 컴포넌트로 상속
props로 인자를 넘겨주어 재사용 용이하게 함수화
> 
- text, big 2개를 인자로 받아와서 App 함수에서 해당 내용을 입력

```jsx
function Btn({ text, big }) {
      return (
        <button
          style={{
            backgroundColor: "tomato",
            color: "white",
            padding: "10px 20px",
            border: 0,
            borderRadius: 10,
            fontSize: big ? 30 : 16,
          }}
        >
          {text}
        </button>
      );
    }
const App = () => {
      return (
        <div>
          <Btn text="Save Changes" big={true} />
          <Btn text="Continue" />
        </div>
      );
    };
```

- 인자에 디폴트 값을 줄 수 있음 → default 텍스트가 적힌 버튼 생성
- 버튼이 onClick을 인자로 받아 setValue를 실행시킴

```jsx
function Btn({ text = "default", changeValue }) {
      return (
        <button
          onClick={changeValue}
          style={{
            backgroundColor: "tomato",
            color: "white",
            padding: "10px 20px",
            border: 0,
            borderRadius: 10,
          }}
        >
          {text}
        </button>
      );
    }
```

- text, changeValue를 props로 버튼함수에 담음.
- 인자에 불과하기 때문에 changeValue에 onClick으로 이벤트리스너를 달아줌.

```jsx
function Btn({ text, changeValue }) {
      return (
        <button
          onClick={changeValue}
          style={{
            backgroundColor: "tomato",
            color: "white",
            padding: "10px 20px",
            border: 0,
            borderRadius: 10,
          }}
        >
          {text}
        </button>
      );
    }
    const App = () => {
      const [value, setValue] = React.useState("Save Changes");
      const changeValue = () => setValue("Revert Changes");
      return (
        <div>
          <Btn text={value} onClick={changeValue} />
          <Btn text="Continue" />
        </div>
      );
    };
```

## React Memo

> 컴포넌트 하위 컴포넌트가 많을 때, 
상위 컴포넌트의 데이터가 변해 state가 변하면, 하위 모든 요소를 rerender하게 됨
→ 렌더링 시간 너무 많이 걸림 (렉)
> 

**⇒ React.memo()를 이용해서 부분렌더링을 실행**

- 이 방식을 통해 setValue 함수인 changeValue가 존재하는 버튼만 렌더링 실행됨

```jsx
const MemorizedBtn = React.memo(Btn);
function APP() {
      const [value, setValue] = React.useState("Save Changes");
      const changeValue = () => setValue("Revert Change");

      return (
        <div>
          <MemorizedBtn text={value} changeValue={changeValue} />
          <MemorizedBtn text="Continue" />
        </div>
      );
    }
```

## Proptype

- 리액트는 변수에 들어오는 값의 type을 모르기 때문에 propTypes로 type을 지정해줄 수 있다.

```jsx
Btn.propTypes = {
//.isRequired 는 필수사항
	text : PropTypes.string.isRequired,
//.isRequired 없으면 optional
	fontSize : PropTypes.number,
}
```

## useEffect

> 처음 render 때만 코드 실행, 다른 state 변화에는 실행되지 않도록 
**특정 코드들이 첫 번째 컴포넌트 render에서만 실행되게 함**
> 

원래는 state가 변하면 모든 코드들이 다 렌더됨

- API에서 데이터를 가져올 때,
    - 첫 번째 component render에서 API call하고
    - state 변화하면, 또 API를 call 할 수도 있음 → 문제!!!
    
    ⇒ **처음 한번만 실행되게 하자!**
    

### useEffect

> 2개의 인자를 받는 함수 (약간 do-while문)
> 

```jsx
useEffect(function, deps);
useEffect(함수, [검사하고자 하는 값 or 빈 배열])
```

```jsx
useEffect(() => {
	console.log("이건 1번만 실행됨");
}, []);
```