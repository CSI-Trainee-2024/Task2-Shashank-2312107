document.getElementById('begin-btn').addEventListener('click', beginWorkout);

function beginWorkout() {
    const exerciseContainer = document.getElementById('exercise-container');
    exerciseContainer.innerHTML = ''; 
    
    const exercises = [
        { name: "Squats", duration: 2 },
        { name: "Jumping Jacks", duration: 2 },
        { name: "Push-Ups", duration: 2 }
    ];

    exercises.forEach(exercise => {
        const exerciseBox = document.createElement('div');
        exerciseBox.className = 'exercise-box';
        exerciseBox.innerHTML = `
            <span>${exercise.name}</span>
            <span class="timer" id="${exercise.name.toLowerCase()}-timer">2:00</span>
            <input type="checkbox" class="exercise-checkbox" onclick="startTimer('${exercise.name}', this)">
        `;
        exerciseContainer.appendChild(exerciseBox);
    });
    if (workoutPlan.length === 0) {
        alert('Please add exercises to the workout plan first.');
        return;
    }

    currentExerciseIndex = 0; 
    document.getElementById('begin-btn').disabled = true; 

    
    startNextExercise();

    document.getElementById('begin-btn').disabled = true; 
}

function startTimer(exerciseName, checkbox) {
    const timerDisplay = document.getElementById(`${exerciseName.toLowerCase()}-timer`);
    let timeInSeconds = 120;

    if (checkbox.checked) {
        const interval = setInterval(() => {
            timeInSeconds--;
            const minutes = Math.floor(timeInSeconds / 60);
            const seconds = timeInSeconds % 60;

            timerDisplay.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

            if (timeInSeconds <= 0 || !checkbox.checked) {
                clearInterval(interval);
                timerDisplay.innerText = 'Time is up!';
                if (checkbox.checked) {
                    checkbox.checked = false;
                }
            }
        }, 1000);
    }
}

function endWorkout() {
    const timers = document.querySelectorAll('.timer');
    timers.forEach(timer => timer.innerText = 'Workout ended.');
    document.getElementById('begin-btn').disabled = false; 
    
    const checkboxes = document.querySelectorAll('.exercise-checkbox');
    checkboxes.forEach(checkbox => checkbox.checked = false);
}