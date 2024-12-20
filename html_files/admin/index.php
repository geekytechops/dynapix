<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Page</title>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #212121;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .card {
      width: 100%;
      max-width: 400px;
      padding: 30px;
      background-color: #333;
      color: #fff;
      border: none;
      border-radius: 10px;
      box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.8);
    }
    .logo {
      width: 160px;
      height: auto;
      margin-bottom: 20px;
    }
    .form-control {
      background-color: #444;
      border: 1px solid #555;
      color: #fff;
    }
    .form-control:focus {
      background-color: #444;
      color: #fff;
      border-color: #777;
      box-shadow: none;
    }
    .btn-primary {
      background-color: #5A9;
      border: none;
    }
    .btn-primary:hover {
      background-color: #4A8;
    }
    .card h3 {
      margin-bottom: 20px;
    }

    .error-message{
      display: none;
      color: red;
      font-size: 13px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="card text-center">
    <div>
    <img src="../images/dynapix-logo-dark.png" alt="Logo" class="logo">
    </div>
    <form>
      <div class="mb-3">
        <input type="email" class="form-control" id="email" placeholder="Email address">
        <div class="error-message" id="emailError">Enter valid Email Address</div>                
      </div>
      <div class="mb-3">
        <input type="password" class="form-control" id="password" placeholder="Password">
        <div class="error-message" id="passwordError">Enter Valid Password</div>
      </div>
      <button type="button" id="login"  class="btn btn-primary w-100">Login</button>
    </form>
  </div>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script>
      $('#login').click(function(){
        let email = $('#email').val();
        var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        let password = $('#password').val();
        // var rememberMe = $('#rememberMe').is(':checked');

        if(email=='' || !emailPattern.test(email) || password == '' ){

          if(email==''){
            // $('#email').addClass('invalid-feed');
            // $('#email').removeClass('valid-feed');
            $('#emailError').show();
          } else if(!emailPattern.test(email)){
            // $('#email').addClass('invalid-feed');
            // $('#email').removeClass('valid-feed');
            $('#emailError').show();
          }else{
            // $('#email').removeClass('invalid-feed');
            // $('#email').addClass('valid-feed');
            $('#emailError').hide();
          }

          if(password==''){
            // $('#password').addClass('invalid-feed');
            // $('#password').removeClass('valid-feed');
            $('#passwordError').show();
          }else{
            // $('#password').removeClass('invalid-feed');
            // $('#password').addClass('valid-feed');
            $('#passwordError').hide();
          }

        }else{

          $.ajax({
            type:'post',
            data:{email:email , password:password , formName:'login_validate'},
            url:'data_handle',
            success:function(data){
              console.log(data.status)
              if(data.status=='error_email'){
                // $('#email').addClass('invalid-feed');
                // $('#email').removeClass('valid-feed');
                // $('#password').removeClass('invalid-feed');
                // $('#password').addClass('valid-feed');
                $('#passwordError').hide();
                 $('#emailError').show();
                 $('#emailError').html(data.message);
              }else if(data.status=='error_password'){
                // $('#email').removeClass('invalid-feed');
                // $('#email').addClass('valid-feed');
                // $('#password').addClass('invalid-feed');
                // $('#password').removeClass('valid-feed');
                $('#emailError').hide();
                $('#passwordError').show();
                $('#passwordError').html(data.message);       
              }else{
                
                  // $('#email').removeClass('invalid-feed');
                  // $('#password').removeClass('invalid-feed');
                  // $('#email').addClass('valid-feed');
                  // $('#password').addClass('valid-feed');
                  $('#passwordError').hide();
                  $('#emailError').hide();

                  window.location.href = 'dashboard';

              }
            }
          })

        }

    })
  </script>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
