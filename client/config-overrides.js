const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));
    // config.node = {
    //     ...config.node,
    //     global: true,
    //     __dirname: true,
    //     __filename: true
    // }
    config.mode = "production";
    const overrideConfig = {
        ...config,
        target: 'electron-renderer',
    }

    console.log(overrideConfig);

    return overrideConfig
}