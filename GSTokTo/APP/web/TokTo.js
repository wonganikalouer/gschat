require("settings_tokto.js")
require("css/gstokto.css")
function _ready() {
	var b=create("button")
	b.id="main_button"
	b.innerHTML=button_label
	b.value=button_label
	b.style.marginLeft=(window.screen.width-360)+"px"
	b.style.marginTop=(window.screen.height-150)+"px"
	document.children[0].appendChild(b)
}