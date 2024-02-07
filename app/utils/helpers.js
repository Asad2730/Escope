const ip = '192.168.10.2';
const port = '8080';


export const web_socket_url = `ws://${ip}:${port}`

export const db_url = `http://${ip}:${port}`

export const get_Image_url = `${db_url}/images`

export const extractNameFromEmail = email => {
    if (email && typeof email === 'string') {
        return email.split('@')[0];
    } else {
        return 'Invalid Email';
    }
}



  
