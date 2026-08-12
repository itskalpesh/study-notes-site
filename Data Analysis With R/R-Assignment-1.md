# R Programming Assignment 1

## 1. Explain classification of data.

Classification of data refers to the process of organizing data into different categories based on its source, nature, measurement and structure. It helps in easy storage, processing, analysis and decision-making.

### 1) By Source of data
Data is classified based on where it is collected from.

**a) Primary Data**
- Data collected first-hand by the researcher for specific purpose.
- It is original, reliable and more accurate.
- Ex: Surveys, interviews, observations, Questionnaires and experiments.

**b) Secondary Data**
- Data already collected and published by others.
- It is used for further analysis, saves time and cost.
- Ex: Government reports, Census data, Books, Research papers, websites.

### 2) By Nature of data
Data is classified based on its characteristics.

**a) Qualitative data**
- Descriptive and non-numerical information that represents qualities or characteristics.
- It cannot be measured using numbers.
- Ex: Gender, Colour, Blood group, customer feedback.

**b) Quantitative data**
- Numerical information that can be measured or counted, which is used for mathematical and statistical analysis.
- Ex: Age, weight, salary, marks.

### 3) By Measurement
Data is classified based on how it is measured.

**a) Discrete data**
- Data that contains countable values.
- Usually represented as whole numbers, cannot have decimal values.
- Ex: number of cars, number of books.

**b) Continuous data**
- Data that can be measured.
- It may include decimal values within a range.
- Ex: Height, Temperature, distance.

### 4) By Structural Format
Data is categorized based on how it is formatted, organized, processed and stored.

**a) Structured data**
- Information organized into a predefined format such as rows and columns.
- Easy to search, manage, and analyze.
- Stored in relational databases.
- Ex: Student database, Bank transaction, employee details.

**b) Unstructured data**
- Raw information that does not follow a fixed format.
- It is complex and difficult to store and analyze, includes text, images, videos, and audio.
- Ex: Social media post, emails, Audio & video files.

**c) Semi-Structured data**
- Information that is partially organized using tags or labels but not fixed tables.
- Stored as key-value pairs and is more flexible than structured data.
- Ex: JSON, XML, HTML, Email.

---

## Explain 5V's of data analytics

The 5V's of data analytics describe the main characteristics of data used in analytics and big data. They help organizations understand how data is generated, managed, and analyzed to make better decisions.

**1) Volume**
- Volume refers to the sheer scale of data generated and stored.
- Large volumes of data require distributed cloud storage and parallel processing.
- Data is measured in Megabytes to Petabytes.
- Ex: Social media data, customer records, online shopping transactions.

**2) Velocity**
- Velocity refers to the speed at which data is generated, collected, and processed.
- Data is generated continuously from various sources.
- High-speed data requires real time or near real time analysis.
- Fast processing helps organizations make quick decisions.
- Ex: Live stock market updates, online payment transactions, GPS tracking, sensor data.

**3) Variety**
- Variety refers to the different types and formats of data.
- Data can be structured, semi-structured or unstructured.
- Organizations need different tools to analyze different types of data.
- Ex: Text documents, images, videos, audio files, emails, JSON, XML.

**4) Veracity**
- Veracity refers to the accuracy, quality and reliability of data.
- Data should be clean, complete and trustworthy. Data cleaning improves accuracy.
- Ex: Duplicate records, missing values, incorrect customer information.

**5) Value**
- Value refers to the usefulness of data.
- Data has value only when it provides meaningful insights.
- Organizations use valuable data to improve business decisions.
- Ex: Customer purchase analysis, sales forecasting, Business performance reports.

---

## Explain application of data analytics

**1) Business and marketing**
- Data analytics helps companies understand customer needs and market trends.
- Ex: Amazon recommends products based on previous purchases.
- It is used for customer segmentation, sales forecasting, market trend analysis, personalized advertisements.

**2) Banking and Finance**
- Banks use analytics to improve security and financial decisions.
- It is used for fraud detection, credit scoring, risk analysis and customer retention.
- Ex: Detection of unusual ATM or online transactions.

**3) Healthcare**
- Analytics improves patient care and hospital management.
- It is used for disease prediction, patient monitoring, medical image analysis and drug research.
- Ex: Predicting diabetes risk from patient data.

**4) Education**
- Educational institutions analyze student performance and improve learning outcomes and academic planning.
- It is used for attendance analysis, performance evaluation, dropout prediction, personalized learning.
- Ex: Identifying students who need extra support.

**5) Transportation and Logistics**
- Analytics improve delivery and traffic management.
- It is used for route optimization, fuel management, traffic prediction, delivery tracking.
- Ex: Google maps suggesting the fastest route.

