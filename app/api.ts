import { BASE_URL } from "@/constants";

export async function getUsers() {
    const response = await fetch(BASE_URL + '/get-users');
    const { users } = await response.json();
    return users?.rows;
  }

export async function createUser(name: string, email: string,age:number,isAdmin:boolean,) {
    return await fetch(BASE_URL + '/create-user', {
      method: 'POST',
      body: JSON.stringify({ name, email,isAdmin,age }),
    });
  }

export async function deleteUserById(id:number){
    return await fetch(`${BASE_URL}/delete-user/${id}`,{
        method:"DELETE"
    })
}


export async function updateUserById(id: number,  name: string, email: string, age: number,isAdmin:boolean ) {
    try {
        const response = await fetch(`${BASE_URL}/update-user/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name,email,age,isAdmin})
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        return { success: true }; // Return success indicator

    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}
