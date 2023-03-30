module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [[
            'module-resolver',
            {
                root: ['.'],
                alias: {
                    "@assets": "./assets",
                    "@configs": "./configs",
                    '@components': './src/components',
                    '@context': './src/context',
                    '@hooks': './src/hooks',
                    '@navigation': './src/navigation',
                    '@screens': './src/screens',
                    '@styles': './src/styles',
                    '@utils': './src/utils',
                    '@myfirebase': './src/firebase',
                    '@theme': './src/utils/theme',
                    "@root": "./",
                },
            },
        ], [
            "module:react-native-dotenv"
        ]]
    }
};