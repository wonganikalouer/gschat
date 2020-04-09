require("settings_tokto.js")
require("css/gstokto.css")
var sent=new Audio()
sent.src="fx/sent2.wav"
function _ready() {
	
	var b=create("button")
	b.id="main_button"
	b.innerHTML=button_label
	b.value=button_label
	b.style.backgroundColor=heading_color
	b.onclick=function(argument) {
		if (menu_state) {
			menu_state=false
			var d=get(".main-div")
			d.style.height="36px"
			d.style.marginTop=(window.screen.height-150)+"px"
		}else{
			menu_state=true
			var d=get(".main-div")
			d.style.height="400px"
			d.style.marginTop=(window.screen.height-520)+"px"
		}
	}
	

	var chat_div=create("div")
	chat_div.className="main-div"
	chat_div.style.marginLeft=(window.screen.width-390)+"px"
	chat_div.style.marginTop=(window.screen.height-150)+"px"

	var chat_board=create("div")
	chat_board.className="chat-board"

	//where the user types his codes
	var mesage_field=create("div")
	mesage_field.className="gs-message-field"
	var input=create("input")
	input.type="text"
	input.id="gs-input"
	input.placeholder="type message here"
	input.addEventListener("keydown",function(evt){
		if(evt.key=="Enter"){
			var message=input.value
			if(message!=""){
			renderMessage(message)
			// connect to a bot through this code
			//tokbot.main_method(message)
			}
			input.value=""
		}
	})
	mesage_field.appendChild(input)

	chat_div.appendChild(b)
	chat_div.appendChild(chat_board)
	chat_div.appendChild(mesage_field)
	document.children[0].appendChild(chat_div)
}

function renderMessage(msg) {
	var mes_holder=create("div")
	mes_holder.id="-tokto-message-client"
	mes_holder.innerHTML=msg
	user_message=msg
	setValue("#main_button","Agent [typing]")
	
	get(".chat-board").appendChild(mes_holder)
	mes_holder.scrollIntoView()
	mes_holder.animate("showMessage 300ms ease-in-out")
	// sent.play()
	// setTimeout(fakeMessageResponse,3000)
	try{talkBot(user_message)}catch(err){
		Toast(err)
	}
}

var resp
function renderResponse(response) {
	var date=new Date()
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	resp="<i>"+date.getDay()+" "+months[date.getMonth()]+" "+date.getFullYear()+" | "+date.getHours()+" : "+date.getMinutes()+" : "+date.getSeconds()+"</i><br>"+response
	setTimeout(delayRespose,delay)
}

function delayRespose(argument) {
	var mes_holder=create("div")
	mes_holder.id="-tokto-message-agent"
	mes_holder.innerHTML=resp
	setValue("#main_button",agent_name+" (online)")
	get(".chat-board").appendChild(mes_holder)
	mes_holder.scrollIntoView()
	mes_holder.animate("showMessage 300ms ease-in-out")
	sent.play()
}

function fakeMessageResponse() {
	var msg=get("#gs-input")
	var generated_response=generateMessage(msg.value)
	var mes_holder=create("div")
	mes_holder.id="-tokto-message-agent"
	mes_holder.innerHTML=generated_response
	setValue("#main_button",agent_name+" (online)")
	get(".chat-board").appendChild(mes_holder)
	mes_holder.scrollIntoView()
	mes_holder.animate("showMessage 300ms ease-in-out")
	sent.play()
}

function generateMessage(m) {
	var commands=user_message.toLowerCase().split(" ")
	if (method=="GET"){
	for(var i=0;i<commands.length;i++){
		switch(commands[i]){
			case "hi" || "hello" || "hey":{
				Toast("--Greetings!--")
				return "Hello, My name is GSTalk-Bot. How may i serve you?"
				break;
			}
			case "show" || "services":{
				return "I am honored to help you in the following scenarios.<br>"+
				"<ol><li>Open an account</li>"+
				"<li>Download this API</li>"+
				"<li>Installing API</li>"+
				"<li>Using GreenSwitch Libraries</li>"+
				"<li>Talt to AGENT</li></ol>"
				break;
			}
			case "5":{
				setTimeout(liveAgent,5000)
				setValue("#main_button","Connecting to Agent")
				return "Connecting you to your nearest agent..."
			}
		}
	}
	return "Am sorry, I seem not to understand what you are saying"
}else{
	method="GET"
	return "Thank you for chatting with us. If you need more service talk to our live Bot"
}
}

function liveAgent() {
	var mes_holder=create("div")
	mes_holder.id="-tokto-message-agent"
	agent_name="Wongani Kaluwa"
	mes_holder.innerHTML="Hello, my name is Wongani Kaluwa, Marketing Specialist at GreenSwitch Digital. How may i help you"
	method="POST"
	setValue("#main_button",agent_name+" (online)")
	get(".chat-board").appendChild(mes_holder)
	mes_holder.scrollIntoView()
	mes_holder.animate("showMessage 300ms ease-in-out")
	sent.play()
}

