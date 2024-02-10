const videos = [
    { title: "Video Title 1", url: "https://www.youtube.com/embed/9eIIQoCoxFg" },
    { title: "Video Title 2", url: "https://www.youtube.com/embed/19X6KpjkC-c" },
    // Add the rest of your videos here
];

const teamMembers = [
    {
        name: "Member Name 1",
        email: "email1@example.com",
        phone: "123-456-7890",
        twitter: "https://twitter.com/member1",
        facebook: "https://facebook.com/member1",
        imageUrl: "path_to_profile_image_1.jpg"
    },
    {
        name: "Member Name 1",
        email: "email1@example.com",
        phone: "123-456-7890",
        twitter: "https://twitter.com/member1",
        facebook: "https://facebook.com/member1",
        imageUrl: "path_to_profile_image_1.jpg"
    },
    // Add other team members here
];

function createTeamMemberCard(member) {
    return `
        <div class="team-member mb-6">
            <img src="${member.imageUrl}" alt="Profile Image" class="rounded-full w-24 h-24 mx-auto mb-2">
            <h3 class="text-xl font-semibold">${member.name}</h3>
            <p>Email: <a href="mailto:${member.email}" class="text-blue-300">${member.email}</a></p>
            <p>Phone: ${member.phone}</p>
            <a href="${member.twitter}" class="text-blue-300">Twitter</a> | 
            <a href="${member.facebook}" class="text-blue-300">Facebook</a>
        </div>
    `;
}
function renderTeamMembers() {
    const teamMembersContainer = document.getElementById("teamMembers");
    teamMembersContainer.innerHTML = teamMembers.map(createTeamMemberCard).join('');
}

let currentVideoIndex = 0;
const videoPlayer = document.getElementById("videoPlayer");
const videoIndexDisplay = document.getElementById("videoIndex");
const nextButton = document.getElementById("nextButton");
const contactInfo = document.getElementById("contactInfo");
const startChallengeButton = document.getElementById("startChallengeButton");

function loadVideo(index) {
    if (index < videos.length) {
        videoPlayer.src = videos[index].url + "?enablejsapi=1";
        videoIndexDisplay.textContent = `Playing video ${index + 1} of ${videos.length}: ${videos[index].title}`;
        nextButton.textContent = "Next Video";
        nextButton.classList.add('hidden');
    } else {
        videoPlayer.style.display = "none";
        videoIndexDisplay.style.display = "none";
        nextButton.textContent = "Contact Us";
        nextButton.classList.remove('hidden');
    }
}


function onYouTubeIframeAPIReady() {
    new YT.Player('videoPlayer', {
        events: {
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        if (currentVideoIndex < videos.length - 1) {
            nextButton.textContent = "Next Video";
            nextButton.classList.remove('hidden');
        } else {
            // Change text to 'Show Credentials' only after the last video ends
            nextButton.textContent = "Show Credentials";
            nextButton.classList.remove('hidden');
        }
    }
}


nextButton.addEventListener('click', () => {
    if (currentVideoIndex < videos.length) {
        currentVideoIndex++;
        loadVideo(currentVideoIndex);
    } else {
        // Display the contact information and hide the video player and button
        videoPlayer.style.display = "none";
        nextButton.style.display = "none";
        contactInfo.classList.remove('hidden');
    }
});

contactButton.addEventListener('click', () => {
    videoPlayer.style.display = "none";
    nextButton.style.display = "none";
    videoIndexDisplay.style.display = "none";
    contactInfo.classList.remove('hidden');
});

startChallengeButton.addEventListener('click', () => {
    currentVideoIndex = 0;
    loadVideo(currentVideoIndex);
    videoPlayer.style.display = "block";
    nextButton.style.display = "none";
    contactInfo.classList.add('hidden');
});

loadVideo(currentVideoIndex);
renderTeamMembers();