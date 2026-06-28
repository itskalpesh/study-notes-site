# PHP Lab - Programs 
## Part A :

1. PHP program to demonstrate variables, constants, and different data types.
```php
<?php
// Variables
$name = "Ravi";
$age = 20;
$marks = 85.5;

// Constant
define("COLLEGE", "RCUB");

// Display variable value 
echo "Name: $name <br>";
echo "Age: $age <br>";
echo "Marks: $marks <br>";
echo "College: " . COLLEGE . "<br><br>";

// Data Types
echo gettype($name) . "<br>";
echo gettype($age) . "<br>";
echo gettype($marks);
?>
```

Output 
```shell
Name: Ravi
Age: 20
Marks: 85.5
College: RCUB

string
integer
double
```


> Exam Point :
> 
> Variables in PHP start with $, constants are created using define(), and gettype() is used to determine the data type of a variable.

---

2. Program that takes user input and determines if the number is prime using functions. 
```php
<?php
function isPrime($num)
{
    if ($num < 2)
        return false;

    for ($i = 2; $i <= sqrt($num); $i++)
    {
        if ($num % $i == 0)
            return false;
    }
    return true;
}

$num = $_GET["num"];

if (isPrime($num))
    echo "$num is a Prime Number";
else
    echo "$num is Not a Prime Number";
?>
```

Input (URL) :
```shell
http://localhost/prime.php?num=17
```

Output 
```shell
17 is a Prime Number
```

> Exam Point 
> 
> - A prime number is a natural number greater than 1 that has only two factors: 1 and itself. Examples: 2, 3, 5, 7, 11, 13, 17
> - $_GET is a superglobal array in PHP used to receive data sent through the URL using the GET method.


---

3. Program to read and write data to a text file using PHP. 
```php
<?php
// Write to a text file
$file = fopen("data.txt", "w");
fwrite($file, "Welcome to PHP File Handling");
fclose($file);

// Read from the text file
$file = fopen("data.txt", "r");
echo fread($file, filesize("data.txt"));
fclose($file);
?>
```

Output 
```shell
Welcome to PHP File Handling
```

> Exam Point 
> - fopen("data.txt", "w") → Opens the file in write mode.
> - fwrite() → Writes data to the file.
> - fclose() → Closes the file.
> - fopen("data.txt", "r") → Opens the file in read mode.
> - fread() → Reads data from the file.
> - filesize() → Returns the size of the file.

---

4. PHP script that validates an email ID using regex and performs string operations. 
```php
<?php
$email = "student@gmail.com";

// Validate Email using Regex
if (preg_match("/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/", $email))
    echo "Valid Email ID <br>";
else
    echo "Invalid Email ID <br>";

// String Operations
echo "Length: " . strlen($email) . "<br>";
echo "Uppercase: " . strtoupper($email) . "<br>";
echo "Lowercase: " . strtolower($email) . "<br>";
?>
```

Output 
```shell
Valid Email ID

Length: 17
Uppercase: STUDENT@GMAIL.COM
Lowercase: student@gmail.com
```

> Exam Point 
> 
>- preg_match() → Validates the email using a regular expression (Regex).
>- strlen() → Returns the length of the string.
>- strtoupper() → Converts the string to uppercase.
>- strtolower() → Converts the string to lowercase.

---

5. Build a simple login form that captures user input using both GET and POST methods. 
-  Using GET Method :
```php
<!DOCTYPE html>
<html>
<body>

<form method="get">
Username: <input type="text" name="user"><br><br>
Password: <input type="password" name="pass"><br><br>
<input type="submit" value="Login">
</form>

<?php
if(isset($_GET["user"]))
{
    echo "Username: ".$_GET["user"]."<br>";
    echo "Password: ".$_GET["pass"];
}
?>

</body>
</html>
```

