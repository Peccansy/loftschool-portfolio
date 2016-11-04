<?php
require 'vendors/php/phpmailer/PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->CharSet     = 'utf-8';
$mail->Encoding    = '8bit';
$mail->ContentType = 'text/html; charset=utf-8\r\n';
$name = $_POST['name'];
$phone = $_POST['tel'];
$street = $_POST['street'];
$house = $_POST['building'];
$housing = $_POST['housing'];
$apartment = $_POST['apartment'];
$floor = $_POST['floor'];
$comment = $_POST['comment'];
$cash = $_POST['payment'];
$callback = $_POST['callback'];
//$mail->SMTPDebug = 2;                             // Enable verbose debug output

$mail->isSMTP();                                    // Set mailer to use SMTP
$mail->Host = 'smtp.timeweb.ru';  					// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                             // Enable SMTP authentication
$mail->Username = 'info@nox-wave.ru';              	// SMTP username
$mail->Password = 'BqCrT7CU';                    	// SMTP password
$mail->SMTPSecure = 'tsl';                          // Enable TLS encryption, `ssl` also accepted
$mail->Port = 25;                             	// TCP port to connect to



$mail->setFrom('info@nox-wave.ru', 'Форма заказов');
$mail->addAddress('gotodno@gmail.com', 'Joe User');    // Add a recipient
$mail->addReplyTo('info@nox-wave.ru', 'Information');
$mail->isHTML(true);                                  	 // Set email format to HTML

if(empty($callback)) {
	$callback = 'нет';
}

$mail->Subject = 'Заказ!';
$mail->Body    = "Доставка на имя: $name.<br> 
				  Номер телефона: $phone.<br>
				  Адрес: $street, д. $house, к. $housing, кв. $appartment, этаж $floor.<br>
				  Комментарий к заказу:  <strong>$comment</strong><br>				
				  Оплата: <strong>$cash</strong>.<br><br>
				  Не перезванивать: $callback.";

if(!$mail->send()) {
    echo 'Message could not be sent.';
  echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo 'Message has been sent';
} 
?>