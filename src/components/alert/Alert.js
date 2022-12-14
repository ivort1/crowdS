import './alert.css';

function Alert(props) {
    return(
        <>
            <div className={"alert--bg"} onClick={() => props.handleShowHideAlert(false)}/>
            <div className={"alert--box"}>
                <div className={"alert--title"}>
                    <img src={props.alertImgSrc} alt={props.alertImgAlt} className={"alert--img"}/>
                    <div>{props.alertTitle}</div>
                </div>

                <div className={"alert--body"}>
                    {props.alertBody}
                </div>

                <button style={props.alertBtnStyle} className={"alert--btn"} onClick={() => props.handleShowHideAlert(false)}>{props.alertBtn}</button>
            </div>
        </>
    )
}
export default Alert;