**6) Social media**
- Social media platforms analyze user activity.
- It is used for content recommendation, sentiment analysis, trend detection, advertisement targeting.
- Ex: Instagram showing reels based on user interests.

---

## 4. Explain data type and data dimension in detail.

### Data Types
A data type specifies the kind of value a variable can store, such as numbers, text or logical value.

**1) Numeric Type**
- Stores decimal and whole numbers.
- It is the default type for numbers in R.
- Ex: `x <- 25.5`, `y <- 20`

**2) Integer Type**
- Stores whole numbers only.
- Integer values are written with `L`.
- Ex: `x <- 25L`
  - `class(x)`
  - output: `"integer"`

**3) Character Type**
- Stores text or string value.
- Character values are enclosed in single or double quotes.
- Ex: `name.city <- "Nipani"`

**4) Logical type**
- Stores boolean values, TRUE or FALSE.
- Used in decision making & conditional statement.
- Ex: `result <- TRUE`

**5) Complex Type**
- Stores numbers with real and imaginary parts.
- Ex: `x <- 3+2i`
- It is mainly used in scientific & engineering calculations.

**6) Date and Time**
- Used to represent dates in the format YYYY-MM-DD.
- Created using `as.Date()` function.
- Ex: `dob <- as.Date("2008-08-26")`

### Explain data structure

A data structure is a way of organizing and storing data so it can be accessed and analyzed efficiently.

1) Vector
2) Matrix
3) Array
4) List
5) Data Frame
6) Factor

**1) Vector**
- A vector is a sequence of data elements of same data type.
- Vectors are commonly used for storing single dimensional data.
- Vectors created using `c()` combine function.
- Supports mathematical & statistical operations directly.
- Syntax: `vector_name <- c(v1, v2, v3...)`
- Ex: `marks <- c(70, 80, 90, 95)`

**2) Matrix**
- A matrix is a collection of data elements arranged in rows and columns.
- Matrix used for storing data in two dimension.
- Supports matrix & mathematical operations.
- Elements are accessed using row & column indices.
- Created using `matrix()`, `rbind()` & `cbind()`.
- Syntax: `matrix(data, nrow, ncol)`
- Ex:
  ```
  m <- matrix(c(1:6), nrow=2, ncol=3)
  print(m)
  ```

**3) Array (N-D)**
- An array is a multi-dimensional structure that stores elements of same data type.
- Supports mathematical & statistical operations.
- Created using `array()` function.
- Array elements are accessed using indices.
- Syntax: `array(data, dim=c(r,c,l))`
- Ex:
  ```
  a <- array(1:12, dim=c(2,3,2))
  print(a)
  1 3 5
  2 4 6
  7 9 11
  8 10 12
  ```
- An array's elements are accessed using indices.
- Syntax: `array_name[row, column, layer]`
- Ex: `a[2,3,1]` → `6`

**4) List**
- A list is a data structure that can store elements of different data types, such as numeric, character, logical, vector, matrix and even other lists.
- It is the most flexible data structure in R.
- A named list stores data in form of name-value pairs. Values separated by comma. Unnamed list stores values only.
- List created using `list()` function.
- Syntax: `l <- list(values)`
- Ex:
  ```
  l1 <- list("Abhi", 20)
  stud <- list(name = "Abhi", age = 20)
  ```

**5) Data Frames**
- A data frame is a two-dimensional data structure that stores data in the form of rows & columns, where each column can store different type of data.
- A data frame is created using `data.frame()` function.
- Syntax: `df <- data.frame(col1, col2)`
- Ex:
  ```
  df <- data.frame(
    Name = c("A", "B"),
    Age = c(20, 23))
  print(df)
    Name  Age
  A   20
  B   23
  ```

**6) Factors**
- A factor is special data type used to store categorical (qualitative) data as levels.
- It stores unique values as levels.
- A factor is created using the `factor()` function.
- Syntax: `factor(vector)`
- Ex:
  ```
  gender <- factor(c("M","F","M","F"))
  print(gender)
  [1] M F M F
  Levels: F M
  ```
- In factor, values are actual data & levels are unique categories.

---

## 5. Explain features of R programming

**1) Open Source and Free**
- R is free to download and use. Its source code is publicly available so anyone can modify and improve it.

**2) Cross-Platform**
- The same R program can run on different operating systems without major changes. OS such as windows, linux and macOS.

**3) Dynamically Typed**
- In R, data type of a variable is assigned automatically at execution time. There is no need to declare the data type explicitly.

**4) Community Support**
- R has a large community of developers, researchers and data scientists, where users can easily get help through online forums, tutorials, and documentation.

