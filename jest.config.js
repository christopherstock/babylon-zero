module.exports = {
    'testMatch': [
        '**/*.(test|spec).(ts|tsx)',
    ],
    'collectCoverage': true,
    'coverageDirectory': 'public/coverage',
    'coverageThreshold': {
        'global': {
            'branches':   0, // 80,
            'functions':  0, // 80,
            'lines':      0, // 80
            'statements': 0  // -10
        }
    },
    'reporters': [
        'default',
        [
            'jest-junit',
            {
                outputDirectory: 'public',
                outputName: 'test-results.xml',
            }
        ]
    ]
};
