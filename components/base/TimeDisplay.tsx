import { Box, Text, ResponsiveContext } from "grommet";
import { useContext, useEffect } from "react";
import { useTimer, useStopwatch } from 'react-timer-hook';

export enum TimeDisplaySize {
    XSmall,
    Small,
    Medium,
    Large
}

function Digit({ label, number, color, size } : { label: string, number: number, color?: string, size?: TimeDisplaySize}) {
    let width = "20px";
    let numberSize = "medium";
    let labelSize = "8px";
    switch (size) {
        case TimeDisplaySize.XSmall: 
            width = "12px";
            numberSize = "small";
            labelSize = "8px";
            break;
        case TimeDisplaySize.Small: 
            width = "20px";
            numberSize = "medium";
            labelSize = "8px";
            break;
        case TimeDisplaySize.Medium: 
            width = "28px";
            numberSize = "25px";
            labelSize = "10px";
            break;
        case TimeDisplaySize.Large: 
            width = "35px";
            numberSize = "32px";
            labelSize = "12px";
            break;            
    }

    return (
        <Box width={width} align="center">
            <Text color={color} size={numberSize}>{number.toString().padStart(2, "0")}</Text>
            <Text color="accent-2" size={labelSize}>{label}</Text>
        </Box>
    )
}

function Seperator({ size } : {size : TimeDisplaySize}) {
    let textSize = 'medium';
    switch (size) {
        case TimeDisplaySize.XSmall: 
            textSize = "small";
            break;
        case TimeDisplaySize.Small: 
            textSize = "medium";
            break;
        case TimeDisplaySize.Medium: 
            textSize = "25px";
            break;
        case TimeDisplaySize.Large: 
            textSize = "32px";
            break;            
    }
    return (
        <Box>
            <Text size={textSize}>:</Text>
        </Box>
    )
}


function TimeDisplay({ seconds, minutes, hours, days, color, size = TimeDisplaySize.Small }: { seconds: number, minutes: number, hours: number, days: number, color?: string, size?: TimeDisplaySize }) {
    const responsiveSize = useContext(ResponsiveContext);
    if (responsiveSize == "small") {
        size = TimeDisplaySize.Small;
    }

    let width = "90px";
    switch (size) {
        case TimeDisplaySize.XSmall: 
            width = "70px";
            break;
        case TimeDisplaySize.Small: 
            width = "90px";
            break;
        case TimeDisplaySize.Medium: 
            width = "130px";
            break;
        case TimeDisplaySize.Large: 
            width = "170px";
            break;            
    }

    return (
        <Box align="start" direction="row" justify="between" width={{max: width, min: width}}>
            {days > 0 &&
                <Digit number={days} label={"DAYS"} color={color} size={size} />
            }
            { days > 0 &&
                <Seperator size={size}/>
            }
            <Digit number={hours} label={"HRS"} color={color} size={size}/>
            <Seperator size={size}/>
            <Digit number={minutes} label={"MIN"} color={color} size={size}/>
            { days == 0 && 
                <Seperator size={size}/>
            }
            {days == 0 &&
                <Digit number={seconds} label={"SEC"} color={color} size={size}/>
            }
        </Box>
    )
}

export function TimeDown({ addSeconds, resetToSeconds, color, size }: { addSeconds: number, resetToSeconds?: number, color?: string, size?: TimeDisplaySize }) {
    function resetTimer(seconds?: number) {
        if (seconds) {
            const time = new Date();
            time.setTime(time.getTime() + (seconds * 1000));
            setTimeout(() => {
                restart(time, true);
            }, 10);
        }
    }

    const time = new Date();
    // figure out how much time has passed since we updated
    time.setTime(time.getTime() + (addSeconds * 1000));


    const {
        seconds,
        minutes,
        hours,
        days,
        restart,
        start,
        resume
    } = useTimer({ expiryTimestamp: time, autoStart: true, onExpire: () => resetTimer(resetToSeconds) })

    useEffect(() => {
        const time = new Date();
        // figure out how much time has passed since we updated
        time.setTime(time.getTime() + (addSeconds * 1000));
        setTimeout(() => {
            restart(time, true);
        }, 10);
    }, [addSeconds, resetToSeconds, color, size])

    return (
        <TimeDisplay seconds={seconds} minutes={minutes} hours={hours} days={days} color={color} size={size} />
    )
}

export function TimeDownWithCallback({ addSeconds, resetToSeconds, color, size, callBack }: { addSeconds: number, resetToSeconds?: number, color?: string, size?: TimeDisplaySize, callBack?: Function }) {
    function resetTimer(seconds?: number) {
        if (callBack) {
            callBack();
        }
        if (seconds) {
            const time = new Date();
            time.setTime(time.getTime() + (seconds * 1000));
            setTimeout(() => {
                restart(time, true);
            }, 10);
        }
    }

    const time = new Date();
    // figure out how much time has passed since we updated
    time.setTime(time.getTime() + (addSeconds * 1000));


    const {
        seconds,
        minutes,
        hours,
        days,
        restart,
        start,
        resume
    } = useTimer({ expiryTimestamp: time, autoStart: true, onExpire: () => resetTimer(resetToSeconds) })

    useEffect(() => {
        const time = new Date();
        // figure out how much time has passed since we updated
        time.setTime(time.getTime() + (addSeconds * 1000));
        setTimeout(() => {
            restart(time, true);
        }, 10);
    }, [addSeconds, resetToSeconds, color, size])

    return (
        <TimeDisplay seconds={seconds} minutes={minutes} hours={hours} days={days} color={color} size={size} />
    )
}

export function TimeUp({ addSeconds, color, size }: { addSeconds: number, color?: string, size?: TimeDisplaySize }) {
    const time = new Date();
    // figure out how much time has passed since we updated
    time.setSeconds(time.getSeconds() + addSeconds);

    const {
        seconds,
        minutes,
        hours,
        days,
        reset
    } = useStopwatch({ offsetTimestamp: time, autoStart: true })

    useEffect(() => {
        const time = new Date();
        // figure out how much time has passed since we updated
        time.setSeconds(time.getSeconds() + addSeconds);
        reset(time, true);
    }, [addSeconds])

    return (
        <TimeDisplay seconds={seconds} minutes={minutes} hours={hours} days={days} color={color} size={size} />
    )
}

export function StaticTime({ fromSeconds, color, size = TimeDisplaySize.Small }: { fromSeconds: number, color?: string, size?: TimeDisplaySize }) {
    // calculate new numbers.
    let dayCount = 0;
    let hour = Math.floor(fromSeconds / 3600);
    if (hour > 24) {
        dayCount = Math.floor(hour / 24);
        hour -= dayCount * 24;
    }
    const hours = hour;
    const days = dayCount;
    const minutes = Math.floor(fromSeconds % 3600 / 60);
    const seconds = Math.floor(fromSeconds % 3600 % 60);

    return (
        <TimeDisplay seconds={seconds} minutes={minutes} hours={hours} days={days} color={color} size={size} />
    )
}