- Using POST Method
```php
<!DOCTYPE html>
<html>
<body>

<form method="post">
Username: <input type="text" name="user"><br><br>
Password: <input type="password" name="pass"><br><br>
<input type="submit" value="Login">
</form>

<?php
if(isset($_POST["user"]))
{
    echo "Username: ".$_POST["user"]."<br>";
    echo "Password: ".$_POST["pass"];
}
?>

</body>
</html>
```

Output 
![[get-login.png]]

![[post-login.png]]

> Exam Point 
> 
>- $_GET retrieves data sent through the URL. Data visible in the URL
>- $_POST retrieves data sent securely in the request body (not visible in the URL).

---

6. PHP application that implements login functionality using sessions and cookies.

```php
<?php
session_start();

if(isset($_POST["login"]))
{
    $user = $_POST["user"];
    $pass = $_POST["pass"];

    if($user == "admin" && $pass == "1234")
    {
        $_SESSION["user"] = $user;
        setcookie("user", $user, time()+3600);

        echo "Login Successful <br>";
        echo "Session User: " . $_SESSION["user"];
    }
    else
    {
        echo "Invalid Username or Password";
    }
}
?>
  
<html>
<body>
<form method="post">
    Username: <input type="text" name="user"><br><br>
    Password: <input type="password" name="pass"><br><br>
    <input type="submit" name="login" value="Login">
</form>
</body>
</html>
```

Output
![[session.png]]

---

7. Program that demonstrates the use of try-catch blocks and custom exceptions in PHP. 
```php
<?php
class MyException extends Exception {}

try
{
    $age = 15;

    if($age < 18)
    {
        throw new MyException("Age must be 18 or above.");
    }

    echo "Eligible";
}
catch(MyException $e)
{
    echo "Exception: " . $e->getMessage();
}
?>
```

Output 


> Exam Point 
> 
> - class MyException extends Exception → Creates a custom exception class.
> - try → Contains code that may generate an exception.
> - throw → Throws the custom exception.
> - catch → Catches the exception and displays the error message.
> - getMessage() → Returns the exception message.

---

8. PHP script to connect with MySQL and perform Create, Read, Update, and Delete (CRUD)operations.
```php
<?php
$conn = mysqli_connect("127.0.0.1","root","","student");

if(!$conn){
    die("Connection Failed: ".mysqli_connect_error());
}

// Create table
mysqli_query($conn,"CREATE TABLE IF NOT EXISTS stud(
id INT PRIMARY KEY,
name VARCHAR(20),
marks INT
)");

// CREATE
mysqli_query($conn,"INSERT INTO stud VALUES(1,'Ravi',85)");
echo "Inserted<br>";

// READ
$result = mysqli_query($conn,"SELECT * FROM stud");
while($row=mysqli_fetch_assoc($result))
{
    echo $row["id"]." ".$row["name"]." ".$row["marks"]."<br>";
}

// UPDATE

mysqli_query($conn,"UPDATE stud SET marks=90 WHERE id=1");
echo "afterUpdate<br>";
$result = mysqli_query($conn,"SELECT * FROM stud");
while($row=mysqli_fetch_assoc($result))
{
    echo $row["id"]." ".$row["name"]." ".$row["marks"]."<br>";
}


// DELETE
mysqli_query($conn,"DELETE FROM stud WHERE id=1");
echo "Deleted<br>";

mysqli_close($conn);
?>
```

Output 
![[sql.png]]

---
## Part B :

1. PHP application that uses Joins, Subqueries, and Prepared Statements for secure database queries.
```php

```

---

2. Program to export MySQL data into a CSV file and import data from a JSON file. 
```php

```

---

3. PHP program using Classes, Objects, Inheritance, and Encapsulation. 
```php

```

---

4. Develop a user login & registration system with password hashing using bcrypt/Argon2.
```php

```

---

5. PHP script to upload images securely with validation and file size restrictions. 
```php

```

---

6. Build a REST API that allows users to fetch, add, update, and delete records from a MySQL database. 
```php

```

---

7. PHP program that sends emails using PHPMailer with SMTP authentication.
```php

```
