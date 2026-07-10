const BASE_URL = "http://localhost:8000";


export const getFlags = async () => {
    const response = await fetch(`${BASE_URL}/flags`);
    return response.json();
};


export const createFlag = async (flagData) => {
    const response = await fetch(`${BASE_URL}/flags`, {
        method: "POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify(flagData)
    });

    return response.json();
};


export const updateFlag = async (id, flagData) => {

    const response = await fetch(`${BASE_URL}/flags/${id}`, {
        method:"PUT",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(flagData)
    });

    return response.json();
};


export const deleteFlag = async(id)=>{

    await fetch(`${BASE_URL}/flags/${id}`,{
        method:"DELETE"
    });

};



export const getFlagById = async (flagKey) => {
    const response = await fetch(`${BASE_URL}/flags/${flagKey}`);

    if (!response.ok) {
        throw new Error("Flag not found");
    }

    return response.json();
};