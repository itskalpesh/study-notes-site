# Unit II - R Programing Structure 

### R Programing 
R is a programming language and software environment used for data analysis, statistical calculations, and creating graphs and charts.

> Note :
> R was developed by Ross Ihaka and Robert Gentleman in 1993. It is widely used by data analysts, statisticians, researchers, and data scientists to analyze data and generate graphical reports.
> 
> R provides a large collection of built-in functions and packages that make data analysis simple and efficient.

---
### Features of R Programming

 **1. Open Source and Free**
- R is free to download and use.
- Its source code is publicly available, so anyone can modify and improve it.

 **2. Cross-Platform**
- R works on multiple operating systems such as **Windows, Linux, and macOS**.
- The same R program can run on different platforms without major changes.

**3. Rich Package Support**
- R provides thousands of packages through **CRAN (Comprehensive R Archive Network)**.
- These packages add extra features for statistics, data analysis, visualization, and machine learning.

**4. Community Support**
- R has a large community of developers, researchers, and data scientists.
- Users can easily get help through online forums, tutorials, and documentation.

 **5. Excellent Data Visualization**
- R creates high-quality graphs and charts for presenting data visually.
- It supports **Histograms, Bar Charts, Line Graphs, Pie Charts, Boxplots, and Scatterplots**.

**6. Dynamically Typed**
- R is a **dynamically typed** language, which means the data type of a variable is assigned automatically during program execution.
- There is no need to declare the data type explicitly.

**7. Interpreted Language**
- R is an interpreted language, meaning it executes code **line by line** without compilation.
- This makes testing and debugging easier.

**8. Powerful Statistical Analysis**
- R provides many built-in statistical functions.
- It supports techniques such as **Mean, Median, Standard Deviation, t-test, ANOVA, Regression,** and **Time Series Analysis**.

**9. Easy Data Handling**
- R makes it easy to import, clean, transform, analyze, and export data.
- It supports data from **CSV, Excel, JSON, XML, databases, and web sources**.

---
### Applications of R Programming
- Data Analysis
- Statistical Computing
- Data Visualization
- Machine Learning
- Business Analytics
- Financial Analysis
- Healthcare Research
- Academic Research

---
### Advantages
- Free and open-source.
- Excellent for statistical analysis.
- Powerful visualization tools.
- Large community support.
- Supports many packages.

---
### Variables
A variable is a named memory location used to store data. The value of a variable can be changed during program execution

### Creating Variables in R
In R, values can be assigned to variables using four ways.

1. Assignment 
    - assign value to variable.
    - similar to assignment in many other programing language.
```R
X = 10  
```

 2. Left Assignment 
    - The most commonly used assignment Operator in R.
    - Assign the value from righ to left.
```R
X <- 100
```

3. Right Assignment 
    - Assigns the value from left to right.
```R
100 -> x
```

4. Global Assignment 
    - Assign a value to a global variable, even when used inside a function.
    - Mainly used in advanced R programing.
```R
x <<- 100
```

5. assign( ) Function 
    - A build in function used to assign a value to a variable dynamically using its name as string.
```R
assign("age",23)
```

---
### Rules for Naming Variables
1. Variable names can contain letters, numbers, dots (.), and underscores (_).
```R
_name <- "ram"
marks1 <- 85
Total.marks <- 450
```

2. A variable name must start with a letter or a dot (.).
```R
.name <- "R". #valid
age <- 20 #valid
2age <- 23 #invalid

```

3. It cannot contain space or special characters.
```R
S name <- "R" #invalid
M@rks <- 10 #invalid
```

4. Variable names are case-sensitive.
```R
age <- 20
Age <- 23
```
 
 5. Avoid using reserved keywords as variable names
```R
#invalid
if, else, for, while, repeat, function
```
 
---
### Data Types in R
Data types specify the type of data that a variable can store.

