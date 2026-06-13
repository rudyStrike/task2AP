document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // TO-DO LIST LOGIC
    // ==========================================
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    // Array holding initial tasks
    let tasks = [
        { id: 1, text: 'Learn HTML & CSS Basics', completed: true },
        { id: 2, text: 'Master JavaScript DOM Manipulation', completed: false },
        { id: 3, text: 'Build Responsive Layouts', completed: false }
    ];

    // Function to render tasks dynamically to the DOM
    function renderTasks() {
        // Clear the current list
        taskList.innerHTML = '';
        
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = `task-item ${task.completed ? 'completed' : ''}`;
            
            // Task text element
            const span = document.createElement('span');
            span.textContent = task.text;
            span.title = "Click to toggle completion";
            
            // Toggle task completion on click
            span.addEventListener('click', () => toggleTask(task.id));

            // Delete button
            const delBtn = document.createElement('button');
            delBtn.textContent = 'Remove';
            delBtn.className = 'delete-btn';
            
            // Delete task on click
            delBtn.addEventListener('click', () => deleteTask(task.id));

            li.appendChild(span);
            li.appendChild(delBtn);
            taskList.appendChild(li);
        });
    }

    // Function to add a new task
    function addTask() {
        const text = taskInput.value.trim();
        if (text !== '') {
            const newTask = {
                id: Date.now(),
                text: text,
                completed: false
            };
            tasks.push(newTask);
            taskInput.value = ''; // Clear input
            renderTasks(); // Re-render UI
        }
    }

    // Function to toggle the completed status of a task
    function toggleTask(id) {
        tasks = tasks.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        );
        renderTasks();
    }

    // Function to delete a task
    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    // Event listeners for adding tasks
    addBtn.addEventListener('click', addTask);
    
    // Allow adding tasks with the Enter key
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTask();
        }
    });

    // Initial render
    renderTasks();

    // ==========================================
    // FORM VALIDATION LOGIC
    // ==========================================
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const formSuccess = document.getElementById('form-success');

    // Email validation using Regular Expression
    function validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    form.addEventListener('submit', (event) => {
        // Prevent default form submission to validate client-side first
        event.preventDefault(); 
        
        let isValid = true;

        // Reset previous error messages and styling
        nameError.textContent = '';
        emailError.textContent = '';
        formSuccess.classList.add('hidden');
        nameInput.style.borderColor = '';
        emailInput.style.borderColor = '';

        // Validate Name field (must not be empty)
        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            nameInput.style.borderColor = 'var(--error)';
            isValid = false;
        }

        // Validate Email field (must not be empty & must be valid format)
        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            emailInput.style.borderColor = 'var(--error)';
            isValid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            emailInput.style.borderColor = 'var(--error)';
            isValid = false;
        }

        // If all validations pass
        if (isValid) {
            // Show success message
            formSuccess.classList.remove('hidden');
            
            // Clear form fields
            form.reset(); 
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        }
    });
});
