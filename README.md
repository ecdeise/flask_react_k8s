WORK IN PROGRESS

This is a sample flask, sqlalchemy, postgres, and react web application project and tutorial. It is not good code and isn't meant to be. The intent here to run through end-to-end the operations of how to get a simple flask API, database and react front end running on K8s in KIND. I'll walk you through the process as well as every headache and pain-point I experienced. By the end of this tutorial you'll have a containerized web application running in K8s on a KIND cluster. My goal is to save you some pain and I'll detail the those that I had as well as how I debugged and eventually resolved them. You will likely have your own miseries, but I'll do my best to make something that just works. I'll pick up moving this to AWS in a subsequent tutorial and may take on some CI/CD after that.

Step 1) Set up your development environment.
As the goal here is to get somewhat non-trivial application running on K8s, I'm not spending a great deal of time making a great developer experience. I chose VSCode, because I like it and it has a number of nice extensions available that make things a bit easier.

Step 2) Get a local instance of postgres up and running in docker to develop against locally.
Step 3) Pull down the code from git.
Step 4) flask run the api code - hit the /ping endpoint to confirm basic operations.
Step 5) set up you local postgres instance - make a database, make a table and maybe populate it with a record for fun.

Set up your K8s development and management environment
again, I like vscode for development. For cluster management some folks like K9s, some like minikube dashboard, rancher dashboard, and some Lens. Since we're using KIND in this project you'll want to see which if K9s or Lens is more appealing to you. I like Lens for no reason other than its what I'm familiar with. Kubectl at the terminal works just as well and its where I do all of my actual applies - I use lens just for convenience as it makes looking at logs less cumbersome. "De gustibus non est disputandum" so you should choose what you like.
