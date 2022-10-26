
const Dic = ({ clickHandler, dic }) => {

    const styles = {
        backgroundColor: dic.held ? "#59E391" : "white"
    }

    return (
        < div onClick={clickHandler} style={styles} className='dice-face'>
            <h1 className="dice-num">{dic.value}</h1>
        </div >
    )
}

export default Dic;