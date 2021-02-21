import { truncateMissionName } from './utils/truncateName';
import { getMonthName } from './utils/getMonthName';
import { cleanMissionDetails } from './utils/cleanMissionDetails';

interface MissionData {
  mission_name: string;
  details: string;
  rocket: {
    second_stage: {
      payloads: [{ payload_type: string }];
    };
  };
  flight_number: string;
  launch_date_utc: string;
}

const constructElement = (missionData: MissionData, launchDate: Date) => {
  let month: string = getMonthName(launchDate.getMonth())
  let day: string | number = launchDate.getDate() < 10 ? `0${launchDate.getDate()}` : launchDate.getDate();
  let hours: string | number = launchDate.getHours() < 10 ? `0${launchDate.getHours()}` : launchDate.getHours();
  let minutes: string | number = launchDate.getMinutes() < 10 ? `0${launchDate.getMinutes()}` : launchDate.getMinutes();

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
  .then((mission: MissionData) => {
    const nextMission = document.querySelector('#hp-tp-md-cont') as HTMLElement;
    let launchDate: Date = new Date(mission.launch_date_utc); //Local time for next launch
    let html: string = '';

    html += `
      <div id="hp-date-wrap">
        <span id="hp-date"><span class="pr-color">${launchDate.getDate()}</span> ${getMonthName(launchDate.getMonth())}</span>
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
    .then((missions: [MissionData]) => {
      const upcomingMissionsDiv = document.querySelector('.hp-upcoming-launches') as HTMLElement;
      let html: string = "";

      missions.forEach((mission: MissionData, index: Number) => {
        if (index <= 2) {
          let launchDate: Date = new Date(mission.launch_date_utc); //Local time for next launch
          html += constructElement(mission, launchDate);
        }
      });
      upcomingMissionsDiv.innerHTML = html;

    })
    .catch(e => {
      console.log('Error:', e)
    })
}

const menuButton = () => {
  const Button = document.querySelector(".mn-button") as HTMLButtonElement;
  Button.addEventListener('click', function() {
    let getMenu = document.querySelector(".mn-wrap") as HTMLElement;
    getMenu.classList.toggle('mobile-menu');
    this.classList.toggle('open');
  })
}

menuButton();
fetchUpcomingMissions();
fetchNextMission();