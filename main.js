const xhr = new XMLHttpRequest();
xhr.open('GET', 'data.json', true);

getJobs(xhr);

// Get jobs from array and show them in the web page
function getJobs(a) {
  a.onload = function(e) {
    if(this.status == 200) {
        const jobs = JSON.parse(this.responseText);
        let output = featJob = featBox = newBox = '';
        document.querySelector('main').innerHTML = '';
        jobs.forEach((job) => {
            // console.log(job);
            if(job.featured == true) {
                featJob = 'featured';
                featBox = '';
            } else { 
                featJob = '';
                featBox = 'hidden';
            }
            if(job.new == true) { newBox = ''; }
            else { newBox = 'hidden'; }
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
                    <div class="category" id="role">${job.role}</div>
                    <div class="category" id="level">${job.level}</div>`;
                job.languages.forEach((lang) => {
                    output+= `<div class="category" id="languages">${lang}</div>`;
                });
                job.tools.forEach((tool) => {
                    output+= `<div class="category" id="tools">${tool}</div>`;
                });
                output += `</div>
            </div>
            `;
        });
        // document.querySelector('main').appendChild(output);
        document.querySelector('main').innerHTML += output;


        // const output = `<span id='joke'>${joke.value.joke}</span>`
        // document.querySelector('.box').innerHTML = output;
    }
  }

  a.send();
  
};

// Filter jobs by categories that are selected

document.querySelector('main').addEventListener('click', selectCategory);
const filterBar = document.querySelector('.filter_section');
const filterCat = document.querySelector('.filter_categories');
let arrayCategories = [];

// Add category to filter bar

function selectCategory(e) {
    if(e.target.classList.contains('category')) {

        // If filter section empty, show filter bar and add category
        if(filterCat.hasChildNodes() == false) {
            filterBar.className = 'filter_section';
            const newCat = document.createElement('div');
            newCat.className = 'filtercategory';
            newCat.id = e.target.id;
            newCat.innerHTML = `<span>${e.target.innerHTML}</span><img class="filter_button" src="./images/icon-remove.svg">`;
            filterCat.appendChild(newCat); 
            arrayCategories.push(e.target.id);
        }

        // If not empty, check if selected category in already in the filter bar
        else {
            if(filterCat.innerHTML.indexOf(e.target.innerHTML) == -1) {
                const newCat = document.createElement('div');
                newCat.className = 'filtercategory';
                newCat.id = e.target.id;
                newCat.innerHTML = `<span>${e.target.innerHTML}</span><img class="filter_button" src="./images/icon-remove.svg">`;
                filterCat.appendChild(newCat);
                arrayCategories.push(e.target.id);
            }
        }
        console.log(arrayCategories);
        const archive = JSON.parse(xhr.responseText);
        console.log(archive);
        getFilteredJobs();
    }
}

function getFilteredJobs(a) {
    const filteredJobs = JSON.parse(xhr.responseText);

    // Check which categories are currently selected
    const filterCat = document.querySelector('.filter_categories');
    let list = filteredJobs.filter(function(a) {
        if(filterCat.innerHTML.indexOf(a.role) > 1 || filterCat.innerHTML.indexOf(a.level) > 1) {
          return true;
        }
    })
    console.log(list);
    // list = list.languages.filter(function(a) {
    
    //     if(filterCat.innerHTML.indexOf(a.languages) > 1) {
    //       return true;
    //     }
    // })
    // console.log(list);

}

// Check which categories are currently selected
// Use filter method on xhr array to show jobs in selected categories
// Use sort method to sort by job date
// run getJobs()

// Clear button

// Remove category