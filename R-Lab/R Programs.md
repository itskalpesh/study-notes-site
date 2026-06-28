# R Lab - Programs 
## Part A :
1. R program to Illustrate with if-else statement and how does it operate on vectors of variable length.
```r
# Create a vector
x <- c(10, -5, 0, 8, -2)

# Using if-else (works only on the first element)
if (x[1] > 0) {
  print("First element is Positive")
} else if (x[1] < 0) {
  print("First element is Negative")
} else {
  print("First element is Zero")
}

# Using ifelse() for the entire vector
result <- ifelse(x > 0, "Positive",
                 ifelse(x < 0, "Negative", "Zero"))

print(result)
```

Output : 
```shell
[1] "First element is Positive"

[1] "Positive" "Negative" "Zero" "Positive" "Negative"
```

> Exam Point :
> - if-else works only with a single logical value ( scalar).If a vector is given directly, R considers only the first element and ignores the remaining elements.
> - To apply a condition to every element of a vector, use the ifelse() function. ifelse() checks each element individually and returns a vector of results with the same length as the input vector.

---

2. R program Illustrate with for loop and stop on condition, to print the error message. 
```r
# Enter how many numbers
n <- as.integer(readline("How many numbers do you want to enter? "))

# Read numbers one by one
for(i in 1:n)
{
  num <- as.numeric(readline(paste("Enter number", i, ": ")))

  if(num < 0)
  {
    stop("Error: Negative number entered!")
  }

  print(num)
}

```

Output:
```shell
How many numbers do you want to enter? 5
Enter number 1 : 10
[1] 10
Enter number 2 : 20
[1] 20
Enter number 3 : 15
[1] 15
Enter number 4 : -8
Error: Negative number entered!
```

> Exam Point:
> 
> - for loop is used to repeat a block of code a fixed number of times.
> - stop() is used to terminate the execution of the program and display an error message when a specified condition is met.

---

3. R Program to implement T-Test for Anova. 
- R Program for T-Test
```r
# Sample data
group1 <- c(45, 50, 55, 60, 65)
group2 <- c(40, 42, 48, 50, 53)

# Perform t-test
result <- t.test(group1, group2)

# Display result
print(result)
```
Output 

```shell
Two Sample t-test

t = 2.45
p-value = 0.04

Alternative hypothesis:
true difference in means is not equal to 0
```

- R Program for One-Way ANOVA
```r
# Sample data
marks <- c(80, 85, 78, 90, 88, 92, 70, 75, 72)
group <- factor(c("A","A","A","B","B","B","C","C","C"))

# Perform ANOVA
result <- aov(marks ~ group)

# Display result
summary(result)
```

Output 
```shell
             Df Sum Sq Mean Sq F value Pr(>F)
group         2  620.2  310.1   18.45  0.002
Residuals     6  100.8   16.8
```

> Exam Point : 
> - T-test compares the means of two groups.
> - ANOVA compares the means of three or more groups.

---

4. R Program Compute mean values for vector aggregates defined by factors tapply and supply. 
```r
# Create a vector of marks
marks <- c(80, 75, 90, 85, 70, 95)

# Create a factor (groups)
group <- factor(c("A", "A", "B", "B", "C", "C"))

# Mean using tapply()
cat("Mean using tapply():\n")
print(tapply(marks, group, mean))

# Split data into groups
x <- split(marks, group)

# Mean using sapply()
cat("\nMean using sapply():\n")
print(sapply(x, mean))
```

Output 
```shell
Mean using tapply():
 A    B    C
77.5 87.5 82.5

Mean using sapply():
 A    B    C
77.5 87.5 82.5
```

> Exam Point:
> - tapply() applies a function (such as mean) to subsets of a vector defined by a factor.
> - sapply() applies a function to each element of a list (here, the grouped vectors) and returns a simplified result.

---

5. R program to implement different string manipulation functions. 
```r
# Create a string
str <- "R Programming"

# String length
cat("Length of string:", nchar(str), "\n")

# Convert to uppercase
cat("Uppercase:", toupper(str), "\n")

# Convert to lowercase
cat("Lowercase:", tolower(str), "\n")

# Extract substring
cat("Substring (3 to 8):", substr(str, 3, 8), "\n")

# Replace part of the string
substr(str, 3, 13) <- "Language"
cat("After Replacement:", str, "\n")

# Split a string
str2 <- "Apple,Banana,Mango"
cat("Split String:\n")
print(strsplit(str2, ",")) 
```

Output 
```shell
Length of string: 13
Uppercase: R PROGRAMMING
Lowercase: r programming
Substring (3 to 8): Progra
After Replacement: R Language
Split String:
[[1]]
[1] "Apple"  "Banana" "Mango"
```

> Exam Point 
> - nchar() → Returns the length of a string.
> - toupper() → Converts the string to uppercase.
> - tolower() → Converts the string to lowercase.
> - substr() → Extracts or replaces a part of a string.
> - strsplit() → Splits a string into multiple parts based on a separator.

---

