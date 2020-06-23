module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$",
    "moduleFileExtensions": [
        "ts",
        "tsx",
        "js",
        "jsx",
        "json",
        "node"
    ], 
    moduleNameMapper: {
        "^Components(.*)": "<rootDir>/src/Components$1",
        "^Containers(.*)": "<rootDir>/src/Containers$1",
        "^Constants(.*)": "<rootDir>/src/Constants$1",
        "^DataAccess(.*)": "<rootDir>/src/DataAccess$1",
        "^Store(.*)": "<rootDir>/src/Store$1",
        "^Actions(.*)": "<rootDir>/src/Actions$1",
        "^Utilities(.*)": "<rootDir>/src/Utilities$1",
        "^Hooks(.*)": "<rootDir>/src/Hooks$1",
        "^Types(.*)": "<rootDir>/src/Types$1",
        "\\.(css|less|scss|sss|styl)$": "identity-obj-proxy"
    }
};
