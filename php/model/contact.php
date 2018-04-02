<?php
    function contact() {
       
        // the message
        if(isset($_POST['by']) && !empty($_POST['by'])){ 
            $name = $_POST['by'];
        } else {
            $name = 'Not Specified';
        }
        if(isset($_POST['from']) && !empty($_POST['from'])){ 
            $from = $_POST['from'];
        }
        if(isset($_POST['subject']) && !empty($_POST['subject'])){ 
            $subject = $_POST['subject'];
        } else {
            $subject = 'Not Specified';
        }
        if(isset($_POST['message']) && !empty($_POST['message'])){ 
            $message = $_POST['message'];
        }
        if(isset($message,$from)) {

            $msg = "
            <html>
            <head>
            </head>
            <body>
            <p>$name would like to connect with you!</p>
            <p>They are interesed in: $subject</p>
            <blockquote>$message</blockquote>
            </body>
            </html>
            ";

            // Always set content-type when sending HTML email
            $headers = "MIME-Version: 1.0" . "\r\n";
            $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

            // More headers
            $headers .= "From: $name <$from>" . "\r\n";

            mail("wrigjp02@gmail.com","Codedwright Contact",$msg,$headers);
            return "Sent Message";
        } else {
            return 'Include Message and From Address';
        }

    }
?>