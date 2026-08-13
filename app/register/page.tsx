import React from 'react'
import SignUp from "../components/SignUp"; // تأكد من صحة مسار استيراد SignUp

export default function RegisterPage() {
    return (
        <main className="flex justify-center items-center min-h-screen py-10">
            <SignUp />
        </main>
    );
}
