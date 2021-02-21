import { truncateMissionName } from './utils/truncateName';
import { getMonthName } from './utils/getMonthName';

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

interface SortTypes {
  launch_date_unix: string;
}

const fetchUpcomingLaunches = () => {
  fetch('https://api.spacexdata.com/v3/launches/upcoming')
    .then(r => r.json())
    .then(launchData => {
      let months: string[] = [];
      launchData.sort((a: SortTypes, b: SortTypes) => a.launch_date_unix > b.launch_date_unix ? 1 : -1);

      const getContentWrap = document.querySelector('#sc-top-content-wrap') as HTMLElement;

      launchData.forEach((mission: MissionData) => {
        let launchDate: Date = new Date(mission.launch_date_utc);
        let day: string | number = launchDate.getDate() < 10 ? `0${launchDate.getDate()}` : launchDate.getDate();
        let monthByName: string = getMonthName(launchDate.getMonth());
        let cleanMissionName: string = truncateMissionName(mission.mission_name);

        if (months.includes(monthByName)) {
          const getMonthDiv = document.querySelector(`#${monthByName}`) as HTMLElement;

          getMonthDiv.innerHTML += `
            <div class="sc-launch-day">
              <span class="sc-ld-date">${day}</span>
              <h3 class="sc-ld-name">${cleanMissionName}</h3>
              <span class="sc-ld-payload"><span>›</span>${mission.rocket.second_stage.payloads[0].payload_type}</span>
              <div class="sc-ld-readmore-wrap">
                <a href="./details.html?flight=${mission.flight_number}"  class="sc-ld-readmore">
                  <span class="sc-m-readmore-chevron">›››</span>
                  <span class="sc-m-readmore-txt">read more</span>
                </a>
              </div>
            </div>
          `;
        } else {
          months.push(monthByName);

          getContentWrap.innerHTML += `
            <section class="sc-launch-month-wrap" id="${monthByName}">
              <h2 class="sc-launch-month">${monthByName}</h2>
              <div class="sc-ld-wrap">
                <div class="sc-launch-day">
                  <span class="sc-ld-date">${day}</span>
                  <h3 class="sc-ld-name">${cleanMissionName}</h3>
                  <span class="sc-ld-payload"><span>›</span>${mission.rocket.second_stage.payloads[0].payload_type}</span>
                  <div class="sc-ld-readmore-wrap">
                    <a href="./details.html?flight=${mission.flight_number}" class="sc-ld-readmore">
                      <span class="sc-m-readmore-chevron">›››</span>
                      <span class="sc-m-readmore-txt">read more</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          `;

        }
      });

      fixTheWidth(months.length);
      const getLoadingElm = document.querySelector('.loading-icon') as HTMLDivElement;
      getLoadingElm.style.display = 'none';

    })
    .catch(e => {
      console.log(e)
    })
}

const fixTheWidth = (totalElm: number) => {
  const div = document.querySelector('#sc-top-content-wrap') as HTMLElement;
  let preNumb: number = Math.floor((window.innerWidth - 18) / 190);
  if (totalElm > preNumb) applyWidth(div, (preNumb * 190) + 'px');

  window.addEventListener('resize', () => {
    let numb: number = Math.floor(((0) - 18) / 190);
    if (totalElm >= numb) {
      applyWidth(div, (numb * 190) + 'px');
    }
  })
}

const applyWidth = (div: HTMLElement, width: string) => {
  div.style.width = width;
}

const menuButton = () => {
  const Button = document.querySelector(".mn-button") as HTMLButtonElement;
  Button.addEventListener("click", function () {
    let getMenu = document.querySelector(".mn-wrap") as HTMLElement;
    getMenu.classList.toggle("mobile-menu");
    this.classList.toggle("open");
  });
}

menuButton();
fetchUpcomingLaunches();
