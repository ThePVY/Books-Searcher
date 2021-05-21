import s from './FixedHeight.module.css'

const FixedHeight = props => {
    return (
        <div className={s.content}>
            {props.children}
        </div>
    )
}

export default FixedHeight
