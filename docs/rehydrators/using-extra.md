# Using the `extra` argument

> A working version of this can be seen in the [Hello User demo](/demos/hello-user)

If you have any page-level state that needs to be available to your components, you can use the `extra` argument - it's the third argument passed to every rehydrator.

Let's say that you have a component called `HelloUser`, which simply outputs a heading that greets the current user.

In order to avoid binding `HelloUser` to a particular method of storing the user name it accepts a `userName` prop:

```jsx
<HelloUser userName="John Smith" />
```

But, on your site, you know that `userName` is always available in a `user_name` cookie. When you rehydrate, you can pass this into the `extra` property of the `options`:

```javascript
import rehydrate from "@sivaraj-v/react-rehydrate";
import helloUserRehydrator from "./components/HelloUser/rehydrator";

import Cookies from "js-cookie";

rehydrate(
  document.getElementById("root"),
  {
    HelloUser: helloUserRehydrator
  },
  {
    extra: {
      userName: Cookies.get("user_name")
    }
  }
)
```

Now, `userName` is available to your rehydrator:

```javascript
import HelloUser from "./HelloUser";

export default async (domNode, rehydrateChildren, { userName }) => {
  return <HelloUser userName={userName} />;
};
```

