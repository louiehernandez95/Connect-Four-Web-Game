//load main app logic

    "use strict";
    
    function buildComments(response) {
        //create reply button
        
        //clear comment output
        $(".comment-output").empty();
        //get travelComments
        var $iComments = response;
        //process travelComments array
        $iComments.forEach(function(item) {
            //com_pid indicated whether there's relay to the any comment. com_pid=0 means no reply. 
            if(item.com_pid == -1 ){
                appendToDiv(item);

            }
            else{
              var html = jsonToHtml(item);
              $("#"+item.com_pid).children(".panel-body").append(html);
            }
            $(".replyinput").hide();
        });
    }
  
 
      $(".comment-input button").on("click", function() {
        //get values for new comment
        var comment_text = $(".comment-input textarea").val();
        var created = new Date();
        //create new comment

        var newComment = {"com_pid":-1, "com_name":"current user", "com_date":created, "com_content":comment_text};

        console.log("newcomment is:" + newComment.com_date, newComment.com_content);
        //post new comment to server
       /*  $.post("comments", newComment, function (response) {

          console.log("server post response returned..." + response.toSource());
        })
        //get comments
        getComments(); */
        addComments(newComment);
      });
  
      function getComments() {
      $.getJSON("comments.json", function (response) {
    
        console.log("response = "+response.toSource());
        buildComments(response);
      });
      }

    function addComments(newComment){

      $.post("comments", newComment, function (response) {
        
                  console.log("server post response returned..." + response.toSource());
                })
                //get comments
                getComments();
    }    



    //load comments on page load
    getComments();

////////////////////////////////////////////////////////
      function jsonToHtml(va){
      console.log("id = "+ va._id);
      console.log("pid = "+ va.com_pid);
      console.log("content = "+ va.com_content);     
  
      var html = "";     
      html = '<div class="panel panel-danger" id = "'+va._id+'">'+
         
          //'<div class="panel-heading">' +
          '<h4 class="panel-title">' +
          '<div id="show_name">' + 
          '<span class="glyphicon glyphicon-user" aria-hidden="true"></span>' +
          'User：' + va.com_name +
          '<div style="float: right;" id ="show_time">Time:'+va.com_date+'</div>' +
          '</div>' +
          '</h4>' +
         // '</div>' +          
          '<div class="panel-body" id="show_content"><div id="show_other"></div>'+va.com_content+'</div>' +          
          '<div class="panel-footer" align="left">' +
          '<div align="right">' +
          '<span class="glyphicon glyphicon-send" aria-hidden="true"></span>' +
          '<textarea class="replyinput" id= "replyin'+va._id+'"></textarea>' + 
          '<small><button type="button" class="replybtn" id= '+va._id+' onclick="reply('+va._id+');">Reply</button></small>' +
          '</div>'+
          '</div>'
          '</div>';
          
      return html;
  
  
  
  }
 
  
  function appendToDiv(va){
      var html = jsonToHtml(va);
      $(".comment-output").append(html); 
  } 


  function checkVisible(element) {
    //check if element is hidden or not
    if (element.is(":hidden")) {
      return true;
    } else {
      return false;
    }
  }

  var flag = 0;
  //handle reply button...
  $(".comment-output").on("click", "button.replybtn" , function() {

    
      console.log("click reply button");
      var b_id = $(this).attr("id");
      console.log("button's id = ", b_id);
      var inputid ="#"+ "replyin"+ b_id;
      console.log("inputid's id = ", inputid);

      if (checkVisible($(inputid)) === true) {
        $(".replyinpu").hide();
      }
      
      if(flag == 0){
       $(inputid).show();
     // alert(1);
     // $(".replyinput").show(); 
     flag = 1 ;
    }
      else{
        //alert(2);
        
        var comment_text = $(inputid).val();
        if(comment_text != ""){
        var created = new Date();
        //var newComment = {"_id":10, "com_pid":b_id, "com_name":"current user", "com_date":created, "com_content":comment_text};
        
        //comment id will be created automatically
        var newComment = {"com_pid":b_id, "com_name":"current user", "com_date":created, "com_content":comment_text};
        console.log("newcomment is:" + newComment.com_date, newComment.com_content);
        addComments(newComment);       
        
        }
        $(inputid).hide(); 
        flag = 0;

      }
  });

