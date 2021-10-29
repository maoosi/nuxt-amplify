import { resolve, join } from 'path'

export default function nuxtAmplify(moduleOptions) {
    // get all options for the module
    const options = {
        ...moduleOptions,
        ...this.options.nuxtAmplify,
    }

    // expose the namespace / set a default
    if (!options.namespace) options.namespace = 'amplify'
    const { namespace } = options

    // register plugin
    this.addPlugin({
        src: resolve(__dirname, 'plugin.js'),
        fileName: join(namespace, './plugin.js'),
        options,
    })

    // register middleware
    this.addPlugin({
        src: resolve(__dirname, 'middleware.js'),
        fileName: join(namespace, './middleware.js'),
        options,
    })
}

module.exports.meta = require('./package.json')
