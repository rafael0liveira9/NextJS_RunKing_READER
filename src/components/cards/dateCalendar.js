'use client'



export default function CardSelectClockDate({ text }) {

    return (
        <div className="cardSelectClockDate">
            <div className="cardSelectInside">
                {!!text ? "" : <img src="/images/icon-lock-calendar.jpg"></img>}
                <p>{!!text ? text : `Select Date & Time`}</p>
            </div>
        </div>
    )
}
