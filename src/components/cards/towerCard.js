'use client'



export default function TowerCard({ status, tower }) {
    return (

        <div className="headerContentRespOne" style={{ gap: "10px" }}>
            <div className="iconGreenOut" style={status == 1 ? { backgroundColor: "var(--green-dark)" } : { backgroundColor: "var(--red-dark)" }}>
                <div
                    className="iconGreenin"
                    style={status == 1 ? { backgroundColor: "var(--green-primary)" } : { backgroundColor: "var(--red-primary)" }}
                >

                </div>
            </div>
            Antena {tower}
        </div>
    )
}
