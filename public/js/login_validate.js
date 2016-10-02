var valLogin=1;
var valPass=1;
var log={};

function initLogin()
{
	login();
	passwordLogin();
}

$("#emailOrNumber").blur(function()
{
	login();
});


$("#pass").blur(function()
{
	passwordLogin();
});


function validate_email(val)
{
	var re=/^\S+@\w+\.\w+$/;
	return re.test(val);
}

$("#login").click(function() {
	var login=$("#emailOrNumber").val();
	var password=$("#pass").val();
	initLogin();
	// console.log(login);
	if(valLogin==0 && valPass==0)
	{
		log.emailOrNumber = $("#emailOrNumber").val();
        log.password = $("#pass").val();
		$.post("/login", log,
            function(data, status) {
                console.log("Data: " + data + "\nStatus: " + status);
                if (typeof data.redirect === "string") {
                    $("#loginmodal").find(".notifBox .notif-correct").removeClass("hidden");
                    window.location = data.redirect;
                } else {
				$("#loginmodal").find(".notifBox .notif-error strong").html("Something's wrong");
                    $("#loginmodal").find(".notifBox .notif-error").removeClass("hidden");
                }
            });
	}
	else
	{
		$("#loginmodal").find(".notifBox .notif-error strong").html('Rectify the errors');
        $("#loginmodal").find(".notifBox .notif-error").removeClass("hidden");
	}

});

function showLoginError(txt)
{
	$("#emailOrNumberLabel span").remove('span');
	$("#emailOrNumber").css({"outline":"none","border-color":"red"});
	var txt1=$("<span></span>").text(txt).css({'font-size':'8px','color':'red','display':'inline-block',"padding": "5px"});
	$("#emailOrNumberLabel").append(txt1);
}

function showPassErrorLogin(txt)
{
	$("#passLoginLabel span").remove('span');
	$("#pass").css({"outline":"none","border-color":"red"});
	var txt1=$("<span></span>").text(txt).css({'font-size':'8px','color':'red','display':'inline-block',"padding": "5px"});
	$("#passLoginLabel").append(txt1);
}

function login()
{
	var re=/^[0-9]{10}$/;
	var mo = /^[0-9]+$/;
	var val=$("#emailOrNumber").val();
	$("#emailOrNumberLabel span").remove("span");
	// console.log(val);
	if(val=="")
	{
		valLogin=1;
		showLoginError(" *Enter email or mobile No.");
	}
	else if(!re.test(val))
	{
		var ret=validate_email(val);

		if(mo.test(val))
			showLoginError(" *Invalid Mobile");
		else if(!ret)
		{
			valLogin=1;
			showLoginError(" *Invalid Email");
		}
		else
		{
			$("#emailOrNumber").css({"outline":"none","border-color":"white"});
			valLogin=0;
		}
	}
	else
	{
		$("#emailOrNumber").css({"outline":"none","border-color":"white"});
		valLogin=0;
	}
}

function passwordLogin()
{
	var val=$("#pass").val();
	$("#passLoginLabel span").remove("span");
	if(val=="")
	{
		valLogin=1;
		showPassErrorLogin(" *Enter Password");
	}
	else
	{
		$("#pass").css({"outline":"none","border-color":"white"});
		valPass=0;
	}
}