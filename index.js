window.onload = () => {
    let _new = document.getElementById('new')
    let _list = document.getElementById('list')
    let sectoin_1 = document.getElementById('section_1')

    let db;
    let note_ID = []

    let DBIndexed = indexedDB.open('EtudiantsDB', 4);

    DBIndexed.onerror = event => {
        console.error('Il y a une erreur dans l\'enregistrement')
    }

    DBIndexed.onsuccess = event => {
        db = DBIndexed.result;

        list()
    }

    DBIndexed.onupgradeneeded = event => {
        db = event.target.result;

        db.onerror = (event) => {
            console.error('il y a une erreur dans l\'update', event)
        }

        const objectStore = db.createObjectStore('Etudiants', { keyPath : 'id' })
        objectStore.createIndex('nom', 'nom', {unique : false})
        objectStore.createIndex('prenom', 'prenom', {unique : false})
        objectStore.createIndex('sexe', 'sexe', {unique : false})
        objectStore.createIndex('ddn', 'ddn', {unique : false})
        objectStore.createIndex('ldn', 'ldn', {unique : false})
        objectStore.createIndex('taille', 'taille', {unique : false})
        objectStore.createIndex('poids', 'poids', {unique : false})
        objectStore.createIndex('matricule', 'matricule', {unique : false})
        objectStore.createIndex('parcours', 'parcours', {unique : false})
        objectStore.createIndex('created_at', 'created_at', {unique : false})

        const objectStore_2 = db.createObjectStore('Notes', { keyPath : 'id' })
        objectStore_2.createIndex('id_etudiant', 'id_etudiant', {unique : false})
        objectStore_2.createIndex('content', 'content', {unique : false})
        objectStore_2.createIndex('created_at', 'created_at', {unique : false})

        console.log('save')
    }

    _new.addEventListener('click', e => {
        sectoin_1.innerHTML = '<boursier-js></boursier-js>'
    })


    function list(){
        const objectStore = db.transaction('Etudiants').objectStore('Etudiants')
        const store = objectStore.getAll()

        store.onerror = (event) => {
            console.error(event)
        }
        store.onsuccess = (event) => {
            let data = event.target.result

            data.forEach((el) => {
                const div = document.createElement('div')
                div.classList = 'item'
                div.innerHTML = `<item-js data-object ='${JSON.stringify(el)}' data-open = 'false' ></item-js>`
                _list.appendChild(div)
            })
        }
    //    console.log(objectStore.getAll().result)
    //     objectStore.openCursor().onsuccess = (event) => {
    //         const cursor = event.target.result

            
            
    //     }

       
    }

    class BoursierJs extends HTMLElement {
        constructor(){
            super()
        }

        connectedCallback(){
            const HTML = `
                <div id='form' class="container container-form">
                    <div class="titre">
                        <h1> Nouvel Etudiant</h1>
                    </div>
                    <div class="form">
                        <div class="left">
                            <div class="champ">
                                <label for="nom">Nom</label>
                                <input type="text" placeholder="Votre Nom" name="nom" id="nom">
                            </div>
                            <div class="champ">
                                <label for="prenom">Prenom</label>
                                <input type="text" placeholder="Votre Prenom" name="prenom" id="prenom">
                            </div>
                            <div class="champ">
                                <label for="ldn">Lieu de naissance</label>
                                <input type="text" placeholder="Ville de naissance" name="ldn" id="ldn">
                            </div>
                            <div class="champ">
                                <label for="ddn">Date de naissance</label>
                                <input type="date"  name="ddn" id="ddn">
                            </div>
                        </div>
                        <div class="right">
                            <div class="champ">
                                <div class="semichamp">
                                    <label for="taille">Taille</label>
                                    <div class="input">
                                        <input id='taille' type="number" placeholder="123" pattern = '[0-9]{3}' name="taille">
                                        <div>cm</div>
                                    </div>
                                </div>
                                <div class="semichamp">
                                    <label for="poids">Poids</label>
                                    <div class="input">
                                        <input id='poids' type="number" placeholder="Poids" name="poids">
                                        <div>Kg</div>
                                    </div>
                                </div>
                            </div>
                            <div class="champ">
                                <label for="sexe">Sexe</label>
                                <div class="semichamp radio">
                                    <label for="homme">Homme</label>
                                    <input type="radio" name="sexe" value="homme" id='sexe'>
                                </div>
                                <div class="semichamp radio">
                                    <label for="femme">Femme</label>
                                    <input type="radio" name="sexe" value="femme">
                                </div>
                            </div>
                            <div class="champ">
                                <label for="parcours">Parcours</label>
                                <select name="parcours" id="parcours">
                                    <option value="dw">Developpement Web</option>
                                    <option value="ds">Data Science</option>
                                    <option value="an">Art Numerique</option>
                                </select>
                            </div>
                            <div class="champ">
                                <label for="matricule">Matricule</label>
                                <input type="text" placeholder="matricule" name="matricule" id="mat">
                            </div>
                        </div>
                    </div>
                    <div class="validation">
                        <a class="btn valide">
                            Enregistrer
                        </a>
                        <a class="btn annule">
                            Annuler
                        </a>
                    </div>
                </div>
            `
            
            this.innerHTML = HTML
            this.id = 'new_boursier'
            this.addEventListener('load', e=>{
                console.log('load')
            })
            this.IsOpen()
            
        }

        IsOpen (){
            let valide = this.getElementsByClassName('valide')[0]
            let annule = this.getElementsByClassName('annule')[0]

            if(this.dataset.open === 'true'){
                console.log('true')
            }

            valide.addEventListener('click', e => {
                this.takeValue()
                this.remove()
                
            })

            annule.addEventListener('click', e => {
                this.remove()
            })
        }

        
        takeValue(){

            const Sexe = () => {
                if(document.getElementById('sexe').checked) return 'HOMME'
                else return 'FEMME'
            }

            const object = {
                nom : document.getElementById('nom').value,
                prenom : document.getElementById('prenom').value,
                LDN : document.getElementById('ldn').value,
                DDN : document.getElementById('ddn').value,
                taille : document.getElementById('taille').value,
                poids : document.getElementById('poids').value,
                sexe : Sexe(),
                parcours : document.getElementById('parcours').value,
                matricule : document.getElementById('mat').value
            }

            if(object.nom !== '' 
            && object.prenom !== ''
            && object.LDN !== '' 
            && object.DDN !== '' 
            && object.taille !== '' 
            && object.poids !== '' 
            && object.sexe !== '' 
            && object.parcours !== '' 
            && object.matricule !== '' ){
                const etudiant = new Etudiant(object)
                etudiant.inscription()
                location.reload()
            }
        }
    }

    class ItemJs extends HTMLElement{
        constructor(){
            super()
        }

        connectedCallback (){
            const {nom, prenom, matricule, parcours, sexe} = JSON.parse(this.dataset.object)
            
            
            const Parcours = () => {
                switch (parcours) {
                    case 'dw':
                        return 'Developpement Web'
                        break;
                    case 'ds':
                        return 'Data Science'
                        break;
                    case 'an':
                        return 'Art Numerique'
                        break;
                
                    default:
                        break;
                }
            }

            const HTML = `
                    <div class='haut-item'>
                        <div class="name el">
                            <span>${nom} ${prenom}</span>
                        </div>
                        <div class="sexe el">
                            <span>${sexe}</span>
                        </div>
                        <div class="parcours el">
                            <span>${Parcours()}</span>
                        </div>
                        <div class="matricule el">
                            <span>${matricule}</span>
                        </div>
                    </div>
                    <div class ='action'>
                        <div class="plus icon">
                            <img src="./icon/plus.png" width="100%" alt="">
                        </div>
                        <div class="moins icon">
                            <img src="./icon/moins.png" width="100%" alt="">
                        </div>
                        <div class="modifier icon">
                            <img src="./icon/modifier.png" width="100%" alt="">
                        </div>
                    </div>
            `
            this.innerHTML = HTML


            this.Action()

        }
        Action(){
            let action = this.getElementsByClassName('action')[0]
            let plus = this.getElementsByClassName('plus')[0]
            let moins = this.getElementsByClassName('moins')[0]
            let modif = this.getElementsByClassName('modifier')[0]
            const Object = JSON.parse(this.dataset.object)

            const info = document.getElementById('information')
            console.log(Object)
            const {id} = Object

            this.addEventListener('click', e => {
                if(this.dataset.open === 'false'){
                    action.style.height = '42px';
                    this.dataset.open = 'true'
                } else {
                    action.style.height = '0px';
                    this.dataset.open = 'false'
                }
            })

            

            moins.addEventListener('click', e => {
                let newData = DeleteElement({arr:Data, id : id})
                console.log(newData)
                localStorage.setItem('Etudiant', JSON.stringify(newData))
                location.reload()
            })

            plus.addEventListener('click', e => {
                info.innerHTML = `<info-student-js data-info = '${this.dataset.object}' data-note =${this.#notes(id)} ></info-student-js>`
            })
        }

        #notes(id){
            const objectStore = db.transaction(['Notes'], 'readwrite').objectStore('Notes')
            let notesAll = objectStore.openCursor(id)

            console.log(notesAll)
            notesAll.onsuccess = event => {
            }

            let note = []

            notesAll.onsuccess = event => {
                let notes = event.target.result
                notes.forEach(el => {
                    if(id === el.id_etudiant){
                        note.push(el.id)
                    }
                })
            }

            console.log(note[0])
        }
    }

    class InfosStudentJS extends HTMLElement{
        constructor(){
            super()
        }

        connectedCallback(){
            const Object = this.dataset.info;
            const data = JSON.parse(Object)
            const note = this.dataset.note

            const {nom, prenom, sexe, DDN, LDN, taille, poids, matricule, parcours, id} = data

            const Parcours = () => {
                switch (parcours) {
                    case 'dw':
                        return 'Developpement Web'
                        break;
                    case 'ds':
                        return 'Data Science'
                        break;
                    case 'an':
                        return 'Art Numerique'
                        break;
                
                    default:
                        break;
                }
            }

            const HTML = `
                <div id="section_3" data-infos="">
                    <div class="mask">
                        <div class="container">
                            <div class="header">
                                <div class="back">
                                    <div>
                                        <img src="./icon/back.png" width="100%" alt="icon back">
                                    </div>
                                </div>
                                <div class="header_titre">
                                    Information Etudiant
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="info_Etudiant">
                        <div class="container">
                            <div class="grid">
                                <div class="case_left">
                                    <div class="etudiant_haut">
                                        <div class="name">${nom}</div>
                                        <div class="surname">${prenom}</div>
                                        <div class="age">${SetDate(DDN).age} ans</div>
                                    </div>
                                    <div class="etudiant_bas">
                                        <div class='champ'>
                                            <span>Matricule </span>
                                            <span>${matricule}</span>
                                        </div>
                                        <div class='champ'>
                                            <span>Parcours </span>
                                            <span>${Parcours()}</span>
                                        </div>
                                        <div class='champ'>
                                            <span>Sexe </span>
                                            <span>${sexe}</span>
                                        </div>
                                        <div class='champ'>
                                            <span>Lieu de Naissance </span>
                                            <span>${LDN}</span>
                                        </div>
                                        <div class='champ'>
                                            <span>Date de Naissance </span>
                                            <span>${SetDate(DDN).fullDate}</span>
                                        </div>
                                        <div class='champ'>
                                            <span>Taille </span>
                                            <span>${taille} CM</span>
                                        </div>
                                        <div class='champ'>
                                            <span>Poids </span>
                                            <span>${poids} Kg</span>
                                        </div>
                                    </div>
                                    <div class="action">
                                        <div>
                                            <div class="moins">
                                                <svg width="36px" height="36px" viewBox="0 0 25 25" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="moins" transform="translate(1.5 1.5)">
                                                    <path d="M0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11Z" id="Ellipse" fill="none" fill-rule="evenodd" stroke="#000" stroke-width="3" />
                                                    <g id="-" fill="#000" transform="translate(3 2)">
                                                        <path d="M11.0682 8L11.0682 10.6591L4.93182 10.6591L4.93182 8L11.0682 8Z" />
                                                    </g>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div class="modif">
                                                <svg width="112px" height="36px" viewBox="0 0 83 25" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="modifier" transform="translate(1.5 1.5)">
                                                    <path d="M10.999 0L69.001 0Q69.271 0 69.5407 0.0132488Q69.8104 0.0264976 70.0791 0.0529632Q70.3478 0.0794288 70.6149 0.119048Q70.882 0.158666 71.1468 0.211343Q71.4116 0.264019 71.6735 0.329626Q71.9355 0.395233 72.1938 0.473613Q72.4522 0.551993 72.7065 0.642957Q72.9607 0.73392 73.2101 0.837249Q73.4596 0.940577 73.7037 1.05602Q73.9478 1.17147 74.1859 1.29875Q74.424 1.42603 74.6556 1.56484Q74.8872 1.70366 75.1117 1.85367Q75.3362 2.00367 75.5531 2.16452Q75.77 2.32537 75.9787 2.49666Q76.1874 2.66795 76.3875 2.84928Q76.5875 3.03061 76.7785 3.22153Q76.9694 3.41246 77.1507 3.61252Q77.332 3.81259 77.5033 4.02131Q77.6746 4.23003 77.8355 4.4469Q77.9963 4.66378 78.1463 4.88828Q78.2963 5.11279 78.4351 5.34438Q78.574 5.57598 78.7012 5.81411Q78.8285 6.05223 78.944 6.29632Q79.0594 6.54041 79.1627 6.78986Q79.2661 7.03932 79.357 7.29355Q79.448 7.54777 79.5264 7.80616Q79.6048 8.06454 79.6704 8.32646Q79.736 8.58838 79.7887 8.8532Q79.8413 9.11802 79.881 9.38511Q79.9206 9.6522 79.947 9.92091Q79.9735 10.1896 79.9868 10.4593Q80 10.729 80 10.999L80 11.001Q80 11.271 79.9868 11.5407Q79.9735 11.8104 79.947 12.0791Q79.9206 12.3478 79.881 12.6149Q79.8413 12.882 79.7887 13.1468Q79.736 13.4116 79.6704 13.6735Q79.6048 13.9355 79.5264 14.1938Q79.448 14.4522 79.357 14.7065Q79.2661 14.9607 79.1627 15.2101Q79.0594 15.4596 78.944 15.7037Q78.8285 15.9478 78.7012 16.1859Q78.574 16.424 78.4351 16.6556Q78.2963 16.8872 78.1463 17.1117Q77.9963 17.3362 77.8355 17.5531Q77.6746 17.77 77.5033 17.9787Q77.332 18.1874 77.1507 18.3875Q76.9694 18.5875 76.7785 18.7785Q76.5875 18.9694 76.3875 19.1507Q76.1874 19.332 75.9787 19.5033Q75.77 19.6746 75.5531 19.8355Q75.3362 19.9963 75.1117 20.1463Q74.8872 20.2963 74.6556 20.4352Q74.424 20.574 74.1859 20.7013Q73.9478 20.8285 73.7037 20.944Q73.4596 21.0594 73.2101 21.1628Q72.9607 21.2661 72.7065 21.357Q72.4522 21.448 72.1938 21.5264Q71.9355 21.6048 71.6735 21.6704Q71.4116 21.736 71.1468 21.7887Q70.882 21.8413 70.6149 21.881Q70.3478 21.9206 70.0791 21.947Q69.8104 21.9735 69.5407 21.9867Q69.271 22 69.001 22L10.999 22Q10.729 22 10.4593 21.9867Q10.1896 21.9735 9.92091 21.947Q9.6522 21.9206 9.38511 21.881Q9.11802 21.8413 8.8532 21.7887Q8.58838 21.736 8.32646 21.6704Q8.06454 21.6048 7.80616 21.5264Q7.54777 21.448 7.29355 21.357Q7.03932 21.2661 6.78986 21.1628Q6.54041 21.0594 6.29632 20.944Q6.05223 20.8285 5.81411 20.7013Q5.57598 20.574 5.34438 20.4352Q5.11279 20.2963 4.88828 20.1463Q4.66378 19.9963 4.4469 19.8355Q4.23003 19.6746 4.02131 19.5033Q3.81259 19.3321 3.61252 19.1507Q3.41246 18.9694 3.22153 18.7785Q3.03061 18.5875 2.84928 18.3875Q2.66795 18.1874 2.49666 17.9787Q2.32537 17.77 2.16452 17.5531Q2.00367 17.3362 1.85367 17.1117Q1.70366 16.8872 1.56484 16.6556Q1.42603 16.424 1.29875 16.1859Q1.17147 15.9478 1.05602 15.7037Q0.940577 15.4596 0.837249 15.2101Q0.73392 14.9607 0.642957 14.7065Q0.551993 14.4522 0.473613 14.1938Q0.395233 13.9355 0.329626 13.6735Q0.264019 13.4116 0.211343 13.1468Q0.158666 12.882 0.119048 12.6149Q0.0794288 12.3478 0.0529632 12.0791Q0.0264976 11.8104 0.0132488 11.5407Q0 11.271 0 11.001L0 10.999Q0 10.729 0.0132488 10.4593Q0.0264976 10.1896 0.0529632 9.92091Q0.0794288 9.6522 0.119048 9.38511Q0.158666 9.11802 0.211343 8.8532Q0.264019 8.58838 0.329626 8.32646Q0.395233 8.06454 0.473613 7.80616Q0.551993 7.54777 0.642957 7.29355Q0.73392 7.03932 0.837249 6.78986Q0.940577 6.54041 1.05602 6.29632Q1.17147 6.05223 1.29875 5.81411Q1.42603 5.57598 1.56484 5.34438Q1.70366 5.11279 1.85367 4.88828Q2.00367 4.66378 2.16452 4.4469Q2.32537 4.23003 2.49666 4.02131Q2.66795 3.81259 2.84928 3.61252Q3.03061 3.41246 3.22153 3.22153Q3.41246 3.03061 3.61252 2.84928Q3.81259 2.66795 4.02131 2.49666Q4.23003 2.32537 4.4469 2.16452Q4.66378 2.00367 4.88828 1.85367Q5.11279 1.70366 5.34438 1.56484Q5.57598 1.42603 5.81411 1.29875Q6.05223 1.17147 6.29632 1.05602Q6.54041 0.940577 6.78986 0.837249Q7.03932 0.73392 7.29355 0.642957Q7.54777 0.551993 7.80616 0.473613Q8.06454 0.395233 8.32646 0.329626Q8.58838 0.264019 8.8532 0.211343Q9.11802 0.158666 9.38511 0.119048Q9.6522 0.0794288 9.92091 0.0529632Q10.1896 0.0264976 10.4593 0.0132488Q10.729 0 10.999 0L10.999 0Z" id="Rectangle" fill="none" fill-rule="evenodd" stroke="#000" stroke-width="3" />
                                                    <g id="Modifier" fill="#000" transform="translate(10 3)">
                                                        <path d="M32.1236 4.55611Q32.4929 4.89773 33.0099 4.89773Q33.5316 4.89773 33.8986 4.55611Q34.2656 4.21449 34.2656 3.73437Q34.2656 3.25426 33.8986 2.91264Q33.5316 2.57102 33.0099 2.57102Q32.4929 2.57102 32.1236 2.91264Q31.7543 3.25426 31.7543 3.73437Q31.7543 4.21449 32.1236 4.55611ZM41.1903 4.55611Q41.5597 4.89773 42.0767 4.89773Q42.5984 4.89773 42.9654 4.55611Q43.3324 4.21449 43.3324 3.73437Q43.3324 3.25426 42.9654 2.91264Q42.5984 2.57102 42.0767 2.57102Q41.5597 2.57102 41.1903 2.91264Q40.821 3.25426 40.821 3.73437Q40.821 4.21449 41.1903 4.55611ZM39.8239 5.63636L39.8239 7.48295L38.5313 7.48295L38.5313 12.7273L35.983 12.7273L35.983 7.48295L35.0781 7.48295L35.0781 5.63636L35.983 5.63636L35.983 5.43324Q35.983 4.11754 36.6754 3.47354Q37.3679 2.82955 38.5313 2.82954Q39.016 2.82955 39.4753 2.90341Q39.9347 2.97727 40.1563 3.03267L39.7869 4.8608Q39.6484 4.81925 39.4638 4.79386Q39.2791 4.76847 39.1406 4.76847Q38.7805 4.76847 38.6559 4.92081Q38.5313 5.07315 38.5313 5.32244L38.5313 5.63636L39.8239 5.63636ZM6.27131 3.27273L3.0767 3.27273L3.0767 12.7273L5.58807 12.7273L5.58807 7.22443L5.66193 7.22443L7.76705 12.6534L9.28125 12.6534L11.3864 7.26136L11.4602 7.26136L11.4602 12.7273L13.9716 12.7273L13.9716 3.27273L10.777 3.27273L8.57955 8.62784L8.46875 8.62784L6.27131 3.27273ZM25.919 12.8196Q25.1619 12.8196 24.5272 12.4226Q23.8924 12.0256 23.5115 11.2177Q23.1307 10.4098 23.1307 9.18182Q23.1307 7.89844 23.53 7.09517Q23.9293 6.2919 24.5641 5.91797Q25.1989 5.54403 25.9006 5.54403Q26.69 5.54403 27.1886 5.93874Q27.6871 6.33345 27.8949 6.87358L27.9318 6.87358L27.9318 3.27273L30.4801 3.27273L30.4801 12.7273L27.9503 12.7273L27.9503 11.5639L27.8949 11.5639Q27.6733 12.104 27.1701 12.4618Q26.6669 12.8196 25.919 12.8196ZM15.4073 11.1138Q15.8459 11.9379 16.6676 12.3972Q17.4893 12.8565 18.6435 12.8565Q19.7976 12.8565 20.6193 12.3972Q21.4411 11.9379 21.8796 11.1138Q22.3182 10.2898 22.3182 9.20028Q22.3182 8.1108 21.8796 7.28675Q21.441 6.46271 20.6193 6.00337Q19.7976 5.54403 18.6435 5.54403Q17.4893 5.54403 16.6676 6.00337Q15.8459 6.46271 15.4073 7.28675Q14.9687 8.1108 14.9687 9.20028Q14.9687 10.2898 15.4073 11.1138ZM48.0412 12.8565Q46.3377 12.8565 45.3613 11.8894Q44.3849 10.9222 44.3849 9.20028Q44.3849 8.10156 44.8281 7.27983Q45.2713 6.4581 46.0792 6.00106Q46.8871 5.54403 47.9858 5.54403Q49.0568 5.54403 49.8485 5.9826Q50.6403 6.42116 51.0765 7.23597Q51.5128 8.05078 51.5128 9.18182L51.5128 9.77273L46.8963 9.77273L46.8963 9.88352Q46.8963 10.396 47.2125 10.7306Q47.5288 11.0653 48.0966 11.0653Q48.489 11.0653 48.7821 10.9015Q49.0753 10.7376 49.1861 10.4375L51.5128 10.4375Q51.3327 11.5455 50.4256 12.201Q49.5185 12.8565 48.0412 12.8565ZM55.0213 5.63636L52.5469 5.63636L52.5469 12.7273L55.0952 12.7273L55.0952 9.03409Q55.0952 8.42472 55.4691 8.0554Q55.843 7.68608 56.4063 7.68608Q56.6048 7.68608 56.8817 7.71839Q57.1587 7.75071 57.348 7.81534L57.348 5.64098Q57.0202 5.54403 56.7017 5.54403Q56.1339 5.54403 55.7115 5.89027Q55.2891 6.23651 55.0952 6.98437L55.0213 6.98437L55.0213 5.63636ZM31.7358 5.63636L31.7358 12.7273L34.2841 12.7273L34.2841 5.63636L31.7358 5.63636ZM46.8963 8.36932L49.1676 8.36932Q49.1584 7.91229 48.8375 7.62376Q48.5167 7.33523 48.0412 7.33523Q47.5749 7.33523 47.2402 7.62145Q46.9055 7.90767 46.8963 8.36932ZM19.4306 10.4952Q19.1467 10.973 18.6619 10.973Q18.1495 10.973 17.861 10.4952Q17.5724 10.0174 17.5724 9.18182Q17.5724 8.34624 17.861 7.86843Q18.1495 7.39063 18.6619 7.39062Q19.1467 7.39062 19.4306 7.86843Q19.7145 8.34624 19.7145 9.18182Q19.7145 10.0174 19.4306 10.4952ZM40.8026 5.63636L40.8026 12.7273L43.3509 12.7273L43.3509 5.63636L40.8026 5.63636ZM26.8608 10.8622Q27.3871 10.8622 27.6871 10.4098Q27.9872 9.95739 27.9872 9.18182Q27.9872 8.3924 27.6871 7.94691Q27.3871 7.50142 26.8608 7.50142Q26.3345 7.50142 26.0437 7.94691Q25.7528 8.3924 25.7528 9.18182Q25.7528 9.97124 26.0437 10.4167Q26.3345 10.8622 26.8608 10.8622Z" />
                                                    </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="case_right">
                                    <div class="note">
                                        <div class="note_header">
                                            <div>
                                                Notes
                                            </div>
                                            <div class = 'ajouter'>
                                                <svg width="25px" height="25px" viewBox="0 0 25 25" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                                                    <g id="plus" transform="translate(1.5 1.5)">
                                                    <path d="M0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11Z" id="Ellipse" fill="none" fill-rule="evenodd" stroke="#4f3200" stroke-width="3" />
                                                    <g id="+" fill="#4f3200" transform="translate(3 2)">
                                                        <path d="M6.56818 13.9574L6.56818 10.6591L3.26989 10.6591L3.26989 7.79545L6.56818 7.79545L6.56818 4.49716L9.43182 4.49716L9.43182 7.79545L12.7301 7.79545L12.7301 10.6591L9.43182 10.6591L9.43182 13.9574L6.56818 13.9574Z" />
                                                    </g>
                                                    </g>
                                                </svg>
                                            </div>
                                        </div>
                                        <div class="note_vide">
                                            Aucune note pour le moment 
                                            <button class = 'ajouter'>Ajouter des notes</button>
                                        </div>
                                        <div class = 'add_note'></div>
                                        <div class="notes_liste"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            
            this.innerHTML = HTML

            const back = this.getElementsByClassName('back')[0]
            const header = this.getElementsByClassName('header')[0]
            const mask = this.getElementsByClassName('mask')[0]
            
            setTimeout(() => {
                setTimeout(() => {
                    mask.style.backdropFilter = 'blur(5px)'
                    mask.style.height = '10%'
                }, 200)
                header.style.height = '10vh'
            }, 100)
            
            back.addEventListener('click', e => {
                setTimeout(() => {
                    setTimeout(() => {
                        this.remove()
                    }, 200)
                    header.style.opacity = '0'
                }, 100)
                mask.style.height = '100%'
            })
            

        this.Note({id:note, id_etudiant : id})
        }

        Note({id, id_etudiant}){
            const ajoute = this.getElementsByClassName('ajouter')
            const note_liste = this.getElementsByClassName('notes_liste')[0]
            const note_vide = this.getElementsByClassName('note_vide')[0]
            const add_note = this.getElementsByClassName('add_note')[0]
            const objectStore = db.transaction('Notes').objectStore('Notes')

            for(let a of ajoute){
                a.addEventListener('click', e => {
                    add_note.innerHTML = `<new-note-js data-id = '${JSON.stringify(id)}'></new-note-js>`
                })
            }
            console.log(id)
            objectStore.openCursor(id) = event => {
                console.log(event.target.result)
            }


            
            
        }

    }


    class NewNote extends HTMLElement {
        constructor(){
            super()
        }

        connectedCallback(){

            const HTML = `
                <div id="newNote">
                    <div class ="mask"></div>
                    <div class ="noteInput">
                        <div class = "champ">
                            <input type = 'text' name ="matiere"  placeholder = 'Intitulé Matière' id='Matiere' >
                        </div>
                        <div class = "champ moyen">
                            <input type = 'number' name ="matiere"  placeholder = 'Note' id='Moyenne'>
                        </div>
                        <button> Enreg. </button>
                    </div>
                </div>
            `
            this.innerHTML = HTML

            setTimeout(() => {
                this.IsOpen()
            }, 100)

            this.close()
            this.takeValue()
        }

        IsOpen(){
            const mask = this.getElementsByClassName('mask')[0]
            mask.style.height = '80%'
            mask.style.opacity = 1
            mask.style.backdropFilter = 'blur(5px)'
        }

        close(){
            const mask = this.getElementsByClassName('mask')[0]
            mask.addEventListener('click', e => {
                mask.style.height = '100%'
                mask.style.opacity = 0
                setTimeout(() => {
                    this.remove()
                }, 300)
            })
        }
        
        takeValue(){
            const matiere = document.getElementById('Matiere')
            const moyen = document.getElementById('Moyenne')
            const btn = this.getElementsByTagName('button')[0]
            const notes = JSON.parse(localStorage.getItem('Notes')) 
            const mask = this.getElementsByClassName('mask')[0]

            const etu = JSON.parse(this.dataset.id)

            
            btn.addEventListener('click', e => {
                notes.forEach(el => {
                    console.log(el, etu)
                    if( etu === el.id){
                        const Object = {
                            matiere : matiere.value,
                            moyen : moyen.value,
                            id : el.content.length + 1
                        }
                        el.content.push(Object)

                        localStorage.setItem('Notes', JSON.stringify(notes))
                    }
                })

                let parentNode = this.parentElement.parentElement
                let note_liste = parentNode.getElementsByClassName('notes_liste')[0]
                let note_vide = parentNode.getElementsByClassName('note_vide')[0]
                

                this.#Data().then(data => {
                    let type = ''
                    data.forEach(el => {
                        if(etu === el.id){
                            type = ''
                            el.content.forEach(a => {
                                if(el.content.length > 0) {console.log('good'); note_vide.style.height = 0}
                                type += `<note-item-js data-data = '${JSON.stringify(a)}' data-student = '${el.id_etudiant}'></note-item-js>`
                            })

                            note_liste.innerHTML = type
                        }
                    })

                    
                })
                
                mask.style.height = '100%'
                mask.style.opacity = 0
                setTimeout(() => {
                    this.remove()
                }, 300)

                
            })
        }
        
        #Reload_parent(){
            let parentNode = this.parentElement.parentElement 
            let note_liste = parentNode.getElementsByClassName('notes_liste')[0]
            const id_etudiant = this.dataset.student

            this.#Data().then(data => {
                let type = ``
                data.forEach(el => {
                    type = `<note-item-js data-data = '${JSON.stringify(el)}' data-student = '${id_etudiant}'></note-item-js>`
                })

                note_liste.innerHTML = type
            })
        }

        async #Data(){
            return await JSON.parse(localStorage.getItem('Notes'))
        }
    }

    class NoteItem extends HTMLElement {
        constructor(){
            super()
        }

         async connectedCallback(){

            const {matiere, moyen, id} = JSON.parse(this.dataset.data)
            const id_etudiant = this.dataset.student

            const database = JSON.parse(localStorage.getItem('Notes'))

            const pourcentage = () => {
                let moyenne = parseInt(moyen) * 100 / 20
                return moyenne
            }
            const HTML = `
                <div class ='matiere'>${matiere}</div>
                <div class = 'progressBar'>
                    <div class = 'bar-border'>
                        <div class = 'bar-progress'  style = 'width : ${pourcentage()}%'></div>
                    </div>
                </div>
                <div class = 'moyenne'>
                    ${moyen}
                </div>
                <div class = 'action'>
                    <div class = 'supp'>
                        <svg width="20px" height="20px" viewBox="0 0 25 25" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                            <g id="moins" transform="translate(1.5 1.5)">
                                <path d="M0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11Z" id="Ellipse" fill="none" fill-rule="evenodd" stroke="#4f3200" stroke-width="3" />
                                <g id="-" fill="#4f3200" transform="translate(3 2)">
                                <path d="M11.0682 8L11.0682 10.6591L4.93182 10.6591L4.93182 8L11.0682 8Z" />
                                </g>
                            </g>
                        </svg>
                    </div>
                </div>
            `

            this.innerHTML = HTML
            this.classList = 'note_item'

            const supp = this.getElementsByClassName('supp')[0]
            await supp.addEventListener('click',  e => {
                this.#Data().then(data => {
                    data.forEach(el => {
                        if(el.id_etudiant === id_etudiant ){
                            el.content.forEach(a => {
                                if(a.id === id){
                                    el.content = DeleteElement({arr : el.content, id : id})
                                    
                                    this.style.height = 0
                                    setTimeout(() => {
                                        this.remove()
                                    }, 300)
                                }
                            })
                            
                        }
                    })
                    setTimeout(() => {
                        console.log(data)
                        localStorage.setItem('Notes', JSON.stringify(data))
                    }, 200)
                    const note_vide = this.parentElement.parentElement.getElementsByClassName('note_vide')[0]
                    if(el.content.length === 0) note_vide.style.height = "calc(100% - 56px)";
                })
                
            })




        }

        async #Data(){
            return await JSON.parse(localStorage.getItem('Notes'))
        }

        
    }

    window.customElements.define('boursier-js', BoursierJs)
    window.customElements.define('item-js', ItemJs)
    window.customElements.define('info-student-js', InfosStudentJS)
    window.customElements.define('new-note-js', NewNote)
    window.customElements.define('note-item-js', NoteItem)


    class Etudiant{
        constructor({nom, prenom,sexe,DDN, LDN, taille, poids, parcours, matricule}){
            this.nom = nom;
            this.prenom = prenom;
            this.sexe = sexe;
            this.DDN = DDN;
            this.LDN = LDN;
            this.taille = taille;
            this.poids = poids; 
            this.parcours = parcours;
            this.matricule = matricule;
        }

        #creer_id(){
            const chaine = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'
            let data = Date.now()
            let id = `${data}-`
            for (let i =0 ; i< 6; i++){
                const rand = Math.floor(( Math.random()*100)*0.63 )
                id += chaine[rand]
            }

            return id
        }

        inscription(){
            const transaction = db.transaction(['Etudiants'], 'readwrite');
            const objectStore = transaction.objectStore('Etudiants')
            
            const objectStoreRequest = objectStore.add(this.#TakeValue())
            
            objectStoreRequest.onsuccess = event => {
                const notes = new Notes({id_etudiant : event.target.result})
                notes.Build()
            }


            objectStoreRequest.onerror = event => {
                console.error('Il y a une erreur au niveau de l\'enregistrement ')
            }
        }

        #TakeValue(){
            const {nom, prenom, DDN, LDN, parcours, poids, taille, sexe, matricule} = this;
            
            const etu = {
                nom:nom, 
                prenom:prenom, 
                sexe:sexe, 
                DDN:DDN,
                LDN:LDN,
                taille:taille, 
                poids:poids, 
                matricule:matricule, 
                parcours:parcours,
                id: this.#creer_id(),
                created_at : Date.now()
            }
            
            note_ID.push(etu.id)

            return etu
        }

        update(id, object){
            let l = localStorage;

            let bd = JSON.parse(l.getItem("Etudiant"))
            bd.forEach((el, i) => {
                if(el.id === id){
                    bd[i] = {id : id, ...object} 
                }
            })

            l.setItem('Etudiant', JSON.stringify(bd))
        }
    }
    
    class Notes {
        constructor({id_etudiant}){
            this.id_etudiant = id_etudiant;
        }
        #creer_id(){
            const chaine = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_'
            let data = Date.now()
            let id = `${data}-`
            for (let i =0 ; i< 6; i++){
                const rand = Math.floor(( Math.random()*100)*0.63)
                id += chaine[rand]
            }

            return id
        }

        Build() {
            const transaction = db.transaction(['Notes'], 'readwrite')
            const transaction_etudiant = db.transaction(['Etudiants']).objectStore('Etudiants')

            this.#TakeValue()

            const objectStore = transaction.objectStore('Notes')
            
            const etudiant = transaction_etudiant.getAll()
            
            const objectStoreRequest = objectStore.add(this.#TakeValue())
            objectStoreRequest.onsuccess = event => {
                etudiant.onsuccess = event => {
                    let etu_id = event.target.result[event.target.result.length -1].id
                }
                console.log('Notes Enregistre', event.target.result)
            }

            objectStoreRequest.onerror = event => {
                console.error('Il y a une erreur au niveau de l\'enregistrement des notes ')
            }
        }

        #TakeValue(){
            const { id_etudiant } = this
            const object = {
                id_etudiant : id_etudiant,
                id : this.#creer_id(),
                created_at : Date.now(),
                content : []
            }

            return object
        }

    }

                
        
    function DeleteElement({arr, id}){
         const arrr = []
         console.log(arr)
         arr.forEach((el, key) => {
            if(el.id !== id ){
                console.log(el.id)
                 arrr.push(el)
            }
        })
        return arr
    }
    
    function SetDate(date){
        let mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ]
        let d = new Date(date)
        let actualDay = new Date()

        let Month = mois[d.getMonth()]
        let fullDate = `${d.getDate()} ${Month} ${d.getFullYear()}`
        let age = actualDay.getFullYear() - d.getFullYear()


        return {fullDate : fullDate, age : age}
    }
}
