const orderConfirmationTemplate =
({
  name,
  orderId,
  totalPrice,
  orderItems,
}) => {

const itemsHtml =
orderItems
.map(
(item) => `
<tr>
<td>
${item.name}
</td>

<td>
${item.qty}
</td>

<td>
₹${item.price}
</td>
</tr>
`
)
.join("");

return `
<!DOCTYPE html>

<html>

<body
style="
background:#f5f7fa;
padding:30px;
font-family:Arial;
"
>

<div
style="
max-width:700px;
margin:auto;
background:white;
border-radius:12px;
overflow:hidden;
"
>

<div
style="
background:#16a34a;
padding:25px;
color:white;
text-align:center;
"
>

<h1>
Order Confirmed ✅
</h1>

</div>

<div
style="
padding:25px;
"
>

<h3>
Hello ${name}
</h3>

<p>
Your order has been
placed successfully.
</p>

<p>
Order ID:
<b>${orderId}</b>
</p>

<table
style="
width:100%;
border-collapse:collapse;
margin-top:20px;
"
border="1"
>

<tr>

<th>
Product
</th>

<th>
Qty
</th>

<th>
Price
</th>

</tr>

${itemsHtml}

</table>

<h2
style="
margin-top:20px;
"
>

Total:
₹${totalPrice}

</h2>

</div>

<div
style="
background:#f3f4f6;
padding:20px;
text-align:center;
"
>

Thank you for shopping
with NovaCart 🚀

</div>

</div>

</body>

</html>
`;
};

module.exports =
  orderConfirmationTemplate;