// Sample featured jobs
const jobs = [{
        id: 1,
        title: "Frontend Developer",
        company: "CodeSoft",
        location: "Remote"
    },
    {
        id: 2,
        title: "Backend Developer",
        company: "OctoTech",
        location: "Bangalore"
    },
];

// Populate Featured Jobs
const featuredJobs = document.getElementById("featured-jobs");
jobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.innerHTML = `<h3>${job.title}</h3><p>${job.company} - ${job.location}</p>`;
    featuredJobs.appendChild(jobCard);
});

// Populate Job Listings
const jobContainer = document.getElementById("job-container");
jobs.forEach(job => {
    const jobItem = document.createElement("div");
    jobItem.innerHTML = `<strong>${job.title}</strong> at ${job.company} (${job.location})`;
    jobContainer.appendChild(jobItem);
});

// Job Application Process
document.getElementById("post-job").addEventListener("click", () => {
    alert("Job posted!");
});

// Resume upload validation
document.getElementById("resume-upload").addEventListener("change", event => {
    if (event.target.files.length === 0) {
        alert("Please upload your resume.");
    }
});

// Filter and Search Logic
const searchBar = document.getElementById("search-bar");
const filterLocation = document.getElementById("filter-location");
const searchBtn = document.getElementById("search-btn");

function displayJobs(jobs) {
    jobContainer.innerHTML = ""; // Clear current jobs
    if (jobs.length === 0) {
        jobContainer.innerHTML = "<p>No jobs found</p>";
        return;
    }
    jobs.forEach(job => {
        const jobItem = document.createElement("div");
        jobItem.innerHTML = `<strong>${job.title}</strong> at ${job.company} (${job.location})`;
        jobContainer.appendChild(jobItem);
    });
}

// Search button functionality
searchBtn.addEventListener("click", () => {
    const query = searchBar.value.toLowerCase();
    const location = filterLocation.value;

    const filteredJobs = jobs.filter(job => {
        const matchesTitle = job.title.toLowerCase().includes(query);
        const matchesLocation = location === "" || job.location === location;
        return matchesTitle && matchesLocation;
    });

    displayJobs(filteredJobs);
});

// Initial display of jobs
displayJobs(jobs);

const savedContainer = document.getElementById("saved-container");
let savedJobs = [];

// Add Save Button to Each Job
function displayJobsWithSave(jobs) {
    jobContainer.innerHTML = ""; // Clear current jobs
    if (jobs.length === 0) {
        jobContainer.innerHTML = "<p>No jobs found</p>";
        return;
    }
    jobs.forEach(job => {
        const jobItem = document.createElement("div");
        jobItem.innerHTML = `
      <strong>${job.title}</strong> at ${job.company} (${job.location})
      <button class="save-btn" data-id="${job.id}">Save</button>
    `;
        jobContainer.appendChild(jobItem);
    });

    // Attach Event Listeners to Save Buttons
    const saveButtons = document.querySelectorAll(".save-btn");
    saveButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            const jobId = e.target.getAttribute("data-id");
            const jobToSave = jobs.find(job => job.id == jobId);
            saveJob(jobToSave);
        });
    });
}

// Save Job to Favorites
function saveJob(job) {
    if (!savedJobs.some(savedJob => savedJob.id === job.id)) {
        savedJobs.push(job);
        updateSavedJobs();
    } else {
        alert("Job already saved!");
    }
}

// Update Saved Jobs Section
function updateSavedJobs() {
    savedContainer.innerHTML = ""; // Clear saved jobs
    savedJobs.forEach(job => {
        const savedJobItem = document.createElement("div");
        savedJobItem.innerHTML = `<strong>${job.title}</strong> at ${job.company} (${job.location})`;
        savedContainer.appendChild(savedJobItem);
    });
}

// Initial display of jobs with Save functionality
displayJobsWithSave(jobs);
