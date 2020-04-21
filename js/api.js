// var base_url = "http://api.football-data.org/v2/competitions/2019/";

 // xhr.setRequestHeader("auth-key", "value"); 

 var base_url = 'https://api.football-data.org/v2/';

//  var fetchApi = base_url => {
//   return fetch(base_url, {
//     headers: {
//       'X-Auth-Token': "2e757173d9c24a2689902c37e49daef3"
//     }
//   });
// }

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  console.log('hai');
  console.log(Promise.resolve(response));

  // return Promise.resolve(response);
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
  console.log(response.json());
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error ini : " + error);  
}

// Blok kode untuk melakukan request data json
function getstandings() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2019/standings?standingType=TOTAL", {
      headers: {
        'X-Auth-Token': "2e757173d9c24a2689902c37e49daef3"
      }
    }).then(function(response) {
    if (response) {
        response.json().then(function(data) {

      // console.log();
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var standingsHTML = "";
      data.standings[0].table.forEach(funStandings);
      function funStandings(standing){
        standingsHTML += `
        <tr>
          <td>${standing.position}</td>
          <td><img src="${standing.team.crestUrl}" width="40px" /></td>
          <td>    
            <a href="./club.html?id=${standing.team.id}" style="text-decoration: none;" >
            ${standing.team.name}
            </a>
          </td>
          <td>${standing.playedGames}</td>
          <td>${standing.won}</td>
          <td>${standing.draw}</td>
          <td>${standing.lost}</td>
          <td>${standing.points}</td>
          <td>${standing.goalsFor}</td>
          <td>${standing.goalsAgainst}</td>
          <td>${standing.goalDifference}</td>
        </tr>
        `;
      }

          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("standings").innerHTML = standingsHTML;
        });
      }
    });
  }


  fetch(base_url + "competitions/2019/standings?standingType=TOTAL", {
    headers: {
      'X-Auth-Token': "2e757173d9c24a2689902c37e49daef3"
    }
  })
  .then(status)
  .then(json)
  .then(function(data) {
    console.log('sukses fetch');
    // console.log(data.standings[0].table[12].team.name, "Poor :'(" );

      // console.log();
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var standingsHTML = "";
      data.standings[0].table.forEach(funStandings);
      function funStandings(standing){
        // console.log(standing.team.name);
          standingsHTML += `
             <tr>
                <td>${standing.position}</td>
                <td><img src="${standing.team.crestUrl}" width="40px" /></td>
                <td>    
                  <a href="./club.html?id=${standing.team.id}" style="text-decoration: none;" >
                  ${standing.team.name}
                  </a>
                </td>
                <td>${standing.playedGames}</td>
                <td>${standing.won}</td>
                <td>${standing.draw}</td>
                <td>${standing.lost}</td>
                <td>${standing.points}</td>
                <td>${standing.goalsFor}</td>
                <td>${standing.goalsAgainst}</td>
                <td>${standing.goalDifference}</td>
             </tr>
        `;
      }
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("standings").innerHTML = standingsHTML;
    })
  .catch(error);
}

