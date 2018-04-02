<?php

date_default_timezone_set('America/Fort_Wayne');

require_once('connect.php');
require_once('md5.php');
require_once('model/db_functions.php');

if (isset($_GET['action'])) {
    $action = $_GET['action'];
} else if (isset($_POST['action'])) {
    $action = $_POST['action'];
}

if(auth() && isset($action) && !empty($action)) {  
	switch($action) { 
        case 'createBlogEntry': echo createBlogEntry();
        break;
        case 'readBlogEntry': break;
        case 'updateBlogEntry': echo updateBlogEntry();
        break;
        case 'deleteBlogEntry': echo deleteBlogEntry();
        break;
        case 'createPortfolioEntry': echo createPortfolioEntry();
        break;
        case 'readPortfolioEntry': break;
        case 'updatePortfolioEntry': echo updatePortfolioEntry();
        break;
        case 'deletePortfolioEntry': echo deletePortfolioEntry();
        break;
        default: echo '<br>Authentication: ' . auth() . ' Action: ' . $action;
		//case 'permission' : queryFuction($permission); dont use
		//break;		// ...etc... 
	} 
} else if(auth()) {
    echo '<br>Incorrect Action: ' . $action;
} else if(isset($action) && !empty($action)) {  
	switch($action) { 
        case 'contact': echo contact();
        break;
        case 'readBlogEntry': echo readBlogEntry();
        break;
        case 'readPortfolioEntry': echo readPortfolioEntry();
        break;
        default: echo '<br>Incorrect Authentication';
    }
} else {
    echo '<br>Incorrect Authentication';
}

?>