import React, { useState } from 'react'
import { Demo1, Demo2 } from '@/components'
import bigImg from '@/assets/imgs/pic.png'
import './App.scss'

function App() {
  const [count, setCounts] = useState('444')
  const onChange = (e: any) => {
    setCounts(e.target.value)
  }
  return (
    <>
      <img src={bigImg} alt="大于10kb的图片" />
      <h2>webpack5+react+ts</h2>
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <br />
      <p>非受控组件</p>
      <input type="text" />
      <Demo1 />
      <Demo2 />
    </>
  )
}
export default App
