export default function Loader(props) {

    const { isLoading } = props

    if (isLoading) {
        return (

            <div className="d-flex align-items-center justify-content-center flex-column" style={{ width: "100%", height: "85.8vh", position: "absolute", left: 0, background: "#fff", zIndex: "1000" }}>
                <i style={{ fontSize: "4rem" }} className="text-warning fa-solid fa-circle-notch fa-spin"></i>
                <br />
                <h5>
                    Loading...
                </h5>
            </div>


        )

    }

}