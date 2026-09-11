import { apiClient } from './apiClient';

export async function login(mailOrUsername: string, password: string) {
    return apiClient('/api/Auth/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mailOrUsername, password }),  //  mailOrUsername: mailOrUsername, password: password şeklinde de yazabilirdik (eğer obje içindeki anahtar ismiyle, değişken ismi aynıysa kısaltarak da yazabiliriz)
    });
}