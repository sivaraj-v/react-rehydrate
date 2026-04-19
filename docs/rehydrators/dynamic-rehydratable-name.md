# Determining data-rehydratable from the markup

In the previous examples, you'll notice that the `data-rehydratable` attribute needs to exist in three locations:
1. In the **Markup** that you integrate into your templates.
2. In the **Rehydrator Object** key passed to `rehydrate(container, { Key: Rehydrator }, options)`.
3. Optionally, as a prop within your **Component definition** (though this is purely for your own logic).

You can decouple your components from your implementation by reading the `data-rehydratable` attribute in your rehydrator and passing it as a prop.

```javascript
import PaymentPortal from "./PaymentPortal";

// This pattern allows your component to stay 'clean' while 
// your rehydrator handles the bridge logic.

export default async (domNode) => {
  const props = {
    // Read the provider dynamically (e.g., Stripe, PayPal, etc.)
    provider: domNode.getAttribute("data-rehydratable")
  };
  
  // Hand off control for nested rehydration (e.g., ApplePay or CreditCard fields)
  const children = await rehydrateChildren(domNode.querySelector(".PaymentPortal-subfields"));

  return <PaymentPortal {...props}>{children}</PaymentPortal>
};
```

### Why this matters

By determining the rehydratable name in this way, only your templates and your call to `rehydrate` need to match. This enables you to:
- **Namespace components**: e.g., `B2B-PaymentPortal` vs `Consumer-PaymentPortal`.
- **Version components**: e.g., `PaymentPortal_v5`.
- **Dynamic Selection**: High-order rehydrators that decide which payment gateway UI to mount based on the attribute value.

