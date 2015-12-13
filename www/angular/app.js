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
      mynavigator.pushPage('newir/index.html',{animation:"lift"});
    }

  // var id;
    this.pushToDetail = function(item_id){
      window.id=item_id,
      console.log(id);
      mynavigator.pushPage('rename/index2.html');
    }

    this.getInfradInfo = function(){
          console.log("eeyan")
          // localStorage.removeItem()
            $.ajax({
                url: ""+localStorage.getItem("switch-site_url")+"/api/v1/ir.json",
                type: "GET",
                data:{
                    "auth_token": localStorage.getItem("switch-auth_token")
                },
                success: function(msg){
                  console.log(msg)

                  hoge=msg
                  hoge2=msg["response"]["infrareds"]
                  console.log(hoge2)
                  obj = JSON.stringify(hoge2);
                  // localStorage.removeItem("l_obj");
                  localStorage.setItem("l_obj",obj);

                  // console.log(hoge2);


                  hoge2=msg["response"]["infrareds"]
                  obj = JSON.stringify(hoge2);
                  localStorage.setItem("l_obj",obj);


                },
                error: function(){
                  console.log("error")
                }
            });

            obj2 = localStorage.getItem("l_obj");

            hoge2 = JSON.parse(obj2);
            // console.log(hoge2);
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
      console.log("kiteruyan")
      site_url = localStorage.getItem('switch-site_url')
      identifier = $("#email_or_screen_name").val();
      password = $("#password").val();
      console.log(password)
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
      mynavigator.pushPage('register/index.html',{animation:"lift"});
    }

    this.pushToHome = function(){
      console.log("kiteru")
      // location.href="index.html"
      mynavigator.popPage('',{animation:"slide"})

    }
    this.pushToLogin = function(){
      mynavigator.resetToPage("../login/index.html",{animation:"lift"})
    }

    this.renameInfrad = function(item_id,name){

        // console.log(id)
        // console.log(item_name)
        // window.id=item_id,
        window.item_name = document.getElementById("newName").value
        // $scope.text=item_name,
        console.log(item_id)
        console.log(item_name)

        $.ajax({
          url: ""+localStorage.getItem("switch-site_url") +":80"+ "/api/v1/ir/rename.json",
          type: "PUT",
          data: {
            "auth_token": localStorage.getItem("switch-auth_token"),
            "name": item_name,
            "ir_id": item_id
          },
          success:function(msg){
            console.log("kiteru");
            // getInfradInfo.call();
            // window.location.reload();
          },
          error:function(){
            alert("error");
          }
      })
    }

    this.makeGroup = function(name,ir_id){

        window.group_name = document.getElementById("groupName").value
        window.id=ir_id
        console.log(group_name)
        console.log(id)

      //   $.ajax({
      //     url: ""+localStorage.getItem("switch-site_url") +":80"+ "/api/v1/group.json",
      //     type: "POST",
      //     data: {
      //       "auth_token": localStorage.getItem("switch-auth_token"),
      //       "name": group_name,
      //     },
      //     success:function(msg){
      //       console.log(msg);
      //     },
      //     error:function(){
      //       alert("error");
      //     }
      // })
      //   $.ajax({
      //     url: ""+localStorage.getItem("switch-site_url") +":80"+ "/api/v1/group.json",
      //     type: "POST",
      //     data: {
      //       "auth_token": localStorage.getItem("switch-auth_token"),
      //       "name": group_name,
      //     },
      //     success:function(msg){
      //       console.log(msg);
      //     },
      //     error:function(){
      //       alert("error");
      //     }
      // })
    }


    this.selectedItem = -1;
  });
})();
