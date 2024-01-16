 window.addEventListener("load", function() {
     var i;
     
     var tabInputs = window.document.querySelectorAll("input");
     
     for (i=0; i < tabInputs.length; i++) {
         tabInputs[i].addEventListener("change", function() {
             calculerRemuneration();
         },false);
     }
 },false);
//window.addEventListener("load", function() {
    //window.document.querySelector("#btn_calculer").addEventListener("click", function () {
function calculerRemuneration(){
    const fixe = 1100;
    var nbAncien = parseInt(window.document.querySelector("#num_ancien").value);
    var nbS20 = parseInt(window.document.querySelector("#num_s20").value);
    var nbXS = parseInt(window.document.querySelector("#num_xspirit").value);
    var nbMulti = parseInt(window.document.querySelector("#num_multi").value);
    var nbKm = parseInt (window.document.querySelector("#num_km").value);
    var remuneration = fixe + recupPrimeAnciennete(nbAncien, fixe) + recupComS20(nbS20, fixe)
     + recupComS20(nbS20) + recupComXS(nbXS)+ recupComMulti(nbMulti) + recupIndemKm(nbKm);
    
    window.document.querySelector("#remuneration").innerHTML = "La rémunération sera de : " + remuneration + "€";
}
   // }, false);
   // }, false);
 

    function recupPrimeAnciennete(nb, fixe) {
        const nbAncienMin = 5, txAncienMin = 0.03, nbAncienSup = 10, txAncienSup = 0.06;
        if (nb >= nbAncienMin) { return (fixe * txAncienMin); }
        else if (nb >= nbAncienMin) { return(fixe * txAncienSup); }
            else { return 0.0; }
    }

    function recupComS20(nb) {
        const prixS20 = 140.0, txComS20 = 0.02;
        return (nb * prixS20 * txComS20);
    }

    function recupComXS(nb) {
        const prixXS = 350.0, nbXSMinCom = 50, txComXS = 0.06;
        if (nb >= nbXSMinCom) {
            return ((nb - nbXSMinCom) * prixXS * txComXS);
        }
            else {return 0.0; }
    }

    function recupComMulti(nb) {
        const prixMu = 180.0, nbMultiTranche1 = 20, nbMultiTranche2 = 50;
        const txMultiTranche1 = 0.04, txMultiTranche2 = 0.06, txMultiTranche3 = 0.1;
        if (nb <= nbMultiTranche1) {
            return (nb * prixMu * txMultiTranche1);
        }

        else if (nb <= nbMultiTranche2) {
            return ((nbMultiTranche1 * prixMu * txMultiTranche1)
            + ((nb - nbMultiTranche1) * prixMu * txMultiTranche2));

        }
    
        else {
            return ((nbMultiTranche1 * prixMu * txMultiTranche1)
            + ((nbMultiTranche2 - nbMultiTranche1) * prixMu * txMultiTranche2)
            + ((nb - nbMultiTranche2) * prixMu * txMultiTranche3));
        }
    }
    
    function recupIndemKm(nb) {
    const prix = 0.15, pl = 350;
    var ff = nb * prix;
    if (ff > pl) {
        return pl;
    }
    else {
        return ff;
     }
 }