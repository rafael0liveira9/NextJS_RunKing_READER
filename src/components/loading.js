'use client'



export default function Loading({ dark = null, position = "absolute" }) {
    return (
        <div className="flex justify-center items-center" style={{ position, }}>
            <img className="loading-animation" src="/icons/loading.svg"></img>
        </div>
    )
}
