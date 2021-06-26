document.querySelector(".button-container")
.addEventListener("click", () => {
    let text = document.getElementById("filter-jobs").value;
    getJobs().then(jobs => {
        let filteredJobs = filterJobs(jobs, text);
        showJobs(filteredJobs)
        console.log(filteredJobs);
    })
});


function getJobs() {
    return fetch("data.json")
    .then(response => response.json())
    .then(data => {
        console.log(data);
        return data;
    })
}

function filterJobs (jobs, searchText) {
    if (searchText){
        let filterJobs = jobs.filter(job => {
            if (job.roleName.toLowerCase().includes(searchText) || job.type.toLowerCase().includes(searchText) || job.company.toLowerCase().includes(searchText) || job.requirements.content.toLowerCase().includes(searchText)){
                return true;
            } else {
                return false;
            }
        })

        return filterJobs;
    } else {
        return jobs;
    }
}

function showJobs (jobs) {
    let jobsContainer = document.querySelector(".jobs-container");
    let jobsHTML = "";
    jobs.forEach((job) => {
        jobsHTML += `
        <div class="job-tile">
                <div class="top">
                    <img src="${job.logo}" />
                    <span class="material-icons more_horiz">more_horiz</span>
                </div>
                <div class="rolename">
                    <span>${job.roleName}</span>
                </div>
                <div class="description">${job.requirements.content}</span>
                </div>
                <div class="buttons">
                    <div class="button apply-now">
                        Apply Now
                    </div>
                    <div class="button">
                        Message
                    </div>
                </div>                
            </div>
        `

        jobsContainer.innerHTML = jobsHTML;

    })
}

getJobs().then(data => {
    showJobs(data);
});
