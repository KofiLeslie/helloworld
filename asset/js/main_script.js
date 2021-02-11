    var sent_audio = new Audio("message_sent.mp3");
	var received_audio = new Audio("message_received.mp3");

	var CURRENT_CHAT_USER = "";
	var SEEN_STATUS = false;

	function _(element){

		return document.getElementById(element);
	}

	var label_contacts = _("label_contacts");
	label_contacts.addEventListener("click",get_contacts);
	
	var label_chat = _("label_chat");
	label_chat.addEventListener("click",get_chats);
	
	var label_settings = _("label_settings");
	label_settings.addEventListener("click",get_settings);
	

	var logout = _("logout");
	logout.addEventListener("click",logout_user);

	function get_data(find,type){

		var xml = new XMLHttpRequest();
		var loader_holder = _("loader_holder");
		loader_holder.className = "loader_on";

		xml.onload = function (){

			if(xml.readyState == 4 || xml.status == 200){

				loader_holder.className = "loader_off";
				handle_result(xml.responseText,type);
			}

		}

		var data = {};
		data.find = find;
		data.data_type = type;
		data = JSON.stringify(data);

		xml.open("POST","api.php",true);
		xml.send(data);
	}

	function handle_result(result,type){

		if(result.trim() != ""){

			var inner_right_pannel = _("inner_right_pannel");
			inner_right_pannel.style.overflow = "visible";

			var obj = JSON.parse(result);
			if(typeof(obj.logged_in) != "undefined" && !obj.logged_in){

				window.location = "login.php";
			}else{

				switch(obj.data_type){

					case "user_info":
						var username = _("username");
						var email = _("email");
						var profile_image = _("profile_image");

						username.innerHTML =  obj.username;
						email.innerHTML =  obj.email;
						profile_image.src =  obj.image;
						break;

					case "contacts":
						
						var inner_left_pannel = _("inner_left_pannel");
 
						inner_right_pannel.style.overflow = "hidden";
						inner_left_pannel.innerHTML =  obj.message;
						break;

					case "chats_refresh":
						SEEN_STATUS = false;
						var messages_holder = _("messages_holder");
						messages_holder.innerHTML =  obj.messages;
						if(typeof obj.new_message != 'undefined'){
							if(obj.new_message){
								received_audio.play();

								setTimeout(function(){
									messages_holder.scrollTo(0,messages_holder.scrollHeight);
									var message_text = _("message_text");
									message_text.focus();
								},100);

							}
						}

						
						break;

					case "send_message":
						sent_audio.play();
					case "chats":
						SEEN_STATUS = false;
						var inner_left_pannel = _("inner_left_pannel");
 
						inner_left_pannel.innerHTML =  obj.user;
						inner_right_pannel.innerHTML =  obj.messages;

						var messages_holder = _("messages_holder");
						
						setTimeout(function(){
							messages_holder.scrollTo(0,messages_holder.scrollHeight);
							var message_text = _("message_text");
							message_text.focus();
						},100);
						
						if(typeof obj.new_message != 'undefined'){
							if(obj.new_message){
								received_audio.play();
							}
						}

						break;

					 
					case "settings":
						var inner_left_pannel = _("inner_left_pannel");
 
						inner_left_pannel.innerHTML =  obj.message;
						break;
					
					case "send_image":
						alert(obj.message);
						break;
					case "save_settings":
  
						alert(obj.message);
						get_data({},"user_info");
						get_settings(true);
						break;
					
  

				}
			}
		}
	}

	function logout_user()
	{
		var answer = confirm("Are you sure you want to log out??");
		if(answer){
			get_data({},"logout");
		}
	}

	get_data({},"user_info");
	get_data({},"contacts");
	
	var radio_contacts = _("radio_contacts");
	radio_contacts.checked = true;

	function get_contacts(e)
	{

		get_data({},"contacts");
	}

	function get_chats(e)
	{

		get_data({},"chats");
	}

	function get_settings(e)
	{

		get_data({},"settings");
	}
	
	function send_message(e)
	{

		var message_text = _("message_text");
		if(message_text.value.trim() == ""){
			
			alert("please type something to send");
			return;
		}

 		get_data({

			message:message_text.value.trim(),
			userid :CURRENT_CHAT_USER

		},"send_message");

	}

	function enter_pressed(e)
	{
		if(e.keyCode == 13)
		{
			send_message(e);
		}

		SEEN_STATUS = true;
	}

	setInterval(function(){

		var radio_chat = _("radio_chat");
		var radio_contacts = _("radio_contacts");

		if(CURRENT_CHAT_USER != "" && radio_chat.checked)
		{
			
    			get_data({
    				userid:CURRENT_CHAT_USER,
    				seen:SEEN_STATUS
    			},"chats_refresh");
		}

		
		if(radio_contacts.checked)
		{
			
    		get_data({},"contacts");
		}
 
  
	},5000);

	function set_seen(e){

		SEEN_STATUS = true;
	}

	function delete_message(e)
	{

		if(confirm("Are you sure you want to delete this message??")){

			var msgid = e.target.getAttribute("msgid");
			get_data({
    				rowid:msgid
    			},"delete_message");

			get_data({
    				userid:CURRENT_CHAT_USER,
    				seen:SEEN_STATUS
    			},"chats_refresh");
		}
	}

	function delete_thread(e)
	{

		if(confirm("Are you sure you want to delete this whole thread??")){

 			get_data({
    				userid:CURRENT_CHAT_USER
    			},"delete_thread");

			get_data({
    				userid:CURRENT_CHAT_USER,
    				seen:SEEN_STATUS
    			},"chats_refresh");
		}
	}

