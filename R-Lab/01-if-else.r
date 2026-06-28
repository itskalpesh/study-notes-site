my_vector <- c(5,1,5,2,3)
min <- max <- my_vector[1]
for (i in 2:length(my_vector))
{
  if(my_vector[i]>max)
  {
    max <- my_vector[i]
  }
  else if(my_vector[i]<min)
  {
    min <- my_vector[i]
  }
}
print(paste("min : ",min))
print(paste("max : ",max))