# R Viva Questions 

Back to [[R Programs]]

1. What is Data Analytics?
**Answer:**
Data Analytics is the process of collecting, organizing, analyzing, and interpreting data to obtain useful information for decision-making.

---

2. Why is Data Analytics important?
**Answer:**
It helps organizations identify patterns, make predictions, improve decision-making, and solve business problems.

---

3. What are the types of Data?
**Answer:**
- Structured Data
- Semi-Structured Data
- Unstructured Data

---

4. What is Structured Data?
**Answer:**
Data stored in rows and columns with a fixed format. Ex:  MySQL Database, Excel Table.

---

5. What is Semi-Structured Data?
**Answer:**
Data that does not follow a fixed table structure but has tags or keys.
**Example:** JSON, XML.

---

6. What is R?
**Answer:**
R is an open-source programming language used for statistical computing, data analysis, and visualization.

---

7. Why is R used in Data Analytics?
Answer: R is used because it provides powerful statistical functions, supports data visualization, handles large datasets, and has many built-in packages for data analysis.

---

8. What are the basic data types in R?
**Answer:**
- Numeric
- Integer
- Character
- Logical
- Complex

---

9. What is a Variable?
**Answer:**
A variable is a named memory location used to store data.

---

10. What is a Matrix?
**Answer:**
A matrix is a two-dimensional collection of elements of the same data type.

---

11. What is a List?
**Answer:**
A list is a collection of objects of different data types and sizes.

---

12. What is a Data Frame?
**Answer:**
A data frame is a two-dimensional table in which different columns can have different data types.

---

13. What is a User-defined Function?
**Answer:**
A function created by the programmer using the `function()` keyword.

---

14. What is a Built-in Function?
**Answer:**
A function already available in R.
Examples:
- mean()
- max()
- min()
- sum()

---

14. What is Mean?
**Answer:**
Arithmetic average of all values.

---

15. What is Median?
**Answer:**
Middle value of sorted data.

---

16.  What is Mode?
**Answer:**
The most frequently occurring value.

---

17. What is Variance?
**Answer:**
A measure of the spread of data from the mean.

---

18. What is Standard Deviation?
**Answer:**
The square root of variance.

---

19. What is T-Test?
**Answer:**
A statistical test used to compare the means of two groups.

Type of T-Test
- One Sample T-Test : It compares the sample mean with a known population mean.
- Independent (Two Sample) T-Test : It compares the means of two independent groups.
- Paired T-Test : It compares two related observations, such as marks before and after training.

---

20. What is ANOVA? ( Analysis of Variance )
**Answer:**
A statistical test used to compare the means of three or more groups. aov() performs ANOVA.

---

21. What is Regression?
**Answer:**
A statistical technique used to predict a dependent variable from one or more independent variables.

---

22. What is Linear Regression?
**Answer:**
Regression using one or more independent variables to predict a continuous value.

---

22. What is Logistic Regression?
**Answer:**
Regression used for classification problems such as Yes/No or Pass/Fail.

---

23. Difference between Linear and Logistic Regression?

| Predicts continuous -values | Predicts categories |
| --------------------------- | ------------------- |
| Linear Regression           | Logistic Regression |

---

24. What is Time Series?
**Answer:**
Data collected at regular time intervals.

---

25. What is ARIMA?
**Answer:**
AutoRegressive Integrated Moving Average model used for Time Series forecasting.

---
26. What is Data Cleaning?
**Answer:**
The process of removing errors, duplicates, and missing values from data.

---

27. What is Data Transformation?
**Answer:**
The process of converting data into a suitable format for analysis.

---

28. What is a Vector?
Answer: A vector is a one-dimensional collection of elements having the same data type.
Example
```R
x <- c(10,20,30,40)
```

---

29. What is a Logical Value?
Answer: A logical value is either TRUE or FALSE.

---
30. Difference between NULL and NA?
Answers:

| NA            | NULL         |
| ------------- | ------------ |
| Missing value | Empty object |

---
31. Difference between = and <- ?
Answer: Both assign values, but <- is the standard assignment operator in R.

---
32. Difference between print() and cat()?

| print()                     | cat()                 |
| --------------------------- | --------------------- |
| Prints object               | Prints formatted text |
| Shows quotes for characters | Does not show quotes  |

---
33. Why do we use loops?
Answer: Loops reduce code repetition and execute the same task multiple times automatically.

---
34. What is a for loop?
Answer: A for loop executes a block of code for each value in a sequence.

---
35. What does 1:5 mean?
Answer: It creates a sequence of numbers from 1 to 5.

---
36. What is the loop variable?
Answer: The variable that changes during each iteration of the loop.
Example:  `for(i in 1:10)`
Here i is the loop variable.

---
37. Difference between break and next?

| break                 | next                |
| --------------------- | ------------------- |
| Terminates the loop   | Skips one iteration |
| Loop stops completely | Loop continues      |

