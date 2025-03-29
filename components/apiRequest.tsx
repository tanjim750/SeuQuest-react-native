export const baseUrl = "https://ums-api-service.seu.edu.bd"

let headers = {
        "accept": "application/json",
        "accept-encoding": "gzip, deflate, br, zstd",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "application/json",
        "origin": "https://ums.seu.edu.bd",
        "priority": "u=1, i",
        "sec-ch-ua": '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Linux"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36"
    }

export const ApiRequest = async (url:any, method:any = "GET", authentication=false, data:any = null, headers:any = {}) => {
    try {
        // Default headers
        const defaultHeaders: any = {
            "Content-Type": "application/json",
            "origin": "https://ums.seu.edu.bd",
            "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
            ...headers, 
        };

        if (authentication){
            defaultHeaders.Authorization = `Bearer ${localStorage.getItem("authToken")}`
        }

        const options:any = {
            method,
            headers: defaultHeaders,  
        };

        if (data && method !== "GET" && method !== "HEAD") {
            options.body = JSON.stringify(data);
        }

        const response = await fetch(baseUrl+url, options);
        const json = await response.json();

        const result = {
            ok: response.ok,
            status:json.code,
            data: json
        }
        
        return result;
    } catch (error: any) {
        console.error("API Request Error:", error.message);
        throw error;
    }
};