| Data Type | Description                                                        | Example                        |
| --------- | ------------------------------------------------------------------ | ------------------------------ |
| Numeric   | Stores integer and decimal numbers.                                | x <- 25<br>y <- 45.8           |
| Integer   | Stores whole numbers. Values are written with suffix L.            | age <- 20L                     |
| Character | Stores text or strings. Which enclosed in single or double quotes. | name <- "Ramesh"               |
| Logical   | Stores Boolean values. Values: TRUE or FALSE                       | result <- TRUE                 |
| Complex   | Stores complex numbers. Which contains real & imaginary part.      | z <- 3 + 2i                    |
| Date      | Used to represent dates in format YYYY-MM-DD                       | today <- as.Date("2006-08-26") |

---
### Operators in R
Operators are special symbols used to perform operations on variables and values in an R program.

```shell
 -> Operators in R
 1. Arithmetic Operators 
 2. Relational Operators
 3. Logical Operators
 4. Assignment Operators
 5. Miscellaneous Operators 
```

---
#### 1. Arithmetic Operators
These operators perform mathematical calculations.

| Operator | Meaning             | Example      |
| -------- | ------------------- | ------------ |
| +        | Addition            | 5 + 3 = 8    |
| -        | Subtraction         | 5 - 3 = 2    |
| *        | Multiplication      | 5 * 3 = 15   |
| /        | Division            | 10 / 2 = 5   |
| ^        | Exponent (Power)    | 2^3 = 8      |
| %%       | Modulus (Remainder) | 10 %% 3 = 1  |
| %/%      | Integer Division    | 10 %/% 3 = 3 |

---
#### 2. Relational (Comparison) Operators
These operators compare two values and return TRUE or FALSE.

| Operator | Meaning                  | Example        |
| -------- | ------------------------ | -------------- |
| ==       | Equal to                 | 5 == 5   #True |
| !=       | Not equal to             | 5 != 3 #True   |
| >        | Greater than             | 5 > 3 #True    |
| <        | Less than                | 5 < 3 #False   |
| >=       | Greater than or equal to | 5 >=3 #True    |
| <=       | Less than or equal to    | 5 <= 3 #False  |

---
#### 3. Logical Operators
Logical operators combine or negate conditions.

| Operators | Meaning     | Example                |
| --------- | ----------- | ---------------------- |
| &         | Logical AND | TRUE & FALSE    #FALSE |
| \|        | Logical OR  | TRUE \| FALSE    #TRUE |
| !         | Logical NOT | !TRUE           #FALSE |

---
#### 4. Assignment Operators
These operators assign values to variables.

| Operators | Meaning          | Example |
| --------- | ---------------- | ------- |
| <-        | Left assignment  | x <- 10 |
| =         | Assignment       | y = 20  |
| ->        | Right assignment | 30 -> z |

---
#### 5. Miscellaneous Operators
These operators perform special tasks.

| Operators | Meaning                     | Example                                                                           |
| --------- | --------------------------- | --------------------------------------------------------------------------------- |
| :         | Creates a sequence          | 1:5 → 1 2 3 4 5                                                                   |
| %in%      | Checks membership           | 2 %in% c(1,2,3)                                                                   |
| $         | Accesses data frame columns | student$name                                                                      |
| %*%       | Matrix Operator             | A <- matrix(c(1,2,3,4), nrow=2)<br>B <- matrix(c(5,6,7,8), nrow=2)<br><br>A %*% B |

---
### Control Statements in R
Control statements are used to control the execution of a program based on conditions.

Types of Control Statements in R
- Conditional (Decision-Making) Statements
- Looping (Iteration) Statements
- Loop Control (Jump) Statements

---
#### Conditional Statements (Decision-Making)
##### 1. if Statement
The if statement executes a block of code only if the given condition is TRUE.

Syntax
```shell
if (condition) {
    statement
}
```

Example 
```R
age <- 18

if (age >= 18) {
    print("Eligible to Vote")
}
```

---
##### 2. if...else Statement
The if...else statement executes one block of code if the condition is TRUE, and another block if it is FALSE.

Syntax 
```shell
if (condition) {
    statement1
} else {
    statement2
}
```

Example 
```R
marks <- 35

if (marks >= 35) {
    print("Pass")
} else {
    print("Fail")
}
```

---
##### 3. if...else if...else Statement
This statement is used to test multiple conditions. The first condition that is TRUE is executed.

