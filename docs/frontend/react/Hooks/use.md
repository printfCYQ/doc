# use

> -   学习视频：[https://www.bilibili.com/video/BV1sV411c7u9](https://www.bilibili.com/video/BV1sV411c7u9)
> -   我敲的代码：[https://github.com/printfCYQ/learn-react-hooks](https://github.com/printfCYQ/learn-react-hooks)
> -   hooks: [https://react.docschina.org/reference/react/hooks](https://react.docschina.org/reference/react/hooks)

# use

# useCallback

```tsx
import React, { useCallback, useState } from 'react';

const set = new Set()

const Comp: React.FC = () => {

  const [keyword, setKeyword] = useState('')

  // 每次输入框变化都会触发 生成一个新的函数 set内的内容越来越多
  // const changeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
  //     setKeyword(e.currentTarget.value);
  // };

  // 使用useCallback缓存 只会生成一个函数
  // useCallback的第一个参数是一个函数，返回值是缓存的函数，第二个参数是依赖项数组
  // 1. 不传，每次都会生成新的函数
  // 2. 传入一个空数组，只有第一次会生成新的函数
  // 3. 传入一个指定的依赖项，只有依赖改变时才会生成新的函数
  const changeKeyword = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  }, []);
  set.add(changeKeyword)
  console.log(set);

  return (
    <>
      <h2>01. useCallback 缓存函数</h2>
      <input type="text" value={keyword} onChange={changeKeyword} />
      <p>keyword: {keyword}</p>
    </>
  )
}

export default Comp
```
```tsx
import React, { useCallback, useEffect, useState } from 'react';

const SearchInput: React.FC<{ onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = React.memo((props: any) => {

  useEffect(() => {
    console.log('02-SearchInput组件渲染了');
  })

  return (
    <input type="text" onChange={props.onChange} />
  )
})

type ListItemType = {
  completed: boolean,
  id: number,
  title: string,
  userId: number
}
const SearchBox: React.FC<{ keyword: string }> = (props) => {
  const [list, setList] = useState<Array<ListItemType>>([])
  useEffect(() => {
    if (!props.keyword) {
      setList([])
      return
    }
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(data => {
        setList(data.filter((item: ListItemType) => item.title.includes(props.keyword)))
      })
  }, [props.keyword])
  return (
    <div>
      <ul>
        {list.map(item => <li key={item.id}>{item.title}</li>)}
      </ul>
    </div>
  )
}

const Comp: React.FC = () => {

  const [keyword, setKeyword] = useState('')

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.currentTarget.value);
  }, [])

  return (
    <>
      <h2>02. useCallback + useMemo 避免组件重复渲染</h2>
      <SearchInput onChange={onChange}></SearchInput>
      <SearchBox keyword={keyword}></SearchBox>
    </>
  )
}

export default Comp
```

# useContext

```tsx
import React, { useContext, useState } from 'react';

type AppContextType = { count: number; setCount: React.Dispatch<React.SetStateAction<number>> }

const AppContext = React.createContext<AppContextType>({} as AppContextType)

export const Comp: React.FC = () => {
    const [count, setCount] = useState(0)

    return (
        <div>
            <h2>01.useContext  基本用法</h2>
            <div style={{ padding: 30, backgroundColor: '#0f4759' }}>
                <p>父组件-count值是：{count}</p>
                <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
                <AppContext.Provider value={{ count, setCount }}>
                    <Child />
                </AppContext.Provider>
            </div>
        </div>

    )
}

const Child: React.FC = () => {
    return (
        <div style={{ padding: 30, backgroundColor: 'lightgreen' }}>
            <GrandSon />
        </div>
    )
}

const GrandSon: React.FC = () => {

    const ctx = useContext(AppContext)
    const add = () => ctx.setCount((prev) => prev + 1)

    return (
        <>
            <div style={{ padding: 30, backgroundColor: 'lightsalmon' }}>
                <p>孙组件-count 的值是：{ctx.count}</p>
                <button onClick={add}>+1</button>
                <button onClick={() => ctx.setCount(0)}>重置</button>
            </div>
        </>
    )
}

export default Comp
```
```tsx
import React, { useContext, useState } from 'react';

type AppContextType = { count: number; setCount: React.Dispatch<React.SetStateAction<number>> }

const AppContext = React.createContext<AppContextType>({} as AppContextType)

// 创建一个 Wrapper 组件
export const AppContextWrapper: React.FC<React.PropsWithChildren> = (props) => {
    const [count, setCount] = useState(0)
    return <AppContext.Provider value={{ count, setCount }}>{props.children}</AppContext.Provider>
}

export const Comp: React.FC = () => {
    const { count, setCount } = useContext(AppContext)

    return (
        <div>
            <h2>01.useContext  以非侵入的方式使用 Context</h2>
            <div style={{ padding: 30, backgroundColor: '#0f4759' }}>
                <p>父组件-count值是：{count}</p>
                <button onClick={() => setCount((prev) => prev + 1)}>+1</button>
                <Child />
            </div>
        </div>

    )
}

const Child: React.FC = () => {
    return (
        <div style={{ padding: 30, backgroundColor: 'lightgreen' }}>
            <GrandSon />
        </div>
    )
}

const GrandSon: React.FC = () => {
    const ctx = useContext(AppContext)
    const add = () => ctx.setCount((prev) => prev + 1)

    return (
        <>
            <div style={{ padding: 30, backgroundColor: 'lightsalmon' }}>
                <p>孙组件-count 的值是：{ctx.count}</p>
                <button onClick={add}>+1</button>
                <button onClick={() => ctx.setCount(0)}>重置</button>
            </div>
        </>
    )
}

export default Comp
```
```tsx
import React, { useContext } from 'react';
import { useImmerReducer } from 'use-immer';

type UserType = typeof defaultState
type ActionType = { type: 'UPDATE_NAME'; payload: string } | { type: 'INCREMENT'; payload: number } | { type: 'DECREMENT'; payload: number } | { type: 'RESET' }
type ContextType = { user: UserType; dispatch: React.Dispatch<ActionType> }

const defaultState = { name: 'CYQ', age: 18 }

const reducer = (prevState: UserType, action: ActionType) => {
    console.log('触发了 reducer 的执行')
    console.log(action)

    switch (action.type) {
        case 'UPDATE_NAME':
            prevState.name = action.payload
            break
        case 'INCREMENT':
            prevState.age += action.payload
            break
        case 'DECREMENT':
            prevState.age -= action.payload
            break
        case 'RESET':
            return initAction(defaultState)
        default:
            return prevState
    }
}

const initAction = (initState: UserType) => {
    return { ...initState, age: Math.round(Math.abs(initState.age)) || 18 }
}

// 1. 创建 Context 对象
const UserInfoContext = React.createContext<ContextType>({} as ContextType)

// 2. 创建 Wrapper 组件
export const UserInfoContextWrapper: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useImmerReducer(reducer, defaultState, initAction)
    return <UserInfoContext.Provider value={{ user: state, dispatch }}>{children}</UserInfoContext.Provider>
}

const Child1: React.FC = () => {
    const { user, dispatch } = useContext(UserInfoContext)

    const add = () => dispatch({ type: 'INCREMENT', payload: 1 })

    return (
        <div style={{ flex: 1, backgroundColor: '#374E7E' }}>
            <p>{JSON.stringify(user)}</p>
            <button onClick={add}>年龄+1</button>
        </div>
    )
}

const Child2: React.FC = () => {
    const { user, dispatch } = useContext(UserInfoContext)
    const sub = () => dispatch({ type: 'DECREMENT', payload: 5 })

    return (
        <div style={{ flex: 1, backgroundColor: '#666418' }}>
            <p>{JSON.stringify(user)}</p>
            <button onClick={sub}>年龄-5</button>
            <hr />
            <GrandSon />
        </div>
    )
}

const GrandSon: React.FC = () => {
    const { dispatch } = React.useContext(UserInfoContext)

    const reset = () => dispatch({ type: 'RESET' })

    return (
        <div style={{ backgroundColor: '#B38989' }}>
            <h3>这是 GrandSon 组件</h3>
            <button onClick={reset}>重置</button>
        </div>
    )
}

export const Comp: React.FC = () => {
    const { user, dispatch } = useContext(UserInfoContext)

    const changeUserName = () => {
        dispatch({ type: 'UPDATE_NAME', payload: 'cyq' })
    }

    return (
        <div>
            <h2>03.useContext  重构 useReducer 案例</h2>
            <button onClick={changeUserName}>修改用户名</button>
            <p>{JSON.stringify(user)}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Child1 />
                <Child2 />
            </div>
        </div>
    )
}

export default Comp  
```

# useDebugValue

# useDeferredValue

> `useDeferredValue` 可以让你延迟更新 UI 的某些部分。
```tsx
import { ChangeEvent, FC, memo, useDeferredValue, useState } from 'react'

const Comp: FC = () => {
    const [kw, setKw] = useState('')
    // useDeferredValue 的作用：
    // 根据指定的 State 状态，创建出对应的延迟版本的 State 状态
    const deferredKw = useDeferredValue(kw)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setKw(e.currentTarget.value)
    }

    return (
        <div style={{ height: 500, overflow: 'auto' }}>
            <h2>02. useDeferredValue 优化文本输入+样式表明值已经过时</h2>
            <input type="text" value={kw} onChange={onInputChange} />
            <hr />
            <div style={{ opacity: kw !== deferredKw ? 0.3 : 1, transition: 'opacity 0.5s ease' }}>
                <SearchResult query={deferredKw} />
            </div>
        </div>
    )
}

const SearchResult: FC<{ query: string }> = memo((props) => {
    if (!props.query) return

    const items = Array(40000)
        .fill(props.query)
        .map((item, i) => <p key={i}>{item}</p>)

    return items
})

export default Comp
```



# useEffect

```tsx
import React, { useEffect, useState } from 'react';

// useEffect 参数
// 第一个参数 fn 是一个副作用函数，该函数会在每次渲染完成之后被调用；
// 第二个参数是可选的依赖项数组，这个数组中的每一项内容都会被用来进行渲染前后的对比
// 当依赖项发生变化时，会重新执行 fn 副作用函数
// 当依赖项没有任何变化时，则不会执行 fn 副作用函数

const Comp: React.FC = () => {
    const [count, setCount] = useState(0)

    console.log('01', document.querySelector('#count')?.innerHTML); // 上一次的值

    const add = () => {
        setCount(count + 1)
    }

    // 在组件每次渲染完成之后，都会重新直接useEffect的回调函数
    useEffect(() => {
        console.log('01-useEffect', document.querySelector('#count-01')?.innerHTML); // 最新的值
    })

    return (
        <>
            <h2>01. useEffect 的执行时机</h2>
            <h2 id='count-01'>count 的值：{count}</h2>
            <button onClick={add}>+1</button>
        </>
    )
}

export default Comp
```
```tsx
import React, { useEffect, useState } from 'react';

const Comp: React.FC = () => {
    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(false)

    const add = () => {
        setCount(count + 1)
    }

    // 1. 不写 deps 的时候，在组件每次渲染完成之后，都会重新直接useEffect的回调函数
    // 2. 写空数组的时候，在组件初始化时，会执行useEffect的回调函数，但后续不会再次执行
    // 3. 指定依赖项的时候，只有依赖项发生变化的时候，才会重新执行useEffect的回调函数
    useEffect(() => {
        console.log('02-useEffect', document.querySelector('#count-02')?.innerHTML);
    })
    // }, [])
    // }, [count])

    return (
        <>
            <h2>02. useEffect 的 依赖数组deps</h2>
            <h2 id='count-02'>count 的值：{count}</h2>
            <h2>flag 的值：{String(flag)}</h2>
            <button onClick={() => setFlag(flag => !flag)}>flag</button>
            <button onClick={add}>+1</button>
        </>
    )
}

export default Comp
```
```tsx
import React, { useEffect, useState } from 'react';

const Comp: React.FC = () => {
    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(false)

    const add = () => {
        setCount(count + 1)
    }

    useEffect(() => {
        // 会死循环
        // setCount(count + 1)

        // 写上[] 则不会死循环
    }, [])

    useEffect(() => {
        console.log('03-useEffect-count', document.querySelector('#count-03')?.innerHTML);
    }, [count])
    useEffect(() => {
        console.log('03-useEffect-flag', document.querySelector('#flag-03')?.innerHTML);
    }, [flag])

    return (
        <>
            <h2>03. useEffect 不要改变依赖项。多个副作用分开写，不要写在一起</h2>
            <h2 id='count-03'>count 的值：{count}</h2>
            <h2 id='flag-03'>flag 的值：{String(flag)}</h2>
            <button onClick={() => setFlag(flag => !flag)}>flag</button>
            <button onClick={add}>+1</button>
        </>
    )
}

export default Comp
```
```tsx
import React, { useEffect, useState } from 'react';

const Child: React.FC = () => {
    const [title, setTitle] = useState('')
    useEffect(() => {
        const controller = new AbortController()
        const querydata = async () => {
            fetch('https://jsonplaceholder.typicode.com/todos/1', { signal: controller.signal })
                .then(res => res.json())
                .then(data => {
                    setTitle(data.title)
                }).catch(err => console.log(err.message))
        }
        querydata()
        return () => {
            // 两个执行时机
            // 1. 组件被卸载时
            // 2. 副作用函数执行前
            console.log('04-useEffect-child-清理副作用')
            controller.abort()
        }
    })
    return (
        <>
            <h2>子组件:title的值：{title}</h2>
        </>
    )
}

const Comp: React.FC = () => {
    const [flag, setFlag] = useState(true)

    const toggle = () => {
        setFlag(flag => !flag)
    }

    return (
        <>
            <h2>04. useEffect 可以返回一个函数，清理副作用</h2>
            <button onClick={toggle}>toggle child</button>
            {flag && <Child />}
        </>
    )
}

export default Comp
```
```tsx
import React, { useEffect, useState } from 'react';

const Child: React.FC = () => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            console.log('05-useEffect',e.clientX, e.clientY);
            setPosition({
                x: e.clientX,
                y: e.clientY
            })
        }

        window.addEventListener('mousemove', handleMove)

        return () => {
            window.removeEventListener('mousemove', handleMove)
        }
    }, [])

    return (
        <>
            <h2>子组件: 鼠标位置{JSON.stringify(position)}</h2>
        </>
    )
}

const Comp: React.FC = () => {
    const [flag, setFlag] = useState(true)

    const toggle = () => {
        setFlag(flag => !flag)
    }

    return (
        <>
            <h2>05. useEffect 组件卸载后，解绑事件</h2>
            <button onClick={toggle}>toggle child</button>
            {flag && <Child />}
        </>
    )
}

export default Comp
```
```tsx
import React, { useEffect, useState } from 'react';

const Child: React.FC = () => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })

    useEffect(() => {
        let timerId: null | number = null
        const handleMove = (e: MouseEvent) => {
            if (timerId !== null) {
                return
            }
            timerId = setTimeout(() => {
                console.log('06-useEffect', e.clientX, e.clientY);
                setPosition({
                    x: e.clientX,
                    y: e.clientY
                })
                timerId = null
            }, 100)
        }

        window.addEventListener('mousemove', handleMove)

        return () => {
            window.removeEventListener('mousemove', handleMove)
        }
    }, [])

    return (
        <>
            <h2>子组件: 鼠标位置{JSON.stringify(position)}</h2>
        </>
    )
}

const Comp: React.FC = () => {
    const [flag, setFlag] = useState(true)

    const toggle = () => {
        setFlag(flag => !flag)
    }

    return (
        <>
            <h2>06. useEffect mousemove添加节流</h2>
            <button onClick={toggle}>toggle child</button>
            {flag && <Child />}
        </>
    )
}

export default Comp
```
---
```tsx
import { useMousePosition } from '@/hooks';
import React, { useState } from 'react';

const Child: React.FC = () => {
  const position = useMousePosition(200)

  return (
    <>
      <h2>子组件: 鼠标位置{JSON.stringify(position)}</h2>
    </>
  )
}

const Comp: React.FC = () => {
  const [flag, setFlag] = useState(true)

  const toggle = () => {
    setFlag(flag => !flag)
  }

  return (
    <>
      <h2>07. useEffect 封装自定义hooks</h2>
      <button onClick={toggle}>toggle child</button>
      {flag && <Child />}
    </>
  )
}

export default Comp
```
```tsx
import { useEffect, useState } from "react"

export const useMousePosition = (delay: number = 0) => {
    const [position, setPosition] = useState({
        x: 0,
        y: 0
    })

    useEffect(() => {
        let timerId: null | number = null
        const handleMove = (e: MouseEvent) => {
            if (timerId !== null) {
                return
            }
            timerId = setTimeout(() => {
                console.log('06-useEffect', e.clientX, e.clientY);
                setPosition({
                    x: e.clientX,
                    y: e.clientY
                })
                timerId = null
            }, delay)
        }

        window.addEventListener('mousemove', handleMove)

        return () => {
            window.removeEventListener('mousemove', handleMove)
        }
    }, [])

    return position
}
```
---
```tsx
import { useCountDown } from '@/hooks';
import React from 'react';

const Comp: React.FC = () => {
    const { count, disabled } = useCountDown(10)

    return (
        <>
            <h2>08. useEffect 封装倒计时 hooks</h2>
            <button
                disabled={disabled}
                onClick={() => {
                    console.log('已同意');
                }}>
                {disabled ? `请阅读${count}秒` : '点击同意协议'}
            </button>
        </>
    )
}

export default Comp
```
```tsx
type UseCountDown = (time?: number) => {
    count: number
    disabled: boolean
}
export const useCountDown: UseCountDown = (time: number = 10) => {
    const seconds = Math.round(Math.abs(time)) || 10
    const [count, setCount] = useState(seconds)
    const [disabled, setDisabled] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            if (count > 1) {
                setCount(prev => prev - 1)
            } else {
                clearTimeout(timer)
                setDisabled(false)
            }
        }, 1000)

        return () => {
            clearTimeout(timer)
        }
    }, [count])

    return {
        count,
        disabled
    }
}
```
---
```tsx
import React, { useLayoutEffect, useState } from 'react';

// useLayoutEffect 和 useEffect 的使用方式很相似：
// 1. useLayout 接收一个函数和一个依赖项数组作为参数
// 2. 只有在数组中的依赖项发生改变时才会再次执行副作用函数
// 3. useLayoutEffect 也可以返回一个清理函数

// useEffect	    在浏览器重绘之后触发	异步执行，不阻塞浏览器绘制
// useLayoutEffect	在浏览器重绘之前触发	同步执行，阻塞浏览器重新绘制

const Comp: React.FC = () => {
    const [count, setCount] = useState(Math.random() * 10)

    // 会闪烁一下
    // useEffect(() => {
    //     console.log('09-useEffect', count);
    //     if (count === 0) {
    //         setCount(Math.random() * 10)
    //     }
    // }, [count])

    useLayoutEffect(() => {
        console.log('09-useLayoutEffect', count);
        if (count === 0) {
            setCount(Math.random() * 10)
        }
    }, [count])

    return (
        <>
            <h2>09. useLayoutEffect  count 的值：{count} </h2>
            <button onClick={() => setCount(0)}>
                改为0
            </button>
        </>
    )
}

export default Comp
```

# useId

# useImperativeHandle

> -   它主要用于在某些场景下向父组件暴露自定义的实例方法或属性。
> -   要与 forwardRef 结合使用来正确传递和处理引用。
> -   仔细考虑需要暴露的功能，确保只提供必要且安全的操作接口。
> `React.forwardRef` 是 `React` 提供的一个 API，用于创建一个能够将 `ref` 传递到子组件的高阶组件。它的作用是解决在函数组件中无法直接使用 `ref` 的问题。



```tsx
import React, { forwardRef } from 'react';

import InputComponent from './components/InputComponent';

import { InputComponentProps, InputComponentRef } from './components/type';

const ForwardedInputComponent = forwardRef<InputComponentRef, InputComponentProps>(InputComponent);

function App() {
	const ref = React.createRef<InputComponentRef>();

	return (
		<div className='root'>
			<div className='container'>
				<ForwardedInputComponent ref={ref} msg='父组件向子组件传参数' />
				<button onClick={() => ref.current?.focus()}>Focus Input</button>
			</div>
		</div>
	);
}

export default App
```
```tsx
import React, { useImperativeHandle, useState } from 'react';

import { InputComponentProps, InputComponentRef } from './type';

function InputComponent(props: InputComponentProps, ref: React.ForwardedRef<InputComponentRef>) {
	const inputRef = React.createRef<HTMLInputElement>();

	const [inputValue, setInputValue] = useState('')

	useImperativeHandle(ref, () => ({
		focus: () => {
			setInputValue(props?.msg)
			inputRef.current?.focus()
		},
	}));

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return <input ref={inputRef} value={inputValue} onChange={handleChange} />;
}

export default InputComponent
```
```tsx
export interface InputComponentProps {
	msg: string;
}

export interface InputComponentRef {
	focus: () => void;
}
```

# useInsertionEffect

> `useInsertionEffect` 是为 `CSS-in-JS` 库的作者特意打造的。

# useLayoutEffect

> **useLayoutEffect 和 useEffect 的使用方式很相似：**
> 
> 1\. useLayout 接收一个函数和一个依赖项数组作为参数
> 
> 2\. 只有在数组中的依赖项发生改变时才会再次执行副作用函数
> 
> 3\. useLayoutEffect 也可以返回一个清理函数

| useEffect | 在浏览器重绘之后触发 | 异步执行，不阻塞浏览器绘制 |
| --- | --- | --- |
| useLayoutEffect | 在浏览器重绘之前触发 | 同步执行，阻塞浏览器重新绘制 |

```tsx
import React, { useLayoutEffect, useState } from 'react';

// useLayoutEffect 和 useEffect 的使用方式很相似：
// 1. useLayout 接收一个函数和一个依赖项数组作为参数
// 2. 只有在数组中的依赖项发生改变时才会再次执行副作用函数
// 3. useLayoutEffect 也可以返回一个清理函数

// useEffect	    在浏览器重绘之后触发	异步执行，不阻塞浏览器绘制
// useLayoutEffect	在浏览器重绘之前触发	同步执行，阻塞浏览器重新绘制

const Comp: React.FC = () => {
    const [count, setCount] = useState(Math.random() * 10)

    // 会闪烁一下
    // useEffect(() => {
    //     console.log('09-useEffect', count);
    //     if (count === 0) {
    //         setCount(Math.random() * 10)
    //     }
    // }, [count])

    useLayoutEffect(() => {
        console.log('09-useLayoutEffect', count);
        if (count === 0) {
            setCount(Math.random() * 10)
        }
    }, [count])

    return (
        <>
            <h2>09. useLayoutEffect  count 的值：{count} </h2>
            <button onClick={() => setCount(0)}>
                改为0
            </button>
        </>
    )
}

export default Comp
```

# useMemo

> `useMemo` 主要是用于根据某些依赖项计算并缓存一个值，只有当依赖项发生变化时才重新计算，这和 `Vue` 里的计算属性有相似之处，计算属性也是基于相关数据的变化来动态计算并返回一个值。
> 
> 不过它们在具体的实现细节和一些特性上还是存在一些差异，但总体来说，这种类比有助于更好地理解 `useMemo` 的作用和功能。



```tsx
import { useState, useMemo } from'react';
function App() {  
  const [num1, setNum1] = useState(10);
  const [num2, setNum2] = useState(20);

  const result = useMemo(() => {
    // 一些复杂计算
    return num1 + num2;
  }, [num1, num2]);

  return (
    <div className='root'>
      <div className='container'>
        <button onClick={() => setNum1(num1 + 1)}>修改 num1</button>
        <button onClick={() => setNum2(num2 + 1)}>修改 num2</button>
        <p>计算结果: {result}</p>
      </div>
    </div>
  );
}

export default App
```
---
```tsx
import React from 'react';

const Child1: React.FC<{ count: number }> = (props) => {
    console.log('01-普通子组件渲染');
    return (
        <div>普通子组件:{props.count}</div>
    )
}

// React.memo 只有props发生变化时才会重新渲染
const Child2: React.FC<{ count: number }> = React.memo((props) => {
    console.log('01-memo子组件渲染');
    return (
        <div>memo子组件:{props.count}</div>
    )
})

const Comp: React.FC = () => {

    const [count, setCount] = React.useState(0)
    const [flag, setFlag] = React.useState(false)
    return (
        <>
            <h2>01. React.memo 避免子组件不必要的刷新</h2>
            <p>Count: {count}</p>
            <p>Flag: {String(flag)}</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setFlag(flag => !flag)}>toggle flag</button>
            <Child1 count={count}></Child1>
            <Child2 count={count}></Child2>
        </>
    )
}

export default Comp
```
---
```tsx
import React from 'react';

const Comp: React.FC = () => {

  const [count, setCount] = React.useState(0)
  const [flag, setFlag] = React.useState(false)

  // 只要组件重新渲染，就会执行
  const mood = () => {
    console.log('02-mood执行了');
    return flag ? '嘻嘻' : '不嘻嘻'
  }

  // 只有依赖项发生变化的时候，才会重新执行
  // React.useMemo 第二个参数是可选的，数组
  // 1. 不传，每次都会重新执行，不建议
  // 2. 传了，只有依赖项发生变化的时候，才会重新执行
  // 3. 空数组，只有组件初始化的时候，才会执行，只执行一次
  const memoMood = React.useMemo(() => {
    console.log('02-memoMood执行了');
    return flag ? '嘻嘻' : '不嘻嘻'
  }, [flag])

  return (
    <>
      <h2>02. useMemo 语法</h2>
      <p>Count: {count}</p>
      <p>Flag: {String(flag)}</p>
      <p>Mood: {mood()}</p>
      <p>MemoMood: {memoMood}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setFlag(flag => !flag)}>toggle flag</button>
    </>
  )
}

export default Comp
```

# useOptimistic

# useReducer

> -   可以将复杂的状态逻辑封装在 reducer 函数中，使其更清晰和可维护。
> -   可以结合 useContext 来共享状态和操作，方便在组件树中进行通信。
> -   对于大型应用，可以根据功能模块来划分不同的 reducer，然后通过组合来管理整体状态。
> `useReducer` 可以看作是一种特殊形式的 `useState`。
> 
> 它们有一些相似之处，比如都用于管理组件的状态。
> 
> 不同之处在于，`useReducer` 更适合处理比较复杂的状态更新逻辑，它将状态更新的逻辑集中到一个 `reducer` 函数中，通过不同的动作类型来明确如何更新状态，这使得状态更新的流程更清晰、更有条理，尤其是在状态更新操作较为繁多和复杂的情况下。而 `useState` 则相对更直接和简单一些，适用于较为简单的状态管理场景。



```tsx
import { useReducer } from 'react';

type IState = {
  count: number
}

type IAction = {
  type: 'INCREMENT' | 'DECREMENT';
};

function App() {
  const initialState:IState = { count: 0 };

  function reducer(state:IState, action:IAction) {
    switch (action.type) {
      case 'INCREMENT':
        return { count: state.count + 1 };
      case 'DECREMENT':
        return { count: state.count - 1 };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className='root'>
      <div className='container'>
        <p>Count: {state.count}</p>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
      </div>
    </div>
  );
}

export default App
```
---
```tsx
import React, { useReducer } from 'react';

type IState = {
    count: number
}

type IAction = {
    type: 'INCREMENT' | 'DECREMENT';
};
const Comp: React.FC = () => {
    const initialState: IState = { count: -1 };

    // 形参：初始数据，返回值：修改后的数据
    const initAction = (state: IState) => {
        if (state.count !== 0) {
            return {
                count: 0
            }
        }
        return state
    }

    const reducer = (state: IState, action: IAction) => {
        switch (action.type) {
            case 'INCREMENT':
                return { count: state.count + 1 };
            case 'DECREMENT':
                return { count: state.count - 1 };
            default:
                return state;
        }
    }

    // 不能直接修改 state ，需要使用 dispatch（dispatch 会触发 reducer 的执行）
    const [state, dispatch] = useReducer(reducer, initialState, initAction);

    return (
        <>
            <h2>01. useReducer 基本使用</h2>
            <p>Count: {state.count}</p>
            <button onClick={() => dispatch({ type: 'INCREMENT' })}>Increment</button>
            <button onClick={() => dispatch({ type: 'DECREMENT' })}>Decrement</button>
        </>
    )
}

export default Comp
```
---
```tsx
import React from 'react';
import { useImmerReducer } from 'use-immer';

type UserType = typeof defaultState
type ActionType = { type: 'UPDATE_NAME'; payload: string } | { type: 'INCREMENT'; payload: number } | { type: 'DECREMENT'; payload: number } | { type: 'RESET' }

// 初始状态
const defaultState = { name: 'CYQ', age: 18 }

// 在 reducer 函数的形参中：
// 第一个参数，永远都是上一次的旧状态
const reducer = (prevState: UserType, action: ActionType) => {
  console.log('触发了 reducer 的执行')
  console.log(action)

  // useImmerReducer 实现了，可以直接修改变量
  switch (action.type) {
    case 'UPDATE_NAME':
      // return { ...prevState, name: action.payload }
      prevState.name = action.payload
      break
    case 'INCREMENT':
      // return { ...prevState, age: prevState.age + action.payload }
      prevState.age += action.payload
      break
    case 'DECREMENT':
      // return { ...prevState, age: prevState.age - action.payload }
      prevState.age -= action.payload
      break
    case 'RESET':
      return initAction(defaultState)
    default:
      return prevState
  }
}

// 形参：是初始状态
// 返回值：处理好的初始状态
const initAction = (initState: UserType) => {
  return { ...initState, age: Math.round(Math.abs(initState.age)) || 18 }
}

const Child1: React.FC<UserType & { dispatch: React.Dispatch<ActionType> }> = (props) => {
  const { dispatch, ...user } = props

  const add = () => dispatch({ type: 'INCREMENT', payload: 1 })

  return (
    <div style={{ flex: 1, backgroundColor: '#374E7E' }}>
      <p>{JSON.stringify(user)}</p>
      <button onClick={add}>年龄+1</button>
    </div>
  )
}

const Child2: React.FC<UserType & { dispatch: React.Dispatch<ActionType> }> = (props) => {
  const { dispatch, ...user } = props

  const sub = () => dispatch({ type: 'DECREMENT', payload: 5 })

  return (
    <div style={{ flex: 1, backgroundColor: '#666418' }}>
      <p>{JSON.stringify(user)}</p>
      <button onClick={sub}>年龄-5</button>
      <hr />
      <GrandSon dispatch={dispatch} />
    </div>
  )
}

const GrandSon: React.FC<{ dispatch: React.Dispatch<ActionType> }> = (props) => {
  const reset = () => props.dispatch({ type: 'RESET' })

  return (
    <div style={{ backgroundColor: '#B38989' }}>
      <h3>这是 GrandSon 组件</h3>
      <button onClick={reset}>重置</button>
    </div>
  )
}

export const Comp: React.FC = () => {
  const [state, dispatch] = useImmerReducer(reducer, defaultState, initAction)

  const changeUserName = () => {
    // 不能直接修改 state 数据源
    dispatch({ type: 'UPDATE_NAME', payload: 'cyq' })
  }

  return (
    <div>
      <button onClick={changeUserName}>修改用户名</button>
      <p>{JSON.stringify(state)}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Child1 {...state} dispatch={dispatch} />
        <Child2 {...state} dispatch={dispatch} />
      </div>
    </div>
  )
}

export default Comp  
```

# useRef

```tsx
import React, { useRef } from 'react';

const Comp: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null)
    
    const focusInput = () => {
        inputRef.current?.focus()
    }

    return (
        <>
            <h2>01. useRef 获取DOM元素实例</h2>
            <input ref={inputRef} type="text" />
            <button onClick={focusInput}>聚焦</button>
        </>
    )
}

export default Comp
```
---
```tsx
import React, { useRef, useState } from 'react';

const Comp: React.FC = () => {
    const [count, setCount] = useState(0)
    const prevCountRef = useRef<number>() // 默认为 undefined

    const add = () => {
        setCount(prev => prev + 1)
        prevCountRef.current = count
    }

    return (
        <>
            <h2>02. 存储渲染周期之间的共享数据</h2>
            <h2>count 的新值：{count}， count 的旧值：{prevCountRef.current}</h2>
            <button onClick={add}>+1</button>
        </>
    )
}

export default Comp
```
---
```tsx
import React, { useRef, useState } from 'react';

const Comp: React.FC = () => {
    const [count, setCount] = useState(0)
    const time = useRef<number>(new Date().getTime())

    console.log('03.render')

    const add = () => {
        setCount(count + 1) // 组件会重新渲染 但是 time 的值不会重新初始化
    }

    const updateDate = () => {
        time.current = new Date().getTime()
        console.log(time.current) // 虽然值变了，但是组件不会重新渲染
    }

    return (
        <>
            <h2>03. 组件重新渲染时useRef不会重新初始化。useRef值变化不会触发组件重新渲染 </h2>
            <h2>count 的值：{count}， time 的值：{time.current}</h2>
            <button onClick={add}>+1</button>
            <button onClick={updateDate}>new date</button>
        </>
    )
}

export default Comp
```
---
```tsx
import React, { useEffect, useRef, useState } from 'react';

const Comp: React.FC = () => {
    const [count, setCount] = useState(0)
    const time = useRef<number>(new Date().getTime())

    // useEffect 在组件首次渲染时会执行 
    // 每次组件重新渲染完毕后都会执行（当依赖项发生变化时才会执行）
    useEffect(() => {
        console.log('04.useEffect') // 当time的值发生变化时不会打印，因为 time 是useRef（useRef 对象本身在内存中的引用并没有改变）
    }, [time.current])

    const add = () => {
        setCount(count + 1)
    }

    const updateDate = () => {
        time.current = new Date().getTime()
        console.log(time.current)
    }

    return (
        <>
            <h2>04. useRef 不能作为其它 Hooks 的依赖项 </h2>
            <h2>count 的值：{count}， time 的值：{time.current}</h2>
            <button onClick={add}>+1</button>
            <button onClick={updateDate}>new date</button>
        </>
    )
}

export default Comp
```
---
```tsx
import React, { useRef } from 'react';

const Child: React.FC = () => {
    return (
        <>
            <h2>子组件</h2>
        </>
    )
}

const Comp: React.FC = () => {
    const childRef = useRef()
    return (
        <>
            <h2>05. useRef 不能直接获取到子组件的实例 </h2>
            {/* 不能将类型“{ ref: MutableRefObject<undefined>; }”分配给类型“IntrinsicAttributes”。类型“IntrinsicAttributes”上不存在属性“ref”。 */}
            {/* Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()? */}
            {/* <Child ref={childRef} /> */}
        </>
    )
}

export default Comp
```
---
```tsx
import React, { useImperativeHandle, useRef } from 'react';

const Child = React.forwardRef((_, ref) => {

    // useImperativeHandle 向父组件暴露子组件的实例 暴露哪些 父组件能拿到哪些
    useImperativeHandle(ref, () => {
        return {
            a: 1
        }
    })
    return (
        <>
            <h2>子组件</h2>
        </>
    )
})

const Comp: React.FC = () => {
    const childRef = useRef()

    const getChild = () => {
        console.log(childRef.current) // {a: 1}
    }
    return (
        <>
            <h2>06. forwardRef & useImperativeHandle 获取到子组件的实例 </h2>
            <Child ref={childRef} />
            <button onClick={getChild}>获取子组件实例</button>
        </>
    )
}

export default Comp
```
---
```tsx
import React, { useImperativeHandle, useRef, useState } from 'react';

const Child = React.forwardRef((_, ref) => {

    const [count, setCount] = useState(0)
    useImperativeHandle(ref, () => {
        return {
            count,
            setCount
        }
    })
    return (
        <>
            <h2>子组件: count 的值：{count}</h2>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </>
    )
})

const Comp: React.FC = () => {
    const childRef = useRef<{
        count: number
        setCount: (count: number) => void
    }>()

    const resetChild = () => {
        childRef.current?.setCount(0)
    }
    return (
        <>
            <h2>07. 父组件使用子组件的变量和方法 </h2>
            <button onClick={resetChild}>重置子组件</button>
            <Child ref={childRef} />
        </>
    )
}

export default Comp
```
---
```tsx
import React, { useImperativeHandle, useRef, useState } from 'react';

const Child = React.forwardRef((_, ref) => {

    const [count, setCount] = useState(0)
    const [flag, setFlag] = useState(false)

    useImperativeHandle(ref, () => {
        // 组件初始化会执行（不执行--父组件就拿不到子组件的最新实例）
        // 第三个参数是数组，可以不写
        // 1.不写的时候，任何情况导致组件重新渲染 都会执行
        // 2.写了的时候（[count]），数组内的依赖项 导致组件重新渲染才会执行
        // 3.空数组（[]），任何情况都不会执行，只有第一次执行
        console.log('08.useImperativeHandle');
        return {
            count,
            setCount
        }
    }, [])
    return (
        <>
            <h2>子组件: count 的值：{count}</h2>
            <h2>子组件: flag 的值：{String(flag)}</h2>
            <button onClick={() => setCount(count + 1)}>+1</button>
            <button onClick={() => setFlag(flag => !flag)}>flag</button>
        </>
    )
})

const Comp: React.FC = () => {
    const childRef = useRef<{
        count: number
        setCount: (count: number) => void
    }>()

    const resetChild = () => {
        childRef.current?.setCount(0)
    }
    return (
        <>
            <h2>08. useImperativeHandle的第三个参数 </h2>
            <button onClick={resetChild}>重置子组件</button>
            <button onClick={() => console.log(childRef.current)}>获取子组件</button>
            <Child ref={childRef} />
        </>
    )
}

export default Comp
```

# useState

```tsx
import React, { useState } from 'react';

const Comp: React.FC = () => {
    const [count, setCount] = useState(0)
    
    const add = () => {
        setCount(count + 1)
    }

    return (
        <>
            <h2>01.useState  Count 的值：{count}</h2>
            <button onClick={add}>+1</button>
        </>
    )
}

export default Comp
```
---
```tsx
import React, { useState } from 'react';

const Comp: React.FC = () => {
    const [count, setCount] = useState(0) // 只在初始化时执行一次（默认值）

    console.log('02.render'); // count 变化时会重新渲染组件

    const add = () => {
        setCount(count + 1)
    }

    return (
        <>
            <h2>02.useState Count 的值：{count}, count 变化时会重新渲染组件</h2>
            <button onClick={add}>+1</button>
        </>
    )
}

export default Comp
```
---
```tsx
import React, { useState } from 'react';

const Comp: React.FC = () => {
    const [date] = useState({
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
        day: new Date().getDate(),
        hour: new Date().getHours(),
        minute: new Date().getMinutes(),
        second: new Date().getSeconds()
    })

    return (
        <>
            <h2>03. 函数作为useState默认值</h2>
            <h2>{date.year}年{date.month}月{date.day}日{date.hour}时{date.minute}分{date.second}秒</h2>
        </>
    )
}

export default Comp
```
---
```tsx
import React, { useEffect, useState } from 'react';

const Count: React.FC = () => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        console.log('useEffect', count); // 是最新值,在组件初始化时会执行
    }, [count])

    const add = () => {
        setCount(count + 1)
        console.log('add', count); // 不是最新值
    }
    return (
        <>
            <h2>04.useState 异步  Count 的值：{count}</h2>
            <button onClick={add}>+1</button>
        </>
    )
}

export default Count
```
---
```tsx
import React, { useState } from 'react';

const Count: React.FC = () => {
    const [count, setCount] = useState(0)
    const add = () => {
        // 两次只会执行一次
        setCount(count + 1)
        setCount(count + 2)
    }

    const addFn = () => {
        // 两次都会执行
        setCount(prev => prev + 1)
        setCount(prev => prev + 2)
    }
    return (
        <>
            <h2>05.值更新不及时的BUG  Count 的值：{count}</h2>
            <button onClick={add}>+1</button>
            <button onClick={addFn}>函数形式 +1</button>
        </>
    )
}

export default Count
```
---
```tsx
import React, { useState } from 'react';

const Count: React.FC = () => {
    const [user, setUser] = useState({
        name: 'CYQ',
        age: 18,
        sex: '男'
    })

    const changeAge = () => {
        user.age = 20 // 不会更新
    }

    const changeAgeFn = () => {
        // 方法1
        // setUser({
        //     ...user,
        //     age: 20
        // })

        // 方法2
        // user.age = 22
        // setUser({ ...user })

        // 方法3
        user.age = 24
        setUser(Object.assign({}, user))
    }

    return (
        <>
            <h2>06. 更新对象数据(数组一样)</h2>
            <h2>{JSON.stringify(user)}</h2>
            <button onClick={changeAge}>直接赋值</button>
            <button onClick={changeAgeFn}>函数赋值</button>
        </>
    )
}

export default Count
```
---
```tsx
import React, { useState } from 'react';

const Count: React.FC = () => {
    const [, forceUpdate] = useState({})

    console.log('07.render');

    const onRefresh = () => {
        forceUpdate({})
    }

    return (
        <>
            <h2>07.模拟组件强制刷新</h2>
            <button onClick={onRefresh}>刷新 {new Date().getTime()}</button>
        </>
    )
}

export default Count
```

# useSyncExternalStore

# useTransition

```tsx
import { FC, PropsWithChildren, useCallback, useState, useTransition } from 'react'

// 父组件
const Comp: FC = () => {
    const [activeTab, setActiveTab] = useState('home')

    // useTransition
    // 没有参数
    // 第一个值：布尔值，是否处于低优先级更新状态
    // 第二个值：函数，调用此函数，可以把状态的更新标记为低优先级的，不阻塞 UI 对用户操作的响应；
    const [isPending, startTransition] = useTransition()
    // 注意事项⚠️
    // 1. 传递给 startTransition 的函数必须是同步的。React 会立即执行此函数，并将在其执行期间发生的所有状态更新标记为 transition。
    //    如果在其执行期间，尝试稍后执行状态更新（例如在一个定时器中执行状态更新），这些状态更新不会被标记为 transition；
    // 2. 标记为 transition 的状态更新将被其他状态更新打断。例如在 transition 中更新图表组件，并在图表组件仍在重新渲染时继续在输入框中输入，
    //    React 将首先处理输入框的更新，之后再重新启动对图表组件的渲染工作；
    // 3. transition 更新不能用于控制文本输入。

    const onBtnClick = (name: string) => {
        // 把某次更新，标记为低优先级的，从而防止页面卡顿的情况
        startTransition(() => {
            setActiveTab(name)
        })

        // 组件的更新 会阻塞用户操作
        // setActiveTab(name)
    }

    // 渲染标签页的函数
    const renderTabs = useCallback(() => {
        if (isPending) return <h3>Loading...</h3>

        switch (activeTab) {
            case 'home':
                return <HomeTab />
            case 'movie':
                return <MovieTab />
            case 'about':
                return <AboutTab />
        }
    }, [activeTab, isPending])

    const tabs = ['home', 'movie', 'about']

    return (
        <div style={{ height: 500 }}>
            <h2>01. useTransition 使用方式</h2>
            {tabs.map((tab) => (
                <TabButton key={tab} isActive={activeTab === tab} onClick={() => onBtnClick(tab)}>
                    {tab}
                </TabButton>
            ))}
            <hr />
            {renderTabs()}
        </div>
    )
}

const TabButton: FC<PropsWithChildren & { onClick: () => void; isActive: boolean }> = (props) => {
    return (
        <button className={['btn', props.isActive ? 'active' : ''].join(' ')} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

const HomeTab: FC = () => {
    return <>HomeTab</>
}

// 模拟一个渲染耗时的组件
const MovieTab: FC = () => {
    const items = Array(100000)
        .fill('MovieTab')
        .map((item, i) => <p key={i}>{item}</p>)

    return items
}

const AboutTab: FC = () => {
    return <>AboutTab</>
}

export default Comp
```
```tsx
import { ChangeEvent, FC, useState, useTransition } from 'react'

const Comp: FC = () => {
    const [kw, setKw] = useState('')
    const [, startTransition] = useTransition()

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        startTransition(() => {
            setKw(e.currentTarget.value)
        })
    }

    return (
        <div style={{ height: 500 }}>
            <h2>02. useTransition 不能用于控制文本输入</h2>
            <input type="text" value={kw} onChange={onInputChange} />
            <hr />
            <SearchResult query={kw} />
        </div>
    )
}

const SearchResult: FC<{ query: string }> = (props) => {
    if (!props.query) return

    const items = Array(40000)
        .fill(props.query)
        .map((item, i) => <p key={i}>{item}</p>)

    return items
}

export default Comp
```
