module.exports = function override(config, env) {
    const overrideConfig = {
        ...config,
        target: 'electron-renderer',
    }
    console.log(overrideConfig);
    return overrideConfig
}