# countIslands( Angular6 , nodejs , mongoDB) 
youtube example : https://youtu.be/8M5iEnw1qTo 
# use Notepad++ to see orderly content 
This Project Displays a Matrix that contains water and islands and will counts the islands in real time .

*****Algorthim***** 
we have two options to count the islands:
1) Normal Matrix : we count the cell neighbors .
2) Wrold Matrix  : we count the cell neighbors also neighbors in another side . 

****example:*****
 @=island , &=water 
 
@ , @ , & , & , @ 
& , & , & , @ , @
& , @ , & , & , @
num of island in Normal Matrix = 3  (desc island1=[(0,0),(0,1)], island2=[(2,1)] , island3=[(0,4),(1,3),(1,4),(2,4)]
num of island in World  Matrix = 1  ( because (0,0)is neighbor with (0,4)and(1,4) also (2,1) is neighbor with (0,0)and(0,1)

*****styles****
Angular Material 
Bootstrap 

Steps to run the project :
******MondoDb******
 1) Download mongoDB .
 2) optional : install "Robo 3t" .
 3)create a new direct connection (Name : Island , address: localhost, port: 27017)
 4) crete issues Database then create a new issues collection. 
 5) under c:// create a new folder data/db .
 6)in terminal go to C:\Program Files\MongoDB\Server\4.0\bin and run the "mongod" command .
 
 ******backEnd*****
 1)npm install (backend directory contains a node_modules ).
 2)npm run dev (starts server.js).
 
 *****frontEnd*****
 1)npm install (frontend directory contains a node_modules ).
 2)ng serve (starts the gui).
