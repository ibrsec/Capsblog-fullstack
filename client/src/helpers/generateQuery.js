
export const generateQueryPublished = (state) => {//{{filters,searchs,filters}
    let queryString = "filter[isPublish]=1";

    //page

    if(state.pagination.page){

        queryString += "&page=" + state.pagination?.page;
    }
    


    //filters
    for (const key in state.filters) {
      if (state.filters[key])
        queryString += `&filter[${key}]=${state.filters[key]}`;
    }

    //searchs
    for (const key in state.searchs) {
      if (state.searchs[key]) {
        queryString += `&search[${key}]=${state.searchs[key]}`;
      }
    }


    return queryString
  }
  export const generateQuery = (state) => {
    let queryString = "";

    //page
    if(state.pagination.page){
    queryString += "page=" + state.pagination.page;
    }

    //filters
    for (const key in state.filters) {
      if (state.filters[key])
        queryString += `&filter[${key}]=${state.filters[key]}`;
    }

    //searchs
    for (const key in state.searchs) {
      if (state.searchs[key]) {
        queryString += `&search[${key}]=${state.searchs[key]}`;
      }
    }
    return queryString;
  }