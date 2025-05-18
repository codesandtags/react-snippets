import { useState, useEffect} from 'react';

const Timer = () => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        const timeId = window.setInterval(() => {
            setTime(new Date());
        }, 1000)
        
        return () => {
            window.clearInterval(timeId)
        }
    }, []);
    
    if (time === null) {
        return null
    }

    return (
        <section>
            <h2>Current Time</h2>
            <p>{time.toLocaleTimeString()}</p>
        </section>
    )

}

export default Timer;