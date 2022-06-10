getJobs();

// const startButton = document.querySelector('.button').addEventListener('click', getJoke);

function getJobs() {
  
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'data.json', true);
  
  xhr.onload = function(e) {
    if(this.status == 200) {
        const jobs = JSON.parse(this.responseText);
        let output = featJob = featBox = newBox = '';
        jobs.forEach((job) => {
            console.log(job);
            if(job.featured == true) {
                featJob = 'featured';
                featBox = '';
            } else { 
                featJob = '';
                featBox = 'none';
            }
            if(job.new == true) { newBox = ''; }
            else { newBox = 'none'; }
            output += `
            <div class="job ${featJob}">
                <img class="job_logo" src="${job.logo}">
                <div class="job_details">
                <div class="details">
                    <span class="company">${job.company}</span>
                    <span class="box light ${newBox}">New!</span>
                    <span class="box dark ${featBox}">Featured</span>
                </div>
                <div class="details"><h1 class="title">${job.position}</h1></div>
                <div class="details">
                    <span class="grey">${job.postedAt}</span><span class="grey">&#183;</span>
                    <span class="grey">${job.contract}</span><span class="grey">&#183;</span>
                    <span class="grey">${job.location}</span>
                </div>
                </div>
                <div class="job_categories">
                    <div class="category">${job.role}</div>
                    <div class="category">${job.level}</div>`;
                job.languages.forEach((lang) => {
                    output+= `<div class="category">${lang}</div>`;
                });
                job.tools.forEach((tool) => {
                    output+= `<div class="category">${tool}</div>`;
                });
                output += `</div>
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