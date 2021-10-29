# nuxt-amplify

Not maintained and 100% experimental module to use the AWS Amplify SDK with Nuxt 2.

## Setup

1/ Copy the content of the `nuxt-amplify` directory in your Nuxt 2 project inside `modules/nuxt-amplify`.

2/ Install the aws-amplify package via `yarn add aws-amplify`.

3/ Edit your `nuxt.config.js` file with the below:

```javascript
// nuxt.config.js
modules: [
    [
        '~/modules/nuxt-amplify', {
            inject: [
                { library: 'Auth', constant: 'auth' },
                { library: 'Api', constant: 'api' },
                // ...
            ],
        },
    ],
],
```

4/ Make sure to provide all necessary Environment vars used inside `/modules/nuxt-amplify/plugin.js`, as well as editing the config object to your needs.

5/ To protect a page from non-logged-in users, you can create a middleware:

```javascript
// middleware/auth.js
export default async function ({ redirect, $auth }) {
    try {
        await $auth.currentAuthenticatedUser()
    } catch (err) {
        console.log(err)
        return redirect('/login')
    }
}
```

```html
<!-- pages/protected.vue -->
<template>
    <h1>Protected</h1>
</template>

<script>
export default {
    auth: true
}
</script>
```

6/ To call the various auth methods from your app:

```html
<!-- pages/logout.vue -->
<script>
export default {
    name: 'AuthLogout',
    async beforeCreate() {
        await this.$auth.logout()
        this.$router.push('/')
    }
}
</script>
```