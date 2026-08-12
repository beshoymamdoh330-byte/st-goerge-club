import React from 'react';
import ViewProfilePage from '@/app/pages/ViewProfilePage';
export default async function Page({ params }:{params:Promise<{id:string}>} ) {
    const { id } = await params;
        const getUser = async () => {
        try {
            const res = await fetch(`https://mahinproject.runasp.net/api/User/get-user/${id}`)
            const currentMember = await res.json() 
            return currentMember
        }
        catch (err) {
            console.error(err)
        }
    }
    const currentProfile = await getUser()
    if(!currentProfile){
        return <h4>profile not found</h4>
    }
    return (
        <ViewProfilePage member={currentProfile} />
    )
}
