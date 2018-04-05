<?php
    function updateBlogEntry() {
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
        if(isset($_POST['date']) && !empty($_POST['date'])){
            $date = date_format(date_create($_POST['date']),"Y-m-d");
            $message .= "date: $demo ";
        } else {
            $error .= 'date ';
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
        if(isset($_POST['tags']) && !empty($_POST['tags'])){
            $tags = $_POST['tags'];
            $message .= "tags: $tags ";
        } else {
            $error .= 'tags ';
        }
        if(isset($_POST['link']) && !empty($_POST['link'])){
            $link = $_POST['link'];
            $message .= "link: $link ";
        } else {
            $error .= 'link ';
        }
        if(isset($title) || isset($thumbnail) || isset($date) || isset($excerpt) || isset($content) || isset($tags) || isset($link)) {
            $sql = "UPDATE blog SET ";
            if(isset($title)) {
                $sql .= "title = '$title', ";
            }
            if(isset($thumbnail)) {
                $sql .= "thumbnail = '$thumbnail', ";
            }
            if(isset($date)) {
                $sql .= "date = '$date', ";
            }
            if(isset($excerpt)) {
                $sql .= "excerpt = '$excerpt', ";
            }
            if(isset($content)) {
                $sql .= "content = '$content', ";
            }
            if(isset($tags)) {
                $sql .= "tags = '$tags', ";
            }
            if(isset($link)) {
                $sql .= "link = '$link', ";
            }
            $blogId = (isset($_POST['blogId'])) ? $_POST['blogId'] : 'null';
            $sql = substr($sql, 0, -2);
            $sql .= " WHERE blogId = '$blogId';";
            try {
                global $db;
                echo $sql;
                return '<br>The number of rows affected: ' . $db->exec($sql); // returns a number of affected rows
            } catch(PDOException $e) {
                $error .= '<br>An error occured while updating values in the database.';
                $message .= '<br>Message: ' . $e->getMessage();
                echo $error . $message . '<br>updateBlogEntry.php';
                exit();
            }
        } else {
            return $error;
        }
    }
?>