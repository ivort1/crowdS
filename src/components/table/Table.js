import './table.css';

// Images
import download from "../../images/download.svg";

function Table(props) {
    console.log("Table has been rendered");

    return(
        <table>
            <thead>
                <tr>
                    <th>
                        <input type={"checkbox"}
                               id={"custom-checkbox-selectDeselectAll"}
                               name={"custom-checkbox-selectDeselectAll"}
                               value={"custom-checkbox-selectDeselectAll"}
                               checked={props.selectDeselectAllIsChecked}
                               onChange={props.handleSelectDeselectAll}/>
                    </th>
                    <th className={"table--numCheckboxesSelected"}>
                        {props.numCheckboxesSelected ? `Selected ${props.numCheckboxesSelected}` : 'None selected'}
                    </th>
                    <th>
                        <button className={"table--downloadSelectedBtn"} onClick={props.handleShowHideAlert}>
                            <img src={download} alt={"download"} className={"table--downloadImg"}/>Download selected
                        </button>
                    </th>
                </tr>
                <tr>
                    <th />
                    <th>Name</th>
                    <th>Device</th>
                    <th>Path</th>
                    <th />
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
            {
                (props.data).map(({name, device, path, status, value}, index) => {
                    let deviceIsAvailable = status === "Available";
                    let onClick = deviceIsAvailable ?  () => props.handleOnChange(index) : null
                    let stylesTr = deviceIsAvailable ? "table--trAvailable" : "table--trScheduled";

                    return(
                        <tr className={stylesTr} style={props.checkedState[index]} key={index} onClick={onClick}>
                            <td>
                                {
                                    deviceIsAvailable ?
                                        <input
                                            type={"checkbox"}
                                            id={`custom-checkbox-${index}`}
                                            name={name}
                                            value={name}
                                            checked={props.checkedState[index].checked}
                                            onChange={() => props.handleOnChange(index)}
                                        /> :
                                        <input type={"checkbox"} disabled/>
                                }
                            </td>
                            <td><label htmlFor={`custom-checkbox-${index}`}>{name}</label></td>
                            <td>{device}</td>
                            <td>{path}</td>
                            <td className={"table--tdGreenCircle"}>{deviceIsAvailable && <span className={"table--greenCircle"} />}</td>
                            <td>{status}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    )
}
export default Table;