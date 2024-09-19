'use client'



export default function CardSelectClockDate({ text, disabled = false }) {

    return (
        <div className={!disabled ? "cardSelectClockDate" : "cardSelectClockDateDisable"}>
            <div className={!disabled ? "cardSelectInside" : "cardSelectClockDateHomeDisable"}>
                {!!text ? "" : <img src="/images/icon-lock-calendar.jpg"></img>}
                <p>{!!text ? text : `Select Date & Time`}</p>
            </div>
        </div >
    )
}
