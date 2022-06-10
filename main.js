getJobs();

// const startButton = document.querySelector('.button').addEventListener('click', getJoke);

function getJobs() {
  
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'data.json', true);
  
  xhr.onload = function(e) {
    if(this.status == 200) {
        const jobs = JSON.parse(this.responseText);
        let output = '';
        jobs.forEach((job) => {
            console.log(job);
            output += `
            <div class="job featured">
                <img class="job_logo" src="${job.logo}">
                <div class="job_details">
                <div class="details">
                    <span class="company">${job.company}</span>
                    <span class="box light">New!</span>
                    <span class="box dark">Featured</span>
                </div>
                <div class="details"><h1 class="title">${job.position}</h1></div>
                <div class="details">
                    <span class="grey">${job.postedAt}</span><span class="grey">&#183;</span>
                    <span class="grey">${job.contract}</span><span class="grey">&#183;</span>
                    <span class="grey">${job.location}</span>
                </div>
                </div>
                <div class="job_categories">
                <div class="category">Frontend</div>
                <div class="category">Senior</div>
                <div class="category">HTML</div>
                <div class="category">CSS</div>
                <div class="category">JavaScript</div>
                </div>
            </div>
        `;
        });
        // document.querySelector('main').appendChild(output);
        document.querySelector('main').innerHTML = output;


        // const output = `<span id='joke'>${joke.value.joke}</span>`
        // document.querySelector('.box').innerHTML = output;
    }
  }

  xhr.send();
  
}