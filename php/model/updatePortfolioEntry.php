<?php
    function updatePortfolioEntry() {
        $message = 'Updated values: ';
        $error = '<br>Values not updated: ';
        if(isset($_POST['title']) && !empty($_POST['title'])){ 
            $title = $_POST['title'];
            $message .= "title: $title ";
        } else {
            $error .= 'title ';
        }
        if(isset($_POST['thumbnail']) && !empty($_POST['thumbnail'])){
            $thumbnail = $_POST['thumbnail'];
            $message .= "thumbnail: $thumbnail ";
        } else {
            $error .= 'thumbnail ';
        }
        if(isset($_POST['excerpt']) && !empty($_POST['excerpt'])){
            $excerpt = $_POST['excerpt'];
            $message .= "excerpt: $excerpt ";
        } else {
            $error .= 'excerpt ';
        }
        if(isset($_POST['content']) && !empty($_POST['content'])){
            $content = $_POST['content'];
            $message .= "content: $content ";
        } else {
            $error .= 'content ';
        }
        if(isset($_POST['link']) && !empty($_POST['link'])){
            $link = $_POST['link'];
            $message .= "link: $links ";
        } else {
            $error .= 'link ';
        }
        if(isset($_POST['category']) && !empty($_POST['category'])){
            $category = $_POST['category'];
            $message .= "category: $category ";
        } else {
            $error .= 'category ';
        }
        if(isset($_POST['tags']) && !empty($_POST['tags'])){
            $tags = $_POST['tags'];
            $message .= "tags: $tags ";
        } else {
            $error .= 'tags ';
        }
        if(isset($_POST['demo']) && !empty($_POST['demo'])){
            $demo = $_POST['demo'];
            $message .= "demo: $demo ";
        } else {
            $error .= 'demo ';
        }
        if(isset($title) || isset($thumbnail) || isset($excerpt) || isset($content) || isset($link) || isset($category) || isset($tags) || isset($demo)) {
            //return $message;
            $sql = "UPDATE portfolio SET ";
            if(isset($title)) {
                $sql .= "title = '$title', ";
            }
            if(isset($thumbnail)) {
                $sql .= "thumbnail = '$thumbnail', ";
            }
            if(isset($excerpt)) {
                $sql .= "excerpt = '$excerpt', ";
            }
            if(isset($content)) {
                $sql .= "content = '$content', ";
            }
            if(isset($link)) {
                $sql .= "link = '$link', ";
            }
            if(isset($category)) {
                $sql .= "category = '$category', ";
            }
            if(isset($tags)) {
                $sql .= "tags = '$tags', ";
            }
            if(isset($demo)) {
                $sql .= "demo = '$demo', ";
            }
            $portfolioId = (isset($_POST['portfolioId'])) ? $_POST['portfolioId'] : 'null';
            $sql = substr($sql, 0, -2);
            $sql .= " WHERE portfolioId = '$portfolioId';";
            try {
                global $db;
                echo $sql;
                return '<br>The number of rows affected: ' . $db->exec($sql); // returns a number of affected rows
            } catch(PDOException $e) {
                $error .= '<br>An error occured while updating value in the database.';
                $message .= '<br>Message: ' . $e->getMessage();
                echo $error . $message . '<br>updatePortfolioEntry.php';
                exit();
            }
        } else {
            return $error;
        }
    }
?>