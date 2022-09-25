import './classyTable.css';

function ClassyTable() {
    return(
        <div className={"table"}>
            <div className={"table--th"}>
                <div><input type={"checkbox"}/></div>
                <div>Name</div>
                <div>Device</div>
                <div>Path</div>
                <div>Status</div>
            </div>

            <div className={"table--body"}>
                <div className={"table--tr"}>
                    <div><input type={"checkbox"}/></div>
                    <div>smss.exe</div>
                    <div>Stark</div>
                    <div>\Device\HarddiskVolume2\Windows\System32\smss.exe</div>
                    <div>Available</div>
                </div>

                <div className={"table--tr"}>
                    <div><input type={"checkbox"}/></div>
                    <div>smss.exe</div>
                    <div>Stark</div>
                    <div>\Device\HarddiskVolume2\Windows\System32\smss.exe</div>
                    <div>Available</div>
                </div>

                <div className={"table--tr"}>
                    <div><input type={"checkbox"}/></div>
                    <div>smss.exe</div>
                    <div>Stark</div>
                    <div>\Device\HarddiskVolume2\Windows\System32\smss.exe</div>
                    <div className={"table--status"}><div className={"table--greenCircle"} />Available</div>
                </div>
            </div>


        </div>
    )
}

export default ClassyTable;