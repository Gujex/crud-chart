import axios, {AxiosResponse} from "axios";
//config urls
const port = 3005
const mainUrl = `http://localhost:${port}/api/data/`
//get data from api
export const getData = async () => {
    return axios
        .get(mainUrl)
        .then((res:AxiosResponse) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
}
//post data to api
export const postData = async ( data: any) => {
return axios
        .post(mainUrl, data)
        .then((res:AxiosResponse) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
}

//delete data from api
export const deleteData = async ( id: number) => {
    return axios
        .delete(mainUrl + id)
        .then((res :AxiosResponse) => {
            return res.data
        })
        .catch((err) => {
            return err
        });
}

//update data from api
export const updateData = async ( data: any) => {
    return axios
        .put(mainUrl + data.id, data)
        .then((res: AxiosResponse) => {
            return res.data
        })
        .catch((err) => {
            return err
        })
}

