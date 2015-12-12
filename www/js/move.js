(function(){
	angular.module('app',['onsen'])
	.controller('PageMoveController', function($scope,$timeout){
		this.pushToGroupAdd = function(){
			mynavigator.pushPage('groupAdd/index.html')
		}

		this.pushToNewIR = function(){
			mynavigator.pushPage('newir/index.html');
		}
		this.getInfradInfo = function(){
          console.log("eeyan")
            $.ajax({
                url: ""+localStorage.getItem("switch-site_url")+"/api/v1/ir.json",
                type: "GET",
                data:{
                    "auth_token": localStorage.getItem("switch-auth_token")
                },
                success: function(msg){
                  console.log(msg)
                  hoge2=msg["response"]["infrareds"]
                  obj = JSON.stringify(hoge2);
                  localStorage.setItem("l_obj",obj);

                },
                error: function(){
                  console.log("error")
                }
            });

            obj2 = localStorage.getItem("l_obj");
            var hoge2 = JSON.parse(obj2);
            console.log(hoge2)

            $scope.infrad = hoge2;

    	}
    	this.login = function(){
	        $.ajax({
	          url: site_url + "/api/v1/auth/login.json",
	          type: "POST",
	          data: {
	            "email_or_screen_name": identifier,
	            "password": password
	          },
	          success: function(msg){
	            localStorage.setItem("switch-auth_token",msg["response"]["auth_token"]);
	            location.href = "../index.html"
	          },
	          error: function(error){
	            if(error.status == 404){
	              localStorage.setItem("switch-site_url","")
	              location.href = "../api/index.html"
	            }else{
	              text = "<ul>";
	              messages = error.responseJSON.meta.errors.forEach(function(err){
	                text += "<li class='error'>" + err.message + "</li>";
	              });
	              text += "</ul>"
	              $("#error_messages").html(text);
	            }
          	  }
        	});
    	}

    	this.logout = function(){
		    $.ajax({
		          url: site_url + "/api/v1/auth/logout.json",
		          type:"DELETE",
		          data: {
		            "auth_token": localStorage.getItem("switch-auth_token")
		          },
		          success: function(msg){
		            localStorage.setItem("switch-auth_token","")
		            location.href = "./login/index.html"
		          },
		          error: function(){
		            if(error.status == 404){
		              localStorage.setItem("switch-site_url","")
		              location.href = "../api/index.html"
		            }else{
		              alert("error!")
		            }
		          }
      		})
    	}

    	this.pushToResister = function(){
     		 mynavigator.pushPage('register/index.html');
    	}

    	this.pushToHome = function(){
      		console.log("kiteru")
      		location.href="index.html"
    	}
    
    	this.pushToLogin = function(){
      		mynavigator.pushPage("../login/index.html",{animation:"lift"})
    	}
	})
})