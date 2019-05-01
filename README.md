# 1日3000円生活
[Colours](http://webcolourdata.com/profile/5)

## 手順
```bash
expo init [アプリ名]
cd [アプリ名]
npm start

# 以下のディレクターを作成
- src
  - components
  - elements
  - screens
  
# eslintを導入
npm install --save-dev eslint babel-eslint eslint-config-airbnb

# eslintのpluginを導入
npm install --save-dev eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react

# eslintの設定ファイルを作成
eslintrc.jsonファイルを作成

# eslintrc.jsonファイルに以下をコピペ
{
  "extends": "airbnb",
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  "rules": {
    "react/jsx-no-bind": 0,
    "no-use-before-define": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": 0,
    "react/prop-types": 0
  },
  "parser": "babel-eslint"
}

# 以下を必要な時にインストール
npm install @expo/vector-icons@8.0.0
npm install --save react-navigation
npm install --save firebase
```


## ファイル

