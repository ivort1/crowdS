import {useEffect, useState} from "react";

import data from "./data";

// CSS
import "./App.css";

// Images
import redX from "./images/redX.png";
import checkmark from "./images/checkmark.png";

// Components
import Table from "./components/table/Table";
import Alert from "./components/alert/Alert";

function App() {
    const [checkedState, setCheckedState] = useState(new Array(data.length).fill({"checked": false, "backgroundColor": "#ffffff"}));
    const [selectDeselectAllIsChecked, setSelectDeselectAllIsChecked] = useState(false);
    const [numCheckboxesSelected, setNumCheckboxesSelected] = useState(0);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        console.log(checkedState)
    });

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((element, index) => {
            if(position === index) {
                return {...element, checked: !element.checked, backgroundColor: element.checked ? "#ffffff" : "#eeeeee"}
            }
            return element;
        });
        setCheckedState(updatedCheckedState);

        const totalSelected = updatedCheckedState.map(element => element.checked).reduce(
            (sum, currentState, index) => {
                if (currentState) {
                    return sum + data[index].value;
                }
                return sum;
            }, 0
        );
        setNumCheckboxesSelected(totalSelected);

        handleIndeterminateCheckbox(totalSelected);
    };

    const handleIndeterminateCheckbox = (total) => {
        const indeterminateCheckbox = document.getElementById("custom-checkbox-selectDeselectAll");
        let count = 0;

        data.forEach(element => {
            if(element.status === "Available") {
                count += 1;
            }
        })

        if(total === 0) {
            indeterminateCheckbox.indeterminate = false;
            setSelectDeselectAllIsChecked(false);
        }
        if(total > 0 && total < count) {
            indeterminateCheckbox.indeterminate = true;
            setSelectDeselectAllIsChecked(false);
        }
        if(total === count) {
            indeterminateCheckbox.indeterminate = false;
            setSelectDeselectAllIsChecked(true)
        }
    }

    const handleSelectDeselectAll = (event) => {
        let {checked} = event.target;
        console.log(checked);

        const allTrueArray = [];
        data.forEach(element => {
            if(element.status === "Available") {
                allTrueArray.push({"checked": true, "backgroundColor": "#eeeeee"});
            } else {
                allTrueArray.push({"checked": false, "backgroundColor": "#ffffff"});
            }
        })

        const allFalseArray = new Array(data.length).fill({"checked": false, "backgroundColor": "#ffffff"});
        checked ? setCheckedState(allTrueArray) : setCheckedState(allFalseArray);

        const totalSelected = (checked ? allTrueArray : allFalseArray).map(element => element.checked).reduce(
            (sum, currentState, index) => {
                if (currentState && data[index].status === "Available") {
                    return sum + data[index].value;
                }
                return sum;
            },
            0
        );
        setNumCheckboxesSelected(totalSelected);
        setSelectDeselectAllIsChecked(prevState => !prevState);
    }

    const handleShowHideAlert = () => {
        setShowAlert(true);
    }

    const devicesThatAreAvailable = (arrOfObj) => {
        let arr = [];
        arrOfObj.forEach((element, index) => {
            if(element.checked) {
                arr.push(data[index]);
            }
        })
        return arr.map((element, index) => {
            return(
                <div key={index}>
                    <div>Name: {element.name}</div>
                    <div>Device: {element.device}</div>
                    <div>Path: {element.path}</div>
                </div>
            )
        })
    }

    return (
        <>
            <Table
                data={data}
                selectDeselectAllIsChecked={selectDeselectAllIsChecked}
                handleSelectDeselectAll={handleSelectDeselectAll}
                numCheckboxesSelected={numCheckboxesSelected}
                handleShowHideAlert={handleShowHideAlert}
                handleOnChange={handleOnChange}
                checkedState={checkedState}/>

            {
                showAlert &&
                (numCheckboxesSelected ?
                        <Alert
                            alertTitle={"Files downloaded successfully"}
                            alertImgSrc={checkmark}
                            alertImgAlt={"checkmark"}
                            alertBody={devicesThatAreAvailable(checkedState)}
                            alertBtnStyle={{"backgroundColor": "#4bae4f"}}
                            alertBtn={"OK"}
                            handleShowHideAlert={setShowAlert} /> :

                        <Alert
                            alertTitle={"Error: No files have been selected"}
                            alertImgSrc={redX}
                            alertImgAlt={"redX"}
                            alertBody={"Please select at least one file to download and try again."}
                            alertBtnStyle={{"backgroundColor": "#f44236"}}
                            alertBtn={"OK"}
                            handleShowHideAlert={setShowAlert} />
                )
            }
        </>
    );
}
export default App;