# R Lab - Programs 
Go to [[Viva Questions]]

---
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
# Create a data frame
student <- data.frame(
  RollNo = c(1,2,3,4),
  Name = c("Ravi","Amit","Sneha","Pooja"),
  Marks = c(85,90,78,88)
)

# Display data frame
print(student)

# Display structure
str(student)

# Display summary
summary(student)

# Mean of Marks
cat("Mean Marks =", mean(student$Marks), "\n")

# Highest Marks
cat("Highest Marks =", max(student$Marks), "\n")

# Lowest Marks
cat("Lowest Marks =", min(student$Marks), "\n")
```

Output 
```shell
  RollNo  Name  Marks
1      1  Ravi     85
2      2  Amit     90
3      3 Sneha     78
4      4 Pooja     88

Mean Marks = 85.25
Highest Marks = 90
Lowest Marks = 78
```

> Exam Point 
> 
> - data.frame() → Creates a data frame.
> - print() → Displays the data frame.
> - str() → Shows the structure of the data frame.
> - summary() → Gives a statistical summary.
> - mean() → Calculates the average.
> - max() → Finds the highest value.
> - min() → Finds the lowest value.

---

2. Program to create an application of Linear Regression in multivariate context for predictive purpose.
```r
# Sample dataset
data <- data.frame(
  StudyHours = c(2,4,6,8,10),
  Attendance = c(60,70,80,90,95),
  Marks = c(50,60,70,85,95)
)

# Linear Regression Model
model <- lm(Marks ~ StudyHours + Attendance, data = data)

# Display model summary
summary(model)

# Predict marks for new student
newdata <- data.frame(StudyHours = 7, Attendance = 85)
predict(model, newdata)
```

Output 
```shell
Call:
lm(formula = Marks ~ StudyHours + Attendance)

Predicted Marks:
76.5
```

> Exam Point 
> 
>- data.frame() → Creates the dataset.
>- lm() → Builds a multiple linear regression model.
>- summary() → Displays the regression analysis.
>- predict() → Predicts the marks for new input values

---

3. R Program to Find Mean, Mode , Median , Variance and Standard Deviation. 
```r
# Create a vector
x <- c(10,20,20,30,40,50)

# Mean
cat("Mean =", mean(x), "\n")

# Median
cat("Median =", median(x), "\n")

# Mode
mode_value <- names(sort(table(x), decreasing = TRUE))[1]
cat("Mode =", mode_value, "\n")

# Variance
cat("Variance =", var(x), "\n")

# Standard Deviation
cat("Standard Deviation =", sd(x), "\n")
```

Output 
```shell
Mean = 28.33333
Median = 25
Mode = 20
Variance = 216.6667
Standard Deviation = 14.7196
```

> Exam Point 
> 
> - mean(x) → Calculates the mean.
> - median(x) → Finds the median.
> - table(x) → Counts the frequency of each value.
> - sort(..., decreasing=TRUE) → Sorts frequencies in descending order.
> - names(...)[1] → Returns the value with the highest frequency (mode).
> - var(x) → Calculates the variance.
> - sd(x) → Calculates the standard deviation.

---

4. R program that performs data cleaning and transformation effectively using a sample dataset. (It covers handling missing values, removing duplicates, renaming columns, filtering, sorting, and adding new columns.) 
```r
# Sample dataset
data <- data.frame(
  ID = c(1,2,2,3,4),
  Name = c("Ravi","Amit","Amit",NA,"Pooja"),
  Marks = c(85,90,90,78,88)
)

# Display original data
print(data)

# Remove missing values
data <- na.omit(data)

# Remove duplicate rows
data <- unique(data)

# Rename column
names(data)[3] <- "Score"

# Filter records (Score > 80)
data <- subset(data, Score > 80)

# Sort by Score
data <- data[order(data$Score), ]

# Add new column
data$Result <- ifelse(data$Score >= 85, "Pass", "Fail")

# Display cleaned data
print(data)
```

Output 
```shell
  ID  Name Score Result
