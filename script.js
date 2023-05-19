function validateForm(event) {
    event.preventDefault(); // Prevents form submission

    // Retrieve input values
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    // Check if username and password are correct
    if (username === "admin" && password === "12345") {
      alert("Login successful!");
      window.location.href = "home.html"; 
      // Perform any additional actions or redirect to a new page here
    } else {
      var errorElement = document.createElement("p");
      errorElement.classList.add("error");
      errorElement.innerText = "Invalid username or password.";
      document.getElementById("loginForm").appendChild(errorElement);
    }
  }
    // Fetch tasks from API
    function fetchTasks() {
        return fetch('https://jsonplaceholder.typicode.com/todos')
          .then(response => response.json())
          .then(tasks => {
            return tasks.slice(0, 10); // Retrieve only the first 10 tasks for demonstration purposes
          });
      }
  
      // Load tasks
      function loadTasks() {
        fetchTasks()
          .then(tasks => {
            tasks.forEach(task => {
              addTaskToList(task.title, task.completed);
            });
            checkCompletedTasks(tasks);
          })
          .catch(error => {
            console.log('Error fetching tasks:', error);
          });
      }
  
      // Add task to list
      function addTaskToList(text, completed) {
        var taskList = document.getElementById("taskList");
  
        var listItem = document.createElement("li");
        var taskTextSpan = document.createElement("span");
        taskTextSpan.className = "todo-text";
        taskTextSpan.innerText = text;
        listItem.appendChild(taskTextSpan);
  
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = completed;
        checkbox.onchange = function() {
          listItem.classList.toggle("completed");
          checkCompletedTasks(getTasks());
        };
        listItem.appendChild(checkbox);
  
        taskList.appendChild(listItem);
  
        if (completed) {
          listItem.classList.add("completed");
        }
      }
  
      // Get all tasks
      function getTasks() {
        var taskItems = document.querySelectorAll("#taskList li");
        var tasks = Array.from(taskItems).map(taskItem => {
          var text = taskItem.querySelector(".todo-text").innerText;
          var completed = taskItem.classList.contains("completed");
          return { text, completed };
        });
        return tasks;
      }
  
      // Check completed tasks
      function checkCompletedTasks(tasks) {
        var completedTasks = tasks.filter(task => task.completed);
        if (completedTasks.length >= 5) {
          alert(`Congrats! ${completedTasks.length} tasks have been successfully completed.`);
        }
      }
  
      // Load tasks and check completed tasks
      loadTasks();