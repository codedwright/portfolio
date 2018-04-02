<?php
    function deleteBlogEntry() {
        $error = 'Missing values: ';
        if(isset($_POST['blogId']) && !empty($_POST['blogId'])){
            $portfolioId = $_POST['blogId'];
            try {
                global $db;
                $sql = "DELETE FROM blog WHERE blogId = '$blogId';";
                echo $sql;
                return '<br>The number of rows affected: ' . $db->exec($sql); // returns a number of affected rows
            } catch(PDOException $e) {
                $error = '<br>An error occured while deleting from the database.';
                $message = '<br>Message: ' . $e->getMessage();
                echo $error . $message . '<br>deleteBlogEntry.php';
                exit();
            }
        } else {
            $error .= "blogId: $blogId";
            return $error;
        }
    }
?>