---
38. What is a while loop?
Answer: A while loop executes as long as the given condition remains TRUE.used when the number of iterations is unknown.

---
39. What is a repeat loop?
Answer: A repeat loop executes continuously until a break statement is encountered.Without break, the repeat loop becomes an infinite loop.
---
40. What is an Error?
Answer: An error is a problem that prevents the successful execution of a program.
Types of error 
- Syntax Error : An error caused by incorrect program syntax.
- Runtime Error : An error that occurs while the program is executing.
- Logical Error : The program executes successfully but produces incorrect results.

---
41. What is the purpose of stop()?
Answer: stop() displays an error message and immediately terminates the program.

---
42. What is Statistics?
Answer: Statistics is the science of collecting, organizing, analyzing, interpreting, and presenting data.

---
43. What is Hypothesis?
Answer: A hypothesis is an assumption or statement about a population that is tested using statistical methods.

---
44. What is Null Hypothesis (H₀)?
Answer: The Null Hypothesis (H₀) states that there is no significant difference between groups.
Example: The average marks of Class A and Class B are equal.

---
45. What is Alternative Hypothesis (H₁)?
Answer: The Alternative Hypothesis (H₁) states that there is a significant difference between groups.

---
46. Difference between T-Test and ANOVA?

| T-Test            | ANOVA                             |
| ----------------- | --------------------------------- |
| Compares 2 groups | Compares 3 or more groups         |
| Uses t-statistic  | Uses F-statistic                  |
| Simpler           | More suitable for multiple groups |

---
47. What is the F-value?
Answer: The F-value is the ratio of variance between groups to variance within groups.

---
48. What is the P-value?
Answer: The P-value indicates the probability that the observed result occurred by chance.

---
49. What does P < 0.05 mean?
Answer: It indicates that the result is statistically significant, so the null hypothesis is rejected.

---
50. What does P > 0.05 mean?
Answer: It indicates that there is no significant difference, so the null hypothesis is accepted (or more precisely, not rejected).

---
51. Why did we use both T-Test and ANOVA in one program?
Answer: To demonstrate the comparison of two groups using a T-Test and three or more groups using ANOVA in a single program.

---
52. What is descriptive analysis?
Answer: Descriptive analysis summarizes data using measures such as: Mean, Median, Mode, Variance, Standard Deviation.

---
53. What assumptions does ANOVA make?
Answer:
- Data is normally distributed.
- Groups are independent.
- Variances are approximately equal.

---
54. What assumptions does a T-Test make?
Answer:
Data follows a normal distribution.
Observations are independent.
Variance is similar between groups (for independent T-Test).

---
55. What is the Apply Family in R?
Answer: The Apply Family is a group of functions used to perform operations on data without using loops.
- apply() : used to perform operations on the rows or columns of a matrix or array.
- lapply() : applies a function to each element of a list and returns a list.
- sapply() : applies a function to each element of a list or vector and returns a simplified result ( return vector or matrix whenever possible).
- tapply() : applies a function to subsets of a vector grouped by a factor.
- mapply() :

---
56. What is a Factor?
Answer: A factor is a data type used to represent categorical data. It help R perform statistical analysis on categorical variables.
Examples : IT, HR, Sales

---
57. What is aggregation?
Answer: Aggregation means combining data into summary values such as mean, total, count, or maximum.

---
58. What is grouping?
Answer: Grouping means dividing data into categories before performing calculations.

---
59. What is String Manipulation?
Answer: String manipulation is the process of creating, modifying, searching, extracting, or combining strings.

---
60. What is a String in R?
Answer:A string is a sequence of characters enclosed in single (' ') or double (" ") quotes.
- paste() used to combine strings.
- paste0() joins strings without spaces.
---
61. What is Pattern Matching?
Answer: Pattern matching is the process of searching for specific text within a string.

---
62. What is File Handling?
Answer: File handling is the process of reading data from a file and writing data to a file.
- Most real-world datasets are stored in external files such as CSV, Excel, JSON, XML, and databases. R reads these files for analysis.
---
63. What is an External Data File?
Answer: An external data file is a file stored outside the R environment that contains data.
Examples : CSV, Excel, JSON, XML, Database

---
64. What is a CSV file?
Answer: CSV (Comma Separated Values) is a text file where data is stored in rows and columns separated by commas.

---
65. What does View() do?
Answer: It opens the dataset in a spreadsheet-like viewer.

---
66. What is a Dataset?
Answer: A dataset is a collection of related data arranged in rows and columns.

---
67. What is Importing Data?
Answer: Importing means reading data from an external file into R.

---
68. What is Exporting Data?
Answer: Exporting means saving data from R into an external file.

---
69. What is JSON?
Answer: JSON (JavaScript Object Notation) is a lightweight format used for storing and exchanging data.

---
70. What is XML?
Answer: XML (Extensible Markup Language) is used to store and transport structured data.

