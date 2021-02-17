/* 
  get timezone??
    Alternatively, handle timezone (calculate and append correctly)


*/
const calcualteMonth = monthNumb => {
  let monthsName = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

  return monthsName[monthNumb];
}

const cleanMissionDetails = details => {
  if(details) {
    return details.slice(0, 60) + '...';
  } else {
    return 'None';
  }
}

const truncateMissionName = name => {
  name = name.split(' ');

  if (!!name[1] && name[1].length < 2) {
    if (!!parseInt(name[1])) {
      return `${name[0]} ${name[1]}`;
    } else {
      return name[0];
    }
  } else {
    return name[0];
  }
}

const constructElement = (missionData, launchDate) => {
  let month = calcualteMonth(launchDate.getMonth())
  let day = launchDate.getDate() < 10 ? `0${launchDate.getDate()}` : launchDate.getDate();
  let hours = launchDate.getHours() < 10 ? `0${launchDate.getHours()}` : launchDate.getHours();
  let minutes = launchDate.getMinutes() < 10 ? `0${launchDate.getMinutes()}` : launchDate.getMinutes();

  return `
    <div class="hp-misson-cont">
      <div class="hp-m-top">
        <div class="hp-mt-inner"></div>
        <div class="hp-mt-corner"></div>
      </div>
      <div class="hp-m-mid">
        
        <div>
          <h1>${truncateMissionName(missionData.mission_name)}</h1>
          <div class="hp-m-content-wrap">
            <div>
              <span class="hp-m-head">Details</span>
              <span class="hp-m-splitter"></span>
              <span class="hp-m-details">${cleanMissionDetails(missionData.details)}</span>
            </div>
            <div>
              <span class="hp-m-head">Payload</span>
              <span class="hp-m-splitter"></span>
              <span class="hp-m-payload">${missionData.rocket.second_stage.payloads[0].payload_type}</span>
            </div>

            <div>
              <span class="hp-m-head">Launch</span>
              <span class="hp-m-splitter"></span>
              <span class="hp-m-launch-time">${hours}:${minutes} - ${day} / ${month} / ${launchDate.getFullYear()}</span>
            </div>
          </div>
        </div>
        
      </div>
      <div class="hp-m-btm">
        <div class="hp-mb-corner"></div>
        <div class="hp-mb-inner">
          <div class="hp-m-readmore-wrap">
            <a href="./details.html?flight=${missionData.flight_number}" class="hp-m-readmore-link">
              <span class="hp-m-readmore-chevron">›››</span>
              <span class="hp-m-readmore-txt">read more</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  `;
}

const fetchNextMission = () => {
  fetch('https://api.spacexdata.com/v3/launches/next')
    .then(r => r.json())
    .then(mission => {
      const nextMissionDiv = document.querySelector('.hp-top-mission');
      const nextMissionDate = document.querySelector('#hp-date-wrap');
      const nextMission = document.querySelector('#hp-tp-md-cont');
      let launchDate = new Date(mission.launch_date_utc); //Local time for next launch
      let html = '';

      html += `
        <div id="hp-date-wrap">
          <span id="hp-date"><span class="pr-color">${launchDate.getDate()}</span> ${calcualteMonth(launchDate.getMonth())}</span>
          <span id="hp-year">${launchDate.getFullYear()}</span>
        </div>
      `;

      html += constructElement(mission, launchDate)
      nextMission.innerHTML = html;
      

    })
    .catch(e => {
      console.log(e)
    })
}

const fetchUpcomingMissions = () => {
  fetch('https://api.spacexdata.com/v3/launches/upcoming')
    .then(r => r.json())
    .then(missions => {
      const upcomingMissionsDiv = document.querySelector('.hp-upcoming-launches');
      let html = '';

      for (let i = 0; i < 3; i++) {
        let launchDate = new Date(missions[i + 1].launch_date_utc); //Local time for next launch
        html += constructElement(missions[i + 1], launchDate);
      }
      upcomingMissionsDiv.innerHTML = html;

    })
    .catch(e => {
      console.log(e)
    })
}

const menuButton = () => {
  document.querySelector('.mn-button').addEventListener('click', function() {
    let getMenu = document.querySelector('.mn-wrap');
    getMenu.classList.toggle('mobile-menu');
    this.classList.toggle('open');
  })
}

menuButton();
fetchUpcomingMissions();
fetchNextMission();