**5) Rich Package Support**
- These packages add extra features for statistics, data analysis, visualization, and machine learning.

**6) Excellent data visualization**
- R creates high-quality graphs and charts for presenting data visually. It supports histograms, Bar charts, line graphs, Pie charts, Boxplots and scatter plots.

---

## 6. Explain variable in R programming

### Variable
A variable is a named memory location used to store data. The value of a variable can be changed during program execution.
- Variables make it easy to reuse and manipulate data in a program.
- Syntax: `variable_name <- value`

### Ways to assign variables

**1) Equal operator (=)**
- Used to assign a value to variable.
- Ex: `x = 10`

**2) Left assign (<-)**
- It assigns the value from right to left.
- Ex: `x <- 100`

**3) Right assign (->)**
- It is used to assign the value from left to right.

**4) Global assign (<<-)**
- It assigns a value to global variable, even when used inside a function.
- Ex: `x <<- 100`

**5) assign() function**
- A built-in R function used to assign a value to a variable dynamically, using its name as a string.
- Syntax: `assign("var_name", value)`
- Ex: `assign("age", 23)`

### Variable naming rules

**1) Starting character**
- A variable name must start with letters (A-Z, a-z) or a dot (.)
- Ex:
  - `name <- "R"` ✓
  - `age <- 20` ✓
  - `2age <- 30` # invalid

**2) Valid Characters**
- It contains letters (A-Z, a-z), numbers (0-9), dot and underscores.
- Ex:
  - `f_name <- "Ram"`
  - `T.marks <- 650`

**3) Variable names are Case-sensitive**
- R treats uppercase and lowercase letters as different.
- Ex: `age <- 20` and `Age <- 23` are different variables.

**4) No special characters**
- Space and special characters such as @, #, %, &, ! are not allowed.
- Ex:
  - `m@rks <- 10` # invalid
  - `$name <- "A"` # invalid

**5) Avoid Reserved keywords**
- Reserved keywords such as TRUE, if, else, null are not allowed as variable name.
- Ex:
  - `if <- 10` # invalid
  - `function <- "python"` # invalid

### Functions used on variable
R provides several built-in functions to check the type, length, class and other properties.

**1) class()** — returns data type of a variable
- Syntax: `class(var_name)`
- Ex:
  ```
  var <- "Hari"
  print(class(var))  # [1] "character"
  ```

**2) length()** — returns number of elements
- Syntax: `length(var_name)`
- Ex:
  ```
  var <- "Hari"
  print(length(var))  # [1] 1
  ```

**3) ls()** — list all variables in the workspace
- Syntax: `ls()`
- Ex:
  ```
  var <- "Hari"
  print(ls())  # [1] "var"
  ```

**4) exists()**
- It checks whether a variable exists in the workspace. It returns TRUE if variable exists, otherwise FALSE.
- Syntax: `exists(var_name)`
- Ex:
  ```
  var <- "Hari"
  print(exists(var))  # [1] TRUE
  ```

**5) rm()**
- Used to delete an unwanted variable within workspace.
- Ex:
  ```
  rm(var)
  print(exists(var))  # [1] FALSE
  ```

---

## 7. Explain control statements in R

### Control Statements
Control statements are used to control the execution of a program based on conditions.

**1) if statement**
- The if statement executes a block of code only if the given condition is True.
- Syntax:
  ```
  if (condition) {
    statements
  }
  ```
- Ex:
  ```
  x <- 10
  if (x > 0) {
    print(paste(x, "is greater than 0"))
  }
  ```

**2) if-else Statement**
- The if-else statement executes one block of code if the condition is True, and another block if it is False.
- Syntax:
  ```
  if (condition) {
    statement1
  } else {
    statement2
  }
  ```
- Ex:
  ```
  x <- -10
  if (x > 0) {
    print(paste(x, "is +ve num"))
  } else {
    print(paste(x, "is -ve num"))
  }
  ```

**3) else-if ladder**
- if-else-if statement is used to test multiple conditions. If first condition is true then other conditions are skipped.
- Syntax:
  ```
  if (condition1) {
    statement1
  } else if (condition2) {
    statement2
  } else {
    statement3
  }
  ```
- Ex:
  ```
  x <- 0
  if (x > 0) {
    print(paste(x, "is +ve"))
  } else if (x < 0) {
    print(paste(x, "is -ve"))
  } else {
    print(paste(x, "is zero"))
  }
  ```

