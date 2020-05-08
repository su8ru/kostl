# こすとれ <KO･S Train Location>
![ver](https://img.shields.io/github/package-json/v/su8ru/kostl?style=for-the-badge)
![build](https://img.shields.io/github/workflow/status/su8ru/kostl/deploy/master?label=Deploy&style=for-the-badge)

![ts](https://img.shields.io/badge/TypeScript-^3.7.5-555.svg?labelColor=007ACC&logo=typescript&style=flat-square)
![Vue](https://img.shields.io/badge/Vue.js-^2.6.10-555.svg?labelColor=4fc08d&logo=vue.js&logoColor=fff&style=flat-square)
![ESLint](https://img.shields.io/badge/-ESLint-4B32C3.svg?logo=eslint&style=flat-square)
![BV](https://img.shields.io/badge/-Bootstrap%20Vue-563D7C.svg?logo=data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMyIDMyIj48c3R5bGUgdHlwZT0idGV4dC9jc3MiPi5zdDB7ZmlsbC1ydWxlOmV2ZW5vZGQ7Y2xpcC1ydWxlOmV2ZW5vZGQ7ZmlsbDojRkZGRkZGO308L3N0eWxlPjxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zLjEsMGgyNS44QzMwLjYsMCwzMiwxLjQsMzIsMy4xdjI1LjhjMCwxLjctMS40LDMuMS0zLjEsMy4xSDMuMUMxLjQsMzIsMCwzMC42LDAsMjguOVYzLjFDMCwxLjQsMS40LDAsMy4xLDB6IE0xMC4zLDIzLjhjMy40LDAsNS40LTEuNyw1LjQtNC41YzAtMi4xLTEuNS0zLjYtMy42LTMuOHYtMC4xYzEuNi0wLjMsMi45LTEuNywyLjktMy40YzAtMi40LTEuOC0zLjktNC43LTMuOUgzLjd2MTUuN0gxMC4zeiBNNi41LDEwLjNoM2MxLjcsMCwyLjYsMC44LDIuNiwyLjFjMCwxLjUtMS4xLDIuMy0zLjEsMi4zSDYuNVYxMC4zeiBNNi41LDIxLjd2LTQuOWgzYzIuMSwwLDMuMywwLjgsMy4zLDIuNWMwLDEuNi0xLjEsMi41LTMuMiwyLjUgSDYuNXogTTIzLjQsMjMuOGw1LjUtMTUuN2gtM2wtNCwxMi43aC0wLjFsLTQtMTIuN2gtMy4xbDUuNSwxNS43SDIzLjR6Ii8+PC9zdmc+Cg==&logoColor=fff&style=flat-square)
![FontAwesome](https://img.shields.io/badge/-Font%20Awesome-339af0.svg?logo=Font-Awesome&logoColor=ffffff&style=flat-square)


## Project setup
```
yarn install
yarn api:build
```

### Start development server
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

## About
### 対応路線

- 京王電鉄: 京王線･京王新線･京王相模原線･京王高尾線･京王競馬場線･京王動物園線
- 都営地下鉄: 都営新宿線（新宿～新宿三丁目駅間以東）
  
### 運用番号

[京王線談話室](https://6111.teacup.com/keiodia/bbs)
に掲載されている公式･非公式運番を使用
  
### 行き先表示

- 都営線内: 正確な表示に対応
- 京王線内: 正確な表示に対応（2020.04.01 Update 経過観察中）
- 化け運用: ほぼ対応済（２･３色表示）

### 車両番号

~~__[都営新宿線･京王線運用情報](https://loo-ool.com/rail/MS/)~~
~~より取得しています（2020.04.17 Update）~~

~~なお、技術的都合により、併結には対応していません（下り方の車両が表示されます）~~

IP BAN されました…ごめんなさい…（2020.04.20）

独自のデータベースを使う方針で復活。（2020.05.08 Update）

Back-end全然わからないのでバグがあるかもしれません。なお、すべての投稿は午前３時にリセットされます。

### 注意事項（簡易版）

- 提供するデータの正確性は保証されません。
- 京王電鉄および東京都交通局への問い合わせを固く禁止します。
- 新線新宿駅付近でAPIが変わるので、列車が増殖したり消えたりすることがあります。
- 都営新宿線内同一区間内での列車順序・駅のホーム配置情報は用意されていないため、実際と異なる可能性があります。

## 利用規約
  ### 概要
  こすとれ kostl（以下、当サイトとする）は、京王電鉄の提供する「列車走行位置お知らせサービス」および公共交通オープンデータ協議会の提供する「公共交通オープンデータセンター」から、京王線･京王新線･京王相模原線･京王高尾線･京王競馬場線･京王動物園線･都営地下鉄新宿線の列車走行位置データを取得し、情報を加えた上で表示するものです。

  ### 注意事項
  公共交通事業者により提供されたデータを元にしていますが、必ずしも正確・完全なものとは限りません。
  
  当サイトでは京王電鉄および公共交通オープンデータ協議会の提供するデータを使用していますが、当サイトについての公共交通事業者への問い合わせを固く禁止します。
  
  ### 連絡先
  当サイトについてのご連絡は、
  [Twitter(@su8ru_)](https://twitter.com/su8ru_)
  または
  [mail(contact@su8ru.dev)](mailto:contact@su8ru.dev)
  までお願いします。
