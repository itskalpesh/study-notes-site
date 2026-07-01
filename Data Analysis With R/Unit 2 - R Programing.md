# Unit II - R Programing Structure 

### R Programing 
R is a programming language and software environment used for data analysis, statistical calculations, and creating graphs and charts.

> Note :
> R was developed by Ross Ihaka and Robert Gentleman in 1993. It is widely used by data analysts, statisticians, researchers, and data scientists to analyze data and generate graphical reports.
> 
> R provides a large collection of built-in functions and packages that make data analysis simple and efficient.

---
### Features of R Programming
1. Open-source and free to use.
2. Easy to learn and use.
3. Supports statistical analysis.
4. Creates high-quality graphs and charts.
5. Works on Windows, Linux, and macOS.
6. Supports large datasets.
7. Has thousands of additional packages.
8. Widely used in data science and machine learning.

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
In R, variables are created using the assignment operator <- or =.

Syntax 
```R
variable_name <- value
```
Or
```R
variable_name = value
```

Example 
```R
x <- 10
name <- "Rahul"
marks <- 85.5
```

### Rules for Naming Variables
- Variable names can contain letters, numbers, dots (.), and underscores (_).
- A variable name must start with a letter or a dot (.).
- It cannot start with a number.
- Variable names are case-sensitive (age and Age are different).
- Avoid using reserved keywords as variable names

---
### Data Types in R
Data types specify the type of data that a variable can store.

| Data Type | Description                                  | Example              |
| --------- | -------------------------------------------- | -------------------- |
| Numeric   | Stores integer and decimal numbers.          | x <- 25<br>y <- 45.8 |
| Integer   | Stores whole numbers.                        | age <- 20L           |
| Character | Stores text or strings.                      | name <- "Ramesh"     |
| Logical   | Stores Boolean values. Values: TRUE or FALSE | result <- TRUE       |
| Complex   | Stores complex numbers.                      | z <- 3 + 2i          |

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

| Operators | Meaning                     | Example         |
| --------- | --------------------------- | --------------- |
| :         | Creates a sequence          | 1:5 → 1 2 3 4 5 |
| %in%      | Checks membership           | 2 %in% c(1,2,3) |
| $         | Accesses data frame columns | student$name    |

---
### Control Statements in R
Control statements are used to control the execution of a program based on conditions.

```shell
Types of Control Statements in R
 1. if Statement
 2. if...else Statement
 3. if...else if...else Statement
 4. switch Statement
```

#### 1. if Statement
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
#### 2. if...else Statement
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
#### 3. if...else if...else Statement
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
#### 4. switch Statement
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
### Looping Statements in R
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
### Loop Control Statements
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
for(i in 1:10) {
    if(i == 6)
        break
    print(i)
}
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


---
Back to : [[Unit 1 - Introduction Data Analytics]]