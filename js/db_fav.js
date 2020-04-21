const idbPromised = idb.open('clubs_database', 1, upgradedDb => {
    if (!upgradedDb.objectStoreNames.contains('clubs')) {
        upgradedDb.createObjectStore("clubs", {keyPath: "clubId"});
    }
});

const dbGetAllClub = () => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("clubs", `readonly`);
            return transaction.objectStore("clubs").getAll();
        }).then(data => {
            if (data !== undefined) {
                resolve(data)
            } else {
                reject(new Error("Favorite not Found"))
            }
        })
    })
};

const dbInsertClub = club => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("clubs", `readwrite`);
            transaction.objectStore("clubs").add(club);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};

const dbDeleteClub = clubId => {
    return new Promise((resolve, reject) => {
        idbPromised.then(db => {
            const transaction = db.transaction("clubs", `readwrite`);
            transaction.objectStore("clubs").delete(clubId);
            return transaction;
        }).then(transaction => {
            if (transaction.complete) {
                resolve(true)
            } else {
                reject(new Error(transaction.onerror))
            }
        })
    })
};


function showAllClub() {
    dbGetAllClub().then(clubs => {
        let listclubsInText = "";
        clubs.forEach(club => {
            listclubsInText += `
            <tr>
              <td>${club.clubId}</td>
              <td>${club.clubName}</td>
              <td>${club.clubVenue}</td>
              <td>${club.clubColors}</td>
              <td><button id="${club.clubId}" class="removeButton">Remove</button></td>
            </tr>
            `;
        });
        document.getElementById("fav").innerHTML = listclubsInText;
    
        // console.log(listclubsInText);

        let removeButtons = document.querySelectorAll(".removeButton");
        for(let button of removeButtons) {
            button.addEventListener("click", function (event) {
                let clubId = event.target.id;
                dbDeleteClub(clubId).then(() => {
                    M.toast({html: 'Favorit Club Removed'});
                    showAllClub()
                })
            })
        }
    })
 }

 showAllClub();
