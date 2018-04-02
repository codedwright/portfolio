<?php
    function deletePortfolioEntry() {
        $error = 'Missing values: ';
        if(isset($_POST['portfolioId']) && !empty($_POST['portfolioId'])){
            $portfolioId = $_POST['portfolioId'];
            try {
                global $db;
                $sql = "DELETE FROM portfolio WHERE portfolioId = '$portfolioId';";
                echo $sql;
                return '<br>The number of rows affected: ' . $db->exec($sql); // returns a number of affected rows
            } catch(PDOException $e) {
                $error = '<br>An error occured while deleting from the database.';
                $message = '<br>Message: ' . $e->getMessage();
                echo $error . $message . '<br>deletePortfolioEntry.php';
                exit();
            }
        } else {
            $error .= "portfolioId: $portfolioId";
            return $error;
        }
    }
?>