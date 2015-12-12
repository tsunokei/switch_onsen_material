(function() {
  angular.module('app', ['onsen'])
  .controller('SwitchController', function($scope, $timeout) {
    window.items = [
      {
        title: 'Water the plants',
        done: false,
      },
      // {
      //   title: 'Walk the dog',
      //   done: true,
      // },
      // {
      //   title: 'Go to the dentist',
      //   done: false,
      // },
      // {
      //   title: 'Buy milk',
      //   done: false,
      // },
      // {
      //   title: 'Play tennis',
      //   done: true,
      // }
      //　名前
    ];
    console.log(items)


    this.newTodo = function() {//itemsリストに追加するよ
      this.items.push({
        title: '',//名前は空っぽ
        done: false
      });
    }.bind(this);

    this.focusInput = function(event) {
      $timeout(function() {
        var item = event.target.parentNode.querySelector('input[type="text"]');
        item.focus();
        item.select();
      });
    }

    this.clearCompleted = function() {
      this.items = this.items.filter(function(item) {
        return !item.done;
      });
    }.bind(this);

    this.pushToGroupAdd = function(){
      console.log("orette tensai");
      mynavigator.pushPage('groupAdd/index.html');
      console.log("ajaxしたい")
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

    this.send = function(item_id){
      // console.log("hage")
      // $("#submit").on("click" , function(){
        console.log(item_id)
        // aircon_token="1KiJPrFitLQAv0ZuqDAMmg",
        // aircon_token="aC_ZBshcAXi1kVJdpLQ2lw",
        window.id=item_id,

        $.ajax({
          url: ""+localStorage.getItem("switch-site_url") +":80"+ "/api/v1/ir/send.json",
          type: "POST",
          data: {
            "auth_token": localStorage.getItem("switch-auth_token"),
            "ir_id": id
          },
          success:function(msg){
            console.log("kiteru");
          },
          error:function(){
            alert("error");
          }
        // });
      })
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

    // $(function(){
    //   console.log("hage")
    //   $("#submit").on("click" , function(){
    //     console.log("hoge")
    //     // aircon_token="1KiJPrFitLQAv0ZuqDAMmg",
    //     aircon_token="aC_ZBshcAXi1kVJdpLQ2lw",
    //     window.id=22,

    //     $.ajax({
    //       url: ""+localStorage.getItem("switch-site_url")+"/api/v1/ir.json",
    //       type: "POST",
    //       data: {
    //         "auth_token": aircon_token,
    //         "ir_id": id
    //       },
    //       success:function(msg){
    //         alert("success");
    //         console.log("kiteru");
    //       },
    //       error:function(){
    //         alert("error");
    //       }
    //     });
    //   })
    // });

    this.selectedItem = -1;
  });
})();