// https://api.football-data.org/v2/teams/98/matches?status=SCHEDULED
// https://api.football-data.org/v2/teams/98
function getClubId() {
  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  if ("caches" in window) {
    caches.match(base_url + "teams/" + idParam , {
      headers: {
        'X-Auth-Token': "2e757173d9c24a2689902c37e49daef3"
      }
    }
    ).then(function(response) {
      if (response) {
        response.json().then(function(data) {
          var squadsHTML = "";
          data.squad.forEach(squad);
          function squad(squad, i){
            console.log(squad.name);
              squadsHTML += `
              <tr>
                <td class="center">${i}</td>
                <td class="center">${squad.name}</td>
                <td class="center">${squad.position}</td>
                <td class="center">${squad.shirtNumber}</td>                 
              </tr>
            `;
          }
          // Sisipkan komponen card ke dalam elemen dengan id #content
          // console.log(squadsHTML);
          document.getElementById("player").innerHTML = squadsHTML;
    

          var clubHTML = `
          <div class="card">
          <div class="">
          <img src="${data.crestUrl}" width="150px" />
          </div>
          <div class="card-content">
          <span class="card-title">${data.name}</span>
          <span class="card-body">${data.founded} - ${data.clubColors} - ${data.venue}</span>
          <br>
          <span class="card-body">
          
          <input type="hidden" id="clubId" value="${data.id}" >
          <input type="hidden" id="clubName" value="${data.name}" >
          <input type="hidden" id="clubVenue" value="${data.venue}" >
          <input type="hidden" id="clubColors" value="${data.clubColors}" >
          <br>
          <button onclick="insertClub()" class="waves-effect waves-light btn-large"><i class="material-icons right">favorite</i>Add Favorite</button>
          
          
          </span> 
          </div>
          </div>
          `;
          // "founded": 1899,
          // "clubColors": "Red / Black",
          // "venue": "Stadio Giuseppe Meazza",
          // "squad": [
          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("body-content").innerHTML = clubHTML;
        });
      }
    });
  }
  // "" + idParam 
  fetch(base_url + "teams/" + idParam, {
    headers: {
      'X-Auth-Token': "2e757173d9c24a2689902c37e49daef3"
    }
  })
  .then(status)
  .then(json)
  .then(function(data) {
      // Objek JavaScript dari response.json() masuk lewat variabel data.
      var squadsHTML = "";
      data.squad.forEach(squad);
      function squad(squad, i){
        // console.log(squad.name);
          squadsHTML += `
          <tr>
            <td class="center" >${i}</td>
            <td class="center" >${squad.name}</td>
            <td class="center" >${squad.position}</td>
            <td class="center" >${squad.shirtNumber}</td>                 
          </tr>
        `;
      }
      // Sisipkan komponen card ke dalam elemen dengan id #content
      // console.log(squadsHTML);
      document.getElementById("player").innerHTML = squadsHTML;

      // Menyusun komponen card artikel secara dinamis
      var clubHTML = `
      <div class="card">
      <div class="">
      <img src="${data.crestUrl}" width="150px" />
      </div>
      <div class="card-content">
      <span class="card-title">${data.name}</span>
      <span class="card-body">${data.founded} - ${data.clubColors} - ${data.venue}</span>
      <br>
      <span class="card-body">
      
      <input type="hidden" id="clubId" value="${data.id}" >
      <input type="hidden" id="clubName" value="${data.name}" >
      <input type="hidden" id="clubVenue" value="${data.venue}" >
      <input type="hidden" id="clubColors" value="${data.clubColors}" >
      <br>
      <button onclick="insertClub()" class="waves-effect waves-light btn-large"><i class="material-icons right">favorite</i>Add Favorite</button>
      
      </span> 
      </div>
      </div>
      `;

      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = clubHTML;
    });
}

function favoritList() {
  if ("caches" in window) {
    caches.match(base_url + "competitions/2019/standings?standingType=TOTAL", {
      headers: {
        'X-Auth-Token': "2e757173d9c24a2689902c37e49daef3"
      }
    }).then(function(response) {
    if (response) {
        response.json().then(function(data) {

      // console.log();
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var standingsHTML = "";
      data.standings[0].table.forEach(funStandings);
      function funStandings(standing){
        standingsHTML += `
                  <option value="">HAHAHAH</option>
        `;
      }

          // Sisipkan komponen card ke dalam elemen dengan id #content
          document.getElementById("fav").innerHTML = standingsHTML;
        });
      }
    });
  }


  fetch(base_url + "competitions/2019/standings?standingType=TOTAL", {
    headers: {
      'X-Auth-Token': "2e757173d9c24a2689902c37e49daef3"
    }
  })
  .then(status)
  .then(json)
  .then(function(data) {
    console.log('sukses fetch');
    console.log(data.standings[0].table[12].team.name, "Poor :'(" );

      // console.log();
      // Objek/array JavaScript dari response.json() masuk lewat data.

      // Menyusun komponen card artikel secara dinamis
      var standingsHTML = "";
      data.standings[0].table.forEach(funStandings);
      function funStandings(standing){
        // console.log(standing.team.name);
          standingsHTML += `
          <label for="${standing.team.id}">${standing.team.name}</label>
        `;
      }
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("fav").innerHTML = standingsHTML;
    })
  .catch(error);
}
      function insertClub() 
      {
          const club = {
              clubId: document.getElementById("clubId").value,
              clubName: document.getElementById("clubName").value,
              clubVenue: document.getElementById("clubVenue").value,
              clubColors: document.getElementById("clubColors").value
          };

          dbInsertClub(club).then(() => {
            M.toast({html: 'Added Favorit Club'});
          })
      }