Syntax 
```shell
if (condition1) {
    statement1
} else if (condition2) {
    statement2
} else {
    statement3
}
```

Example 
```R
marks <- 82

if (marks >= 90) {
    print("Grade A")
} else if (marks >= 75) {
    print("Grade B")
} else {
    print("Grade C")
}
```

---
##### 4. switch Statement
The switch statement selects and executes one block of code from multiple options based on the given expression.

Syntax 
```shell
switch(expression,
       value1 = statement1,
       value2 = statement2,
       value3 = statement3)
```

Example 
```R
day <- 2

switch(day,
       "Monday",
       "Tuesday",
       "Wednesday")
```

---
##### 5. ifelse() Function 
ifelse() is a function used to return one value when a condition is TRUE and another value when it is FALSE

Syntax 
```shell
ifelse(condition, value_if_true, value_if_false)
```

Example 
```R
marks <- 40

result <- ifelse(marks >= 35, "Pass", "Fail")
print(result)
```

---
#### Difference b/w if-else statement &  ifelse( ) function

| if-else statement               | ifelse( ) function                   |
| ------------------------------- | ------------------------------------ |
| Statement                       | Function                             |
| Used for single conditions      | Works with single values and vectors |
| Can execute multiple statements | Returns a value only                 |
| Suitable for complex logic      | Suitable for simple conditions       |

---
#### Looping Statements in R (Iteration)
Looping statements are used to execute a block of code repeatedly until a specified condition is met.

```shell
Types of Looping Statements in R
 1. for Loop
 2. while Loop
 3. repeat Loop
```

#### 1. for Loop
The for loop is used to execute a block of code a fixed number of times.

Syntax 
```shell
for (variable in sequence) {
    statements
}
```

Example 
```R
for(i in 1:5) {
    print(i)
}
```

Output 
```shell
1
2
3
4
5
```

---
#### 2. while Loop
The while loop executes a block of code as long as the given condition is TRUE.

Syntax 
```shell
while (condition) {
    statements
}
```

Example 
```R
i <- 1

while(i <= 5) {
    print(i)
    i <- i + 1
}
```

Output 
```shell
1
2
3
4
5
```

---
#### 3. repeat Loop
The repeat loop executes a block of code continuously until it is explicitly stopped using the break statement.

Syntax 
```shell
repeat {
    statements
    if(condition)
        break
}
```

Example 
```R
i <- 1

repeat {
    print(i)
    i <- i + 1
    if(i > 5)
        break
}
```

Output 
```shell
1
2
3
4
5
```

---
#### Loop Control Statements
#### 1. break Statement
Used to terminate a loop immediately.

Example 
```R
for(i in 1:10) {
    if(i == 6)
        break
    print(i)
}
```

Output 
```shell
[1] 1
[1] 2
[1] 3
[1] 4
[1] 5
```

---
#### 2. next Statement
Used to skip the current iteration and continue with the next iteration.

Example 
```R
for(i in 1:5) {
    if(i == 3)
        next
    print(i)
}
```

Output 
```shell
1
2
4
5
```

---
### Difference b/w loops

| for                                            | while                                                                 | repeat                                                                                           |
| ---------------------------------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Repeats code for a fixed number of times.      | Repeats code while a condition is TRUE.                               | Repeats code indefinitely until break is used.                                                   |
| Condition uses a sequence or range             | Condition is checked before each iteration.                           | No condition at the beginning.                                                                   |
| Number of iterations usually known in advance. | Number of iterations depends on the condition.                        | Number of iterations unknown. Continuous until stopped.                                          |
| Stops after completing the sequence.           | Stops when the condition becomes FALSE.                               | Stops only when the break statement is executed                                                  |
| Best used for fixed iterations.                | Best used for condition-based iterations.                             | Best used for Infinite loops with an exit condition.                                             |
| Ex : for(i in 1:5) {<br>    print(i)<br>}      | Ex : i <- 1<br>while(i <= 5) {<br>    print(i)<br>    i <- i + 1<br>} | Ex : i <- 1<br>repeat {<br>    print(i)<br>    i <- i + 1<br>    if(i > 5)<br>        break<br>} |

---
### Vectors in R
