const ip = '192.168.10.13'
//wss
export const web_socket_url = `ws://${ip}:3000`

export const db_url = `http://${ip}:3000`



export const get_Image_url = `${db_url}/images`

export const extractNameFromEmail =  email  => { 
    return email.split('@')[0]; 
}


  
