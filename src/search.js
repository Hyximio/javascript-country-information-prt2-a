
import axios from 'axios';

async function assignSearchFunctionality() {

    try {
        const result = await axios.get('https://restcountries.com/v2/all?fields=name,region,subregion,flags,population,currencies,languages,capital');
        // const result = await axios.get('https://restcountries.com/v2/all');
        console.log( result.data )

        // search by clicking the search button
        const bt_search = document.getElementById( "bt-search" );
        bt_search.addEventListener( "click", () => {
            assignSearchResult( result.data );
        });

        // Search by hitting enter
        const et_search = document.getElementById( "et-field" );
        et_search.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                assignSearchResult( result.data );
            }
        });

    }catch(e) {
        console.error(e)
    }
}

assignSearchFunctionality()

function assignSearchResult( _countryData ) {

    // get search result
    const searchField = document.getElementById( "et-field" );
    let searchArg = searchField.value;

    const foundCountry = _countryData.find( (country) => country.name.toLowerCase() === searchArg.toLowerCase() );

    const noCountryFound = document.getElementById( "no-country-found" );
    const resultContainer = document.getElementById( "result-container" );

    if ( foundCountry === undefined ){
        noCountryFound.style.display = "block";
        resultContainer.style.display = "none";

        noCountryFound.textContent = `Nothing found with '${searchArg}'`;
    }else{
        noCountryFound.style.display = "none";
        resultContainer.style.display = "block";

        searchField.value = "";
        setCountryContent( foundCountry );
    }
}

function setCountryContent( _country ){

    const countryFlag = document.getElementById( "result-flag" );
    countryFlag.setAttribute( "src", _country.flags.svg );

    const { name, capital, subregion } = _country;
    document.getElementById( "country-name" ).textContent = name;

    const currencies = getConcateString( _country.currencies );
    const languages = getConcateString( _country.languages );
    const population = readablePopulation( _country.population );

    const infoText1 = `${name} is situated in ${subregion}. It has a population of ${population} people.`;
    const infoText2 = `The capital is ${capital} and you can pay with ${currencies}.`;
    const infoText3 = `They speak ${languages}.`;

    document.getElementById( "country-info1" ).textContent = infoText1;
    document.getElementById( "country-info2" ).textContent = infoText2;
    document.getElementById( "country-info3" ).textContent = infoText3;

}

function getConcateString( _props ){
    let collection = [];
    for ( const prop of _props )
        collection.push( prop.name );

    let rslt = collection[0];

    if ( collection.length > 1 ) {
        for (let i = 1; i < collection.length - 1; i++)
            rslt += ", " + collection[i];

        rslt += " and " + collection[ collection.length - 1 ];
    }
    return rslt;
}

function readablePopulation( _population ) {
    if (_population === 0) return "unkown";
    return _population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}