<?php
	if ($_POST["submit"]) {
		$name = $_POST['name'];
		$email = $_POST['email'];
		$message = $_POST['message'];
		$human = intval($_POST['human']);
		$from = 'Contact Form'; 
		$to = 'sam@snowhydra.com'; 
		$subject = 'Message from Contact Form';
		
		$body ="From: $name\n E-Mail: $email\n Message:\n $message";
		// Check if name has been entered
		if (!$_POST['name']) {
			$errName = 'Please enter your name';
		}
		
		// Check if email has been entered and is valid
		if (!$_POST['email'] || !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
			$errEmail = 'Please enter a valid email address';
		}
		
		//Check if message has been entered
		if (!$_POST['message']) {
			$errMessage = 'Please enter your message';
		}
		//Check if simple anti-bot test is correct
		if ($human !== 420) {
			$errHuman = 'Your anti-spam is incorrect';
		}
        
// If there are no errors, send the email
if (!$errName && !$errEmail && !$errMessage && !$errHuman) {
	if (mail ($to, $subject, $body, $from)) {
		$result='<div class="alert alert-success">Thanks! I\'ll get back to you soon.</div>';
	} else {
		$result='<div class=\"alert alert-danger\">Uh oh, something went wrong. Please try again later.</div>';
	}
}
    }
?>

<!DOCTYPE html>
<html lang="en">
    
    <?php
        $title="Contact";
        include($_SERVER['DOCUMENT_ROOT'].'/_includes/header.php')
    ?>
    

    <body class="light">
        
        <div class="">


            <div class="container-fluid jumbotron dark">
                    <h1 style="text-align:center;">
                        contact sam
                    </h1>

                <br>
                <div class="row contactform">

                <form class="form-horizontal" role="form" method="post" action="/pages/contact.php" >
                    <div class="form-group">
                        <label for="name" class="col-sm-3 control-label">Name</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="name" name="name" placeholder="Jane Doe" value="<?php echo htmlspecialchars($_POST['name']); ?>">
                            <?php echo "<p class='text-danger'>$errName</p>";?>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="email" class="col-sm-3 control-label">Email</label>
                        <div class="col-sm-6">
                            <input type="email" class="form-control" id="email" name="email" placeholder="name@email.com" value="<?php echo htmlspecialchars($_POST['email']); ?>">
                            <?php echo "<p class='text-danger'>$errEmail</p>";?>
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="message" class="col-sm-3 control-label">Message</label>
                        <div class="col-sm-6">
                            <textarea class="form-control" rows="5" name="message"><?php echo htmlspecialchars($_POST['message']);?></textarea>
                            <?php echo "<p class='text-danger'>$errMessage</p>";?>
                        </div>
                        <div class="col-sm-3">
                        </div>
                    </div>
                    <div class="form-group">
                        <label for="human" class="col-sm-3 control-label">110 + 310 = ?</label>
                        <div class="col-sm-6">
                            <input type="text" class="form-control" id="human" name="human" placeholder="Are you a robob?">
                            <?php echo "<p class='text-danger'>$errHuman</p>";?>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <input id="submit" name="submit" type="submit" value="Send email" class="btn btn-lg btn-block gameplaygif">
                        </div>
                        <div class="col-sm-3">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-6 col-sm-offset-3">
                            <?php echo $result; ?>    
                        </div>
                        <div class="col-sm-3">
                        </div>
                    </div>
                </form> 

                </div>
            </div>

            <?php include($_SERVER['DOCUMENT_ROOT'].'/_includes/footer.php'); ?>
        
        </div>
        
    </body>
    
</html>