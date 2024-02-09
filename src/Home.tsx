import React, { createContext, useContext, useState } from "react"
import { number } from "zod"

const CyclesContext = createContext({} as any)


function NewCycleForm() {
    const { activeCycle, setActiveCycle } = useContext(CyclesContext)

    function handleCycle() {
        setActiveCycle(4)
    }

    return (
        <div>
            <h1> New Cycle : {activeCycle}</h1>
            <button onClick={handleCycle}> Alterar Ciclo</button>
        </div>
    )
}

function Countdown() {
    return <h1>CountDown</h1>
}

export function Home() {
    const [activeCycle, setActiveCycle] = useState(0)

    return (
        <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
            <NewCycleForm />
            <Countdown />
        </CyclesContext.Provider>
    )
}