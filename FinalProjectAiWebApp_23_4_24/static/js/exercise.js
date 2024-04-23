document.addEventListener('DOMContentLoaded', function() {
    const bodyPartsSelect = document.getElementById('body-parts');
    const fetchButton = document.getElementById('fetch-button');
    const exerciseAnimationsDiv = document.getElementById('exercise-animations');
  
    // Fetch body parts
    fetch('https://exercisedb.p.rapidapi.com/exercises/bodyPartList', {
      headers: {
        "X-RapidAPI-Key": "cdeed83ae0msha880435d2167737p114e9ajsn2a65d82299aa",
        "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then(data => {
      // Populate body parts dropdown
      data.forEach(part => {
        const option = document.createElement('option');
        option.value = part;
        option.textContent = part;
        bodyPartsSelect.appendChild(option);
      });
    })
    .catch(err => console.error(err));
  
    // Fetch exercise data and display animations
    fetchButton.addEventListener('click', function() {
      const selectedBodyPart = bodyPartsSelect.value;
      if (!selectedBodyPart) {
        alert("Please select a body part.");
        return;
      }
  
      fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${selectedBodyPart}`, {
        headers: {
          "X-RapidAPI-Key": "cdeed83ae0msha880435d2167737p114e9ajsn2a65d82299aa",
          "X-RapidAPI-Host": "exercisedb.p.rapidapi.com"
        }
      })
      .then(response => response.json())
      .then(data => {
        // Display exercise animations
        exerciseAnimationsDiv.innerHTML = ''; // Clear previous animations
        data.forEach(exercise => {
          const exerciseItem = document.createElement('div');
          exerciseItem.classList.add('exercise-item', 'animate__animated', 'animate__fadeInUp');
  
          const img = document.createElement('img');
          img.src = exercise.gifUrl;
          img.classList.add('exercise-gif');
  
          const exerciseType = document.createElement('h3');
          exerciseType.textContent = exercise.name;
  
          exerciseItem.appendChild(img);
          exerciseItem.appendChild(exerciseType);
          exerciseAnimationsDiv.appendChild(exerciseItem);
  
          // Add event listener for zooming
          img.addEventListener('click', zoomGif);
        });
      })
      .catch(err => console.error(err));
    });
  
    function zoomGif(event) {
      const gif = event.target;
      const zoomedGif = document.createElement('div');
      zoomedGif.classList.add('zoomed-gif');
  
      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.classList.add('close-btn');
      closeButton.addEventListener('click', () => {
        zoomedGif.remove();
      });
  
      const zoomedImg = document.createElement('img');
      zoomedImg.src = gif.src;
      zoomedImg.classList.add('zoomed-img');
  
      zoomedGif.appendChild(zoomedImg);
      zoomedGif.appendChild(closeButton);
      document.body.appendChild(zoomedGif);
    }
  });