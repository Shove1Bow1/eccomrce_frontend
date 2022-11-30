/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { PATHS } from "./constants/paths";

const FETCH_TYPES = {
    CITIES: "FETCH_CITIES",
    DISTRICTS: "FETCH_DISTRICTS",
    WARDS: "FETCH_WARDS"
};

async function fetchLocationOptions(fetchType, locationId) {
    let url;
    switch (fetchType) {
        case FETCH_TYPES.CITIES: {
            url = PATHS.CITIES;
            break;
        }
        case FETCH_TYPES.DISTRICTS:
            {
                url = `${PATHS.DISTRICTS}/${locationId}.json`;
                break;
            }
        case FETCH_TYPES.WARDS: {
            url = `${PATHS.WARDS}/${locationId}.json`;
            break;
        }
        default: {
            return [];
        }
    }
    const locations = (await axios.get(url)).data["data"];
    return locations.map(({ id, name }) => ({ value: id, label: name }));
}

async function fetchInitialData(cityIdclone, districtIdClone, wardIdClone) {

    var cityId = 294;
    var districtId = 484;
    var wardId = 10379;
    if (localStorage.getItem("addressId")) {
        var value = localStorage.getItem("addressId").toString().split("/", 3);
        cityId = Number(value[2]);
        districtId = Number(value[1]);
        wardId = Number(value[0]);
    }


    const [cities, districts, wards] = await Promise.all([
        fetchLocationOptions(FETCH_TYPES.CITIES),
        fetchLocationOptions(FETCH_TYPES.DISTRICTS, cityId),
        fetchLocationOptions(FETCH_TYPES.WARDS, districtId)
    ]);
    return {
        cityOptions: cities,
        districtOptions: districts,
        wardOptions: wards,
        selectedCity: cities.find((c) => c.value === cityId),
        selectedDistrict: districts.find((d) => d.value === districtId),
        selectedWard: wards.find((w) => w.value === wardId)
    };
}

function useLocationForm(shouldFetchInitialLocation, cityIdclone, districtIdClone, wardIdClone) {
    const [state, setState] = useState({
        cityOptions: [],
        districtOptions: [],
        wardOptions: [],
        selectedCity: null,
        selectedDistrict: null,
        selectedWard: null
    });

    const { selectedCity, selectedDistrict } = state;

    useEffect(() => {
        (async function () {
            if (shouldFetchInitialLocation) {
                const initialData = await fetchInitialData(cityIdclone, districtIdClone, wardIdClone);
                setState(initialData);
            } else {
                const options = await fetchLocationOptions(FETCH_TYPES.CITIES);
                setState({ ...state, cityOptions: options });
            }
        })();
    }, []);

    useEffect(() => {
        (async function () {
            if (!selectedCity) return;
            const options = await fetchLocationOptions(
                FETCH_TYPES.DISTRICTS,
                selectedCity.value
            );
            setState({ ...state, districtOptions: options });
        })();
    }, [selectedCity]);

    useEffect(() => {
        (async function () {
            if (!selectedDistrict) return;
            const options = await fetchLocationOptions(
                FETCH_TYPES.WARDS,
                selectedDistrict.value
            );
            setState({ ...state, wardOptions: options });
        })();
    }, [selectedDistrict]);

    function onCitySelect(option) {
        if (option !== selectedCity) {
            setState({
                ...state,
                districtOptions: [],
                wardOptions: [],
                selectedCity: option,
                selectedDistrict: null,
                selectedWard: null
            });
        }
    }

    function onDistrictSelect(option) {
        if (option !== selectedDistrict) {
            setState({
                ...state,
                wardOptions: [],
                selectedDistrict: option,
                selectedWard: null
            });
        }
    }

    function onWardSelect(option) {
        setState({ ...state, selectedWard: option });
    }

    function onSubmit(e) {
        e.preventDefault();
        window.location.reload();
    }

    return { state, onCitySelect, onDistrictSelect, onWardSelect, onSubmit };
}

export default useLocationForm;
