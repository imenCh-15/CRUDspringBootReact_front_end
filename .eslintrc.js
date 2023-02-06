module.export={"env": {
    "browser": true,
"es2021": true
},
"extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:react/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended",
    
  ],

"overrides": [
],
"parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
},
"plugins": ["react", "import", "jsx-a11y", "sonarjs"],


"rules": {
    "react/prop-types": 0,
    "react/react-in-jsx-scope":"off",
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "quotes": ["error", "single", { avoidEscape: true },{allowTemplateLiterals: true}],
    "curly": ["error", "multi-or-nest", "consistent"],
    "jsx-quotes": ["error", "prefer-double"],
    "linebreak-style": 1,
    "sonarjs/cognitive-complexity": "warn",
  "sonarjs/no-duplicate-string": "warn"
  }
}
