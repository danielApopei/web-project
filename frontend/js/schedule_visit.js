// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA4OVl7Gp2g7HalPX9u9KHpBG5LfAHI0lk",
  authDomain: "web-project-116cd.firebaseapp.com",
  projectId: "web-project-116cd",
  storageBucket: "web-project-116cd.appspot.com",
  messagingSenderId: "150645012659",
  appId: "1:150645012659:web:c4f6b5fd0f8cf8fb8cd8c6",
  measurementId: "G-492CGRK2VV"
};
  
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

const form = document.getElementById('visitForm');

function uploadImage(imageRef, imageFile) {
    console.log("ref: ", imageRef);
    console.log("file: ", imageFile);
    return new Promise((resolve, reject) => {
        const uploadTask = imageRef.put(imageFile);

        uploadTask.on('state_changed', function(snapshot){
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
        }, function(error) {
            reject(error);
        }, function() {
            console.log('Upload completed successfully');
            resolve();
        });
    });
}


let highestId = 0; // Global variable to store the highest ID
console.log("trying to fetch highest id");
// Fetch the highest ID at the start of the script
fetch('http://localhost:5000/high')
.then(response => response.json())
.then(data => {
    var id = data.max;
    highestId = id + 1;

    console.log('highestId: ', highestId);
    // Move the code that depends on highestId here
    form.addEventListener('submit', function(event) {
        event.preventDefault();

    
        let visitorName = document.getElementById('visitorName').value;
        let inmateName = document.getElementById('inmateName').value;
        let visitorEmail = document.getElementById('visitorEmail').value;
        let visitorPhone = document.getElementById('visitorPhone').value;
        let visitDate = document.getElementById('visitDate').value;
        let visitDuration = document.getElementById('visitDuration').value;
        let natureOfVisit = document.getElementById('natureOfVisit').value;
        let relationship = document.getElementById('relationship').value;
    
    
        let visitData = {
            visitorName: visitorName,
            inmateName: inmateName,
            visitorEmail: visitorEmail,
            visitorPhone: visitorPhone,
            visitDate: visitDate,
            visitDuration: visitDuration,
            natureOfVisit: natureOfVisit,
            relationship: relationship,
            complete: "Pending",
            starting_time: null,
            end_time: null,
            transcript: ""
        };
    
        fetch('http://localhost:5000/api/visits', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(visitData)
        }).then(response => response.json())
        .then(data => {
            console.log(data);
    
    
    
            // Get a reference to the storage service, which is used to create references in your storage bucket
            var storage = firebase.storage();
    
            // Create a storage reference from our storage service
            var storageRef = storage.ref();
    
            // Get the file from the input
            var visitorImage = document.getElementById('visitorImage').files[0];
            var inmateImage = document.getElementById('inmateImage').files[0];
    
            // Get the visitor and inmate names
            var visitorName = document.getElementById('visitorName').value;
            var inmateName = document.getElementById('inmateName').value;
    
            // Create a timestamp
            var timestamp = new Date().getTime();
    
    
            // Create a reference to the file we want to upload
            var visitorImageRef = storageRef.child('visits/' + highestId + '_visitorImage');
            var inmateImageRef = storageRef.child('visits/' + highestId + '_inmateImage');
            console.log('highestId: ', highestId);
    
            // Upload the file to the path 'images/visitorImage'
            Promise.all([
                uploadImage(visitorImageRef, visitorImage),
                uploadImage(inmateImageRef, inmateImage)
            ]).then(() => {
                alert('Visit scheduled successfully!');
                // window.location.href = "http://localhost:5501/index.html";
            }).catch(error => console.log('Error: ', error));
    
            // window.location.href = "http://localhost:5501/index.html";
        })
        .catch(error => console.log('Error: ', error)
        )
    
    
        console.log('Form submitted');
    });
    
})
.catch(error => console.log('Error: ', error));



