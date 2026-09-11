import * as SecureStore from 'expo-secure-store';

const BACKEND_URL = process.env.EXPO_PUBLIC_API_URL;

export async function apiClient(endpoint: string, options: RequestInit = {}) {

    const url = `${BACKEND_URL}${endpoint}`;  // http://localhost:5225/api/Auth/Login gibi bişey çıkar
    
    const token = await SecureStore.getItemAsync('token');

    const headers = {
        ...options.headers,
        ...(token && { Authorization: `Bearer ${token}` }),
    };

    console.log('İstek gidiyor:', options.method || 'GET', url);  // metod verilmediyse default olarak get olur
    if (options.body) {
        console.log('Gönderilen veri:', options.body);
    } // isteğin bodysi varsa 

    const response = await fetch(url, {...options, headers});

    const responseText = await response.text();
    console.log('Cevap geldi:', response.status, responseText);

    if (!response.ok) {
        throw new Error(responseText || 'Bir hata oluştu.');
    }

    return responseText ? JSON.parse(responseText) : null;
    // sonuç sorunsuz bir şekilde dönerse json tipine dönüştürülebilir veya delete gibi durumlarda null kalabilir


    // options -> method, header ve body gibi opsiyonel parametreler (RequestInit hazır sunar), eğer parametre olarak verilmezse sadece endpoint olur
}