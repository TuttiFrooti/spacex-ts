
const getMonthName = monthNumb => {
  let monthsName = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];

  return monthsName[monthNumb];
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

const fetchUpcomingLaunches = () => {
  fetch('https://api.spacexdata.com/v3/launches/upcoming')
    .then(r => r.json())
    .then(launchData => {
      let months = [];
      launchData.sort((a, b) => (a.launch_date_unix > b.launch_date_unix) ? 1 : -1);

      const getContentWrap = document.querySelector('#sc-top-content-wrap');

      launchData.forEach(mission => {
        let launchDate = new Date(mission.launch_date_utc);
        let day = launchDate.getDate() < 10 ? `0${launchDate.getDate()}` : launchDate.getDate();
        let monthByName = getMonthName(launchDate.getMonth());
        let cleanMissionName = truncateMissionName(mission.mission_name);

        if (months.includes(monthByName)) {
          const getMonthDiv = document.querySelector(`#${monthByName}`);

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
      const getLoadingElm = document.querySelector('.loading-icon');
      getLoadingElm.style.display = 'none';

    })
    .catch(e => {
      console.log(e)
    })
}

const fixTheWidth = totalElm => {
  const div = document.querySelector('#sc-top-content-wrap');
  let preNumb = Math.floor((window.innerWidth - 18) / 190);
  if (totalElm > preNumb) applyWidth(div, (preNumb * 190) + 'px');

  window.addEventListener('resize', () => {
    let numb = Math.floor((this.innerWidth - 18) / 190);
    if (totalElm >= numb) {
      applyWidth(div, (numb * 190) + 'px');
    }
  })
}

const applyWidth = (div, width) => {
  div.style.width = width;
}

const menuButton = () => {
  document.querySelector('.mn-button').addEventListener('click', function() {
    let getMenu = document.querySelector('.mn-wrap');
    getMenu.classList.toggle('mobile-menu');
    this.classList.toggle('open');
  })
}

menuButton();
fetchUpcomingLaunches();
