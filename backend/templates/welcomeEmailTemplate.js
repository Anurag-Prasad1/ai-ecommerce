const welcomeEmailTemplate =
  (name) => `
<!DOCTYPE html>
<html>

<head>
<meta charset="utf-8" />
</head>

<body
style="
background:#f5f7fa;
padding:30px;
font-family:Arial;
"
>

<div
style="
max-width:600px;
margin:auto;
background:white;
border-radius:12px;
overflow:hidden;
"
>

<div
style="
background:#111827;
color:white;
padding:25px;
text-align:center;
"
>

<h1>
NovaCart 🚀
</h1>

</div>

<div
style="
padding:30px;
"
>

<h2>
Welcome ${name}
</h2>

<p>
Thank you for joining
NovaCart.
</p>

<p>
Explore products,
AI tools,
recommendations
and much more.
</p>

<div
style="
margin-top:20px;
"
>

<a
href="http://localhost:3000"
style="
background:#2563eb;
color:white;
padding:12px 20px;
text-decoration:none;
border-radius:6px;
"
>
Start Shopping
</a>

</div>

</div>

<div
style="
padding:20px;
background:#f3f4f6;
text-align:center;
"
>

NovaCart © 2026

</div>

</div>

</body>

</html>
`;

module.exports =
  welcomeEmailTemplate;