const searchParams = new URLSearchParams(window.location.search);
const queryString = searchParams.get('flight');

const calcualteMonth = monthNumb => {
  let monthsName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return monthsName[monthNumb];
}

const constructPayloadWeight = (weightKg, weightLb) => {
  let payloadWeightKg = weightKg ? `${weightKg}kg` : null;
  let payloadWeightLb = weightLb ? `${weightLb}lbs` : null;

  if (payloadWeightKg && payloadWeightLb) {
    return `${payloadWeightKg} / ${payloadWeightLb}`;
  } else if (payloadWeightKg && !payloadWeightLb) {
    return payloadWeightKg;
  } else if (!payloadWeightKg && payloadWeightLb) {
    return payloadWeightLb;
  } else {
    return 'Unknown';
  }
}

const constructDetails = details => {
  if(details) {
    return `
    <div class="dp-md-content">
      <span class="dp-md-item-h">Details:</span>
    </div>
    <div class="dp-md-content">
      <span class="dp-md-item-h dp-md-i-details">${details}</span>
    </div>
    `;
  } else {
    return `
      <div class="dp-md-content">
        <span class="dp-md-item-h">Details:</span>
        <span class="dp-md-item">None</span>
      </div>
    `;
  }
}

const fetchLaunch = () => {
  fetch(`https://api.spacexdata.com/v3/launches/${queryString}`)
  .then(r => r.json())
  .then(launchData => {
    let launchDate = new Date(launchData.launch_date_utc);

    let month = calcualteMonth(launchDate.getMonth())
    let day = launchDate.getDate() < 10 ? `0${launchDate.getDate()}` : launchDate.getDate();
    let hours = launchDate.getHours() < 10 ? `0${launchDate.getHours()}` : launchDate.getHours();
    let minutes = launchDate.getMinutes() < 10 ? `0${launchDate.getMinutes()}` : launchDate.getMinutes();

    const missionDetailsDiv = document.querySelector('#dp-mission-details');

    let totalPLWeight = constructPayloadWeight(launchData.rocket.second_stage.payloads[0].payload_mass_kg, launchData.rocket.second_stage.payloads[0].payload_mass_lbs);

    let launchSiteNameLong = launchData.launch_site.site_name_long.split(' ');
    let firstHalfLSName = launchSiteNameLong.slice(0, 5);
    let secondHalfLSName = launchSiteNameLong.slice(5);

    missionDetailsDiv.innerHTML = `
      <h1>${launchData.mission_name}</h1>
      <div class="dp-md-wrap">
        <div class="dp-md-content">
          <span class="dp-md-item-h">Launch time:</span>
          <div class="dp-md-item-wrap">
            <span class="dp-md-item">${hours}:${minutes} - <span class="lt-day">${day}</span> / ${month} / ${launchDate.getFullYear()}</span>
            <span class="dp-md-is-time">Your local time</span>
          </div>
        </div>
        <div class="dp-md-content">
          <span class="dp-md-item-h">Launch site:</span>
          <div class="dp-md-item-wrap">
            <span class="dp-md-item">${launchData.launch_site.site_name}</span>
            <span class="dp-md-item-sub">${firstHalfLSName.join(' ')}</span>
            <span class="dp-md-item-sub">${secondHalfLSName.join(' ')}</span>
          </div>
        </div>
        <div class="dp-md-content">
          <span class="dp-md-item-h">Crew:</span>
          <span class="dp-md-item">${launchData.crew ? launchData.crew : 'None'}</span>
        </div>
        ${constructDetails(launchData.details)}
        <div class="dp-md-content">
          <span class="dp-md-item-h">Reddit:</span>
          <span class="dp-md-item">${launchData.links.reddit_launch ? `<a href="${launchData.links.reddit_launch}" target="_blank" class="dp-md-i-underline">Reddit Link</a>` : 'None'}</span>
        </div>
        <div class="dp-md-content">
          <span class="dp-md-item-h">Rocket name:</span>
          <span class="dp-md-item dp-md-i-accent">${launchData.rocket.rocket_name}</span>
        </div>
        <div class="dp-md-content">
          <span class="dp-md-item-h">Rocket type:</span>
          <span class="dp-md-item">${launchData.rocket.rocket_type}</span>
        </div>
        <div class="dp-md-content">
          <span class="dp-md-item-h">Payload:</span>
          <span class="dp-md-item">${launchData.rocket.second_stage.payloads[0].payload_type}</span>
        </div>
        <div class="dp-md-content">
          <span class="dp-md-item-h">Reused:</span>
          <span class="dp-md-item">${launchData.rocket.second_stage.payloads[0].reused ? 'Yes' : 'No'}</span>
        </div>
        <div class="dp-md-content">
          <span class="dp-md-item-h">Customer(s):</span>
          <span class="dp-md-item">${launchData.rocket.second_stage.payloads[0].customers.join(',')}</span>
        </div>
        <div class="dp-md-content">
          <span class="dp-md-item-h">Manufacturer:</span>
          <span class="dp-md-item">${launchData.rocket.second_stage.payloads[0].manufacturer}</span>
        </div>
        <div class="dp-md-content">
          <span class="dp-md-item-h">Nationality:</span>
          <span class="dp-md-item">${launchData.rocket.second_stage.payloads[0].nationality}</span>
        </div>
        <div class="dp-md-content">
          <span class="dp-md-item-h">Payload Mass:</span>
          <span class="dp-md-item">${totalPLWeight}</span>
        </div>
        <div class="dp-md-content">
          <span class="dp-md-item-h">Orbit:</span>
          <span class="dp-md-item">${launchData.rocket.second_stage.payloads[0].orbit}</span>
        </div>
      </div>
    `;
  })
  .catch(e => {
    console.log(e)
  })
}

const menuButton = () => {
  document.querySelector('.mn-button').addEventListener('click', function () {
    let getMenu = document.querySelector('.mn-wrap');
    getMenu.classList.toggle('mobile-menu');
    this.classList.toggle('open');
  })
}

menuButton();
fetchLaunch();