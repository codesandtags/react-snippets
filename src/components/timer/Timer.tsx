
import { useState, useEffect} from 'react';

/**
 * Timer component that displays the current time, updating every second.
 *
 * @component
 * @example
 * return (
 *   <Timer />
 * )
 *
 * @returns {JSX.Element | null} A section displaying the current time, or null if the time is not yet initialized.
 */
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