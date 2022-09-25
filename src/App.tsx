import React, { useState } from 'react';
import { Demo1, Demo2 } from '@/components';
import bigImg from '@/assets/imgs/pic.png';
import './App.less';

function App() {
  const [count, setCounts] = useState('444');
  const onChange = (e: any) => {
    setCounts(e.target.value);
  };

  const dynamicImport = () => {
    import(/* webpackPrefetch: true, webpackChunkName: "util" */ './utils').then(({ sum }) => {
      console.log(sum(1, 1));
    });
  };

  return (
    <>
      <img src={bigImg} alt="大于10kb的图片" />
      <h2>webpack5+react+ts</h2>
      <p>受控组件</p>
      <input type="text" value={count} onChange={onChange} />
      <button onClick={dynamicImport}>动态导入</button>
      <br />
      <p>非受控组件</p>
      <input type="text" />
      <Demo1 />
      <Demo2 />
    </>
  );
}
export default App;