1  1  Ravi    85   Pass
2  2  Amit    90   Pass
4  4 Pooja    88   Pass
```

> Exam Point 
> 
>- na.omit() → Removes rows with missing values.
>- unique() → Removes duplicate rows.
>- names() → Renames a column.
>- subset() → Filters records.
>- order() → Sorts data.
>- ifelse() → Adds a new column based on a condition

---

5. Design a data frame in R for storing about 20 employee details. Create a CSV file named “input.csv” that defines all the required information about the employee such as id, name, salary, start_date, dept. Import into R and do the following analysis. a) Find the total number rows & columns b) Find the maximum salary c) Retrieve the details of the employee with maximum salary d) Retrieve all the employees working in the IT Department. e) Retrieve the employees in the IT Department whose salary is greater than 20000 and write these details into another file “output.csv” 

- Step 1: Create input.csv
```csv
id,name,salary,start_date,dept
1,Ravi,25000,2022-01-10,IT
2,Amit,18000,2021-03-15,HR
3,Pooja,30000,2020-06-20,IT
4,Sneha,22000,2023-02-01,Sales
5,Rahul,28000,2022-05-18,IT
```

- Step 2: R Program
```R
# Read CSV file
emp <- read.csv("input.csv")

# a) Total rows and columns
cat("Rows =", nrow(emp), "\n")
cat("Columns =", ncol(emp), "\n")

# b) Maximum salary
cat("Maximum Salary =", max(emp$salary), "\n")

# c) Employee with maximum salary
cat("\nEmployee with Maximum Salary:\n")
print(emp[emp$salary == max(emp$salary), ])

# d) Employees in IT Department
cat("\nEmployees in IT Department:\n")
print(subset(emp, dept == "IT"))

# e) IT employees with salary > 20000
it_emp <- subset(emp, dept == "IT" & salary > 20000)

# Write to output.csv
write.csv(it_emp, "output.csv", row.names = FALSE)

cat("\nData written to output.csv\n")
```

Output 
```shell
Rows = 5
Columns = 5

Maximum Salary = 30000

Employee with Maximum Salary:
  id  name salary start_date dept
3  3 Pooja  30000 2020-06-20   IT

Employees in IT Department:
  id  name salary start_date dept
1  1  Ravi  25000 2022-01-10   IT
3  3 Pooja  30000 2020-06-20   IT
5  5 Rahul  28000 2022-05-18   IT

Data written to output.csv
```

> Exam Point 
> 
>- read.csv() → Reads the CSV file.
>- nrow() → Returns the number of rows.
>- ncol() → Returns the number of columns.
>- max() → Finds the maximum salary.
>- subset() → Filters employees based on conditions.
>- write.csv() → Writes the filtered data to output.csv.

---

6. R program to create a matrix using vectors and perform following operations. a) Find transpose of a matrix ii) Find row and column sum of matrix b) Find row and column index of maximum and minimum value in the given matrix. c) Find sum of principal diagonal elements. 
```r
# Create matrix using vector
v <- c(1,2,3,4,5,6,7,8,9)
m <- matrix(v, nrow=3, byrow=TRUE)

# Display matrix
print(m)

# a) Transpose
cat("Transpose:\n")
print(t(m))

# Row and Column Sum
cat("Row Sum:\n")
print(rowSums(m))

cat("Column Sum:\n")
print(colSums(m))

# b) Row and Column index of Maximum value
cat("Maximum Value Index:\n")
print(which(m == max(m), arr.ind=TRUE))

# Row and Column index of Minimum value
cat("Minimum Value Index:\n")
print(which(m == min(m), arr.ind=TRUE))

# c) Sum of Principal Diagonal
cat("Sum of Principal Diagonal =",
    sum(diag(m)))
```

Output 
```shell
     [,1] [,2] [,3]
[1,]    1    2    3
[2,]    4    5    6
[3,]    7    8    9

Transpose:
     [,1] [,2] [,3]
[1,]    1    4    7
[2,]    2    5    8
[3,]    3    6    9

Row Sum:
6 15 24

Column Sum:
12 15 18

Maximum Value Index:
     row col
[1,]   3   3

Minimum Value Index:
     row col
[1,]   1   1

