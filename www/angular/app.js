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
      mynavigator.pushPage('newir/index.html')
      console.log("kiteru")
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
                  // console.log(msg)
                  window.hoge=msg
                  window.hoge2=msg["response"]["infrareds"]
                  window.obj = JSON.stringify(hoge2);
                  localStorage.setItem("l_obj",obj);
                  // hoge["response"]["infrareds"].forEach(this.getinfo=function(obj){
                  //   // console.log(item)
                  //   this.indexInfo2=obj
                  // console.log(indexInfo2)
                  // })

                  // console.log(hoge2)

                },
                error: function(){
                  console.log("error")
                }
            });

            obj = localStorage.getItem("l_obj");
            hoge2 = JSON.parse(obj);

            // document.write(hoge2)
            // console.log(obj)
            console.log(hoge2)
          // var e = document.getElementById('ir');
          // e.textContent = hoge2;

            // var infrad  = function($scope) {
              $scope.infrad = hoge2;
            // }

            // var infrad = function($scope){
            //   $scope.info = [hoge2];
            // }

    // });

    }

    this.send = function(){
      console.log($(this).get(0))
    }.bind(this)
    this.selectedItem = -1;
  });
})();
