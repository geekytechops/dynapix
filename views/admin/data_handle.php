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

    // Get form data
    $mediaType = $_POST['mediaType'];
    $mediaTitle = $_POST['mediaTitle'];
    $mediaDescription = $_POST['mediaDescription'];
    $mediaFootfalls = $_POST['mediaFootfalls'];
    $mediaDuration = $_POST['mediaDuration'];
    $mediaScreens = $_POST['mediaScreens'];
    $mediaSlots = $_POST['mediaSlots'];

    // Additional fields for Fuel Station
    if ($mediaType == '3') {
        $mediaLocationType = $_POST['mediaLocationType'];
        $mediaSize = $_POST['mediaSize'];
        $mediaLoopTime = $_POST['mediaLoopTime'];
    }

    // Handle file upload (if any)
    if (isset($_FILES['mediaImage']) && $_FILES['mediaImage']['error'] == 0) {
        $mediaImage = $_FILES['mediaImage'];

        // Define upload directory
        $uploadDir = 'uploads/';

        // Ensure the directory exists
        if (!file_exists($uploadDir)) {
            mkdir($uploadDir, 0777, true); // Create the directory if it doesn't exist
        }

        // Define the path for the uploaded file
        $targetFile = $uploadDir . basename($mediaImage['name']);

        // Check if the file is a valid image (optional)
        $imageFileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));
        $validExtensions = ['jpg', 'jpeg', 'png', 'gif'];

        if (in_array($imageFileType, $validExtensions)) {
            // Move the uploaded file to the 'uploads' folder
            if (move_uploaded_file($mediaImage['tmp_name'], $targetFile)) {
                // The file was uploaded successfully
                $imagePath = $targetFile;
            } else {
                echo "Sorry, there was an error uploading your file.";
                exit;
            }
        } else {
            echo "Sorry, only JPG, JPEG, PNG, and GIF files are allowed.";
            exit;
        }
    } else {
        $imagePath = NULL; // No image uploaded
    }


    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Insert data into the database
    $stmt = $conn->prepare("INSERT INTO dypx_media_data (md_name, md_location, md_image, md_footfalls, md_duration, md_num_slots, md_num_screens, md_type, md_size, md_looptime, md_status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssssi", $mediaTitle, $mediaLocationType, $imagePath, $mediaFootfalls, $mediaDuration, $mediaSlots, $mediaScreens, $mediaType, $mediaSize, $mediaLoopTime, $status);

    // Set default status (0) for now
    $status = 0;

    if ($stmt->execute()) {
        echo "Data inserted successfully.";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close the statement and connection
    $stmt->close();
    $conn->close();


}
?>