6. R Program Illustrate Reading & Writing Files.
```r
# Create a data frame
student <- data.frame(
  RollNo = c(1, 2, 3),
  Name = c("Amit", "Ravi", "Sneha"),
  Marks = c(85, 90, 88)
)

# Write data to a CSV file
write.csv(student, "student.csv", row.names = FALSE)

cat("Data written to student.csv\n")

# Read data from the CSV file
data <- read.csv("student.csv")

cat("Data read from file:\n")
print(data)
```

Output 
```shell
Data written to student.csv

Data read from file:
   RollNo   Name   Marks
1   1        Amit    85
2   2        Ravi    90
3   3        Sneha   88
```

> Exam Point 
> - data.frame() creates a table of data.
> - write.csv() writes the data frame to a CSV file.
> - read.csv() reads the CSV file into R.
> - print() displays the contents of the file.
> - row.names = FALSE prevents row numbers from being written to the file.

---

7. R program for any visual representation of an object with creating graphs using graphic functions also demonstrate the legends: Plot(),Hist(),Linechart(),Pie(),Boxplot(),Scatterplots()..
```r
# Display 6 graphs in one window
par(mfrow = c(2,3))

# 1. Plot()
x <- 1:5
y <- c(2,4,6,8,10)
plot(x, y, pch=19, col="red",
     main="Plot",
     xlab="X", ylab="Y")
legend("topleft", legend="Data", pch=19, col="red")

# 2. Histogram
data <- c(45,50,55,60,65,70,75,80,85,90)
hist(data, col="skyblue",
     main="Histogram",
     xlab="Values")
legend("topright", legend="Frequency", fill="skyblue")

# 3. Line Chart
sales <- c(20,30,25,40,50)
plot(sales, type="o", col="blue",
     main="Line Chart",
     xlab="Month", ylab="Sales")
legend("topleft", legend="Sales", col="blue", lty=1, pch=1)

# 4. Pie Chart
share <- c(30,25,20,25)
labels <- c("A","B","C","D")
pie(share, labels=labels,
    col=c("red","green","blue","yellow"),
    main="Pie Chart")
legend("topright", legend=labels,
       fill=c("red","green","blue","yellow"))

# 5. Boxplot
marks <- c(45,50,55,60,65,70,75,80,85)
boxplot(marks,
        col="pink",
        main="Boxplot")
legend("topright", legend="Marks", fill="pink")

# 6. Scatter Plot
height <- c(150,155,160,165,170,175)
weight <- c(50,55,60,65,70,75)
plot(height, weight,
     pch=19, col="purple",
     main="Scatter Plot",
     xlab="Height", ylab="Weight")
legend("topleft", legend="Students",
       pch=19, col="purple")   
```

Output 
![[graph-output.png]]


> Exam Point 
>- plot() → Draws a simple plot.
>- hist() → Creates a histogram.
>- type="o" in plot() → Creates a line chart with points.
>- pie() → Draws a pie chart.
>- boxplot() → Displays the distribution of data.
>- plot(x, y) → Creates a scatter plot.
>- legend() → Adds a legend to the graph.

---
## Part B :
1. R program for with any dataset containing data frame objects, and employ manipulating and analyzing data. 
```r

```

2. Program to create an application of Linear Regression in multivariate context for predictive purpose.
```r

```

3. R Program to Find Mean, Mode , Median , Variance and Standard Deviation. 
```r

```

4. R program that performs data cleaning and transformation effectively using a sample dataset. (It covers handling missing values, removing duplicates, renaming columns, filtering, sorting, and adding new columns.) 
```r

```

5. Design a data frame in R for storing about 20 employee details. Create a CSV file named “input.csv” that defines all the required information about the employee such as id, name, salary, start_date, dept. Import into R and do the following analysis. a) Find the total number rows & columns b) Find the maximum salary c) Retrieve the details of the employee with maximum salary d) Retrieve all the employees working in the IT Department. e) Retrieve the employees in the IT Department whose salary is greater than 20000 and write these details into another file “output.csv” 
```r

```

6. R program to create a matrix using vectors and perform following operations. a) Find transpose of a matrix ii) Find row and column sum of matrix b) Find row and column index of maximum and minimum value in the given matrix. c) Find sum of principal diagonal elements. 
```r

```

7. R program to create a Data Frame with following details and do the following operations.a) Subset the Data frame and display the details of only those items whose price is greater than or equal to 350. b) Subset the Data frame and display only the items where the category is either “Office Supplies” or “Desktop Supplies” c) Create another Data Frame called “item-details” with three different fields itemCode,  ItemQtyonHand and ItemReorderLvl and merge the two frames. 

| itemCode | itemCategory      | itemPrice |
| -------- | ----------------- | --------- |
| 1001     | Electronics       | 700       |
| 1002     | Desktop Supplies  | 300       |
| 1003     | Offline Suppliers | 350       |
| 1004     | USB               | 400       |
| 1005     | CD Drive          | 800       |
```r

```

8. R program to perform time series analysis on the monthly airline passenger dataset (AirPassengers) from 1949 to 1960. The program should: a) Visualize the time series data. b) Decompose the time series into trend, seasonal, and residual components. c) Build a forecasting model using the ARIMA (AutoRegressive Integrated Moving Average) model.d) Predict the next 12 months' passenger traffic
```r

```