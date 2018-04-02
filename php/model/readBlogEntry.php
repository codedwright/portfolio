<?php
    function readBlogEntry() {
        try {
            global $db;
            $statement = $db->prepare("SELECT * FROM blog");
            $statement->execute();
            $results = $statement->fetchAll(PDO::FETCH_ASSOC);
            $json = json_encode($results);
            return $json;
        } catch(PDOException $e) {
            $error = '<br>An error occured while reading from the database.';
            $message = '<br>Message: ' . $e->getMessage();
            echo $error . $message . '<br>readBlogEntry.php';
            exit();
        }
    }
?>