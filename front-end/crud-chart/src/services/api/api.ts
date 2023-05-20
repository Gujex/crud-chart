import axios from "axios";

//get data from api
export const getData = async (url: string) => {
    return axios
        .get(url)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
}
//post data to api
export const postData = async (url: string, data: any) => {
return axios
        .post(url, data)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
}

//delete data from api
export const deleteData = async (url: string, id: number) => {
    return axios
        .delete(url + '/' + id)
        .then((res) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
}

