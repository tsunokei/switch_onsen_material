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
                  window.hoge=msg
                  window.hoge2=msg["response"]["infrareds"]
                  var obj = JSON.stringify(hoge2);
                  localStorage.setItem("l_obj",obj);

                  console.log(hoge2)

                },
                error: function(){
                  console.log("error")
                }
            });

            var obj = localStorage.getItem("l_obj");
            var hoge2 = JSON.parse(obj);
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
