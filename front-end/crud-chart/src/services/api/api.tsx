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