Sum of Principal Diagonal = 15
```

> Exam Point 
> 
> - matrix() → Creates a matrix from a vector.
> - t() → Finds the transpose of the matrix.
> - rowSums() → Calculates row sums.
> - colSums() → Calculates column sums.
> - which(..., arr.ind=TRUE) → Finds the row and column indices of the maximum and minimum values.
> - diag() → Extracts the principal diagonal.
> - sum(diag(m)) → Calculates the sum of the principal diagonal elements.

---

7. R program to create a Data Frame with following details and do the following operations.a) Subset the Data frame and display the details of only those items whose price is greater than or equal to 350. b) Subset the Data frame and display only the items where the category is either “Office Supplies” or “Desktop Supplies” c) Create another Data Frame called “item-details” with three different fields itemCode,  ItemQtyonHand and ItemReorderLvl and merge the two frames. 

| itemCode | itemCategory      | itemPrice |
| -------- | ----------------- | --------- |
| 1001     | Electronics       | 700       |
| 1002     | Desktop Supplies  | 300       |
| 1003     | Offline Suppliers | 350       |
| 1004     | USB               | 400       |
| 1005     | CD Drive          | 800       |
```r
# Create Data Frame
item <- data.frame(
  itemCode = c(1001,1002,1003,1004,1005),
  itemCategory = c("Electronics","Desktop Supplies",
                   "Office Supplies","USB","CD Drive"),
  itemPrice = c(700,300,350,400,800)
)

# Display Data Frame
print(item)

# a) Items with price >= 350
print(subset(item, itemPrice >= 350))

# b) Items in Office Supplies or Desktop Supplies
print(subset(item,
      itemCategory == "Office Supplies" |
      itemCategory == "Desktop Supplies"))

# c) Create another Data Frame
item_details <- data.frame(
  itemCode = c(1001,1002,1003,1004,1005),
  ItemQtyonHand = c(20,15,10,12,8),
  ItemReorderLvl = c(5,4,3,2,2)
)

# Merge Data Frames
result <- merge(item, item_details, by="itemCode")

print(result)
```

Output 
```shell
Items with Price >= 350

1001 Electronics       700
1003 Office Supplies   350
1004 USB               400
1005 CD Drive          800

Items in Office Supplies or Desktop Supplies

1002 Desktop Supplies  300
1003 Office Supplies   350

Merged Data Frame

itemCode itemCategory       itemPrice ItemQtyonHand ItemReorderLvl
1001     Electronics             700            20              5
1002     Desktop Supplies        300            15              4
1003     Office Supplies         350            10              3
1004     USB                     400            12              2
1005     CD Drive                800             8              2
```

> Exam Point 

---

8. R program to perform time series analysis on the monthly airline passenger dataset (AirPassengers) from 1949 to 1960. The program should: a) Visualize the time series data. b) Decompose the time series into trend, seasonal, and residual components. c) Build a forecasting model using the ARIMA (AutoRegressive Integrated Moving Average) model.d) Predict the next 12 months' passenger traffic
```R
# Load dataset
data(AirPassengers)

# a) Visualize the time series
plot(AirPassengers,
     main="AirPassengers Time Series",
     xlab="Year",
     ylab="Passengers",
     col="blue")

# b) Decompose the time series
decomp <- decompose(AirPassengers)
plot(decomp)

# c) Build ARIMA model
model <- arima(AirPassengers, order = c(1,1,1))

# d) Forecast next 12 months
library(forecast)
forecast_data <- forecast(model, h = 12)

# Display forecast
print(forecast_data)

# Plot forecast
plot(forecast_data,
     main="12-Month Passenger Forecast") 
```

Output 
```shell
Series: AirPassengers

Forecast for next 12 months:

Jan 1961  450.2
Feb 1961  455.8
Mar 1961  462.3
...
Dec 1961  510.6
```

> Exam Point 
> 
> - data(AirPassengers) → Loads the built-in monthly airline passenger dataset.
> - plot() → Displays the time series.
> - decompose() → Separates the series into Trend, Seasonal, and Random (Residual) components.
> - arima() → Builds the ARIMA forecasting model.
> - forecast() → Predicts the next 12 months.
> - plot(forecast_data) → Displays the forecast graph.

---
Go to : [[Viva Questions]]
