
import axios from 'axios';

/*

Prepare:
1. Install axios package
2. Setup HTML file
3. Link css and javascript

Steps:
1. Create an async function to retrieve country data
2. Create a function to add li elements with content
3. Create a function to get correct region
4. Map all countries and add all elements

*/

async function getCountries() {
    try {
        const result = await axios.get('https://restcountries.com/v2/all?fields=name,region,subregion,flags,population');

        console.log( result.data )
        // Sort list by population
        result.data.sort( (a, b) => a.population - b.population );

        // Create elements for each country
        result.data.map( country => addCountryElement(country) );

    }catch(e) {
        console.error(e)
    }
}

getCountries()

function readablePopulation( _population ) {
    if (_population === 0) return "unkown";
    return _population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function getRegionClass( _country ){
    switch( _country.region ){
        case 'Asia':
        case 'Europe':
        case 'Africa':
        case 'Oceania': return _country.region.toLowerCase()
        case 'Americas':
            switch( _country.subRegion ){
                case 'South America': return 'south-america'
                // Default includes central and north America
                default: return 'north-america'
            }
        default: return 'other-region'
    }
}

function addCountryElement( _country ){

    const countryElement = document.getElementById( "list-countries" );

    // Create elements
    const listItem = document.createElement('li');
    const countryFlagName = document.createElement('section');
    const countryFlagContainer = document.createElement('div');
    const countryFlag = document.createElement('img');
    const countryName = document.createElement('h2');
    const countryPopulation = document.createElement('p');

    // Assign alt attribute for flag images
    countryFlag.setAttribute( "alt", "Flag of " + _country.name );

    // Assign content
    countryFlag.setAttribute( "src", _country.flags.svg );
    countryName.textContent = _country.name;
    countryPopulation.textContent = `Has a population of ${readablePopulation( _country.population )} people`;

    // Assign correct region class
    const regionClass = getRegionClass( _country );
    listItem.setAttribute( "class", regionClass );

    // Other classes
    countryPopulation.setAttribute( "class", "population-amount");
    countryFlagContainer.setAttribute( "class", "flag-container" );
    countryFlagName.setAttribute( "class", "flag-name" );

    // Append children
    countryFlagContainer.appendChild( countryFlag );

    countryFlagName.appendChild( countryFlagContainer );
    countryFlagName.appendChild( countryName );

    listItem.appendChild( countryFlagName );
    listItem.appendChild( countryPopulation );

    countryElement.appendChild( listItem );
}