---
71. Why do we import data instead of typing it manually?
Answer: Importing is faster, more accurate, and suitable for large datasets.
---
72. What is Data Visualization?
Answer: Data Visualization is the graphical representation of data using charts and graphs to understand patterns, trends, and relationships.

---
73. Why is Data Visualization important?
Answer:
- Makes data easy to understand.
- Identifies trends and patterns.
- Helps compare values.
- Supports better decision-making.
- Makes reports attractive.

---
74. What is plot()?
Answer: plot() is the basic graphics function in R used to create different types of graphs.

---
75. What is a Scatter Plot?
Answer: A Scatter Plot displays the relationship between two numerical variables using points.

---
76. What is a Histogram?
Answer: A Histogram shows the frequency distribution of continuous numerical data.

---
77. What is a Line Chart?
Answer: A Line Chart displays changes or trends in data over time by connecting data points with lines.

---
78. What is a Pie Chart?
Answer: A Pie Chart shows how each category contributes to the whole using slices. Used When showing percentages or proportions of a whole.

---
79. What is an Outlier?
Answer: An outlier is a data value that is significantly different from the other observations.

---
80. Why is a Boxplot useful?
Answer: It helps identify:
- Median
- Spread of data
- Outliers

---
81. What is a Data Frame?
Answer: A Data Frame is a two-dimensional data structure in R that stores data in rows and columns. Each column can contain a different data type.used to store, organize, manipulate, and analyze tabular data efficiently.

---
82. What is a Dataset?
Answer: A dataset is a collection of related data stored in rows and columns.

---
83. What is Data Analysis?
Answer: Data Analysis is the process of examining data to discover useful information and support decision-making.

---
84. What is Data Manipulation?
Answer: Data Manipulation is the process of modifying, filtering, sorting, or transforming data for analysis.

---
85. What is Regression?
Answer:Regression is a statistical technique used to study the relationship between dependent and independent variables and to predict future values.

---
86. What is a Dependent Variable?
Answer: A dependent variable is the output or predicted variable. Example: Marks

---
87. What is Linear Regression?
Answer: Linear Regression is a statistical method used to predict the value of a dependent variable based on one or more independent variables.

---
88. What is Multiple Linear Regression?
Answer: Multiple Linear Regression predicts a dependent variable using two or more independent variables.

---
89. What is an Independent Variable?
Answer: An independent variable influences the dependent variable. Examples: Study Hours, Attendance.

---
90. What is a Regression Model?
Answer: A regression model is a mathematical equation that represents the relationship between variables.

---
91. What is Prediction?
Answer: Prediction means estimating future or unknown values using an existing model.

---
92. What is Model Training?
Answer: Model training is the process of creating a model using existing data.

---
93. What is New Data?
Answer: New data refers to unseen data used for prediction.

---
94. What is R-squared?
Answer: R-squared indicates how well the regression model explains the variation in the dependent variable. The range of R-squared 0-1

---
95. What is a Residual?
Answer: A residual is the difference between the actual value and the predicted value.

---
96. What is Correlation?
Answer: Correlation measures the strength and direction of the relationship between two variables.

---
97. What is a Matrix?
**Answer:**
A matrix is a two-dimensional data structure that stores elements of the **same data type** arranged in rows and columns.

---
98. What is Forecasting?
**Answer:**
Forecasting is the process of predicting future values based on historical data.

---
99. What is Trend?
**Answer:**
Trend is the long-term increase or decrease in data over time.

---

100. What is Seasonality?
**Answer:**
Seasonality refers to patterns that repeat at regular intervals, such as every month or every year.

---

101.  What is the Residual (Random Component)?
**Answer:**
Residuals are the random variations remaining after removing the trend and seasonal components.

---
102. What is ARIMA?
**Answer:**
ARIMA stands for **AutoRegressive Integrated Moving Average**. It is a statistical model used for Time Series forecasting.

---
103. What is a Record?
**Answer:**
A record is a single row in a data frame.

---
 104. What is a Field?
**Answer:**
A field is a column in a data frame.

---
105. What is Inventory Management?
**Answer:**
Inventory Management is the process of tracking and controlling stock levels.

---
106. What is Reorder Level?
**Answer:**
Reorder Level is the minimum stock quantity at which new items should be ordered.

---
107. Why is a Data Frame preferred over a Matrix?
**Answer:**
Because a Data Frame allows different data types in different columns, making it suitable for real-world datasets.

---
108. What is Data Integration?
**Answer:**
Data Integration is the process of combining data from different sources into a single dataset.

---
109. What is a Primary Key?
**Answer:**
A Primary Key is a column whose values uniquely identify each record.

---
110. What is Data Filtering?
**Answer:**
Data filtering means selecting only those records that satisfy a specified condition.

---
111. What is the transpose of a matrix?
**Answer:**
The transpose of a matrix is obtained by interchanging its rows and columns.

---
Back to [[R Programs]]