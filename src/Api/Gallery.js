import axios from "axios";

const instance= axios.create (
    {
        baseURL:"https://pixabay.com/api",
        params:    {key: `40926027-5cb2084dfcf445810afb57cb9`,
                    q: `cat`,
                 image_type: 'photo',
                  orientation: 'horizontal',
                  safesearch: true,
                   page: 1,
                    per_page: 12,

        }
    }
) 


export const searceImg =(q, page) =>{
    return instance.get(`/`, {
      params: {
        key: `40926027-5cb2084dfcf445810afb57cb9`,
        q: `${q}`  ,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: `${page}`,
        per_page: 12,
      },
    });
}