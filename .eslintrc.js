module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "eol-last": ["error", "always"],
    "indent": ["error", "tab", { "SwitchCase": 1 }],
    "keyword-spacing": ["error", { "after": true, "before": true }],
    "linebreak-style": ["error", "unix"],
    "no-console": ["error", { "allow": ["log", "warn", "error"] }],
    "no-trailing-spaces": "error",
    "quotes": ["error", "double"],
    "semi": ["error", "always"],
    "space-before-blocks": ["error", "always"],
    "vue/html-closing-bracket-newline": ["warn", {
      "singleline": "never",
      "multiline": "never"
    }],
    "vue/html-indent": ["error", "tab"],
    "vue/max-attributes-per-line": ["warn", {
      "singleline": 6,
      "multiline": {
        "max": 1,
        "allowFirstLine": false
      }
    }],
    "vue/no-use-v-if-with-v-for": ["warn", {
      "allowUsingIterationVar": true
    }],
    "vue/singleline-html-element-content-newline": ["warn", {
      "ignoreWhenNoAttributes": true,
      "ignoreWhenEmpty": true,
      "ignores": ["p", "div", "a", "span"]
    }]
  }
};
