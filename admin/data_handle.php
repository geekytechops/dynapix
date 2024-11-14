<?php
session_start();
include 'db_config.php';

if($_POST['formName']=='login_validate'){

    $email = $_POST['email'];
    $password = $_POST['password'];
    $rememberMe = isset($_POST['rememberMe']);

    
    $stmt = $conn->prepare("SELECT user_id, username, email, password FROM dypx_users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        
        $response = [
            'status' => 'error_email',
            'message' => 'No user found with the email address'
        ];
    } else {
        $user = $result->fetch_assoc();
        
        
        if ($password!=$user['password']) {
            $response = [
                'status' => 'error_password',
                'message' => 'Invalid password'
            ];
        } else {
            
            $_SESSION['user_id'] = $user['user_id'];
            $_SESSION['username'] = $user['username'];
            $_SESSION['email'] = $user['email'];
            $_SESSION['isLoggedIn'] = true;

            
            // if ($rememberMe) {
            //     setcookie('rememberMe', $email, time() + (86400 * 30), "/");
            // } else {
                
            //     setcookie('rememberMe', "", time() - 3600, "/");
            // }

            $response = [
                'status' => 'success',
                'message' => 'Login successful',
                'user' => [
                    'id' => $user['user_id'],
                    'username' => $user['username'],
                    'email' => $user['email'],
                ]
            ];
        }
    }

    $stmt->close();
    $conn->close();

    header('Content-Type: application/json');
    echo json_encode($response);
}


if($_POST['formName']=='add_new_media'){



}
?>
