This is WebVisor:

It's purpose is to allow Advisors, and the Secretary (Mrs. Chris Stone at the time of writing this) to modify/delete/add: students/majors/programs/users/classes

The hardest part is getting a database. I can at least try to describe the difficult parts of the database for you. First, what we don't know (or at least me)
What are sequence numbers?
what is a checklist?
What are replacement classes?

Now some things we stumbled with but eventuall learned:
The journal table is a backlog of user changes. Only people with access to the actual database tables can look at this (whoever owns the server)
The notes table is for users to make notes for students. Users can see this
Majors are the name of the major and programs is the a major + year. Programs include a lot of data--like required classes, and electives for a program (ie Computer science 2021). Majors and classes are different because there is only one computer science major, but everytime a computer science requirement is changes, it becomes a new program. Therefore only one computer science major is needed, but multplie programs will be needed depending on what the school changes

Now, how can you see the old UI? The issue with the old UI is that it uses functions from PHP 5, (mysql_query and others--look within the _sql.php file). Hopefully we will also provide a version of the old PHP program which is partially working, but due to the code we were given (which was out of data relative to what the advisors are currently using), we could not make the whole program function again. Maybe you will! :data

We use an API that we made. Every AXIOS component call you see in react calls on some function within the API in the oldPHP within the model folder. Try looking at an axios call, look for the request page in the API folder, and then look for the request function--Hopefully you can ask your instructor if you can see our presentation where audibly explain this. 
Good luck

Contact info if you really need some questions or more explanation:

360 225 9079
564 219 2472
360 869 1108
360 843 0840