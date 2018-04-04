<?php
    function createPortfolioEntry() {
        $error = '<br>Missing values: ';
        if(isset($_POST['title']) && !empty($_POST['title'])){
            $title = $_POST['title'];
        } else {
            $error .= 'title ';
        }
        if(isset($_POST['thumbnail']) && !empty($_POST['thumbnail'])){
            $thumbnail = $_POST['thumbnail'];
        } else {
            $error .= 'thumbnail ';
        }
        if(isset($_POST['excerpt']) && !empty($_POST['excerpt'])){
            $excerpt = $_POST['excerpt'];
        } else {
            $error .= 'excerpt ';
        }
        if(isset($_POST['content']) && !empty($_POST['content'])){
            $content = $_POST['content'];
        } else {
            $error .= 'content ';
        }
        if(isset($_POST['link']) && !empty($_POST['link'])){
            $link = $_POST['link'];
        } else {
            $error .= 'link ';
        }
        if(isset($_POST['category']) && !empty($_POST['category'])){
            $category = $_POST['category'];
        } else {
            $error .= 'category ';
        }
        if(isset($_POST['tags']) && !empty($_POST['tags'])){
            $tags = $_POST['tags'];
        } else {
            $error .= 'tags ';
        }
        if(isset($_POST['demo']) && !empty($_POST['demo'])){
            $demo = $_POST['demo'];
        } else {
            $error .= 'demo ';
        }
        if(isset($title, $thumbnail, $excerpt, $content, $link, $category, $tags, $demo)) {
            writePortfolioEntry($_POST['title'], $_POST['thumbnail'], $_POST['excerpt'], $_POST['content'], $_POST['link'], $_POST['category'], $_POST['tags'], $_POST['demo']);
        } else {
            return $error;
        }
    }

    function writePortfolioEntry($title, $thumbnail, $excerpt, $content, $link, $category, $tags, $demo) {
        try {
            global $db;
            // $sql = "INSERT INTO blog (title, thumbnail, date, excerpt, content, tags, link) VALUES ('$title', '$thumbnail', '$date', '$excerpt', '$content', '$tags', '$link')";
            $sql = "INSERT INTO portfolio (title, thumbnail, excerpt, content, link, category, tags, demo) VALUES ('$title', '$thumbnail', '$excerpt', '$content', '$link', '$category', '$tags', '$demo')";
            echo $sql;
            return $db->exec($sql); // returns a number of affected rows
        } catch(PDOException $e) {
            $error = '<br>An error occured while writing to the database.';
            $message = '<br>Message: ' . $e->getMessage();
            echo $error . $message . '<br>createPortfolioEntry.php';
            exit();
        }
    }
?>