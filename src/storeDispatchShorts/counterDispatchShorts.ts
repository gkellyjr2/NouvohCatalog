const IncrementCounter =  () =>  ({type: 'counter/increment'})
const DecrementCounter =  () =>  ({type: 'counter/decrement'})
const ReviseTitle = (payload: any) =>  ({type: "counter/reviseTitle", payload})

export { IncrementCounter, DecrementCounter, ReviseTitle}