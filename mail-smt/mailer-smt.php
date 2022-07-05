<?php
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader
require 'vendor/autoload.php';

// Google Recaptcha
$token = $_POST['recaptcha'];
$secret = '6LfRgMYgAAAAABZINfL_biGCgv4mO7v0R65fYY9d';

$response = $token;
$remoteip = $_SERVER['REMOTE_ADDR'];

$url = "https://www.google.com/recaptcha/api/siteverify";

$post_data = http_build_query(
    array(
        'secret' => $secret,
        'response' => $response,
        'remoteip' => $remoteip
    )
);

$options = array(
    'http' =>
    array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $post_data
    )
);

$context = stream_context_create($options);

$result_json = file_get_contents($url, false, $context);
$resulting = json_decode($result_json, true);

if ($resulting['success']) {
} else {
    header("Location: https://daqeeq.site");
    die();
}

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->isSMTP();
    $mail->CharSet = 'UTF-8';
    $mail->Host = 'smtp.domain.com';
    $mail->SMTPAuth = true;
    $mail->Port = 587;
    $mail->Username = 'info@smt.sa';
    $mail->Password = 'SmT@2022';

    //Recipients
    $mail->setFrom('info@smt.sa', 'SMT Website (Contact us)');
    $mail->addAddress('info@smt.sa', 'SMT Info');     //Add a recipient

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = "Mwaeed Website: " . $_POST['subject']; //'Here is the subject';
    $mail->Body    = "Name: " . $_POST['name']
        . "<br>Email: " . $_POST['email']
        . "<br>Company: " . $_POST['company']
        . "<br>Phone: " . $_POST['phone']
        . "<br>" . $_POST['message']; //'This is the HTML message body <b>in bold!</b>';
    $mail->AltBody = "Name: " . $_POST['name']
        . "\nEmail: " . $_POST['email']
        . "\nCompany: " . $_POST['company']
        . "\nPhone: " . $_POST['phone']
        . "\n" . $_POST['message'];

    $mail->send();
    header("Location: https://daqeeq.site");
} catch (Exception $e) {
    header("Location: https://daqeeq.site");
}
