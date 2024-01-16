window.addEventListener('load', function () {
    let tabEvents = ['change', 'click'];

    let tabInputs = window.document.querySelectorAll('input:not([id="btn_annuler"])');

    for (let i = 0; i < tabInputs.length; i++) {
        for (let j = 0; j < tabEvents.length; j++) {
            tabInputs[i].addEventListener(tabEvents[j], gestionAlcoolemie);
        }
    }

    window.document.querySelector('#btn_annuler').addEventListener('click', function () {
        window.document.querySelector('#btn_annuler').form.reset();
        gestionAlcoolemie();
    });

});

function gestionAlcoolemie() {

    let poids = getInt('#num_poids');
    let sexe = getString('#sexe input[type="radio"]:checked');
    let nbVerre = getInt('#num_verre');
    let alcoolemie = getAlcoolemie(poids, sexe, nbVerre);

    if (alcoolemie >= 0.5) {
        affiche('h3', '#alcool', 'alcoolemie', 'Alcoolémie : ' + alcoolemie + 'g/l de sang', 'red');
        affiche('h3', '#alcool', 'amende', 'Amende : ' + getAmende(alcoolemie), 'black');
        affiche('h3', '#alcool', 'sanction', 'Sanction : ' + getSanction(alcoolemie), 'black');
    } else {
        affiche('h3', '#alcool', 'alcoolemie', 'Alcoolémie : ' + alcoolemie + 'g/l de sang', 'black');
        supprime('amende');
        supprime('sanction');
    }

}

function affiche(typeQ1, cible, id, contenu, couleur) {
    let Q2 = window.document.querySelector('#' + id);
    if (!Q2) {
        Q2 = window.document.createElement(typeQ1);
        Q2.id = id;
        window.document.querySelector(cible).appendChild(Q2);
    }
    Q2.style.setProperty('color', couleur);
    Q2.innerHTML = contenu;
}

function supprime(id) {
    let f = window.document.querySelector('#' + id);
    if (f) {
        f.remove();
    }
}

function getAlcoolPur(nbVerre) {
    const uniteAlcool = 10;
    return uniteAlcool * nbVerre;
}

function getCoefDiffusion(sexe) {
    const CoefDiffH = 0.7, CoefDiffF = 0.6;
    if (sexe === 'homme') {
        return CoefDiffH;
    } else {
        return CoefDiffF;
    }
}

function getAlcoolemie(poids, sexe, nbVerre) {
    if (poids > 0) {
        return (getAlcoolPur(nbVerre) / (poids * getCoefDiffusion(sexe))).toFixed(2);
    } else {
        return 0;
    }
}

function getAmende(alcoolemie) {
    const seuil = 0.8;
    if (alcoolemie < seuil) {
        return 'Minorée : 90 € / Forfaitaire : 135 € / Majorée : 375 €';
    } else {
        return '4500 €';
    }
}

function getSanction(alcoolemie) {
    const seuil = 0.8;
    if (alcoolemie < seuil) {
        return '6 points + suspension du permis pendant 3 ans';
    } else {
        return '6 points + 2 ans de prison + suspension du permis pendant 3 ans + stage de sensibilisation';
    }
}

function getInt(id) {
    let valeur = parseInt(window.document.querySelector(id).value);
    if (isNaN(valeur)) {
        window.document.querySelector(id).value = 0;
    } else {
        return valeur;
    }
}

function getString(id) {
    return window.document.querySelector(id).value;
}   