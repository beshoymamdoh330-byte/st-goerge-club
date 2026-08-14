// app/profile/[id]/page.tsx
import ViewProfilePage from '../pages/ViewProfilePage' // تعديل مسار المكون حسب مكان حفظه

interface PageProps {
    params: Promise<{ id: string }>
}

export default async function ProfilePage({ params }: PageProps) {
    const { id } = await params;

    return (
        <ViewProfilePage 
            member={{ 
                id: id, 
                fullName: "", 
                fullNumber: "", 
                image: "", 
                role: "", 
                isActive: false 
            }} 
        />
    )
}
