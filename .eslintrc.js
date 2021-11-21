module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        createDefaultProgram: true,
    },
    plugins: [
        '@typescript-eslint',
        '@typescript-eslint/tslint',
        'eslint-plugin-import',
    ],
    rules: {
        '@typescript-eslint/typedef': [
            'warn',
            {
                arrayDestructuring: true,
                arrowParameter: true,
                memberVariableDeclaration: true,
                objectDestructuring: true,
                parameter: true,
                propertyDeclaration: true,
                variableDeclaration: true,
            },
        ],
        '@typescript-eslint/explicit-function-return-type': 'warn',
        '@typescript-eslint/consistent-type-definitions': 'warn',
        '@typescript-eslint/explicit-member-accessibility': [
            'warn',
            {
                accessibility: 'explicit',
            },
        ],

        'indent': [
            'warn',
            4,
            {
                ignoreComments: true,
                SwitchCase: 1,
            },
        ],

        '@typescript-eslint/no-inferrable-types': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
        '@typescript-eslint/no-var-requires': 'off',

        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/member-delimiter-style': [
            'off',
            {
                multiline: {
                    delimiter: 'none',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-floating-promises': 'warn',
        '@typescript-eslint/no-parameter-properties': 'off',
        '@typescript-eslint/prefer-for-of': 'warn',
        '@typescript-eslint/prefer-function-type': 'warn',
        '@typescript-eslint/quotes': [ 'warn', 'single' ],
        '@typescript-eslint/restrict-plus-operands': 'warn',
        '@typescript-eslint/semi': ['off', null],
        '@typescript-eslint/space-within-parens': ['off', 'never'],
        '@typescript-eslint/type-annotation-spacing': 'off',
        '@typescript-eslint/unified-signatures': 'warn',
        '@typescript-eslint/prefer-readonly': 'warn',
        '@typescript-eslint/no-use-before-define': 'off',
        'arrow-body-style': ['warn', 'always'],
        'arrow-parens': ['warn', 'as-needed'],
        camelcase: 'warn',
        'comma-dangle': [
            'warn',
            {
                'arrays': 'always-multiline',
                'objects': 'always-multiline',
                'imports': 'always-multiline',
                'exports': 'always-multiline',
                'functions': 'never',
            },
        ],
        complexity: 'off',
        'require-jsdoc': [
            'warn',
            {
                'require':
                {
                    'FunctionDeclaration': true,
                    'MethodDefinition': true,
                    'ClassDeclaration': true,
                    'ArrowFunctionExpression': true,
                    'FunctionExpression': true,
                },
            },
        ],
        'constructor-super': 'warn',
        curly: 'warn',
        'dot-notation': 'warn',
        'eol-last': 'warn',
        eqeqeq: ['warn', 'always'],
        'guard-for-in': 'warn',
        'id-blacklist': ['warn', 'any', 'Number', 'number', 'String', 'string', 'Boolean', 'boolean'],
        'id-match': 'warn',
        'import/no-deprecated': 'warn',
        'import/order': 'off',
        'linebreak-style': 'off',
        'max-classes-per-file': [ 'warn', 1 ],
        'max-len': [
            'warn',
            {
                'code':     120,
                'tabWidth': 4,
            },
        ],
        'new-parens': 'off',
        'newline-per-chained-call': 'off',
        'no-bitwise': 'warn',
        'no-caller': 'warn',
        'no-cond-assign': 'warn',
        'no-console': 'warn',
        'no-debugger': 'warn',
        'no-empty': 'warn',
        'no-empty-function': 'warn',
        '@typescript-eslint/no-empty-function': 'off',
        'no-eval': 'warn',
        'no-extra-bind': 'warn',
        'no-extra-semi': 'warn',
        'no-fallthrough': 'warn',
        'no-invalid-this': 'warn',
        'no-irregular-whitespace': 'warn',
        'no-multiple-empty-lines': ['warn', { 'max': 1, 'maxEOF': 0 }],
        'no-new-wrappers': 'warn',
        'no-shadow': 'off',
        'no-throw-literal': 'warn',
        'no-trailing-spaces': 'warn',
        'no-undef-init': 'warn',
        'no-underscore-dangle': 'warn',
        'no-unsafe-finally': 'warn',
        '@typescript-eslint/no-shadow': 'warn',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-argument': 'off',
        'no-unused-expressions': 'warn',
        'no-unused-labels': 'warn',
        'no-else-return': 'warn',
        'object-shorthand': 'off',
        'one-var': ['warn', 'never'],
        'quote-props': 'off',
        radix: 'warn',
        'space-before-function-paren': 'off',
        'spaced-comment': 'warn',
        'use-isnan': 'warn',
        'prefer-const': 'warn',
        'valid-typeof': 'off',

        '@typescript-eslint/member-ordering': [
            'warn',
            {
                'default': [

                    'signature',

                    'public-static-field',
                    'protected-static-field',
                    'private-static-field',

                    'public-abstract-field',
                    'protected-abstract-field',
                    'private-abstract-field',

                    'public-instance-field',
                    'protected-instance-field',
                    'private-instance-field',

                    'public-field',
                    'protected-field',
                    'private-field',

                    'static-field',
                    'instance-field',
                    'abstract-field',

                    'field',

                    'constructor',

                    'public-abstract-method',
                    'protected-abstract-method',
                    'private-abstract-method',

                    'public-instance-method',
                    'protected-instance-method',
                    'private-instance-method',

                    'public-method',
                    'protected-method',
                    'private-method',

                    'public-static-method',
                    'protected-static-method',
                    'private-static-method',

                    'static-method',
                    'instance-method',
                    'abstract-method',

                    'method',
                ],
            },
        ],
        '@typescript-eslint/array-type': [
            'warn',
            {
                'default': 'array',
            },
        ],
    },
};
