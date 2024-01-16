function recupValeur(id) {
    var valeur = parseInt(window.document.querySelector(id).value);
    if (isNaN(valeur)) {
        window.document.querySelector(id).value = 0;
        return 0;
    } else {
        return valeur;
    }
}

window.addEventListener('load', function () {
    
    const tabEvents = ['change', 'click'];

    const tabInputs = window.document.querySelectorAll('input[type="number"]');

    for (let i = 0; i < tabInputs.length; i++) {
        for (let j = 0; j < tabEvents.length; j++) {
            tabInputs[i].addEventListener(tabEvents[j], calculerPrime);
        }
    }

    window.document.querySelector('#Nb_Acc').addEventListener('change', function () {
        window.document.querySelector('#o_Nb_Acc').value = recupValeur('#Nb_Acc');
        calculerPrime();
    });

});

function calculerPrime() {
    
    const Nb_Acc = recupValeur('#Nb_Acc');
    const num_ancien = recupValeur('#num_ancien');
    const NbKm = recupValeur('#NbKm');
    const primeAnnuelleSansAcc = recupPrimeAnnuelle(recupPrimeDist(NbKm), recupPrimeAncien(num_ancien),0);
    const primeAnnuelle = recupPrimeAnnuelle(recupPrimeDist(NbKm), recupPrimeAncien(num_ancien),Nb_Acc);
    
    gestionNbAccidents(Nb_Acc, primeAnnuelleSansAcc, primeAnnuelle);
}

function recupPrimeDist(nb) {
    const primeMax = 900, primeKm = 0.01;
    let indem = nb * primeKm;
    if (indem > primeMax) {
        return primeMax;
    } else {
        return indem;
    }
}

function recupPrimeAncien(nb) {
    const nbMin = 4, primeMin = 300, primeSupp = 30;
    if (nb >= nbMin) {
        return primeMin + (nb - nbMin) * primeSupp;
    } else {
        return 0.0;
    }
}

function recupPrimeAnnuelle(primeDist, primeAncien, Nb_Acc) {
    if (Nb_Acc > 3) {
        return 0;
    } else {
        return Number(((primeDist + primeAncien) / (1 + Nb_Acc)).toFixed(2));
    }
}

function gestionNbAccidents(Nb_Acc, primeAnnuelleSansAcc, primeAnnuelle) {  
    const Q1 = window.document.querySelector('#remuneration');
    
    
    if (Nb_Acc === 0) {
        Q1.innerHTML = 'Votre prime sera de ' + primeAnnuelle + ' €';
    } else if (Nb_Acc === 1) {
        Q1.innerHTML = 'Votre prime sera de ' + primeAnnuelle + ' € alors qu\'elle aurait pu être de ' + primeAnnuelleSansAcc + ' € sans ' + Nb_Acc + ' accident responsable...';
    } else {
        Q1.innerHTML = 'Votre prime sera de ' + primeAnnuelle + ' € alors qu\'elle aurait pu être de ' + primeAnnuelleSansAcc + ' € sans ' + Nb_Acc + ' accidents responsables...';
    }
}
