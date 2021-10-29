import Amplify from 'aws-amplify'

const options = JSON.parse(`<%= JSON.stringify(options) %>`)
const { namespace, inject } = options
const injectConfig = inject

export default ({ env, isDev }, inject) => {
    const domain = !process.server ? window.location.hostname : null

    Amplify.configure({
        aws_appsync_graphqlEndpoint: env.API_ENDPOINT,
        aws_appsync_region: env.DEPLOY_AWS_REGION,
        aws_appsync_authenticationType: 'AWS_IAM',
        Auth: {
            identityPoolId: env.COGNITO_IDENTITYPOOL_ID,
            region: env.DEPLOY_AWS_REGION,
            userPoolId: env.COGNITO_USERPOOL_ID,
            userPoolWebClientId: env.COGNITO_WEBAPPCLIENT_ID,
            authenticationFlowType: 'USER_SRP_AUTH',
            ...(domain !== null && {
                domain: domain === 'localhost' ? domain : `.${domain}`,
                secure: !isDev,
            }),
        },
        ssr: true,
    })

    inject(namespace, Amplify)

    injectConfig.forEach((cfg) => {
        if (typeof Amplify[cfg.library] !== 'undefined') {
            inject(cfg.constant, Amplify[cfg.library])
        }
    })
}