**4) switch Statement**
- The switch statement is used to select one option from many choices based on the given condition.
- Switch supports numeric indexing and string matching.
- Syntax: `switch(expression, case1, case2...)`
- Ex:
  ```
  x <- switch(2, "Apple", "Banana")
  print(x)  # [1] "Banana"
  ```
- Numeric indexing: expression as number represents the position of the option.
- String matching: expression as string is matched with the name of the option.

**5) ifelse() function**
- A built-in function used to return one value when a condition is true and another when it is false.
- Syntax: `ifelse(condition, true_value, false_value)`
- Ex:
  ```
  rs <- ifelse(marks >= 35, "pass", "fail")
  print(rs)  # [1] "pass"
  ```

---

## 8. Explain looping statements in R with example.

### Looping Statements
Looping statements are used to execute a block of code repeatedly until a specified condition is satisfied.

**1) for loop**
- The for loop is used to execute a block of code a fixed number of times.
- Syntax:
  ```
  for (variable in sequence) {
    statements
  }
  ```
- Ex:
  ```
  for (i in 1:5) {
    print(i)  # [1] 1 2 3 4 5
  }
  ```

**2) while loop**
- The while loop executes a block of code as long as the condition is True.
- Syntax:
  ```
  while (condition) {
    statements
  }
  ```
- Ex:
  ```
  while (i <= 5) {
    print(i)  # [1] 1 2 3 4 5
  }
  ```

**3) repeat loop**
- The repeat loop executes a block of code continuously until it is explicitly stopped using the break statement.
- Syntax:
  ```
  repeat {
    statement
    if (condition)
      break
  }
  ```
- Ex:
  ```
  i <- 1
  repeat {           # [1] 1
    print(i)          # 2
    i <- i+1           # 3
    if (i > 5)          # 4
      break              # 5
  }
  ```

- **Break statement**: used to terminate a loop immediately.
- **Next statement**: used to skip the current iteration and continue with the next iteration.

---

## 9. Explain user defined function with example.

### User-defined Function
- A function created by programmer to perform a specific task, which runs when it is called.
- It helps in reusing code and reducing repetition.
- In R, functions are created using the `function()` keyword.
- Syntax:
  ```
  function_name <- function(parameters) {
    statements
    return(value)
  }
  ```
- Where:
  - function_name — name of the function.
  - parameters — input values passed into the function.
  - return value — output returned to the caller.

### Types of user-defined function

**1) No argument and No return value**
- A function without arguments and no return value is mainly used to display messages or perform simple actions.
- Syntax:
  ```
  function_name <- function() {
    statements
  }
  ```
- Ex:
  ```
  greet <- function() {
    print("welcome to R")
  }
  greet()  # [1] welcome to R
  ```

**2) With Argument and no return value**
- A function with argument and no return value usually displays the result directly using `print()` or `cat()`.
- Syntax:
  ```
  function_name <- function(args) {
    statements
  }
  ```
- Ex:
  ```
  display <- function(a,b) {
    print(a+b)
  }
  display(5,3)  # [1] 8
  ```

**3) No argument and return value**
- A function does not take any input but returns the result using `return()` function.
- Syntax:
  ```
  function_name <- function() {
    statement
    return(value)
  }
  ```
- Ex:
  ```
  getPi <- function() {
    return(3.142)
  }
  getPi()  # [1] 3.142
  ```

**4) With argument and with return value**
- A function that takes input, processes it and returns the result to the caller.
- Syntax:
  ```
  fun_name <- function(a,b) {
    statements
    return(result)
  }
  ```
- Ex:
  ```
  add <- function(a,b) {
    result <- a+b
    return(result)
  }
  add(6,3)  # [1] 9
  ```

---

## 10. Explain string functions with example.

### String
A string is a sequence of characters enclosed in double quotes (" ") or single quotes (' ').
- Ex: `fname <- "Kalpesh"`

### String Functions
String functions are used to create, combine, search, extract, convert, and modify text data in R.

**1) Concatenation** — used to join two or more strings.

**a) paste()**
- Joins strings and returns a new string, a space is added automatically by default.
- Syntax: `paste(str1, str2, sep=" ")`
- Ex: `paste("Data", "Analytics")` → Output: `[1] "Data Analytics"`

**b) cat()**
- Used to join and display strings, numbers, or variables directly on the screen.
- It does not return a character string (unlike `paste()`), it only prints the output.
- Syntax: `cat("any string", variable)`
- Ex:
  ```
  x <- 18
  cat("age", x)
  ```

**2) length function**

**a) nchar()**
- Used to find number of characters in a string.
- It counts letters, numbers, spaces and special characters.
- Syntax: `nchar(string)`
- Ex: `nchar("Python")` → `[1] 6`

