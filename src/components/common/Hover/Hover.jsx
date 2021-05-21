import { useState } from 'react'
import s from './Hover.module.css'

const Hover = ({ base, hovered, style, onClick }) => {
    
    const [clickMode, setClickMode] = useState(false)

    const mouseOut = () => {
        setTimeout(() => setClickMode(false), 1000)
    }

    const mouseOver = () => setClickMode(true)

    return (
        <div className={s.hoverContainer}>
            {
                clickMode ? 
                    <span className={style} onClick={onClick} onMouseOut={mouseOut}>
                        {hovered}
                    </span>
                    :
                    <span className={style} onMouseOver={mouseOver}>
                        {base}
                    </span>
            }
        </div>
    )
}

export default Hover
