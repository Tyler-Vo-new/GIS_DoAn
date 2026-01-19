import RoomSidebar from "../Components/RoomSidebar";
const Map = () => {
    return (
        <>
            <div style={{ display: "flex" }} >
            <RoomSidebar />
            
            <iframe
            
                src="/map.html"
                width="100%"
                height="800px"
                style={{ border: "none" ,flex: 1, marginLeft: "100px"}}
            />

            </div>
            
        </>
    );
}

export default Map;