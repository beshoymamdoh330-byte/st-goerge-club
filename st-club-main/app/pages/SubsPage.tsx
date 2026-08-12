"use client"

import { useState } from "react"
import { useThemeContext } from "../assets/contexts"

import { GenderFemale , GenderMale , ChevronUp } from "react-bootstrap-icons"
import { plans } from "../assets/assets"
import Sub from "../components/Sub"
export default function SubsPage() {
    const {theme} = useThemeContext()
    const [activeMenu , setActiveMenu] = useState<boolean>(false)
    const plansMap = plans.map((plan)=>{
        return(
            <Sub key={plan.id} plan={plan} />
        )
    })
return (
    <>
        <main className={`w-full bg-fixed py-5 pt-25 px-5 md:px-20  min-h-screen ${theme==="light"?"light-mode":"dark-mode"}`}>
            <div className="flex mb-10 justify-between items-center">
                <h3 className="text-3xl mb-2.5  text-blue-600 capitalize"> all subs </h3>
                <div className="flex items-center relative rounded-3xl p-3 bg-blue-600  gap-2.5">
                    <button
                    className="flex items-center gap-2"
                    onClick={()=>{
                        setActiveMenu(!activeMenu)
                    }} >
                        choose gender
                    <ChevronUp  className={`  ${activeMenu?"rotate-180":"rotate-0"}`} />
                    </button>
                    
                    <div className={`${activeMenu?"h-[140]":"h-0"}  overflow-hidden absolute w-full mt-1 bg-blue-600 left-0 top-full px-3 rounded-3xl`}>
                        <button className="flex my-3 w-full mb-2 text-[18px]  bg-blue-700 hover:bg-blue-800 p-3 justify-center rounded-3xl items-center gap-1.5">
                            <h3>boy</h3>
                            <GenderMale/>
                        </button>
                        <button className="flex my-3 w-full text-[18px]  bg-blue-700 hover:bg-pink-800 p-3 justify-center rounded-3xl items-center gap-1.5">
                            <h3>girl</h3>
                            <GenderFemale/>
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {plansMap}
            </div>
        </main>
    </>
)
}
