import s from './SplitContent.module.css'

const SplitContent = ({ left, right, colorLeft = false, colorRight = false }) => {
    return (
        <div className={s.content}>
            <div className={s.leftPane + (colorLeft && ` ${s.colored}`)} >
                {left}
            </div>
            <div className={s.rightPane + (colorRight && ` ${s.colored}`)} >
                {right}
            </div>
        </div>
    )
}

export default SplitContent
