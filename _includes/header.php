<!-- begin header.php -->
<head>
    <title><?php echo "$title | snowhydra games"; ?></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/png" href="/images/favicon.png">
    
    <?php include($_SERVER['DOCUMENT_ROOT'].'/_includes/bootstrapheader.php') ?>
    <?php include($_SERVER['DOCUMENT_ROOT'].'/_includes/analyticstracking.php') ?>

    <!-- start fonts -->
    <link href='http://fonts.googleapis.com/css?family=Khula' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Lekton' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Source+Code+Pro:300,700' rel='stylesheet' type='text/css'>
    <!-- end fonts -->

    <link rel="stylesheet" href="/_includes/samstyle.css">
    
    
    <link rel="stylesheet" href="/_includes/samnavbar.css">
    
    <div class="header container-fluid light">
        <div class="row">
            <div class="col-sm-2">
<!--                <a href="/index.php">-->
<!--                    <div class="logo center-block">-->
<!--                    </div>-->
<!--                </a>-->
            </div>
            <div class="col-sm-10">
                <nav class="navbar navbar-default navbar-static-top navbar-sam">
                    <div class="container-fluid">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand" href="/index.php">snowhydra</a>
                        </div>

                        <div class="collapse navbar-collapse" id="myNavbar">
                            <ul class="nav navbar-nav navbar-link">
                                <li><a href="/pages/games.php">games</a></li>
                                <li><a href="/pages/devblog.php">devblog</a></li>
                                <li><a href="/pages/sam.php">sam</a></li>
                                <li><a href="/pages/contact.php">contact</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </div>
</head>
<!-- end header.php -->