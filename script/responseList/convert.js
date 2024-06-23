function convertUnit(value, fromUnit, toUnit) {
    const conversions = {
        distance: {
            m: 1,
            km: 0.001,
            mile: 0.000621371,
            miles: 0.000621371,
            cm: 100
        },
        volume: {
            l: 1,
            ml: 1000,
            kl: 0.001
        },
        weight: {
            g: 1,
            kg: 0.001,
            mg: 1000
        }
    };

    const fromCategory = getCategory(fromUnit);
    const toCategory = getCategory(toUnit);
    if (!fromCategory || !toCategory) return undefined; // Invalid unit

    const fromConversion = conversions[fromCategory][fromUnit];
    const toConversion = conversions[toCategory][toUnit];
    if (!fromConversion || !toConversion) return undefined; // Invalid unit

    return value * (1 / fromConversion) * toConversion;
}

function getCategory(unit) {
    if (['m', 'km', 'mile', 'miles', 'cm'].includes(unit)) return 'distance';
    if (['l', 'ml', 'kl'].includes(unit)) return 'volume';
    if (['g', 'kg', 'mg'].includes(unit)) return 'weight';
    return undefined; // Invalid unit
}

export function responseList(filter, responseBox) {
    if (/convert/.test(filter)) {
        const conversionRegex = /convert\s+(\d+)\s*([a-z]+)\s+into\s+([a-z]+)/i;
        const matches = filter.match(conversionRegex);

        if (matches && matches.length === 4) {
            const value = parseFloat(matches[1]);
            const fromUnit = matches[2].toLowerCase();
            const toUnit = matches[3].toLowerCase();

            const result = convertUnit(value, fromUnit, toUnit);

            if (result !== undefined)
                responseBox.textContent = `${value} ${fromUnit} = ${result} ${toUnit}`;

            else responseBox.textContent = 'Invalid conversion!';
        }

        else responseBox.textContent = 'Invalid conversion format!';
    }

    else responseBox.innerHTML += "Sorry, I didn't understand that. Please try again!";
}