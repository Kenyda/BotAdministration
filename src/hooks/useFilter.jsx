import {useMemo} from "react";

export const useFilter = (data, query) => {
    let sortedData;
    sortedData = useMemo(() => {
        let sorted = sortByUser(data, query.user);
        sorted = sortByCache(sorted, query.cache);
        sorted = sortByStatus(sorted, query.status);
        return sorted;
    }, [data, query]);

   return sortedData;
}

function sortByUser(data, val) {
    if (val && val !== '') return data.filter(item => item.user.includes(val));
    else return data
}

function sortByStatus(data, val) {
    if (val && val !== '') return data.filter(item => item.status === val);
    else return data
}

function sortByCache(data, val) {
    if (val && val !== '') return data.filter(item => item.cache === val);
    else return data
}