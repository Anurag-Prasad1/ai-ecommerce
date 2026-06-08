function CheckoutSteps({
  step1,
  step2,
  step3,
  step4,
}) {
  return (
    <div className="checkout-steps">
      <div
        className={
          step1
            ? "step active"
            : "step"
        }
      >
        🛒 Cart
      </div>

      <div className="line" />

      <div
        className={
          step2
            ? "step active"
            : "step"
        }
      >
        🚚 Shipping
      </div>

      <div className="line" />

      <div
        className={
          step3
            ? "step active"
            : "step"
        }
      >
        💳 Place Order
      </div>

      <div className="line" />

      <div
        className={
          step4
            ? "step active"
            : "step"
        }
      >
        ✅ Success
      </div>
    </div>
  );
}

export default CheckoutSteps;