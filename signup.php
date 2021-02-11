<html>
<head>
	<title>My Chat</title>
	<link rel="stylesheet" href="asset/css/signup.css">
</head>
 
<body>

	<div id="wrapper">
 
 		<div id="header">
 			My Chat
 			<div style="font-size: 20px;font-family: myFont;">Signup</div>
 		</div>
 		<div id="error">some text</div>
		<form id="myform">
			<input type="text" name="username" placeholder="Username"><br>
			<input type="text" name="email" placeholder="Email"><br>
			<div style="padding: 10px;">
				<br>Gender:<br>
				<input type="radio" value="Male" name="gender_male"> Male<br>
				<input type="radio" value="Female" name="gender_male"> Female<br>
			</div>
			<input type="password" name="password" placeholder="Password"><br>
			<input type="password" name="password2" placeholder="Retype Password"><br>
			<input type="button" value="Sign up" id="signup_button" ><br>

 			<br>
 			<a href="login.php" style="display: block;text-align: center;text-decoration: none">
 				Already have an Account? Login here
 			</a>

		</form>
	</div>
	<script src="asset/js/signup.js"></script>
</body>
</html>


