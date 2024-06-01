
let visitInfoPanel = document.getElementById('visit-wrapper');
visitInfoPanel.style.display = 'none';
// see if url is of type /visit_info.html?id=1
// if so, get the id and the function to get the visit info
let url = new URL(window.location.href);
let id = url.searchParams.get('id');
if(id) {
    console.log("id: ", id);
    console.log("value: ", id);

    fetch(`http://localhost:5000/api/visit?id=${id}`)
        .then(response => {
            console.log("response status: ", response.status);
            if(response.status === 401) {
                window.location.href = 'admin_login.html';
                throw new Error('Unauthorized');
            }
            // Check if the response body is empty
            if (!response.ok || response.status === 204) {
                throw new Error('No content');
            }
            return response.json();
        })
        .then(data => {
            console.log("received: ", data);
            let { visitorname, inmatename, visitoremail, visitorphone, visitdate, visitduration, natureofvisit, relationship, complete, starting_time, end_time, transcript } = data;
            
            let visitorNameElement = document.getElementById('visitorName');
            let inmateNameElement = document.getElementById('inmateName');
            // let visitorEmailElement = document.getElementById('visitorEmail');
            // let visitorPhoneElement = document.getElementById('visitorPhone');
            // let visitDateElement = document.getElementById('visitDate');
            let visitDurationElement = document.getElementById('visitDuration');
            let natureOfVisitElement = document.getElementById('natureOfVisit');
            // let relationshipElement = document.getElementById('relationship');
            let completeElement = document.getElementById('complete');
            let starting_timeElement = document.getElementById('starting_time');
            let end_timeElement = document.getElementById('end_time');
            let transcriptElement = document.getElementById('transcript');
            let idElement = document.getElementById('id');

            idElement.innerHTML = '#' + id;
            visitorNameElement.innerHTML = visitorname;
            inmateNameElement.innerHTML = inmatename;
            // visitorEmailElement.innerHTML = visitoremail;
            // visitorPhoneElement.innerHTML = visitorphone;
            // visitDateElement.innerHTML = visitdate;
            visitDurationElement.innerHTML = visitduration;
            natureOfVisitElement.innerHTML = natureofvisit;
            // relationshipElement.innerHTML = relationship;
            completeElement.innerHTML = complete;
            starting_timeElement.innerHTML = starting_time;
            end_timeElement.innerHTML = end_time;
            transcriptElement.innerHTML = transcript;

            visitInfoPanel.style.display = 'flex';
            
        })
        .catch(error => console.error('Error:', error));
}
document.getElementById('search-button').addEventListener('click', function() {
    var id = document.getElementById('inmate-input').value;
    console.log("value: ", id);

    fetch(`http://localhost:5000/api/visit?id=${id}`)
        .then(response => {
            console.log("response status: ", response.status);
            if(response.status === 401) {
                window.location.href = 'admin_login.html';
                throw new Error('Unauthorized');
            }
            // Check if the response body is empty
            if (!response.ok || response.status === 204) {
                throw new Error('No content');
            }
            return response.json();
        })
        .then(data => {
            console.log("received: ", data);
            let { visitorname, inmatename, visitoremail, visitorphone, visitdate, visitduration, natureofvisit, relationship, complete, starting_time, end_time, transcript } = data;
            
            let visitorNameElement = document.getElementById('visitorName');
            let inmateNameElement = document.getElementById('inmateName');
            // let visitorEmailElement = document.getElementById('visitorEmail');
            // let visitorPhoneElement = document.getElementById('visitorPhone');
            // let visitDateElement = document.getElementById('visitDate');
            let visitDurationElement = document.getElementById('visitDuration');
            let natureOfVisitElement = document.getElementById('natureOfVisit');
            // let relationshipElement = document.getElementById('relationship');
            let completeElement = document.getElementById('complete');
            let starting_timeElement = document.getElementById('starting_time');
            let end_timeElement = document.getElementById('end_time');
            let transcriptElement = document.getElementById('transcript');
            let idElement = document.getElementById('id');

            idElement.innerHTML = '#' + id;
            visitorNameElement.innerHTML = visitorname;
            inmateNameElement.innerHTML = inmatename;
            // visitorEmailElement.innerHTML = visitoremail;
            // visitorPhoneElement.innerHTML = visitorphone;
            // visitDateElement.innerHTML = visitdate;
            visitDurationElement.innerHTML = visitduration;
            natureOfVisitElement.innerHTML = natureofvisit;
            // relationshipElement.innerHTML = relationship;
            completeElement.innerHTML = complete;
            starting_timeElement.innerHTML = starting_time;
            end_timeElement.innerHTML = end_time;
            transcriptElement.innerHTML = transcript;

            visitInfoPanel.style.display = 'flex';
            
        })
        .catch(error => console.error('Error:', error));
});

// hide for now