**b) length()**
- Used to find the number of elements in vector/object.
- It does not count characters in a string.
- Syntax: `length(object)`
- Ex:
  ```
  v <- c(10,20,30,40)
  length(v)  # [1] 4
  ```

**3) Conversion function**

**a) toupper()**
- Converts all characters in a string to uppercase.
- Syntax: `toupper(string)`
- Ex: `toupper("hello")` → `[1] "HELLO"`

**b) tolower()**
- Converts all characters in a string to lowercase.
- Syntax: `tolower(string)`
- Ex: `tolower("HELLO")` → `[1] "hello"`

**c) casefold()**
- Converts text to upper or lower case depending on the argument `upper`.
- Syntax: `casefold(string, upper = TRUE/FALSE)`

**4) Character replacement**

**a) chartr()**
- Used to replace or translate specific characters in a string.
- It performs character by character substitution.
- Syntax: `chartr(old, new, string)`
- Ex: `chartr("a", "@", "banana")` → `[1] "b@n@n@"`

**5) Splitting the string**

**a) strsplit()**
- `strsplit()` is used to divide a string into multiple parts using a specified separator, and it returns the result as a list.
- Syntax: `strsplit(string, split)`
- Ex:
  ```
  text <- "learn code tech"
  strsplit(text, " ")
  # [1] "learn" "code" "tech"
  ```

**b) substr()**
- `substr()` used to extract a part of a string from a specified start position to ending position.
- Syntax: `substr(string, start, stop)`
- Ex: `substr("Python", 3, 6)` → `[1] "tho"`

---

## 11. Explain mathematical and statistical functions with example.

### Mathematical Functions
Mathematical functions in R are built-in functions used to perform common mathematical calculations such as finding absolute values, square roots, powers, logarithms, rounding, and trigonometric values.

### Common mathematical functions

**1) abs()** — Absolute value
- Returns the positive value of a number, regardless of its sign.
- Syntax: `abs(x)`
- Ex: `abs(-25)` → `[1] 25`

**2) sqrt()** — Square Root
- Returns the square root of a number.
- Syntax: `sqrt(x)`
- Ex: `sqrt(64)` → `[1] 8`

**3) round()** — Round a number
- Rounds a number to the specified number of decimal places.
- Syntax: `round(x, digits)`
- Ex: `round(12.9678, 2)` → `[1] 12.97`

**4) ceiling()** — Round Up
- Returns the smallest integer that is greater than or equal to the input value.
- Syntax: `ceiling(x)`
- Ex: `ceiling(3.14)` → `[1] 4`

**5) floor()** — Round down
- `floor()` returns the largest integer that is less than or equal to the input number.
- Syntax: `floor(x)`
- Ex: `floor(3.1)` → `[1] 3`

**6) trunc()** — Remove decimal part
- Used to remove the decimal portion without rounding.
- Syntax: `trunc(x)`
- Ex: `trunc(3.341)` → `[1] 3`

**7) factorial()** — Factorial
- Calculates the factorial of a non-negative integer.
- Syntax: `factorial(x)`
- Ex: `factorial(5)` → `[1] 120`

### Statistical Functions
Statistical functions are built-in functions used to perform statistical calculations such as mean, median, mode, range, variance, standard deviation, correlation and summary statistics.

They are very useful in data analysis, research, business and scientific studies.

Sample data: `x <- c(10, 20, 30, 40, 50)`

**1) mean()** — Arithmetic mean
- Used to calculate the average value.
- Syntax: `mean(x)`
- Ex: `mean(x)` → `[1] 30`

**2) median()**
- Return the middle value after arranging data in order.
- Syntax: `median(x)`
- Ex: `median(x)` → `[1] 30`

**3) min()** — minimum value
- It returns minimum value in a list.
- Syntax: `min(x)`
- Ex: `min(x)` → `[1] 10`

**4) max()**
- It returns maximum value in a list.
- Syntax: `max(x)`
- Ex: `max(x)` → `[1] 50`

**5) range()**
- It returns minimum and maximum value from a range.
- Syntax: `range(x)`
- Ex: `range(x)` → `[1] 10 50`

**6) sum()**
- It returns sum of all the values present in its arguments.
- Syntax: `sum(x)`
- Ex: `sum(x)` → `[1] 150`

**7) prod()**
- It returns the product of values.
- Syntax: `prod(x)`
- Ex: `prod(c(2,3,4))` → `[1] 24`

**8) sort()**
- Return the elements in ascending order.
- Syntax: `sort(x)`
- Ex: `sort(c(4,3,1,2))` → `[1] 1 2 3 4`

**9) sd()**
- Computes the standard deviation of the values in x.
