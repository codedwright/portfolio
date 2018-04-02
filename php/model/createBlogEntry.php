<?php
    function createBlogEntry() {
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
        if(isset($_POST['date']) && !empty($_POST['date'])){
            $demo = $_POST['date'];
        } else {
            $error .= 'date ';
        }
        if(isset($_POST['excerpt']) && !empty($_POST['excerpt'])){
            $excerpt = $_POST['excerpt'];
        } else {
            $error .= 'excerpt ';
        }
        if(isset($_POST['content']) && !empty($_POST['content'])){
            $link = $_POST['content'];
        } else {
            $error .= 'content ';
        }
        if(isset($_POST['tags']) && !empty($_POST['tags'])){
            $tags = $_POST['tags'];
        } else {
            $error .= 'tags ';
        }
        if(isset($_POST['link']) && !empty($_POST['link'])){
            $demo = $_POST['link'];
        } else {
            $error .= 'link ';
        }
        if(isset($title, $thumbnail, $date, $excerpt, $content, $tags, $link)) {
            writeBlogEntry($_POST['title'], $_POST['thumbnail'], $_POST['excerpt'], $_POST['link'], $_POST['tags'], $_POST['demo']);
        } else {
            return $error;
        }
    }

    function writeBlogEntry($title, $thumbnail, $date, $excerpt, $content, $tags, $link) {
        try {
            global $db;
            $sql = "INSERT INTO blog (title, thumbnail, date, excerpt, content, tags, link) VALUES ('$title', '$thumbnail', '$date', '$excerpt', '$content', '$tags', '$link')";
            echo $sql;
            return $db->exec($sql); // returns a number of affected rows
        } catch(PDOException $e) {
            $error = '<br>An error occured while writing to the database.';
            $message = '<br>Message: ' . $e->getMessage();
            echo $error . $message . '<br>createBlogEntry.php';
            exit();
        }
    }
?>