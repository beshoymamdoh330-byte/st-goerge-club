import React from 'react';
import ViewProfilePage from '@/app/pages/ViewProfilePage';
export default async function Page({ params }:{params:Promise<{id:string}>} ) {
    const { id } = await params;
    const currentProfile = signedUsers.find(profile=> profile.id === id )
    if(!currentProfile){
        return <h4>profile not found</h4>
    }
    return (
        <ViewProfilePage user={currentProfile} />
    )
}
