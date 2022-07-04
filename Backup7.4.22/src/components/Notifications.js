import React, {useEffect, useState} from 'react';
import axios from 'axios'
function Notifications(props) {

    let PageId = sessionStorage.getItem('PageId')
    const [Pages, setPages] = useState({})

    useEffect(() => {
        if(PageId === ""){
            return         //only run the function once token is added
        }
        
        let key = 'Bearer '+'EAAFCcU2OZB84BALkThhrvFJlyXIjLxiLZBZAT7FT3NafaLdZAfTzpLICmbDaYZBCKw5nvJ1D0fWkAxhlcBx03GzloKhFwKuZABZCVw8qwQQ87bTZAA9ryzBfx1C3MIe3IhEXtjrYVYOmRfwZB051BjpYaJfElEu5c0WXDUfZAaVs3PgTKMyCkZB1ZA0yaorykFsaioOUPDqvPSGaUusZBMrVzbWXR'
        
        const authAxios = axios.create({
            headers: {
                    Authorization: key
                }
            })
  
        authAxios.get('https://graph.facebook.com/v14.0/'+PageId+'?fields=conversations')
            .then(response => {
                setPages(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
        })
    }, [PageId])

    useEffect(() => {
        if(PageId === ""){
            return         //only run the function once token is added
        }
        
        let key = 'Bearer '+'EAAFCcU2OZB84BALkThhrvFJlyXIjLxiLZBZAT7FT3NafaLdZAfTzpLICmbDaYZBCKw5nvJ1D0fWkAxhlcBx03GzloKhFwKuZABZCVw8qwQQ87bTZAA9ryzBfx1C3MIe3IhEXtjrYVYOmRfwZB051BjpYaJfElEu5c0WXDUfZAaVs3PgTKMyCkZB1ZA0yaorykFsaioOUPDqvPSGaUusZBMrVzbWXR'
        
        const authAxios = axios.create({
            headers: {
                    Authorization: key
                }
            })
  
        authAxios.get('https://graph.facebook.com/v14.0/'+'t_1755838941414664'+'?fields=messages')
            .then(response => {
                setPages(response.data)
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
        })
    }, [PageId])


    return (
        <div id='analytics'>
            Placeholder for Notifications
        </div>
    );
}

export default Notifications;