```
 _____   _____   _____        _____   _____   _____   _____        ___   _____   _____  
| ____| |  _  \ /  ___|      /  ___/ |_   _| /  _  \ |  _  \      /   | /  ___| | ____| 
| |__   | | | | | |          | |___    | |   | | | | | |_| |     / /| | | |     | |__   
|  __|  | | | | | |          \___  \   | |   | | | | |  _  /    / / | | | |  _  |  __|  
| |___  | |_| | | |___        ___| |   | |   | |_| | | | \ \   / /  | | | |_| | | |___  
|_____| |_____/ \_____|      /_____/   |_|   \_____/ |_|  \_\ /_/   |_| \_____/ |_____| 
```
## 简介

一个增强我们使用localStorage、sessionStorage能力的库

## 使用方式

本地安装依赖
```bash
pnpm add edc-storage # pnpm
npm install edc-storage # npm
yarn add edc-storage # yarn
```

项目中使用
```js
// ESM
import edcStorage from 'edc-storage'

edcStorage.getStorage("key")

// CJS
const edcStorage = require('edc-storage');
edcStorage.getStorage("key")

// 按需引用  setStorage 将会被 tree-sharking
import { getStorage,setStorage } from 'edc-utils'
getStorage("key")
```

## 功能

- `getStorage` : 获取localStorage or sessionStorage
- `setStorage` : 设置localStorage or sessionStorage
- `getAllStorage` : 获取全部localStorage or sessionStorage
- `removeStorage` : 移除localStorage or sessionStorage
- `clearStorage` : 清空全部localStorage or sessionStorage

## TODO
- 文档补充
- demo
- 新特性:安全性(加密 解密)