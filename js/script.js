{
    let tasks = [];
    let hideDoneTask = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent },
        ];

        render();
    };

    const removeTask = (Textindex) => {
        tasks = [
            ...tasks.slice(0, Textindex),
            ...tasks.slice(Textindex + 1),
        ];
        render();
    };



    const toggleTaskDone = (taskIndex) => {
        const task = tasks[taskIndex];

        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...task,
                done: !task.done
            },
            ...tasks.slice(taskIndex + 1),
        ];
        render();
    };

    const toggleHideDoneTask = () => {
        hideDoneTask = !hideDoneTask;
        render();
    };

    const finishAllTasks = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }))
        render();

    };

    const bindRemoveEvent = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvent = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(taskIndex);
            });
        });
    };


    const bindHideTasksEvent = () => {
        const buttonHideDoneTasks = document.querySelector(".js-buttonHideDoneTasks");

        if (!buttonHideDoneTasks) return;

        buttonHideDoneTasks.addEventListener("click", () => {
            toggleHideDoneTask();
        });
    };

    const bindFinishTasksEvent = () => {
        const buttonFinishAllTasks = document.querySelector(".js-buttonFinishAllTasks");

        if (!buttonFinishAllTasks) return;

        buttonFinishAllTasks.addEventListener("click", () => {
            finishAllTasks();
        });
    };

    const renderTasks = () => {
        const tasksTransformToHTML = tasks
            .map(task => `
             <li class="list__item${task.done && hideDoneTask ? " list__item--hide" : ""}">
               <button class="list__button list__button--done js-done">
                  ${task.done ? "&#10004;" : ""}
               </button>
               <span class="list__paragraph${task.done ? " list__paragraph--done" : ""}">
                  ${task.content}
               </span>
               <button class="list__button list__button--remove js-remove">
                  &#128465;
               </button>
             </li>
             `)
            .join("");

        document.querySelector(".js-tasks").innerHTML = tasksTransformToHTML;
    };

    const renderButtons = () => {
        let sectionButtons = "";

        if (tasks.length) {
            sectionButtons = `
              <button class="section__button js-buttonHideDoneTasks">
                ${hideDoneTask ? "Pokaż" : "Ukryj"} ukończone </button>
              <button class="section__button js-buttonFinishAllTasks"
                ${tasks.every((task => task.done)) ? "disabled" : ""}> Ukończ wszystkie </button>
            `;
        };
        document.querySelector(".js-sectionButton").innerHTML = sectionButtons;
    };


    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvent();
        bindToggleDoneEvent();
        bindHideTasksEvent();
        bindFinishTasksEvent();
    };

    const textResetAndFocus = (newTask) => {
        newTask.value = "";
        newTask.focus();
    };

    const sanitizationOfUserText = (text) => text.replace(/</g, '&lt;');

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTask");

        newTask.value = sanitizationOfUserText(newTask.value.trim());

        if (newTask.value === "") return textResetAndFocus(newTask)


        addNewTask(newTask.value);
        textResetAndFocus(newTask);

        render();
    }


    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };
    init();
}

