import { ReactNode, createContext, useEffect, useReducer, useState } from "react"
import { Cycle, cyclesReducer } from "../reducers/cycles/reducer";
import { addNewCycleAction, interruptCurrentCycleAction, markCurrentCycleAsFinishedAction } from "../reducers/cycles/actions";
import { differenceInSeconds } from "date-fns";


interface CreateCycleData {
    task: string,
    minutesAmount: number
}

interface CycleContextType {
    cycles: Cycle[]
    activeCycle: Cycle | undefined
    activeCycleId: string | null
    markCurrentCycleAsFinished: () => void
    amountSecondsPassed: number
    setSecondsPassed: (seconds: number) => void
    interruptCurrentCycle: () => void
    createNewCycle: (data: CreateCycleData) => void
}

export const CyclesContext = createContext({} as CycleContextType)

interface CyclesContextProviderProps {
    children: ReactNode
}

export function CycleContextProvider({ children }: CyclesContextProviderProps) {
    const [cyclesState, dispatch] = useReducer(
        cyclesReducer,
        {
            cycles: [],
            activeCycleId: null,
        },
        (initialState) => {
            const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

            if (storedStateAsJSON) {
                return JSON.parse(storedStateAsJSON)
            }
            return initialState

        },
    )

    const { cycles, activeCycleId } = cyclesState
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

    const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
        if (activeCycle) {
            return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
        }

        return 0
    })

    useEffect(() => {
        const statesJSON = JSON.stringify(cyclesState)

        localStorage.setItem('@ignite-timer:cycles-state-1.0.0', statesJSON)
    }, [cyclesState])




    function markCurrentCycleAsFinished() {

        dispatch(markCurrentCycleAsFinishedAction())
    }

    function setSecondsPassed(seconds: number) {
        setAmountSecondsPassed(seconds)
    }

    function createNewCycle(data: CreateCycleData) {
        const id = String(new Date().getTime())

        const newCycle: Cycle = {
            id: id,
            task: data.task,
            minutesAmount: data.minutesAmount,
            startDate: new Date(),
        }

        dispatch(addNewCycleAction(newCycle))

        setAmountSecondsPassed(0)
    }

    function interruptCurrentCycle() {
        dispatch(interruptCurrentCycleAction())
    }

    return (
        <CyclesContext.Provider value={{
            setSecondsPassed,
            amountSecondsPassed,
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            createNewCycle,
            interruptCurrentCycle,
            cycles
        }}>
            {children}
        </CyclesContext.Provider >
    )
}